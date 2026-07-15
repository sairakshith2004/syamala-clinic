# Syamala Hospital — Official Website

**Live site:** [https://www.syamalahospital.in](https://www.syamalahospital.in)

A professional single-page website for Syamala Hospital, Nellore — a trusted women's and newborn care facility in Andhra Pradesh, India. The site presents the hospital, its three specialist doctors, services, patient reviews, location and contact information.

---

## Project Overview

| Item | Detail |
|---|---|
| **Hospital** | Syamala Hospital, Nellore, Andhra Pradesh |
| **Address** | Syamalamma Veedi, 3/452, Stonehousepet Rd, Lakshmipuram, Nellore — 524002 |
| **Phone** | +91 96761 98158 |
| **Email** | shyamalahospital35@gmail.com |
| **Hours** | Mon–Sat 9 AM – 9 PM · Sun Closed |
| **Rating** | 4.9 ★ on Google |

---

## Project Timeline

| Date | Milestone |
|---|---|
| **25 Jun 2026** | Initial commit — project scaffolded |
| **25 Jun 2026** | Doctor photos added; intro overlay timing tuned |
| **25 Jun 2026** | Converted from TanStack Start SSR to plain React + Vite SPA |
| **26 Jun 2026** | Lighthouse performance, accessibility and CSS optimisations |
| **26 Jun 2026** | HTTP security headers added to `vercel.json` |
| **26 Jun 2026** | SEO fixes: font sizes, tap targets, sitemap |
| **26 Jun 2026** | Non-blocking font loading; mobile performance improvements |
| **27 Jun 2026** | Production domain set to `https://www.syamalahospital.in` |
| **27 Jun 2026** | Google Search Console verification file added |
| **27 Jun 2026** | Google Analytics 4 (react-ga4) integrated |
| **27 Jun 2026** | Google review button added to reviews section and footer |
| **27 Jun 2026** | Custom favicon (mother-and-child logo) added |
| **27 Jun 2026** | Review buttons linked to Google reviews page |
| **28 Jun 2026** | Root `.gitignore` added; `package-lock.json` updated |

**Total active development time: ~4 days (25 – 28 June 2026)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build tool** | Vite 8 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 (with `@tailwindcss/vite` plugin) |
| **UI primitives** | Radix UI (accordion, dialog, avatar, tabs, etc.) |
| **UI components** | shadcn/ui component library |
| **Fonts** | Cormorant Garamond (serif headings) + Inter (body) — loaded from Google Fonts |
| **Analytics** | Google Analytics 4 via `react-ga4` |
| **Deployment** | Vercel (SPA with fallback rewrites) |
| **Package manager** | Bun (lockfile) + npm (for deployment) |

---

## Page Sections & Flow

The entire site is a **single scrollable page** with anchor-link navigation. There is no client-side router — every link is either an anchor (`#section`) or an external URL.

```
Page load
  └── IntroOverlay (logo + hospital name, fades out after ~1.7s)
       └── Main page reveals

┌── NAV (sticky, shrinks on scroll)
│     Logo · Syamala | About · Doctors · Services · Reviews · Visit · [Call Clinic]
│
├── HERO (#top)
│     Headline · Tagline · "Book an Appointment" CTA · Hospital building photo
│     Stats bar: 35+ years · 3 doctors · 10,000+ deliveries · 4.9★ (count-up animation)
│
├── ABOUT (#about)
│     Hospital story · Hospital entrance + laparoscopy photos
│
├── DOCTORS (#doctors)
│     Dr. N. Syamala Devi — Senior Gynaecologist, 35 yrs
│     Dr. M. Anusha — OBG · Laparoscopic Surgeon · Fertility · Cosmetic Gynae, 13 yrs
│     Dr. Ch. Sunil Rahul — Paediatrician & Neonatologist, 13 yrs
│     Each card: photo · name · role · credentials · "Send Query" email link
│
├── SERVICES (#services)
│     7 service cards with pastel glass styles:
│     Obstetrics & Gynaecology · Laparoscopic Surgery · Fertility Care
│     Neonatology · Paediatrics · 24×7 In-Patient Care · Cosmetic Gynecology
│
├── REVIEWS (#reviews)
│     6 verified Google review quotes
│     4.9★ rating badge · "Write a Review on Google" button
│
├── GALLERY (Moments from the hospital)
│     3 photos: newborn · nurse with baby · operating theatre
│
├── VISIT / CONTACT (#visit)
│     Address · Phone (click-to-call) · Email · Hours table
│     "Get Directions" → Google Maps · "Review on Google" button
│     Embedded Google Maps iframe
│
├── CTA BANNER
│     "Take the first step today." · Book an Appointment · Email Us
│
└── FOOTER
      © Syamala Hospital · Review us on Google · "Care that begins with listening."
```

---

## Key Features

### Intro Overlay
An animated splash screen displays the hospital logo and name on first load. It fades out after ~1 second and the main page slides in. This gives a premium first impression without blocking content for long.

### Scroll-aware Navbar
The sticky navbar shrinks smoothly on scroll — the logo scales down, the tagline fades out — keeping the header minimal while the user reads content.

### Scroll-reveal Animations
Every content block uses an `IntersectionObserver`-based `<Reveal>` component. Elements animate up (or fade in) the moment they enter the viewport, with configurable delay offsets for staggered card reveals.

### Animated Stats Counter
The stats bar (years, doctors, deliveries, rating) runs a count-up animation triggered by IntersectionObserver when the section scrolls into view. Uses an easing curve for a natural feel.

### Glass-morphism Design System
Custom CSS utility classes (`glass`, `glass-rose`, `glass-lavender`, `glass-teal`, `glass-peach`, `glass-mint`, `glass-cream`, `glass-blush`) provide a consistent frosted-glass card aesthetic across all sections.

### SEO & Structured Data
- Full Open Graph + Twitter Card meta tags
- JSON-LD `Hospital` schema with doctors listed as `Physician` entities
- Canonical URL set to production domain
- Google Search Console verified
- Google Analytics 4 integrated

### Performance
- Images converted to `.webp` format
- `fetchPriority="high"` on above-the-fold hero image
- `loading="lazy"` + `decoding="async"` on all below-fold images
- Google Fonts loaded non-blocking (`rel="preload"` + `onload` swap)
- React + React DOM split into a separate `vendor` chunk
- CSS minified at build time

### Security Headers (via Vercel)
- `X-Robots-Tag: index, follow`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## Project Structure

```
shyamala-clinic-main/
├── index.html              # Vite entry — all SEO meta, fonts, JSON-LD schema
├── vite.config.ts          # Vite config: React plugin, Tailwind plugin, chunk splitting
├── vercel.json             # SPA fallback rewrite + HTTP security headers
├── tsconfig.json
├── components.json         # shadcn/ui config
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── llms.txt
└── src/
    ├── main.tsx            # ReactDOM.createRoot entry
    ├── App.tsx             # Root component (renders <Index />)
    ├── styles.css          # Tailwind imports + CSS custom properties (design tokens)
    ├── assets/             # Images (.webp): logo, doctors, hospital photos
    ├── hooks/
    │   └── use-mobile.tsx  # Breakpoint hook
    ├── lib/
    │   └── utils.ts        # clsx + tailwind-merge helper
    ├── routes/
    │   └── index.tsx       # The entire single page (all sections)
    └── components/
        └── ui/             # shadcn/ui primitives (accordion, button, card, etc.)
```

---

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Linting & Formatting

```bash
npm run lint       # ESLint
npm run format     # Prettier
```

### Deployment

The project deploys automatically to Vercel on every push to `main`. The `vercel.json` rewrite rule sends all paths to `index.html`, making the SPA work correctly on direct URL access or refresh.

---

## Architecture Decisions

### Why React + Vite (not TanStack Start)?
The project started as a TanStack Start SSR app. Because the site is a single-page brochure with no dynamic server data requirements, SSR added complexity without benefit. It was converted to a plain React + Vite SPA — simpler build, easier Vercel deployment, no server-side concerns.

### Why a single `routes/index.tsx` file?
The entire site is one page. Rather than splitting into many components across files, all sections live in one file for easy co-location of data and markup. The shadcn/ui primitives in `src/components/ui/` are available but the main page does not use them directly (they ship with the scaffolding for future expansion).

### Why anchor-link navigation?
No routing library is needed. All navigation is `<a href="#section">` scroll anchors, which is correct for a single-page brochure site and keeps the bundle smaller.

---

## Doctors

| Doctor | Specialty | Experience |
|---|---|---|
| Dr. N. Syamala Devi | Senior Gynaecologist | 35 years |
| Dr. M. Anusha | OBG · Laparoscopic Surgery · Fertility · Cosmetic Gynecology | 13 years · M.B.B.S., M.S. (OBG) · Reg. 75768 |
| Dr. Ch. Sunil Rahul | Paediatrician & Neonatologist | 13 years · M.B.B.S., D.N.B. (PAED), Fellowship Neonatology · Reg. 71965 |

---

## Services Offered

1. Obstetrics & Gynaecology
2. Laparoscopic Surgery
3. Fertility Care
4. Neonatology
5. Paediatrics
6. 24×7 In-Patient Care
7. Cosmetic Gynecology

---

## Contact

- **Phone:** [+91 96761 98158](tel:+919676198158)
- **Email:** shyamalahospital35@gmail.com
- **Maps:** [Syamala Hospital on Google Maps](https://www.google.com/maps/search/?api=1&query=Syamala+Hospital+Stonehousepet+Nellore)
- **Reviews:** [Google Reviews](https://www.google.com/search?q=Syamala+Hospital+Nellore+reviews)
