# ⭐️ Portfolio Website V.3

Hey! Welcome to the repo of the third iteration of my personal website. Thanks for taking the time to look into my work!
I appreciate it :)

**Live:** https://www.justin-abuyuan.xyz

## 🦾 Tech Stack

My portfolio integrates the headless CMS **Sanity** to update portfolio data without redeploying.
Content edits fire a webhook at `/api/revalidate`, which invalidates the matching Next.js cache tag
so the affected section re-renders on the next request.

- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Sanity (headless CMS, Studio mounted at `/studio`)
- three.js / React Three Fiber for the background
- Deployed on Vercel

## 🛠️ Running locally

```bash
npm install
npm run dev
```

You'll need a `.env.local` with:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for metadata, OG tags, robots and sitemap |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (e.g. `production`) |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the Sanity webhook signature |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key for the contact form |
| `NEXT_PUBLIC_FORM` | Formspree form ID |

## ⏭️ Going Forward

I'm pretty sure this won't be the last iteration. Follow me to keep up with my endless series of portfolio websites.
