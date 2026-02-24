import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const navLinks = [
    { label: dict.header.features, href: "#features" },
    { label: dict.header.howItWorks, href: "#how-it-works" },
    { label: dict.header.pricing, href: "#pricing" },
    { label: "Blog", href: `/${lang}/blog` },
    { label: dict.footer.privacyPolicy, href: `/${lang}/privacy` },
    { label: dict.footer.contact, href: `/${lang}/contact` },
  ];

  return (
    <footer className="relative border-t border-navy-700/50 bg-navy-950">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-mint/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Skip Or Buy"
              width={32}
              height={32}
              className="rounded-lg transition-transform group-hover:scale-110"
            />
            <span className="font-heading text-lg font-bold text-white">
              Skip Or Buy: Worth It?
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition hover:text-mint"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition hover:text-mint"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-navy-700/30 pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Skip Or Buy: Worth It?{" "}
            {dict.footer.copyright}
          </p>
          <a
            href="mailto:skiporbuyapp@gmail.com"
            className="text-sm text-slate-400 transition hover:text-mint"
          >
            skiporbuyapp@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
