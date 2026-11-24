import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CircleCheck, Info, LoaderCircle, Send } from 'lucide-react'
import Button from './Button'
import { inquiryTypes } from '../data/services'
import { submitInquiry, isFormConfigured, NotConfiguredError } from '../services/submitInquiry'
import { siteConfig } from '../config/siteConfig'
import { ease } from '../animations/motionVariants'

const contactMethods = ['Phone Call', 'WhatsApp', 'Email']

const empty = {
  fullName: '',
  phone: '',
  email: '',
  equipment: '',
  inquiryType: '',
  preferredContact: 'Phone Call',
  location: '',
  message: '',
  company: '', // honeypot — must stay empty
}

function validate(v) {
  const e = {}
  if (!v.fullName.trim()) e.fullName = 'Please enter your full name.'
  else if (v.fullName.trim().length < 2) e.fullName = 'Name looks too short.'

  const digits = v.phone.replace(/[\s()-]/g, '')
  if (!digits) e.phone = 'Please enter your phone number.'
  else if (!/^(\+?91|0)?[6-9]\d{9}$/.test(digits) && !/^\+\d{8,15}$/.test(digits))
    e.phone = 'Enter a valid 10-digit mobile number (e.g. 98765 43210).'

  if (v.preferredContact === 'Email' && !v.email.trim()) e.email = 'Email is required when Email is your preferred contact method.'
  else if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'

  if (!v.equipment.trim()) e.equipment = 'Tell us which equipment you need.'
  if (!v.inquiryType) e.inquiryType = 'Please select an inquiry type.'
  if (!v.location.trim()) e.location = 'Please enter your village / town / district.'
  if (v.message.length > 2000) e.message = 'Please keep this under 2000 characters.'
  return e
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-1 font-display text-sm font-semibold text-forest-900">
        {label}
        {required && (
          <span className="text-emerald-600" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="ml-1 text-xs font-normal text-forest-900/40">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-2 flex items-center gap-1.5 text-sm text-red-700"
          >
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </motion.p>
        ) : (
          hint && <p className="mt-2 text-xs text-forest-900/45">{hint}</p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactForm() {
  const [params] = useSearchParams()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | not-configured
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)
  const configured = isFormConfigured()

  // Pre-select inquiry type from ?type= (e.g. links from service cards).
  useEffect(() => {
    const t = params.get('type')
    if (t && inquiryTypes.some((i) => i.value === t)) setValues((v) => ({ ...v, inquiryType: t }))
  }, [params])

  const set = (name) => (e) => {
    const next = { ...values, [name]: e.target.value }
    setValues(next)
    if (touched[name] || errors[name]) setErrors(validate(next))
  }
  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const a11y = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: set(name),
    onBlur: blur(name),
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.company) return // bot
    const v = validate(values)
    setErrors(v)
    setTouched(Object.keys(empty).reduce((a, k) => ({ ...a, [k]: true }), {}))
    if (Object.keys(v).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(v)[0]}"]`)
      first?.focus()
      return
    }
    setStatus('submitting')
    setServerError('')
    try {
      const { company, ...data } = values
      await submitInquiry({
        ...data,
        inquiryTypeLabel: inquiryTypes.find((i) => i.value === data.inquiryType)?.label,
      })
      setStatus('success')
      setValues(empty)
      setTouched({})
    } catch (err) {
      if (err instanceof NotConfiguredError) setStatus('not-configured')
      else {
        setServerError(err.message || 'Something went wrong.')
        setStatus('error')
      }
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col items-center rounded-[28px] bg-white p-10 text-center ring-1 ring-forest-900/5 md:p-14"
        role="status"
      >
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
          className="grid h-20 w-20 place-items-center rounded-full bg-leaf-100 text-emerald-600"
        >
          <CircleCheck className="h-10 w-10" />
        </motion.span>
        <h3 className="mt-6 font-display text-2xl font-bold">Thank you — your inquiry has been sent.</h3>
        <p className="mt-3 max-w-md text-forest-900/65">
          Our team has received your details and will get in touch using your preferred contact method.
        </p>
        <Button variant="outlineDark" className="mt-8" onClick={() => setStatus('idle')} icon={false}>
          Send another inquiry
        </Button>
      </motion.div>
    )
  }

  const { phone, email } = siteConfig.contact

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[28px] bg-white p-6 ring-1 ring-forest-900/5 sm:p-8 md:p-10" aria-describedby="form-required-note">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Equipment inquiry</h2>
          <p id="form-required-note" className="mt-1 text-sm text-forest-900/55">
            Fields marked <span className="text-emerald-600">*</span> are required.
          </p>
        </div>
      </div>

      {/* Honeypot (hidden from people) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors.fullName}>
          <input type="text" autoComplete="name" placeholder="Your full name" className="field" {...a11y('fullName')} />
        </Field>
        <Field id="phone" label="Phone Number" required error={errors.phone}>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field" {...a11y('phone')} />
        </Field>
        <Field id="email" label="Email Address" required={values.preferredContact === 'Email'} error={errors.email}>
          <input type="email" autoComplete="email" placeholder="you@example.com" className="field" {...a11y('email')} />
        </Field>
        <Field id="location" label="Location" required error={errors.location} hint="Village / town, district and state">
          <input type="text" autoComplete="address-level2" placeholder="e.g. Jorhat, Assam" className="field" {...a11y('location')} />
        </Field>
        <Field id="inquiryType" label="Inquiry Type" required error={errors.inquiryType}>
          <select className="field appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%230d2b1f%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10" {...a11y('inquiryType')}>
            <option value="">Select inquiry type</option>
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="equipment" label="Equipment Required" required error={errors.equipment}>
          <input type="text" placeholder="e.g. Tractor with rotavator, 5 HP water pump" className="field" {...a11y('equipment')} />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 font-display text-sm font-semibold text-forest-900">
          Preferred Contact Method <span className="text-emerald-600">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((m) => {
            const active = values.preferredContact === m
            return (
              <label
                key={m}
                className={`relative cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-500 ${
                  active ? 'border-forest-900 bg-forest-900 text-cream-50' : 'border-beige-300 bg-cream-50 text-forest-900/75 hover:border-forest-900/40'
                }`}
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={m}
                  checked={active}
                  onChange={(e) => {
                    const next = { ...values, preferredContact: e.target.value }
                    setValues(next)
                    if (Object.keys(touched).length) setErrors(validate(next))
                  }}
                  className="sr-only"
                />
                {m}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field id="message" label="Additional Requirements" error={errors.message}>
          <textarea rows={5} placeholder="Field size, rental duration, preferred dates, quantity or anything else that helps us understand your need." className="field resize-y" {...a11y('message')} />
        </Field>
      </div>

      {!configured && (
        <div className="mt-6 flex gap-3 rounded-2xl border border-gold-500/40 bg-gold-400/10 p-4 text-sm text-earth-800">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
          <p>
            Online submission is being set up and is not active yet. You can still fill in the form to check your details — it will
            not be sent until the inquiry service is connected.
            {(phone || email) && ' Meanwhile, please reach us directly using the contact details on this page.'}
          </p>
        </div>
      )}

      <AnimatePresence>
        {status === 'not-configured' && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex gap-3 rounded-2xl border border-gold-500/50 bg-gold-400/15 p-4 text-sm text-earth-800"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
            <p>
              <strong>Your inquiry was not sent.</strong> Online submission has not been connected yet, so nothing was transmitted.
              {phone || email ? ' Please contact us by phone or email instead.' : ' Please try again later.'}
            </p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <strong>We couldn&apos;t send your inquiry.</strong> {serverError} Please check your connection and try again.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-forest-900/45 sm:max-w-xs">
          Your details are used only to respond to this inquiry. Availability and pricing are confirmed directly by our team.
        </p>
        <Button type="submit" size="lg" icon={false} disabled={status === 'submitting'} magnetic={false} className="sm:min-w-[220px]">
          <span className="flex items-center gap-2">
            {status === 'submitting' ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Submit Inquiry
              </>
            )}
          </span>
        </Button>
      </div>
    </form>
  )
}
