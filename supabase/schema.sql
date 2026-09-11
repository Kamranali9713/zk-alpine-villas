-- ZK Alpine Villas — Supabase schema
-- Run this whole file once in the Supabase SQL editor for a new project.

create extension if not exists "uuid-ossp";

-- ---------- PROPERTIES (villas + farmhouses share a shape) ----------
create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  kind text not null check (kind in ('villa', 'farmhouse')),
  title text not null,
  size text,
  price text,
  description text,
  image_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- FACILITIES ----------
create table if not exists facilities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  icon text default 'sparkle',
  sort_order int not null default 0
);

-- ---------- GALLERY ----------
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  category text not null default 'Project',
  image_url text not null,
  caption text,
  sort_order int not null default 0
);

-- ---------- FAQS ----------
create table if not exists faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- ---------- INQUIRIES (booking / contact form submissions) ----------
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  email text,
  property_type text,
  message text,
  created_at timestamptz not null default now()
);

-- ---------- SITE SETTINGS (single row, id = 1) ----------
create table if not exists site_settings (
  id int primary key default 1,
  hero_heading text not null default 'Your Dream Home & Farmhouse in Quetta',
  hero_subheading text not null default 'Discover ZK Alpine Villas on Noqasar Road — an NOC-approved project offering villas and farmhouses with easy payment options, modern facilities and immediate possession.',
  hero_video_url text,
  hero_image_url text,
  tour_video_url text,
  advance_payment text not null default 'PKR 100,000',
  monthly_installment text not null default 'PKR 10,000',
  contact_person text not null default 'Haji Muhammad Babar Durrani',
  contact_phone_1 text not null default '0314-2188311',
  contact_phone_2 text default '0333-7878708',
  office_address text not null default 'Main Spini Road, Quetta',
  whatsapp_number text not null default '923142188311',
  map_embed_url text,
  noc_document_url text,
  ceo_name text default 'Haji Muhammad Babar Durrani',
  ceo_title text default 'Chief Executive Officer',
  ceo_bio text default 'Leading ZK Alpine Villas with a focus on transparent dealings, on-time delivery and long-term community value for every family that invests here.',
  ceo_image_url text,
  constraint single_row check (id = 1)
);

-- If you already ran this file before the CEO section existed, run just this
-- block once to add the new columns to your existing project:
-- alter table site_settings add column if not exists ceo_name text default 'Haji Muhammad Babar Durrani';
-- alter table site_settings add column if not exists ceo_title text default 'Chief Executive Officer';
-- alter table site_settings add column if not exists ceo_bio text;
-- alter table site_settings add column if not exists ceo_image_url text;

insert into site_settings (id) values (1) on conflict (id) do nothing;

-- ---------- ROW LEVEL SECURITY ----------
alter table properties enable row level security;
alter table facilities enable row level security;
alter table gallery enable row level security;
alter table faqs enable row level security;
alter table inquiries enable row level security;
alter table site_settings enable row level security;

-- Public (anon) can read published content
create policy "public read properties" on properties for select using (true);
create policy "public read facilities" on facilities for select using (true);
create policy "public read gallery" on gallery for select using (true);
create policy "public read faqs" on faqs for select using (true);
create policy "public read site_settings" on site_settings for select using (true);

-- Public (anon) can only INSERT inquiries, never read/edit/delete them
create policy "public insert inquiries" on inquiries for insert with check (true);

-- Authenticated (logged-in admin) can do everything
create policy "admin manage properties" on properties for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage facilities" on facilities for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage gallery" on gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage faqs" on faqs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage site_settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin read inquiries" on inquiries for select using (auth.role() = 'authenticated');
create policy "admin delete inquiries" on inquiries for delete using (auth.role() = 'authenticated');

-- ---------- STORAGE (create a public bucket called "media" for images/videos) ----------
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ---------- SEED DATA (safe to skip / edit) ----------
insert into facilities (name, description, icon, sort_order) values
  ('Gas', 'Uninterrupted gas connectivity across the project.', 'flame', 1),
  ('Electricity', 'Reliable grid electricity to every plot.', 'bolt', 2),
  ('Water', 'Filtered water supply for every household.', 'droplet', 3),
  ('Security', '24/7 gated security and boundary patrols.', 'shield', 4),
  ('School', 'Nearby schooling for growing families.', 'book', 5),
  ('Mosque', 'A community mosque within the project.', 'moon', 6),
  ('Hospital', 'Quick access to medical care.', 'cross', 7),
  ('Park', 'Green, landscaped community parks.', 'tree', 8)
on conflict do nothing;

insert into faqs (question, answer, sort_order) values
  ('Where is ZK Alpine Villas located?', 'ZK Alpine Villas is located on Noqasar Road, Quetta.', 1),
  ('What is the advance payment?', 'The advertised advance payment is PKR 100,000.', 2),
  ('What is the monthly installment?', 'The advertised monthly installment is PKR 10,000.', 3),
  ('Are villas available?', 'Villa options are available according to project availability.', 4),
  ('Are farmhouses available?', 'Farmhouse options are available according to project availability.', 5),
  ('How can I book a property?', 'Customers can contact the sales team through phone, WhatsApp or the website inquiry form.', 6)
on conflict do nothing;













-- below is for move to other account 

-- -- ============================================================
-- -- ZK ALPINE VILLAS
-- -- Complete Supabase Database Schema
-- --
-- -- Run this entire file in a NEW Supabase project's
-- -- SQL Editor to create the complete project database.
-- --
-- -- Safe to run more than once.
-- -- ============================================================


-- -- ============================================================
-- -- 1. EXTENSIONS
-- -- ============================================================

-- create extension if not exists "uuid-ossp";


-- -- ============================================================
-- -- 2. PROPERTIES
-- -- Villas + farmhouses
-- -- ============================================================

-- create table if not exists public.properties (
--   id uuid primary key default uuid_generate_v4(),

--   kind text not null
--     check (kind in ('villa', 'farmhouse')),

--   title text not null,
--   size text,
--   price text,
--   description text,
--   image_url text,

--   is_active boolean not null default true,
--   sort_order integer not null default 0,

--   created_at timestamptz not null default now()
-- );


-- -- ============================================================
-- -- 3. FACILITIES
-- -- ============================================================

-- create table if not exists public.facilities (
--   id uuid primary key default uuid_generate_v4(),

--   name text not null,
--   description text,

--   icon text default 'sparkle',
--   sort_order integer not null default 0
-- );


-- -- ============================================================
-- -- 4. GALLERY
-- -- ============================================================

-- create table if not exists public.gallery (
--   id uuid primary key default uuid_generate_v4(),

--   category text not null default 'Project',
--   image_url text not null,
--   caption text,

--   sort_order integer not null default 0
-- );


-- -- ============================================================
-- -- 5. FAQS
-- -- ============================================================

-- create table if not exists public.faqs (
--   id uuid primary key default uuid_generate_v4(),

--   question text not null,
--   answer text not null,

--   sort_order integer not null default 0
-- );


-- -- ============================================================
-- -- 6. INQUIRIES
-- -- Public website contact / booking submissions
-- -- ============================================================

-- create table if not exists public.inquiries (
--   id uuid primary key default uuid_generate_v4(),

--   full_name text not null,
--   phone text not null,
--   email text,

--   property_type text,
--   message text,

--   created_at timestamptz not null default now()
-- );


-- -- ============================================================
-- -- 7. SITE SETTINGS
-- -- Single row only: id = 1
-- -- ============================================================

-- create table if not exists public.site_settings (
--   id integer primary key default 1,

--   hero_heading text not null
--     default 'Your Dream Home & Farmhouse in Quetta',

--   hero_subheading text not null
--     default 'Discover ZK Alpine Villas on Noqasar Road — an NOC-approved project offering villas and farmhouses with easy payment options, modern facilities and immediate possession.',

--   hero_video_url text,
--   hero_image_url text,
--   tour_video_url text,

--   advance_payment text not null
--     default 'PKR 100,000',

--   monthly_installment text not null
--     default 'PKR 10,000',

--   contact_person text not null
--     default 'Haji Muhammad Babar Durrani',

--   contact_phone_1 text not null
--     default '0333-7878708',

--   contact_phone_2 text
--     default '0314-2188311',

--   contact_email text
--     default 'hajibabar337@gmail.com',

--   office_address text not null
--     default 'Main Spini Road, Quetta',

--   whatsapp_number text not null
--     default '923337878708',

--   map_embed_url text,
--   noc_document_url text,

--   ceo_name text
--     default 'Haji Muhammad Babar Durrani',

--   ceo_title text
--     default 'Chief Executive Officer',

--   ceo_bio text
--     default 'Leading ZK Alpine Villas with a focus on transparent dealings, on-time delivery and long-term community value for every family that invests here.',

--   ceo_image_url text,

--   constraint site_settings_single_row
--     check (id = 1)
-- );


-- -- ============================================================
-- -- 8. ADD NEW COLUMNS TO EXISTING INSTALLATIONS
-- --
-- -- These make the schema migration-friendly if the database
-- -- already existed before some fields were added.
-- -- ============================================================

-- alter table public.site_settings
--   add column if not exists contact_email text
--     default 'hajibabar337@gmail.com';

-- alter table public.site_settings
--   add column if not exists ceo_name text
--     default 'Haji Muhammad Babar Durrani';

-- alter table public.site_settings
--   add column if not exists ceo_title text
--     default 'Chief Executive Officer';

-- alter table public.site_settings
--   add column if not exists ceo_bio text
--     default 'Leading ZK Alpine Villas with a focus on transparent dealings, on-time delivery and long-term community value for every family that invests here.';

-- alter table public.site_settings
--   add column if not exists ceo_image_url text;


-- -- ============================================================
-- -- 9. SOCIAL LINKS
-- -- ============================================================

-- create table if not exists public.social_links (
--   id uuid primary key default uuid_generate_v4(),

--   platform text not null default 'Facebook',
--   label text,
--   url text not null,

--   sort_order integer not null default 0
-- );


-- -- ============================================================
-- -- 10. ENSURE SITE SETTINGS ROW EXISTS
-- -- ============================================================

-- insert into public.site_settings (id)
-- values (1)
-- on conflict (id) do nothing;


-- -- ============================================================
-- -- 11. ROW LEVEL SECURITY
-- -- ============================================================

-- alter table public.properties enable row level security;
-- alter table public.facilities enable row level security;
-- alter table public.gallery enable row level security;
-- alter table public.faqs enable row level security;
-- alter table public.inquiries enable row level security;
-- alter table public.site_settings enable row level security;
-- alter table public.social_links enable row level security;


-- -- ============================================================
-- -- 12. RLS POLICIES
-- --
-- -- Drop first so this entire file can be safely re-run.
-- -- ============================================================


-- -- ----------------------------
-- -- PROPERTIES
-- -- ----------------------------

-- drop policy if exists "public read properties"
-- on public.properties;

-- drop policy if exists "admin manage properties"
-- on public.properties;

-- create policy "public read properties"
-- on public.properties
-- for select
-- to anon, authenticated
-- using (true);

-- create policy "admin manage properties"
-- on public.properties
-- for all
-- to authenticated
-- using (true)
-- with check (true);


-- -- ----------------------------
-- -- FACILITIES
-- -- ----------------------------

-- drop policy if exists "public read facilities"
-- on public.facilities;

-- drop policy if exists "admin manage facilities"
-- on public.facilities;

-- create policy "public read facilities"
-- on public.facilities
-- for select
-- to anon, authenticated
-- using (true);

-- create policy "admin manage facilities"
-- on public.facilities
-- for all
-- to authenticated
-- using (true)
-- with check (true);


-- -- ----------------------------
-- -- GALLERY
-- -- ----------------------------

-- drop policy if exists "public read gallery"
-- on public.gallery;

-- drop policy if exists "admin manage gallery"
-- on public.gallery;

-- create policy "public read gallery"
-- on public.gallery
-- for select
-- to anon, authenticated
-- using (true);

-- create policy "admin manage gallery"
-- on public.gallery
-- for all
-- to authenticated
-- using (true)
-- with check (true);


-- -- ----------------------------
-- -- FAQS
-- -- ----------------------------

-- drop policy if exists "public read faqs"
-- on public.faqs;

-- drop policy if exists "admin manage faqs"
-- on public.faqs;

-- create policy "public read faqs"
-- on public.faqs
-- for select
-- to anon, authenticated
-- using (true);

-- create policy "admin manage faqs"
-- on public.faqs
-- for all
-- to authenticated
-- using (true)
-- with check (true);


-- -- ----------------------------
-- -- SITE SETTINGS
-- -- ----------------------------

-- drop policy if exists "public read site_settings"
-- on public.site_settings;

-- drop policy if exists "admin manage site_settings"
-- on public.site_settings;

-- create policy "public read site_settings"
-- on public.site_settings
-- for select
-- to anon, authenticated
-- using (true);

-- create policy "admin manage site_settings"
-- on public.site_settings
-- for all
-- to authenticated
-- using (true)
-- with check (true);


-- -- ----------------------------
-- -- SOCIAL LINKS
-- -- ----------------------------

-- drop policy if exists "public read social_links"
-- on public.social_links;

-- drop policy if exists "admin manage social_links"
-- on public.social_links;

-- create policy "public read social_links"
-- on public.social_links
-- for select
-- to anon, authenticated
-- using (true);

-- create policy "admin manage social_links"
-- on public.social_links
-- for all
-- to authenticated
-- using (true)
-- with check (true);


-- -- ----------------------------
-- -- INQUIRIES
-- -- ----------------------------

-- drop policy if exists "public insert inquiries"
-- on public.inquiries;

-- drop policy if exists "admin read inquiries"
-- on public.inquiries;

-- drop policy if exists "admin delete inquiries"
-- on public.inquiries;

-- create policy "public insert inquiries"
-- on public.inquiries
-- for insert
-- to anon, authenticated
-- with check (true);

-- create policy "admin read inquiries"
-- on public.inquiries
-- for select
-- to authenticated
-- using (true);

-- create policy "admin delete inquiries"
-- on public.inquiries
-- for delete
-- to authenticated
-- using (true);


-- -- ============================================================
-- -- 13. STORAGE
-- -- ============================================================

-- insert into storage.buckets (
--   id,
--   name,
--   public
-- )
-- values (
--   'media',
--   'media',
--   true
-- )
-- on conflict (id) do update
-- set public = true;


-- -- ============================================================
-- -- 14. STORAGE RLS POLICIES
-- -- ============================================================

-- drop policy if exists "public read media"
-- on storage.objects;

-- drop policy if exists "admin upload media"
-- on storage.objects;

-- drop policy if exists "admin update media"
-- on storage.objects;

-- drop policy if exists "admin delete media"
-- on storage.objects;


-- -- Public can view files in media bucket
-- create policy "public read media"
-- on storage.objects
-- for select
-- to anon, authenticated
-- using (
--   bucket_id = 'media'
-- );


-- -- Authenticated admin can upload
-- create policy "admin upload media"
-- on storage.objects
-- for insert
-- to authenticated
-- with check (
--   bucket_id = 'media'
-- );


-- -- Authenticated admin can update
-- create policy "admin update media"
-- on storage.objects
-- for update
-- to authenticated
-- using (
--   bucket_id = 'media'
-- )
-- with check (
--   bucket_id = 'media'
-- );


-- -- Authenticated admin can delete
-- create policy "admin delete media"
-- on storage.objects
-- for delete
-- to authenticated
-- using (
--   bucket_id = 'media'
-- );


-- -- ============================================================
-- -- 15. SEED FACILITIES
-- --
-- -- Uses NOT EXISTS so the same facilities are not duplicated
-- -- when this schema is executed multiple times.
-- -- ============================================================

-- insert into public.facilities (
--   name,
--   description,
--   icon,
--   sort_order
-- )
-- select
--   seed.name,
--   seed.description,
--   seed.icon,
--   seed.sort_order
-- from (
--   values
--     (
--       'Gas',
--       'Uninterrupted gas connectivity across the project.',
--       'flame',
--       1
--     ),
--     (
--       'Electricity',
--       'Reliable grid electricity to every plot.',
--       'bolt',
--       2
--     ),
--     (
--       'Water',
--       'Filtered water supply for every household.',
--       'droplet',
--       3
--     ),
--     (
--       'Security',
--       '24/7 gated security and boundary patrols.',
--       'shield',
--       4
--     ),
--     (
--       'School',
--       'Nearby schooling for growing families.',
--       'book',
--       5
--     ),
--     (
--       'Mosque',
--       'A community mosque within the project.',
--       'moon',
--       6
--     ),
--     (
--       'Hospital',
--       'Quick access to medical care.',
--       'cross',
--       7
--     ),
--     (
--       'Park',
--       'Green, landscaped community parks.',
--       'tree',
--       8
--     )
-- ) as seed(name, description, icon, sort_order)
-- where not exists (
--   select 1
--   from public.facilities f
--   where f.name = seed.name
-- );


-- -- ============================================================
-- -- 16. SEED FAQS
-- -- ============================================================

-- insert into public.faqs (
--   question,
--   answer,
--   sort_order
-- )
-- select
--   seed.question,
--   seed.answer,
--   seed.sort_order
-- from (
--   values
--     (
--       'Where is ZK Alpine Villas located?',
--       'ZK Alpine Villas is located on Noqasar Road, Quetta.',
--       1
--     ),
--     (
--       'What is the advance payment?',
--       'The advertised advance payment is PKR 100,000.',
--       2
--     ),
--     (
--       'What is the monthly installment?',
--       'The advertised monthly installment is PKR 10,000.',
--       3
--     ),
--     (
--       'Are villas available?',
--       'Villa options are available according to project availability.',
--       4
--     ),
--     (
--       'Are farmhouses available?',
--       'Farmhouse options are available according to project availability.',
--       5
--     ),
--     (
--       'How can I book a property?',
--       'Customers can contact the sales team through phone, WhatsApp or the website inquiry form.',
--       6
--     )
-- ) as seed(question, answer, sort_order)
-- where not exists (
--   select 1
--   from public.faqs f
--   where f.question = seed.question
-- );


-- -- ============================================================
-- -- 17. OPTIONAL DATA CORRECTION
-- --
-- -- Your earlier SQL changed Noqasar -> Nohisar.
-- -- Keep this commented unless Nohisar is the correct spelling.
-- -- ============================================================

-- -- update public.site_settings
-- -- set
-- --   hero_subheading = replace(hero_subheading, 'Noqasar', 'Nohisar'),
-- --   office_address = replace(office_address, 'Noqasar', 'Nohisar');

-- -- update public.faqs
-- -- set answer = replace(answer, 'Noqasar', 'Nohisar');


-- -- ============================================================
-- -- 18. DEFAULT SOCIAL LINK (OPTIONAL)
-- --
-- -- No real URL is inserted here because the actual social
-- -- media URL was not provided.
-- -- ============================================================

-- -- Example:
-- --
-- -- insert into public.social_links (
-- --   platform,
-- --   label,
-- --   url,
-- --   sort_order
-- -- )
-- -- values (
-- --   'Facebook',
-- --   'Facebook',
-- --   'https://facebook.com/your-page',
-- --   1
-- -- );


-- -- ============================================================
-- -- 19. OPTIONAL INDEXES
-- -- ============================================================

-- create index if not exists properties_kind_idx
--   on public.properties(kind);

-- create index if not exists properties_active_sort_idx
--   on public.properties(is_active, sort_order);

-- create index if not exists facilities_sort_idx
--   on public.facilities(sort_order);

-- create index if not exists gallery_category_sort_idx
--   on public.gallery(category, sort_order);

-- create index if not exists faqs_sort_idx
--   on public.faqs(sort_order);

-- create index if not exists inquiries_created_at_idx
--   on public.inquiries(created_at desc);

-- create index if not exists social_links_sort_idx
--   on public.social_links(sort_order);


-- -- ============================================================
-- -- DONE
-- -- ============================================================
-- --
-- -- Created:
-- --
-- --   properties
-- --   facilities
-- --   gallery
-- --   faqs
-- --   inquiries
-- --   site_settings
-- --   social_links
-- --
-- -- Also created:
-- --
-- --   media storage bucket
-- --   RLS policies
-- --   admin/public access rules
-- --   default site settings
-- --   default facilities
-- --   default FAQs
-- --   useful indexes
-- --
-- -- ============================================================
