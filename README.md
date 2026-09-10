# ZK Alpine Villas — Website + Admin Dashboard

Full source for the ZK Alpine Villas real-estate site: **Next.js 14 (App Router)**,
plain **JavaScript** (no TypeScript), **Tailwind CSS**, and **Supabase** (database,
auth, storage). Includes a custom admin dashboard to add/edit/delete villas,
farmhouses, facilities, gallery photos, FAQs, inquiries, a CEO profile section, and
site-wide settings (including hero and tour videos) — no code changes needed after setup.

## 1. Create your Supabase project

1. Go to https://supabase.com → New project.
2. Once it's ready, open **SQL Editor** → paste the entire contents of
   `supabase/schema.sql` → Run. This creates every table, security policy, the
   `media` storage bucket, and seeds facilities + FAQs with the content from your brief.
3. Open **Authentication → Users → Add user** and create your admin login
   (email + password). This is the only account that can sign in to `/admin`.
4. Open **Project Settings → API** and copy the **Project URL** and **anon public key**.

## 2. Configure the app

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Install & run

```bash
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin/login (sign in with the user you
  created in step 1.3)

## 4. Add your content

Everything on the public site is dynamic — sign in to `/admin/dashboard` and:

| Section on site        | Manage in admin at             |
|-------------------------|---------------------------------|
| Villas                  | `/admin/dashboard/villas`       |
| Farmhouses               | `/admin/dashboard/farmhouses`   |
| Facilities grid          | `/admin/dashboard/facilities`   |
| Project gallery          | `/admin/dashboard/gallery`      |
| FAQ section              | `/admin/dashboard/faqs`         |
| Hero heading/copy, advance & installment amounts, hero video, project tour video, NOC document, contact & WhatsApp details, Google Maps embed, CEO name/title/bio/photo | `/admin/dashboard/settings` |
| Booking / inquiry form submissions | `/admin/dashboard/inquiries` |

### Adding video
In **Site Settings** you can either:
- Upload a video file directly (stored in Supabase Storage), or
- Paste a YouTube or Vimeo URL

for both the **hero background video** and the separate **"Project Video Tour"**
section further down the homepage. Leave a field empty to fall back to an image.

## 5. Deploy

Push this folder to a GitHub repo and import it into **Vercel** (recommended — zero
config for Next.js). Add the two environment variables from step 2 in the Vercel
project settings, then deploy. No other setup is required; Supabase is already
fully hosted.

## Project structure

```
app/
  page.js               # public homepage — fetches all content from Supabase
  admin/login/           # admin sign-in
  admin/dashboard/        # protected admin dashboard (villas, farmhouses, facilities,
                           # gallery, faqs, inquiries, settings)
components/               # all public-site sections (Hero, Gallery, FAQ, CeoSection, etc.)
components/admin/         # generic CollectionManager powering every CRUD screen
lib/supabase/             # browser + server Supabase clients (plain JS)
lib/defaultSettings.js    # fallback settings object used before the DB row exists
supabase/schema.sql        # full DB schema, RLS policies, storage bucket, seed data
middleware.js              # protects /admin/* routes, redirects signed-out users
public/logo.png            # Babar & Brothers Builders & Developers logo (header/footer/login/favicon)
public/ceo-default.jpg     # fallback CEO photo, shown until one is uploaded in admin
```

## Notes

- Row Level Security is enabled on every table: the public can only **read**
  published content and **submit** inquiries; only your authenticated admin user
  can create/edit/delete anything.
- The admin dashboard is intentionally simple (one shared CRUD component) so it's
  easy to extend — add a new field to any `fields` array in
  `app/admin/dashboard/*/page.tsx` and it appears in the form automatically (you'll
  also need to add the matching column in Supabase).
- Update the contact person/phone/WhatsApp/address any time from **Site Settings**
  — the floating WhatsApp button, mobile contact bar, and footer all read from there.


## CEO section

A new "Leadership" section appears on the homepage (after "Why Choose Us") showing
the CEO's photo, name, title and a short bio. All four fields are edited from
**Site Settings → CEO Section** in the admin dashboard — upload a photo there and
it replaces the placeholder immediately. If you already ran `schema.sql` before this
was added, run the four `alter table` lines near the bottom of the file once to add
the new columns.

## Logo

The Babar & Brothers Builders & Developers logo is bundled at `public/logo.png` and
used in the site header, footer, admin sidebar, admin login screen, and browser
favicon. Replace that file (keep the same name) to swap it for an updated version.
