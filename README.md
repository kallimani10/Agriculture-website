# Saikia Agriculture India — Website

A four-page React website for **Saikia Agriculture India**, an agricultural equipment rental and supply business: tractor rental, agricultural machinery, water pumps and motors, irrigation equipment, farming tools and equipment supply.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion · GSAP (ScrollTrigger) · React Router 7 · Lucide icons

---

## Quick start

Requires **Node.js 20+**.

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

---

## Before launch: what to fill in

No business details were invented. Everything unknown is `null` and shows a clearly marked **"To be updated"** placeholder until you fill it in.

### 1. Business details: `src/config/siteConfig.js`

| Field | Used for |
|---|---|
| `contact.phone` | Contact cards, footer, mobile menu (`tel:` link) |
| `contact.whatsapp` | "Chat on WhatsApp" button (digits only, e.g. `919876543210`) |
| `contact.email` | Contact cards, footer (`mailto:` link) |
| `contact.address` | Contact card (links to Google Maps search) and footer |
| `contact.hours` | Contact card and footer |
| `mapEmbedUrl` | Google Maps embed on the Contact page. Use a **verified** location only (Google Maps → Share → Embed a map → copy the iframe `src`) |
| `social.*` | Footer social icons. Only the icons you configure are shown |

### 2. Inquiry form submission

The form validates everything on the client. **It never shows a fake success message.** Until an endpoint is configured, it tells visitors that online submission isn't active yet and sends nothing.

To turn submission on, copy `.env.example` to `.env` and set:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/<your-form-id>
# or for Web3Forms:
# VITE_FORM_ENDPOINT=https://api.web3forms.com/submit
# VITE_FORM_ACCESS_KEY=<your-access-key>
```

Then rebuild. Any endpoint that accepts a JSON `POST` and returns a 2xx status works, including your own backend or a serverless function. The integration lives in `src/services/submitInquiry.js`.

Payload sent: `fullName, phone, email, equipment, inquiryType, inquiryTypeLabel, preferredContact, location, message, subject, source, submittedAt`.

### 3. Legal pages

`/privacy-policy` and `/terms` are placeholder pages (`src/pages/Legal.jsx`). Replace them with reviewed text before going live.

### 4. Equipment categories and FAQ

- Categories, descriptions and features: `src/data/services.js`. The "Other Farming Equipment" `examples` list is meant to be edited.
- FAQ: `src/data/faq.js`

---

## Project structure

```text
src/
├── animations/motionVariants.js   Reusable Framer Motion variants
├── components/
│   ├── Navbar.jsx                 Floating nav, active underline, mobile drawer
│   ├── Footer.jsx
│   ├── Hero.jsx                   Cinematic video hero (adaptive 4K/1080p/540p source)
│   ├── PageHero.jsx               Inner-page hero (parallax image / optional video, breadcrumb)
│   ├── Marquee.jsx                Infinite marquee
│   ├── SectionHeading.jsx · RevealText.jsx   Masked word-by-word headline reveals
│   ├── ServiceCard.jsx            3 card variants (feature / split / minimal)
│   ├── EquipmentCard.jsx · EquipmentShowcase.jsx   GSAP-pinned horizontal showcase
│   ├── Gallery.jsx                Asymmetric gallery + accessible lightbox
│   ├── CTASection.jsx · FAQAccordion.jsx · ContactForm.jsx
│   ├── Effects.jsx                TiltCard, ParallaxImage, AmbientBlobs
│   ├── Magnetic.jsx · Button.jsx · Img.jsx · Logo.jsx · SocialIcons.jsx
│   ├── GlobalUI.jsx               Scroll progress, scroll-to-top, floating actions, cursor, intro loader
│   └── PageTransition.jsx
├── config/siteConfig.js           ← Business details (edit me)
├── data/                          services.js · faq.js · media.js (all image/video sources)
├── hooks/                         useSEO · useMediaQuery · useScrollAnimation
├── lib/icons.js
├── pages/                         Home · About · Services · Contact · Legal · NotFound
├── services/submitInquiry.js      ← Form integration point
├── App.jsx · main.jsx · index.css (design tokens in @theme)
```

## Routes

| Page | Route |
|---|---|
| Home | `/` |
| About | `/about` |
| Services | `/services` (anchors: `#tractor-rental`, `#agricultural-machinery`, `#water-pumps-motors`, `#irrigation-equipment`, `#farming-tools`, `#equipment-supply`, `#other-equipment`) |
| Contact | `/contact` (accepts `?type=tractor-rental` etc. to pre-select the inquiry type) |
| Legal placeholders | `/privacy-policy`, `/terms` |

---

## Media sources

All photos and videos are free to use under the [Pexels License](https://www.pexels.com/license/). Every asset is listed with its Pexels ID in `src/data/media.js`, so you can trace any image back to `https://www.pexels.com/photo/<id>/`. Images are served from the Pexels CDN with responsive `srcset` and lazy loading.

| Video | Native resolution | Used on |
|---|---|---|
| [Pexels #4404131](https://www.pexels.com/video/a-tractor-on-the-farm-4404131/): aerial view, tractor working farmland | 3840×2160 (4K) | Home hero |
| [Pexels #4380227](https://www.pexels.com/video/a-farm-tractor-working-in-the-field-4380227/): aerial view, farm tractor in field | 3840×2160 (4K) | Services hero |

**Adaptive hero video:** the 4K file (~35 MB) is only loaded on large, high-density screens. Other desktops get 1080p (~8 MB) and phones get 540p (~1 MB). On Save-Data or 2G connections, or with reduced motion turned on, visitors see the poster image instead of the video. If the video fails to load, the poster image stays visible.

To self-host instead, download the files into `public/videos/` and update the URLs in `src/data/media.js`.

---

## Accessibility and performance

- Semantic landmarks, one `h1` per page, skip-to-content link, visible focus rings, labelled form fields, `aria-invalid` and error announcements
- `prefers-reduced-motion` is respected globally (Framer `MotionConfig`, GSAP `matchMedia`, CSS)
- Pause/play control on the hero video
- Per-page `<title>`, meta description, canonical URL and Open Graph tags (`useSEO`)
- About, Services and Contact are code-split, and vendor chunks are split out (react / motion / gsap)
- Cursor follower, magnetic buttons and 3D tilt run only on precise-pointer (mouse) devices

## Deployment

This is a single-page app, so every route must fall back to `index.html`:

- **Netlify:** `public/_redirects` is included
- **Vercel:** `vercel.json` is included
- **Apache / Nginx:** add a rewrite of all paths to `/index.html`
