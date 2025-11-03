# Site data sources — what to change to rename the site

This document lists where the app reads site metadata (name, logo, description) and other content files, and explains what to edit when you want to rename the site or change related data.

---

## Primary site configuration

- File: `client/config/data/site.json`
  - Key fields:
    - `siteName` — main site title string used across the site (Logo alt, About page heading, Footer copyright, etc.)
    - `logoPath` — path to the logo image (relative to `public/`), e.g. `/logo_ebi.png`
    - `description` — short site description used in some pages/meta
    - `nameLines` — optional array of strings to display the name on two lines in the header/logo
    - `contacts` — address/phone/email used by footer and contact forms
    - `socialMedia` — URLs for social links
  - To rename the site: change `siteName` (and `nameLines` if you use the stacked logo text). Replace `logoPath` with the new image file (put the file under `public/`).

- Loader: `client/config/config.ts` simply exports the JSON as `siteConfig`.
- Where it is used:
  - `client/components/Logo.tsx` — renders logo image and nameLines / siteName
  - `client/pages/About.tsx` — page title uses `siteConfig.siteName`
  - `client/pages/Index.tsx` — `About {siteConfig.siteName}` heading on the homepage
  - `client/components/layout/Footer.tsx` — copyright `© YEAR {siteConfig.siteName}`
  - `client/config/sitemapConfig.ts` — uses `siteConfig.siteName` in some descriptions

---

## Home "About" section (homepage specific content)

- File: `client/config/data/homeAbout.json`
  - Fields: `paragraphs` (array of strings used on the homepage) and `missions` (array of small cards — in this project the homepage now uses an image placeholder instead of listing the missions).
  - To change homepage About text, edit `paragraphs` here. To change the optional mission cards, edit `missions`.
  - The homepage reads this via: `client/pages/Index.tsx` (import `homeAboutData`).

## Full About page

- File: `client/config/data/about.json`
  - This is the canonical About page content (longer paragraphs, mission descriptions, etc.).
  - `client/pages/About.tsx` imports this file as `aboutData`.
  - Note: the homepage About copy is separate — editing `about.json` does NOT change the homepage unless you explicitly point the homepage to it.

---

## Knowledge hub, articles, news, podcasts and other content

Content items are stored in `public/data/` as JSON files (static site data). Key files:

- `public/data/knowledge-articles.json` — articles used by the Knowledge Hub and article pages.
  - Typical article fields: `slug`, `title`, `description`, `date`, `readMins`, `tags`, `image` (optional), `sections` (article body)
  - Example slug value: `/resources/articles/biosafety-basics`
- `public/data/news-articles.json` — news listing used by news pages
- `public/data/videos.json`, `public/data/podcasts.json`, `public/data/quizzes.json` — other resource lists
- `public/data/faqs.json` — FAQ data used by FAQ widget
- `public/data/products.json` — product previews (if present)

To edit content or rename items:
- Update the corresponding JSON file in `public/data/`.
- For new images referenced by content, add image files to `public/` and point `image`/`logoPath` to that path.

Where these are consumed (examples):
- Knowledge Hub widget: `client/components/widgets/KnowledgeHubWidget.tsx` reads the article list and renders `ArticleCard`.
- Individual article pages and resource pages import and parse `public/data/*` files.

---

## Other places to update when renaming the site

- `index.html` — `<title>__SITE_NAME__</title>`: update the HTML title used at build time if you want a static title; or leave and set dynamic meta titles elsewhere.
- Any hard-coded strings in components: run a project-wide search for the old site name if you need to replace display strings that are not using `siteConfig`.
- `public/` assets: replace logo and any branded images (paths are referenced from `site.json` or directly from JSON content files).

---

## Quick checklist to rename the site

1. Edit `client/config/data/site.json`: set `siteName` and optionally `nameLines`, `description`, `logoPath`, `socialMedia`.
2. Place new logo file in `public/` and update `logoPath` accordingly.
3. Optionally update `client/config/data/homeAbout.json` and `client/config/data/about.json` for About copy.
4. Search repository for any hard-coded occurrences of the previous name and update them if necessary.
5. Update `index.html` `<title>` if you want the plain HTML title changed.
6. If you use sitemap or SEO config, review `client/config/sitemapConfig.ts`.

---

If you want, I can also:
- Replace `index.html` title with `siteConfig.siteName` at runtime (small code change), or
- Add a short developer script that prints all places referencing `siteConfig.siteName` to help ensure nothing is missed.

