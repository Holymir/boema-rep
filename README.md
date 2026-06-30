# MPB · Metal Parts Bulgaria — Website

Bilingual (Bulgarian / English) B2B marketing site for **Metal Parts Bulgaria** —
a precision machine shop and the official Bulgarian distributor of **BÖMA (Boema.at)**.
Generates leads via an RFQ form, establishes credibility, and supports recruiting.

## Stack

| Concern | Tech |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS (brand tokens in `tailwind.config.ts`) |
| i18n | `next-intl` — locales `bg` (default, no prefix) and `en` (`/en`) |
| CMS | Sanity (Studio at `/studio`) |
| Email | Resend (RFQ + autoresponder) |
| File uploads | Vercel Blob (RFQ drawings — link emailed, never attached) |
| Analytics | Vercel Analytics (consent-gated) |
| Hosting | Vercel |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in keys (optional for UI-only work)
npm run dev                  # http://localhost:3000  (bg)  /  /en
```

Without `RESEND_API_KEY` / `BLOB_READ_WRITE_TOKEN`, the RFQ form still works for
UI testing — the API returns `{ ok: true, delivered: false }` and logs the payload.

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint
```

## Environment variables

See `.env.example`. Required for full functionality:

- `RESEND_API_KEY`, `RFQ_TO_EMAIL`, `RFQ_FROM_EMAIL` — RFQ email delivery.
- `BLOB_READ_WRITE_TOKEN` — RFQ file uploads (auto-provisioned on Vercel).
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_VERSION` — Sanity CMS. (`SANITY_API_READ_TOKEN` optional, for drafts.)
- `NEXT_PUBLIC_SITE_URL` — canonical/sitemap base URL.

## Content & i18n

- UI copy lives in `messages/bg.json` and `messages/en.json` (bg is default).
- CMS-managed content (downloads, products, capabilities, materials, industries,
  legal pages, settings) is edited in **Sanity Studio at `/studio`**. Schemas:
  `sanity/schemas/`. When Sanity is unconfigured, the site falls back to the
  placeholder content in the message catalogs.

## Structure

Information architecture mirrors **boema.at** (we are BÖMA's representative):
Home (company) · Capabilities · Products · Solutions · Catalogs (Downloads) ·
About · Contact, with Products/Solutions dropdown submenus in the header.

```
app/[locale]/         # localized routes:
  page.tsx            #   Home — hero, intro, overview hub, why-us, industries
  capabilities/       #   What we make: capabilities, materials, specs, equipment
  products/           #   BÖMA product range + Modu-System feature
  solutions/          #   Solution categories + process + industries
  about/              #   Company story, stats, values, ISO 9001
  downloads/          #   Catalogs/brochures (Sanity)
  contact/            #   RFQ form + contact details
  privacy/ terms/     #   Legal stubs
app/api/rfq/         # RFQ handler: validate + honeypot → Blob upload → Resend x2
app/studio/          # Sanity Studio (own root layout)
app/sitemap.ts       # per-locale sitemap
app/robots.ts
components/sections/  # Hero, Capabilities, ProductRange, Materials, Specs, Equipment,
                      # ModuFeature, Industries, WhyUs, Downloads, CtaBand, Rfq, LegalPage
components/layout/    # Header, Footer, LocaleSwitcher, CookieBanner, ConsentAnalytics
components/rfq/        # RfqForm (client)
components/search/     # SearchDialog
lib/                  # fonts, site (NAP), seo (metadata + JSON-LD), rfq (validation)
sanity/               # client, queries, schemas, env
messages/             # bg.json, en.json
public/assets/        # placeholder images (real shop-floor photos + drone video TBD)
```

## Placeholders / to deliver

- **Real assets**: shop-floor & parts photos and a production/drone video replace the
  placeholders in `public/assets`. Hero has a `<video>` slot in `components/sections/Hero.tsx`
  (add `<source>` + poster).
- **NAP**: address/phone in `lib/site.ts` are placeholders — confirm with the client.
- **Legal copy**: Privacy/Terms are editable stubs; supply real text via Sanity (`page` docs
  with slugs `privacy` / `terms`).
- **Logos**: company + BÖMA partner logos currently use text/letter placeholders.

## Notes

- Headings use Archivo (latin/latin-ext); Bulgarian Cyrillic headings fall back to
  IBM Plex Sans (loaded with the cyrillic subset). Body text is IBM Plex Sans.
- The previous static prototype (`*.dc.html`, `support.js`) was removed after the
  Next.js rebuild reached parity; it remains in git history.
