import { siteConfig } from '../config/siteConfig'

/**
 * ─────────────────────────────────────────────────────────────
 *  INQUIRY SUBMISSION — integration point
 * ─────────────────────────────────────────────────────────────
 *  Sends the inquiry as JSON to `siteConfig.form.endpoint`
 *  (set through VITE_FORM_ENDPOINT in `.env`).
 *
 *  Works out-of-the-box with JSON-accepting form services, e.g.
 *    • Formspree   → VITE_FORM_ENDPOINT=https://formspree.io/f/<form-id>
 *    • Web3Forms   → VITE_FORM_ENDPOINT=https://api.web3forms.com/submit
 *                    VITE_FORM_ACCESS_KEY=<access-key>
 *    • Your own backend / serverless function that returns 2xx on success.
 *
 *  If no endpoint is configured this throws a `NotConfiguredError`, and the
 *  form tells the visitor plainly that online submission is not yet active —
 *  it never shows a fake success message.
 */
export class NotConfiguredError extends Error {
  constructor() {
    super('Online inquiry submission has not been configured yet.')
    this.name = 'NotConfiguredError'
  }
}

export const isFormConfigured = () => Boolean(siteConfig.form.endpoint)

export async function submitInquiry(data) {
  const { endpoint, accessKey } = siteConfig.form
  if (!endpoint) throw new NotConfiguredError()

  const payload = {
    ...data,
    subject: `New equipment inquiry — ${data.inquiryTypeLabel || data.inquiryType}`,
    source: typeof window !== 'undefined' ? window.location.href : '',
    submittedAt: new Date().toISOString(),
    ...(accessKey ? { access_key: accessKey } : {}),
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    let body = null
    try {
      body = await res.json()
    } catch {
      /* non-JSON response is fine as long as status is OK */
    }
    if (!res.ok || body?.success === false) {
      throw new Error(body?.message || `Submission failed (status ${res.status}).`)
    }
    return body
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out. Please try again.')
    throw err
  } finally {
    clearTimeout(timer)
  }
}
