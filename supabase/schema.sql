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
