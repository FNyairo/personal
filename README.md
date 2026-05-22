# Franklin Nyairo — Personal Website

A production-ready personal website for Franklin Nyairo (Instructional Designer, EdTech Researcher, Maritime Education Project Leader at Novia UAS, PhD Candidate at University of Helsinki).

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Supabase (PostgreSQL + Storage) · Prisma ORM · TipTap editor · JWT authentication · react-simple-maps

---

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/franklin-nyairo-website.git
cd franklin-nyairo-website
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → Create a new project.
2. In **SQL Editor**, run Prisma migrations (step 5 below) instead of manual SQL.
3. In **Storage** → Create a new bucket called `documents`. Set it to **Public**.
   - Under Policies, add: `SELECT` for `anon` role (public read).
4. Copy your project credentials from **Settings → API**.

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

JWT_SECRET="generate-with: openssl rand -base64 64"

# Generate password hash (run this once in Node):
# node -e "const b=require('bcryptjs'); b.hash('YourAdminPassword',12).then(h=>console.log(h))"
ADMIN_EMAIL="franklin.nyairo@novia.fi"
ADMIN_PASSWORD_HASH="$2b$12$..."
ADMIN_SEED_PASSWORD="YourAdminPassword"   # only for seeding

NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/franklin-nyairo"
NEXT_PUBLIC_SITE_URL="https://franklinnyairo.com"
```

### 4. Set Up the Database

```bash
# Generate Prisma client
npm run db:generate

# Apply migrations (creates all tables in Supabase)
npm run db:migrate

# Seed with real content (admin user, stats, projects, blog posts)
npm run db:seed
```

### 5. Add Placeholder Resume PDF

Place a PDF at `public/resume.pdf`. Any placeholder PDF works — replace later with your actual CV.

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)  
Login with the email and password you set in `.env.local`.

---

## Deployment to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Franklin Nyairo website"
git remote add origin https://github.com/yourusername/franklin-nyairo-website.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub.
2. Select `franklin-nyairo-website`.
3. Framework: **Next.js** (auto-detected).
4. Add all environment variables from `.env.local` (copy each key/value).
5. Click **Deploy**.

### Step 3 — Post-Deploy: Run Migrations on Supabase

Vercel doesn't run `prisma migrate` automatically. Your Supabase DB is already migrated from step 4 above, so this step is only needed for future schema changes. For those, run locally with the production `DATABASE_URL`.

### Step 4 — Custom Domain

1. In Vercel → Project → **Settings → Domains** → Add your domain (e.g. `franklinnyairo.com`).
2. In your DNS provider, add:
   - `A` record: `@` → `76.76.21.21` (Vercel IP)
   - `CNAME` record: `www` → `cname.vercel-dns.com`
3. Wait ~5 minutes for propagation. Vercel auto-provisions an SSL certificate.

---

## Project Structure

```
franklin-nyairo-website/
├── app/
│   ├── layout.tsx              # Root layout, fonts, ThemeProvider
│   ├── globals.css             # Tailwind + custom design tokens
│   ├── page.tsx                # Home page (Hero, Stats, Recent Posts)
│   ├── about/page.tsx          # Meet Me — story, flip cards, values
│   ├── research/               # Research & Publications
│   │   ├── page.tsx
│   │   └── ResearchFilter.tsx  # Client filter component
│   ├── resume/page.tsx         # Styled HTML CV — timeline, skills, pubs
│   ├── blog/
│   │   ├── page.tsx            # Blog index with search + pagination
│   │   ├── BlogList.tsx        # Client search/paginate component
│   │   └── [slug]/             # Individual post (TipTap renderer)
│   ├── discuss/                # Collaboration Corner
│   │   ├── page.tsx
│   │   ├── ThreadForm.tsx
│   │   └── [id]/               # Thread detail + reply form
│   ├── book/page.tsx           # Calendly embed
│   ├── contact/page.tsx        # Contact form
│   ├── admin/                  # Protected admin dashboard
│   │   ├── page.tsx            # Overview + visitor map + stats editor
│   │   ├── login/page.tsx
│   │   ├── blog/               # Blog CRUD + TipTap editor
│   │   ├── AdminLogout.tsx
│   │   └── VisitorMap.tsx      # react-simple-maps world map
│   ├── api/
│   │   ├── auth/{login,logout}/ # JWT auth routes
│   │   ├── blog/               # CRUD (admin protected)
│   │   ├── contact/            # Store contact messages
│   │   ├── discuss/            # Thread + comment creation
│   │   ├── stats/              # Stats CRUD
│   │   └── log-visit/          # IP + geo visitor logging
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── Navigation.tsx          # Sticky nav, mobile menu, dark toggle
│   ├── Footer.tsx              # Social links, quick links, contact
│   ├── Hero.tsx                # Particle canvas + TypeAnimation
│   ├── StatsCounter.tsx        # Animated count-up from DB
│   ├── BlogCard.tsx            # Post card with gradient overlay
│   ├── ProjectCard.tsx         # Project card with status badge
│   ├── TipTapEditor.tsx        # Rich text editor (admin)
│   └── ThemeProvider.tsx       # next-themes wrapper
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── auth.ts                 # JWT sign/verify + cookie helpers
│   ├── supabase.ts             # Supabase client + storage upload
│   └── utils.ts                # formatDate, slugify, getGeoLocation, etc.
├── middleware.ts               # Auth guard + visitor IP capture
├── prisma/
│   ├── schema.prisma           # All DB models
│   └── seed.ts                 # Real content seed (projects, posts, stats)
├── public/
│   └── resume.pdf              # Placeholder — replace with actual CV
├── tailwind.config.ts          # Custom colors (navy, electric, teal)
├── next.config.js
├── tsconfig.json
└── .env.local.example
```

---

## Admin Dashboard Usage

| Section | URL | Notes |
|---|---|---|
| Login | `/admin/login` | Email + bcrypt password |
| Overview | `/admin` | Counts, recent messages, visitor map |
| Blog | `/admin/blog` | List, create (TipTap), delete posts |
| Visitor Map | `/admin` | react-simple-maps with IP geolocation |
| Stats Editor | `/admin` | Edit publications/projects/talks/citations counts |

---

## Customisation Notes

- **Calendly:** Replace `NEXT_PUBLIC_CALENDLY_URL` with your real Calendly link.
- **Google Scholar:** Update the link in `components/Footer.tsx` with your real profile URL.
- **Stats:** Update counts via the Admin dashboard or directly in the `stats` table.
- **Resume PDF:** Replace `public/resume.pdf` with your actual CV.
- **Profile photo:** The site pulls from `ea-tel.eu`. To use a local photo, place it at `public/franklin.jpg` and update the `src` in `app/about/page.tsx`.

---

## Security Checklist

- [x] JWT stored in HTTP-only, Secure, SameSite=Strict cookie
- [x] bcrypt password comparison (cost factor 12)
- [x] Admin routes protected by middleware redirect
- [x] API routes verify JWT on all write operations
- [x] In-memory rate limiter on login (10 attempts / 15 min)
- [x] File upload: type and size validation (PDF/DOCX ≤ 10MB)
- [x] Prisma parameterised queries (no SQL injection)
- [x] Visitor logging is async / non-blocking

---

## Content to Update Before Going Live

1. Replace all placeholder LinkedIn/Scholar/ResearchGate URLs with real profile links.
2. Replace `public/resume.pdf` with your actual CV.
3. Set your real Calendly URL in `.env.local`.
4. Update `NEXT_PUBLIC_SITE_URL` to your actual domain.
5. Add real OG image at `public/og-image.png` (1200×630px).
6. Update stat counts in the Admin dashboard after deploy.

---

*Built with Next.js 14, Tailwind CSS, Supabase, and Framer Motion.*
