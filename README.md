# Portfolio — Muhammad Nur Azim Abdul Halim

Personal portfolio of a Software Engineer and Full Stack Developer. Single-page
site with dedicated detail pages for each project, an animated 3D hero, smooth
scrolling, a command palette, and a working contact form.

**Live:** <https://muhammadnurazim.vercel.app>

---

## Stack

| | |
|---|---|
| **Framework** | React 19, TypeScript, Vite 8 |
| **Styling** | Tailwind CSS v4, shadcn/ui, Radix primitives |
| **Motion** | Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll |
| **3D** | React Three Fiber, drei, Three.js |
| **Routing** | React Router v7 |
| **Email** | EmailJS (browser SDK) |
| **Lint** | Oxlint |

## Getting started

```bash
npm install
cp .env.example .env     # then fill in the EmailJS values below
npm run dev              # http://localhost:5173
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Oxlint |
| `npm run sitemap <url>` | Generate `sitemap.xml` + `robots.txt` for a domain |

## Environment

Create `.env` (gitignored) with the values from your
[EmailJS dashboard](https://dashboard.emailjs.com):

```ini
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

Without these the contact form still renders, but tells visitors to email
directly instead of failing silently.

> `VITE_*` variables are inlined into the client bundle at build time and are
> therefore public. That is expected for the browser SDK — never put the EmailJS
> **Private Key** here.

### Template variables

`emailjs.sendForm` posts each field's `name` attribute as a template variable,
so the EmailJS template and [`Contact.tsx`](src/components/sections/Contact.tsx)
must agree. Current contract:

```
{{name}}   {{email}}   {{title}}   {{message}}   {{time}}
```

`{{time}}` is stamped by the client on submit — EmailJS does not supply it.
A mismatch here fails quietly: the email still sends, just with blank fields.

## Project structure

```
src/
├── components/
│   ├── layout/      Navbar, Footer
│   ├── sections/    Hero, About, Experience, Projects, Skills, …
│   ├── shared/      Lightbox, CommandPalette, Loader, PointerFX, …
│   ├── three/       React Three Fiber hero scene
│   └── ui/          shadcn primitives
├── context/         LoadingContext, SmoothScrollProvider
├── data/            Content lives here — edit these, not the components
├── hooks/
├── pages/           Home, ProjectDetail, NotFound
└── utils/
```

**Adding a project:** append an entry to [`src/data/projects.ts`](src/data/projects.ts).
The card, detail page, gallery lightbox and sitemap all derive from it. Images
go in `src/assets/images/` as WebP.

## Deploying

The app uses `BrowserRouter`, so the host **must** rewrite unknown paths to
`index.html` — otherwise `/projects/vr-cinema` returns a 404 on direct load.
Configs for the common hosts are already committed:

| Host | File |
|---|---|
| Vercel | `vercel.json` |
| Netlify | `public/_redirects` |
| Apache / XAMPP / Hostinger | `public/.htaccess` |

### Checklist

1. Set the three `VITE_EMAILJS_*` variables in the host's environment settings —
   `.env` is gitignored and never uploaded.
2. Generate the sitemap for the real domain:
   ```bash
   npm run sitemap https://your-domain.com
   ```
3. Update every absolute URL in `index.html` (`canonical`, `og:url`, `og:image`,
   `twitter:image`) to the new domain. They cannot be relative — X/Twitter
   rejects relative image paths, and canonical has no relative form.
4. Add the domain to **EmailJS → Account → Security** if on a paid plan; the
   allowlist is not available on the free tier.
5. Turn off **Settings → Deployment Protection** on Vercel, or the site returns
   a Vercel login page to anyone who isn't signed in.

## Accessibility

- `prefers-reduced-motion` is honoured in both engines — CSS keyframes via a
  global override, and every Framer component via `MotionConfig`.
- The image lightbox traps focus, supports arrow keys and Escape, and restores
  focus to the thumbnail that opened it.
- The custom cursor only replaces the native one where it is actually drawn
  (fine pointer, ≥768px, motion allowed).

## Licence

Source is available for reference. Content, imagery and personal branding are
not licensed for reuse.
