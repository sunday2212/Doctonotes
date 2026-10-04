# Doc to Notes AI — PWA

Convert PDFs and images into structured medical notes with AI-powered OCR and touchup.
Built with **Vite + React + TypeScript + Tailwind (shadcn/ui)** as a fully client-side **PWA** (installable, offline-capable).

The app calls Groq / Hugging Face directly from the browser, so it deploys to **any static host**.

---

## Deploy in 2 minutes

> The build is configured with a **relative base path (`./`)**, so the same build works
> on GitHub Pages subpaths (`/repo-name/`) **and** root domains (Vercel/Netlify/Cloudflare/custom domains).

### ⭐ GitHub Pages (this repo)

1. Push your code to `main`.
2. In your repo go to **Settings → Pages → Source** and select **"GitHub Actions"**
   (⚠️ NOT "Deploy from a branch" — serving raw source only shows this README).
3. The included workflow `.github/workflows/deploy.yml` builds `frontend/` and publishes it.
4. Your app will be live at `https://<username>.github.io/<repo-name>/`.

**Optional secrets** (Settings → Secrets and variables → Actions) — the build works without them, but they enable features out of the box:

| Secret name | Purpose |
|---|---|
| `API_KEY` / `API_KEY_X` | Groq API keys (fallback pool) |
| `TINY_API` | TinyMCE editor key |
| `HUGGINGFACE_API_TOKEN` | Voice / TTS feature |

### ☁️ Cloudflare Pages (recommended — see below)

- **Framework preset:** Vite
- **Root directory:** `frontend`
- **Build command:** `npm run build`
- **Build output directory:** `dist`

### ▲ Vercel

Import the repo — the included `vercel.json` builds from `frontend/` automatically.
(Alternatively set **Root Directory: `frontend`** in project settings.)

### 🟢 Netlify

Import the repo — the included `netlify.toml` sets base `frontend`, build `npm run build`, publish `dist` automatically.

---

## Where should you deploy?

Your app is a static PWA, so it works on all of them. Recommendation:

1. **Cloudflare Pages** or **Vercel** — ⭐ best choice: root domain (no subpath headaches), free HTTPS, global CDN, auto-deploy on push, excellent PWA support, and serverless functions available if you later want the `/api/tts/token` backend endpoint.
2. **GitHub Pages** — perfectly fine after this fix; served from a `/repo-name/` subpath, static only.

---

## Local development

```bash
cd frontend
npm ci
npm run dev        # dev server on :8080
npm run build      # production build → frontend/dist
npm run preview    # preview the production build
```

## PWA notes

- `manifest.json` and `sw.js` use relative paths so install/offline work under any base path.
- The service worker cache is versioned (`doc2notes-v5`); bump it in `frontend/public/sw.js` if you ever change caching behavior.
