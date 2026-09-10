


// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { uploadMedia } from "@/lib/upload";

// const TEXT_FIELDS = [
//   { key: "hero_heading", label: "Hero Heading" },
//   { key: "hero_subheading", label: "Hero Subheading", type: "textarea" },
//   { key: "advance_payment", label: "Advance Payment" },
//   { key: "monthly_installment", label: "Monthly Installment" },
//   { key: "contact_person", label: "Contact Person" },
//   { key: "contact_phone_1", label: "Phone 1" },
//   { key: "contact_phone_2", label: "Phone 2" },
//   { key: "office_address", label: "Office Address" },
//   { key: "contact_email", label: "Contact Email" },
//   { key: "whatsapp_number", label: "WhatsApp Number (with country code, no +)" },
//   { key: "map_embed_url", label: "Google Maps Embed URL" },
// ];

// export default function SettingsPage() {
//   const supabase = createClient();
//   const [settings, setSettings] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(null);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     supabase
//       .from("site_settings")
//       .select("*")
//       .eq("id", 1)
//       .maybeSingle()
//       .then(({ data }) => setSettings(data));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function handleFileUpload(key, file) {
//     setUploading(key);
//     try {
//       const url = await uploadMedia(supabase, file);
//       setSettings((prev) => (prev ? { ...prev, [key]: url } : prev));
//     } catch (e) {
//       alert(`Upload failed: ${e.message}`);
//     }
//     setUploading(null);
//   }

//   async function handleSave() {
//     if (!settings) return;
//     setSaving(true);
//     const { error } = await supabase.from("site_settings").update(settings).eq("id", 1);
//     setSaving(false);
//     if (error) {
//       alert(`Could not save: ${error.message}`);
//       return;
//     }
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2500);
//   }

//   if (!settings) return <p className="text-slate text-sm">Loading…</p>;

//   return (
//     <div className="max-w-2xl">
//       <h1 className="font-display text-2xl text-ink mb-1">Site Settings</h1>
//       <p className="text-sm text-slate mb-8">
//         Controls the hero content, payment plan figures, video, CEO section and contact details
//         across the site.
//       </p>

//       <div className="space-y-5 bg-cloud border border-ink/10 rounded-sm p-8">
//         {TEXT_FIELDS.map((f) => (
//           <div key={f.key}>
//             <label className="block text-sm text-slate mb-1.5">{f.label}</label>
//             {f.type === "textarea" ? (
//               <textarea
//                 rows={3}
//                 value={settings[f.key] ?? ""}
//                 onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
//                 className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
//               />
//             ) : (
//               <input
//                 value={settings[f.key] ?? ""}
//                 onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
//                 className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
//               />
//             )}
//           </div>
//         ))}

//         <div className="hairline pt-5">
//           <label className="block text-sm text-slate mb-1.5">Hero Background Image</label>
//           {settings.hero_image_url && (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img src={settings.hero_image_url} alt="" className="w-full aspect-video object-cover rounded-sm mb-2" />
//           )}
//           <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("hero_image_url", e.target.files[0])} className="text-sm" />
//           {uploading === "hero_image_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
//         </div>

//         <div>
//           <label className="block text-sm text-slate mb-1.5">
//             Hero Background Video (upload a file, or paste a YouTube/Vimeo/MP4 URL below)
//           </label>
//           <input type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("hero_video_url", e.target.files[0])} className="text-sm mb-2" />
//           <input
//             placeholder="https://youtube.com/watch?v=... or https://.../video.mp4"
//             value={settings.hero_video_url ?? ""}
//             onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
//             className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
//           />
//           {uploading === "hero_video_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
//         </div>

//         <div>
//           <label className="block text-sm text-slate mb-1.5">
//             Project Video Tour (separate section further down the page)
//           </label>
//           <input type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("tour_video_url", e.target.files[0])} className="text-sm mb-2" />
//           <input
//             placeholder="https://youtube.com/watch?v=... or https://.../video.mp4"
//             value={settings.tour_video_url ?? ""}
//             onChange={(e) => setSettings({ ...settings, tour_video_url: e.target.value })}
//             className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
//           />
//           {uploading === "tour_video_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
//         </div>

//         <div>
//           <label className="block text-sm text-slate mb-1.5">NOC Document (PDF or image)</label>
//           <input type="file" accept=".pdf,image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("noc_document_url", e.target.files[0])} className="text-sm" />
//           {settings.noc_document_url && (
//             <a href={settings.noc_document_url} target="_blank" className="block text-sm text-pine mt-2 hover:underline">
//               View current document ↗
//             </a>
//           )}
//           {uploading === "noc_document_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
//         </div>

//         <div className="hairline pt-5">
//           <div className="text-sm text-ink font-medium mb-4">CEO Section</div>

//           <label className="block text-sm text-slate mb-1.5">CEO Name</label>
//           <input
//             value={settings.ceo_name ?? ""}
//             onChange={(e) => setSettings({ ...settings, ceo_name: e.target.value })}
//             className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine mb-4"
//           />

//           <label className="block text-sm text-slate mb-1.5">CEO Title</label>
//           <input
//             value={settings.ceo_title ?? ""}
//             onChange={(e) => setSettings({ ...settings, ceo_title: e.target.value })}
//             className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine mb-4"
//           />

//           <label className="block text-sm text-slate mb-1.5">CEO Bio / Message</label>
//           <textarea
//             rows={4}
//             value={settings.ceo_bio ?? ""}
//             onChange={(e) => setSettings({ ...settings, ceo_bio: e.target.value })}
//             className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine mb-4"
//           />

//           <label className="block text-sm text-slate mb-1.5">CEO Photo</label>
//           {settings.ceo_image_url && (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img src={settings.ceo_image_url} alt="" className="w-40 aspect-[4/5] object-cover rounded-sm mb-2" />
//           )}
//           <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("ceo_image_url", e.target.files[0])} className="text-sm" />
//           {uploading === "ceo_image_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
//         </div>
//       </div>

//       <div className="flex items-center gap-4 mt-6">
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="rounded-sm bg-pine text-cloud px-6 py-3 text-sm hover:bg-pineLight transition-colors disabled:opacity-60"
//         >
//           {saving ? "Saving…" : "Save Settings"}
//         </button>
//         {saved && <span className="text-sm text-pine">Saved.</span>}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMedia } from "@/lib/upload";

const TEXT_FIELDS = [
  { key: "hero_heading", label: "Hero Heading" },
  { key: "hero_subheading", label: "Hero Subheading", type: "textarea" },
  { key: "advance_payment", label: "Advance Payment" },
  { key: "monthly_installment", label: "Monthly Installment" },
  { key: "contact_person", label: "Contact Person" },
  { key: "contact_phone_1", label: "Phone 1" },
  { key: "contact_phone_2", label: "Phone 2" },
  { key: "office_address", label: "Office Address" },
  { key: "contact_email", label: "Contact Email" },
  { key: "whatsapp_number", label: "WhatsApp Number (with country code, no +)" },
  { key: "map_embed_url", label: "Google Maps Embed URL" },
];

const SOCIAL_PLATFORMS = ["Facebook", "Instagram", "YouTube", "TikTok", "Twitter / X", "LinkedIn", "WhatsApp Channel", "Other"];

export default function SettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [saved, setSaved] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newSocial, setNewSocial] = useState({ platform: "Facebook", label: "", url: "" });
  const [socialSaving, setSocialSaving] = useState(false);

  async function loadSocialLinks() {
    const { data } = await supabase.from("social_links").select("*").order("sort_order");
    setSocialLinks(data ?? []);
  }

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setSettings(data));
    loadSocialLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddSocial() {
    if (!newSocial.url) return;
    setSocialSaving(true);
    const { error } = await supabase
      .from("social_links")
      .insert([{ ...newSocial, sort_order: socialLinks.length }]);
    setSocialSaving(false);
    if (error) {
      alert(`Could not add: ${error.message}`);
      return;
    }
    setNewSocial({ platform: "Facebook", label: "", url: "" });
    loadSocialLinks();
  }

  async function handleUpdateSocial(id, patch) {
    await supabase.from("social_links").update(patch).eq("id", id);
    loadSocialLinks();
  }

  async function handleDeleteSocial(id) {
    if (!confirm("Remove this social media link?")) return;
    await supabase.from("social_links").delete().eq("id", id);
    loadSocialLinks();
  }

  async function handleFileUpload(key, file) {
    setUploading(key);
    try {
      const url = await uploadMedia(supabase, file);
      setSettings((prev) => (prev ? { ...prev, [key]: url } : prev));
    } catch (e) {
      alert(`Upload failed: ${e.message}`);
    }
    setUploading(null);
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase.from("site_settings").update(settings).eq("id", 1);
    setSaving(false);
    if (error) {
      alert(`Could not save: ${error.message}`);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!settings) return <p className="text-slate text-sm">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink mb-1">Site Settings</h1>
      <p className="text-sm text-slate mb-8">
        Controls the hero content, payment plan figures, video, CEO section and contact details
        across the site.
      </p>

      <div className="space-y-5 bg-cloud border border-ink/10 rounded-sm p-8">
        {TEXT_FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-sm text-slate mb-1.5">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                rows={3}
                value={settings[f.key] ?? ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
              />
            ) : (
              <input
                value={settings[f.key] ?? ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
              />
            )}
          </div>
        ))}

        <div className="hairline pt-5">
          <label className="block text-sm text-slate mb-1.5">Hero Background Image</label>
          {settings.hero_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.hero_image_url} alt="" className="w-full aspect-video object-cover rounded-sm mb-2" />
          )}
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("hero_image_url", e.target.files[0])} className="text-sm" />
          {uploading === "hero_image_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
        </div>

        <div>
          <label className="block text-sm text-slate mb-1.5">
            Hero Background Video (upload a file, or paste a YouTube/Vimeo/MP4 URL below)
          </label>
          <input type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("hero_video_url", e.target.files[0])} className="text-sm mb-2" />
          <input
            placeholder="https://youtube.com/watch?v=... or https://.../video.mp4"
            value={settings.hero_video_url ?? ""}
            onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
          />
          {uploading === "hero_video_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
        </div>

        <div>
          <label className="block text-sm text-slate mb-1.5">
            Project Video Tour (separate section further down the page)
          </label>
          <input type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("tour_video_url", e.target.files[0])} className="text-sm mb-2" />
          <input
            placeholder="https://youtube.com/watch?v=... or https://.../video.mp4"
            value={settings.tour_video_url ?? ""}
            onChange={(e) => setSettings({ ...settings, tour_video_url: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
          />
          {uploading === "tour_video_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
        </div>

        <div>
          <label className="block text-sm text-slate mb-1.5">NOC Document (PDF or image)</label>
          <input type="file" accept=".pdf,image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("noc_document_url", e.target.files[0])} className="text-sm" />
          {settings.noc_document_url && (
            <a href={settings.noc_document_url} target="_blank" className="block text-sm text-pine mt-2 hover:underline">
              View current document ↗
            </a>
          )}
          {uploading === "noc_document_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
        </div>

        <div className="hairline pt-5">
          <div className="text-sm text-ink font-medium mb-4">CEO Section</div>

          <label className="block text-sm text-slate mb-1.5">CEO Name</label>
          <input
            value={settings.ceo_name ?? ""}
            onChange={(e) => setSettings({ ...settings, ceo_name: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine mb-4"
          />

          <label className="block text-sm text-slate mb-1.5">CEO Title</label>
          <input
            value={settings.ceo_title ?? ""}
            onChange={(e) => setSettings({ ...settings, ceo_title: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine mb-4"
          />

          <label className="block text-sm text-slate mb-1.5">CEO Bio / Message</label>
          <textarea
            rows={4}
            value={settings.ceo_bio ?? ""}
            onChange={(e) => setSettings({ ...settings, ceo_bio: e.target.value })}
            className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine mb-4"
          />

          <label className="block text-sm text-slate mb-1.5">CEO Photo</label>
          {settings.ceo_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.ceo_image_url} alt="" className="w-40 aspect-[4/5] object-cover rounded-sm mb-2" />
          )}
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload("ceo_image_url", e.target.files[0])} className="text-sm" />
          {uploading === "ceo_image_url" && <p className="text-xs text-slate mt-1">Uploading…</p>}
        </div>

        <div className="hairline pt-5">
          <div className="text-sm text-ink font-medium mb-1">Social Media</div>
          <p className="text-xs text-slate mb-4">
            Add as many accounts as you like — e.g. two Facebook pages plus Instagram. They show as icons in the site footer.
          </p>

          {socialLinks.length > 0 && (
            <div className="space-y-2 mb-4">
              {socialLinks.map((s) => (
                <div key={s.id} className="flex items-center gap-2 border border-ink/10 rounded-sm p-2">
                  <select
                    value={s.platform}
                    onChange={(e) => handleUpdateSocial(s.id, { platform: e.target.value })}
                    className="border border-ink/15 rounded-sm px-2 py-1.5 text-sm"
                  >
                    {SOCIAL_PLATFORMS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <input
                    placeholder="Label (optional)"
                    defaultValue={s.label ?? ""}
                    onBlur={(e) => handleUpdateSocial(s.id, { label: e.target.value })}
                    className="w-32 border border-ink/15 rounded-sm px-2 py-1.5 text-sm"
                  />
                  <input
                    placeholder="URL"
                    defaultValue={s.url}
                    onBlur={(e) => handleUpdateSocial(s.id, { url: e.target.value })}
                    className="flex-1 border border-ink/15 rounded-sm px-2 py-1.5 text-sm"
                  />
                  <button onClick={() => handleDeleteSocial(s.id)} className="text-sm text-clay shrink-0">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <select
              value={newSocial.platform}
              onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
              className="border border-ink/15 rounded-sm px-2 py-1.5 text-sm"
            >
              {SOCIAL_PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input
              placeholder="Label (optional)"
              value={newSocial.label}
              onChange={(e) => setNewSocial({ ...newSocial, label: e.target.value })}
              className="w-32 border border-ink/15 rounded-sm px-2 py-1.5 text-sm"
            />
            <input
              placeholder="Paste profile / page URL"
              value={newSocial.url}
              onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
              className="flex-1 border border-ink/15 rounded-sm px-2 py-1.5 text-sm"
            />
            <button
              onClick={handleAddSocial}
              disabled={socialSaving}
              className="rounded-sm bg-pine text-cloud px-4 py-1.5 text-sm hover:bg-pineLight transition-colors disabled:opacity-60 shrink-0"
            >
              {socialSaving ? "Adding…" : "+ Add"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-sm bg-pine text-cloud px-6 py-3 text-sm hover:bg-pineLight transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Settings"}
        </button>
        {saved && <span className="text-sm text-pine">Saved.</span>}
      </div>
    </div>
  );
}