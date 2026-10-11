# shamilprematunga.me

Personal portfolio website for **Shamil Dilshan Prematunga** — Senior Software Engineer.

A fast, self-contained static site. No build step, no framework, no dependencies to install — just HTML, CSS and JavaScript. Host it anywhere that serves static files.

## Structure

```
MySite/
├── index.html          # the whole page (all sections)
├── styles.css          # dark theme + layout
├── main.js             # nav, filters, scroll animations, count-up stats
├── CNAME               # custom domain for GitHub Pages (shamilprematunga.me)
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── favicon.svg
    ├── og-image.svg            # social share preview card
    └── Shamil_Prematunga_CV.pdf  # linked by the "Download CV" button
```

## Before you publish: fill in 2 links

These are placeholders in `index.html` (search for `TODO`). Replace them with your real URLs:

1. **YouTube (Tekcerpts)**, currently `https://www.youtube.com/@Tekcerpts` (Writing section).
2. **Medium**, currently `https://medium.com/@shamildilshan.b` (Writing section).

Your LinkedIn link is already set to your real profile. Everything else (name, roles, projects, research, email) is filled in.

## Preview locally

```bash
cd MySite
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to shamilprematunga.me

### Option A — GitHub Pages (free, uses the included CNAME)

1. Create a public repo (e.g. `shamilprematunga.me`) and push these files to the `main` branch.
2. In the repo: **Settings → Pages → Source → Deploy from branch → `main` / `root`**.
3. The included `CNAME` file sets the custom domain automatically.
4. At your domain registrar, add DNS records for `shamilprematunga.me`:
   - Four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` for `www` → `sdpcodes.github.io` (your GitHub Pages host)
5. Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is issued.

### Option B — Netlify / Cloudflare Pages / Vercel (drag-and-drop)

1. Create a new project and drag the `MySite` folder in (no build command, publish directory = root).
2. Add `shamilprematunga.me` as a custom domain in the dashboard.
3. Point your domain's DNS to the host as instructed, and HTTPS is handled for you.

## Updating content

Everything lives in `index.html`. Add a project by copying one `<article class="project" ...>` block; add an experience entry by copying a `<div class="tl">` block. To add a new project filter category, add a `<button class="filter" data-filter="yourcat">` and tag the project with `data-cat="yourcat"`.

Colors and fonts are CSS variables at the top of `styles.css` (`:root { ... }`).
