"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";
import FadeIn from "@/components/FadeIn";
import CookieBanner from "@/components/CookieBanner";

export default function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = use(params);
  const lang = langParam as Locale;
  const dict = use(getDictionary(lang));
  const c = dict.contact;

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    setFormState("sending");

    // Open mailto link as fallback
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:skiporbuyapp@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => setFormState("sent"), 1000);
  };

  return (
    <>
      {/* Header */}
      <header className="border-b border-navy-700/50 bg-navy-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Skip Or Buy"
                width={36}
                height={36}
                className="rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-lg bg-mint/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <span className="font-heading text-lg font-bold text-white">
              Skip Or Buy
            </span>
          </Link>
          <Link
            href={`/${lang}`}
            className="text-sm text-slate-400 transition hover:text-mint"
          >
            &larr; {c.backToHome}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <FadeIn>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {c.title}{" "}
              <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
                {c.titleAccent}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              {c.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Contact info sidebar */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              {/* Email card */}
              <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-mint/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mint/10 text-mint">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {c.emailLabel}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{c.emailDesc}</p>
                <a
                  href="mailto:skiporbuyapp@gmail.com"
                  className="mt-4 inline-block text-mint transition hover:underline"
                >
                  skiporbuyapp@gmail.com
                </a>
              </div>

              {/* Response time */}
              <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mint/10 text-mint">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-400">{c.responseTime}</p>
              </div>

              {/* App stores */}
              <div className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6 backdrop-blur-sm">
                <h3 className="font-heading font-semibold text-white">
                  {c.followTitle}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{c.followDesc}</p>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.2} className="lg:col-span-3">
            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-mint/20 bg-navy-800/30 p-12 text-center backdrop-blur-sm"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint/10">
                  <svg className="h-8 w-8 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">{c.sent}</h3>
                <p className="mt-2 text-slate-400">{c.sentDesc}</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-8 backdrop-blur-sm"
              >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                      {c.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-navy-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-mint/50 focus:outline-none focus:ring-1 focus:ring-mint/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                      {c.emailInputLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-xl border border-navy-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-mint/50 focus:outline-none focus:ring-1 focus:ring-mint/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                      {c.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full resize-none rounded-xl border border-navy-700/50 bg-navy-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-mint/50 focus:outline-none focus:ring-1 focus:ring-mint/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-mint to-emerald-500 py-3.5 text-center font-semibold text-navy-900 transition-all hover:shadow-xl hover:shadow-mint/25 disabled:opacity-70"
                  >
                    <span className="relative z-10">
                      {formState === "sending" ? "..." : c.send}
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                  </button>
                </div>
              </form>
            )}
          </FadeIn>
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
