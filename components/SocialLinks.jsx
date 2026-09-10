// import { Icon } from "./Icon";

// const PLATFORM_ICON = {
//   facebook: "facebook",
//   instagram: "instagram",
//   youtube: "youtube",
//   tiktok: "tiktok",
//   "twitter / x": "twitter",
//   twitter: "twitter",
//   linkedin: "linkedin",
//   "whatsapp channel": "whatsapp",
//   whatsapp: "whatsapp",
//   other: "link",
// };

// export function SocialLinks({ items = [], className = "" }) {
//   if (!items.length) return null;

//   return (
//     <div className={`flex flex-wrap gap-3 ${className}`}>
//       {items.map((s) => {
//         const platform = String(s.platform || "")
//           .trim()
//           .toLowerCase();

//         const iconName = PLATFORM_ICON[platform] || "link";

//         return (
//           <a
//             key={s.id}
//             href={s.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label={s.label || s.platform}
//             title={s.label || s.platform}
//             className="w-9 h-9 rounded-full border border-cloud/30 flex items-center justify-center text-cloud/80 hover:text-cloud hover:bg-cloud/10 transition-colors"
//           >
//             <Icon name={iconName} className="w-4 h-4" />
//           </a>
//         );
//       })}
//     </div>
//   );
// }

/////////////////////////////////   working


// import { Icon } from "./Icon";

// const PLATFORM_ICON = {
//   facebook: "facebook",
//   instagram: "instagram",
//   youtube: "youtube",
//   tiktok: "tiktok",
//   "twitter / x": "twitter",
//   twitter: "twitter",
//   linkedin: "linkedin",
//   "whatsapp channel": "whatsapp",
//   whatsapp: "whatsapp",
//   other: "link",
// };

// const PLATFORM_FALLBACK_URL = {
//   facebook: "https://facebook.com",
//   instagram: "https://instagram.com",
//   youtube: "https://youtube.com",
//   tiktok: "https://tiktok.com",
//   "twitter / x": "https://twitter.com",
//   twitter: "https://twitter.com",
//   linkedin: "https://linkedin.com",
//   "whatsapp channel": "https://whatsapp.com",
//   whatsapp: "https://whatsapp.com",
//   other: "#",
// };

// export function SocialLinks({ items = [], className = "" }) {
//   if (!items.length) return null;

//   return (
//     <div className={`flex flex-wrap gap-3 ${className}`}>
//       {items.map((s) => {
//         const platform = String(s.platform || "")
//           .trim()
//           .toLowerCase();

//         const iconName = PLATFORM_ICON[platform] || "link";

//         const href =
//           s.url && s.url.trim() !== ""
//             ? s.url
//             : PLATFORM_FALLBACK_URL[platform] || "#";

//         return (
//           <a
//             key={s.id}
//             href={href}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label={s.label || s.platform}
//             title={s.label || s.platform}
//             className="w-9 h-9 rounded-full border border-cloud/30 flex items-center justify-center text-cloud/80 hover:text-cloud hover:bg-cloud/10 transition-colors"
//           >
//             <Icon name={iconName} className="w-4 h-4" />
//           </a>
//         );
//       })}
//     </div>
//   );
// }



///////////////////

import { Icon } from "./Icon";

const DEFAULT_PLATFORMS = [
  "facebook",
  "instagram",
  "youtube",
  "tiktok",
  "twitter",
  "linkedin",
  "whatsapp",
];

const PLATFORM_ICON = {
  facebook: "facebook",
  instagram: "instagram",
  youtube: "youtube",
  tiktok: "tiktok",
  "twitter / x": "twitter",
  twitter: "twitter",
  linkedin: "linkedin",
  "whatsapp channel": "whatsapp",
  whatsapp: "whatsapp",
  other: "link",
};

const PLATFORM_FALLBACK_URL = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  tiktok: "https://tiktok.com",
  "twitter / x": "https://twitter.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  "whatsapp channel": "https://whatsapp.com",
  whatsapp: "https://whatsapp.com",
  other: "#",
};

const PLATFORM_LABEL = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
};

export function SocialLinks({ items = [], className = "" }) {
  // Map whatever links exist in the DB by normalized platform key
  const byPlatform = {};

  items.forEach((s) => {
    const key = String(s.platform || "")
      .trim()
      .toLowerCase();

    byPlatform[key] = s;
  });

  // Always render the full default set, merging in any saved link/label
  const displayItems = DEFAULT_PLATFORMS.map((platform) => {
    const saved = byPlatform[platform];

    return {
      id: saved?.id || platform,
      platform,
      label: saved?.label || PLATFORM_LABEL[platform],
      url: saved?.url && saved.url.trim() !== "" ? saved.url : null,
    };
  });

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {displayItems.map((s) => {
        const iconName = PLATFORM_ICON[s.platform] || "link";
        const href =
          s.url || PLATFORM_FALLBACK_URL[s.platform] || "#";

        return (
          <a
            key={s.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="w-9 h-9 rounded-full border border-cloud/30 flex items-center justify-center text-cloud/80 hover:text-cloud hover:bg-cloud/10 transition-colors"
          >
            <Icon name={iconName} className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
