import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { type Locale } from "@/i18n/settings";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Privacy Policy — Skip or Buy: Cost Per Use",
  description: "Privacy policy for the Skip or Buy: Cost Per Use app.",
};

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const p = dict.privacy;

  return (
    <>
      {/* Header */}
      <header className="border-b border-navy-700/50 bg-navy-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Skip Or Buy"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-heading text-lg font-bold text-white">
              Skip Or Buy
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}`}
              className="text-sm text-slate-400 transition hover:text-mint"
            >
              &larr; {p.backToHome}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {p.title}
          </h1>
          <p className="mt-3 text-sm text-slate-500">{p.lastUpdated}</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-mint to-mint/0" />
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <p>{p.intro}</p>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.dataStorageTitle}
            </h2>
            <p>{p.dataStorage}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.analyticsTitle}
            </h2>
            <p>{p.analyticsIntro}</p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>{p.analyticsItem1}</li>
              <li>{p.analyticsItem2}</li>
              <li>{p.analyticsItem3}</li>
              <li>{p.analyticsItem4}</li>
              <li>{p.analyticsItem5}</li>
            </ul>
            <p className="mt-4">{p.analyticsOutro}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.cameraTitle}
            </h2>
            <p>{p.camera}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.thirdPartyTitle}
            </h2>
            <p>{p.thirdParty}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.dataSharingTitle}
            </h2>
            <p>{p.dataSharing}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.childrenTitle}
            </h2>
            <p>{p.children}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.deletionTitle}
            </h2>
            <p>{p.deletion}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.changesTitle}
            </h2>
            <p>{p.changes}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {p.contactTitle}
            </h2>
            <p>
              {p.contactIntro}{" "}
              <a
                href="mailto:skiporbuyapp@gmail.com"
                className="text-mint transition hover:underline"
              >
                skiporbuyapp@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-700 bg-navy-950 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Skip or Buy: Cost Per Use{" "}
            {dict.footer.copyright}
          </p>
        </div>
      </footer>
      <CookieBanner lang={lang} dict={dict} />
    </>
  );
}
