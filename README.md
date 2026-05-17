# Smilographer — Video Editor Portfolio

A dark, high-contrast portfolio website for professional video editing work. Features eye-catching animations, category-based showcases, daily latest uploads, a **public portfolio** side, and a **client portal** for private deliverables.

**Contact:** smilographer@gmail.com · +918777819463

---

## Features

- **Dark cinematic theme** with pink/cyan/gold accents and film-grain overlay
- **Framer Motion animations** — hero, cards, scroll reveals, modal player
- **Edit categories:** Documentary, Gaming Montage, Wedding, Teasers, Commercial, Music, Other
- **Latest uploads section** — highlight daily/new edits
- **Featured work** — hand-picked showcase pieces
- **Client portal** (`/client`) — password-protected private videos
- **Admin panel** (`/admin`) — add/delete videos (best used locally; see maintenance below)
- **Contact section** — email, phone, inquiry form

---

## Quick Start (Local)

```bash
cd "g:\Portfolio Video Editor"
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-video-editor.git
git push -u origin main
```

### Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your GitHub repository
4. Framework preset: **Next.js** (auto-detected)
5. Click **Deploy**

### Step 3 — Environment Variables

In Vercel → Project → **Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `ADMIN_PASSWORD` | Your secure admin password |
| `CLIENT_ACCESS_CODE` | Access code you share with all clients (e.g. `smilo2026`) |

Redeploy after adding variables.

Your site will be live at `https://your-project.vercel.app`.

---

## How to Maintain Your Portfolio

### Daily upload workflow (recommended)

The easiest and most reliable way on Vercel is to edit `data/videos.json`:

1. Upload your video to **YouTube** (unlisted or public)
2. Copy the **video ID** from the URL: `youtube.com/watch?v=**VIDEO_ID**`
3. Open `data/videos.json` and add a new entry at the **top**:

```json
{
  "id": "7",
  "title": "My New Edit Title",
  "description": "Short description of the project.",
  "category": "gaming",
  "audience": "public",
  "youtubeId": "YOUR_YOUTUBE_ID",
  "featured": false,
  "isLatest": true,
  "uploadedAt": "2026-05-17"
}
```

4. Set `isLatest: false` on older “latest” entries (keep 3–6 as latest)
5. Commit and push — Vercel auto-redeploys in ~1 minute

**Categories:** `documentary` | `gaming` | `wedding` | `teaser` | `commercial` | `music` | `other`

**Audience:** `public` (portfolio) or `client` (client portal only)

### Client-only videos

```json
{
  "id": "8",
  "title": "Client Project — Draft v2",
  "description": "Review cut for Brand X.",
  "category": "commercial",
  "audience": "client",
  "clientName": "Brand X Agency",
  "youtubeId": "YOUR_YOUTUBE_ID",
  "featured": false,
  "isLatest": true,
  "uploadedAt": "2026-05-17"
}
```

Share the client portal URL (`/client`), your access code (`CLIENT_ACCESS_CODE`), and ensure their Gmail is listed in `data/clients.json`. Each client only sees videos tagged with their `clientId`.

### Register a new client

Edit `data/clients.json`:

```json
{
  "id": "unique-client-id",
  "name": "Client Display Name",
  "email": "client@gmail.com"
}
```

Then assign client videos in `data/videos.json` with `"audience": "client"` and `"clientId": "unique-client-id"`.

### Using the Admin panel

- Local: `npm run dev` → visit `/admin` → login with `ADMIN_PASSWORD` from `.env.local`
- **Note:** On Vercel, file writes from the admin API do not persist (serverless filesystem). Use **JSON editing + Git push** for production updates, or run admin locally and commit `data/videos.json`.

### Replace placeholder videos

Sample entries use a placeholder YouTube ID. Replace every `youtubeId` with your real video IDs.

### Update contact info

Edit `src/components/Contact.tsx` if your email or phone changes.

### Customize branding

- Site name: `src/components/Navigation.tsx`, `Footer.tsx`, `layout.tsx` metadata
- Colors: `tailwind.config.ts` and `src/app/globals.css`

---

## Project Structure

```
├── data/videos.json          ← Main content (edit this for uploads)
├── src/
│   ├── app/
│   │   ├── page.tsx          ← Public portfolio
│   │   ├── client/page.tsx   ← Client portal
│   │   ├── admin/page.tsx    ← Admin panel
│   │   └── api/videos/       ← Video CRUD API
│   ├── components/           ← UI sections
│   ├── lib/videos.ts         ← Data helpers
│   └── types/video.ts        ← Types & labels
└── README.md
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/) hosting

---

Built for **Smilographer** — crafting visual stories that move people.
