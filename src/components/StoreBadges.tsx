"use client";

import type { Dictionary } from "@/i18n/getDictionary";

const IOS_APP_STORE_URL =
  "https://apps.apple.com/us/app/skip-or-buy-cost-per-use/id6759465475";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.skiporbuy.app";

export default function StoreBadges({
  className = "",
  dict,
}: {
  className?: string;
  dict: Dictionary;
}) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <a
        href={IOS_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white backdrop-blur-sm transition-all hover:border-mint/30 hover:bg-white/10 hover:shadow-lg hover:shadow-mint/5"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current transition-transform group-hover:scale-110">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-none opacity-60">
            {dict.hero.appStoreLabel}
          </div>
          <div className="text-lg font-semibold leading-tight">{dict.hero.appStore}</div>
        </div>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white backdrop-blur-sm transition-all hover:border-mint/30 hover:bg-white/10 hover:shadow-lg hover:shadow-mint/5"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current transition-transform group-hover:scale-110">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-none opacity-60">{dict.hero.googlePlayLabel}</div>
          <div className="text-lg font-semibold leading-tight">{dict.hero.googlePlay}</div>
        </div>
      </a>
    </div>
  );
}
