"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";
import LanguageSwitcher from "./LanguageSwitcher";

type FormState = "idle" | "sending" | "sent";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: dict.header.features, href: `/${lang}#features` },
    { label: dict.header.howItWorks, href: `/${lang}#how-it-works` },
    { label: dict.header.pricing, href: `/${lang}#pricing` },
    { label: "Blog", href: `/${lang}/blog` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWaitlistOpen(false);
      }
    };
    if (waitlistOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [waitlistOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormState("sending");

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setFormState("sent");
      setTimeout(() => {
        setWaitlistOpen(false);
        setFormState("idle");
        setName("");
        setEmail("");
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setFormState("idle");
    }
  };

  const waitlistButton = (mobile?: boolean) => (
    <button
      onClick={() => setWaitlistOpen(!waitlistOpen)}
      className={
        mobile
          ? "mt-2 rounded-full bg-mint px-5 py-3 text-center text-sm font-semibold text-navy-900"
          : "group relative overflow-hidden rounded-full bg-mint px-5 py-2 text-sm font-semibold text-navy-900 transition-all hover:shadow-lg hover:shadow-mint/25"
      }
    >
      <span className="relative z-10">{dict.header.joinWaitlist}</span>
      {!mobile && (
        <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
      )}
    </button>
  );

  const waitlistDropdown = (
    <AnimatePresence>
      {waitlistOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-3 w-80 rounded-xl border border-navy-700/50 bg-navy-800/95 p-5 shadow-2xl backdrop-blur-xl z-[60]"
        >
          {formState === "sent" ? (
            <div className="text-center py-2">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mint/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">{dict.comingSoon.success}</h3>
              <p className="mt-1 text-sm text-slate-400">{dict.comingSoon.successDesc}</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white font-heading">{dict.comingSoon.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{dict.comingSoon.subtitle}</p>
              <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.comingSoon.namePlaceholder}
                  required
                  className="w-full rounded-lg border border-navy-700 bg-navy-900/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-mint"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.comingSoon.emailPlaceholder}
                  required
                  className="w-full rounded-lg border border-navy-700 bg-navy-900/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-mint"
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full rounded-full bg-mint py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-mint-dark disabled:opacity-60"
                >
                  {formState === "sending" ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      {dict.comingSoon.submit}
                    </span>
                  ) : (
                    dict.comingSoon.submit
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/70 backdrop-blur-2xl border-b border-navy-700/30 shadow-lg shadow-navy-950/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href={`/${lang}`} className="flex items-center gap-3 group">
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
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-4 py-2 text-sm text-slate-400 transition-colors hover:text-white group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-mint transition-all duration-300 group-hover:w-4/5" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex relative">
          <LanguageSwitcher lang={lang} />
          {waitlistButton()}
          {waitlistDropdown}
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-navy-800"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-navy-700/30 bg-navy-900/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg px-4 py-3 text-slate-300 transition hover:bg-navy-800 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                {waitlistButton(true)}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile waitlist dropdown */}
      <AnimatePresence>
        {waitlistOpen && (
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-navy-950/70 backdrop-blur-sm"
              onClick={() => setWaitlistOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed left-4 right-4 top-20 z-[60] rounded-xl border border-navy-700/50 bg-navy-800/95 p-5 shadow-2xl backdrop-blur-xl"
            >
              {formState === "sent" ? (
                <div className="text-center py-2">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mint/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">{dict.comingSoon.success}</h3>
                  <p className="mt-1 text-sm text-slate-400">{dict.comingSoon.successDesc}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white font-heading">{dict.comingSoon.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{dict.comingSoon.subtitle}</p>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={dict.comingSoon.namePlaceholder}
                      required
                      className="w-full rounded-lg border border-navy-700 bg-navy-900/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-mint"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={dict.comingSoon.emailPlaceholder}
                      required
                      className="w-full rounded-lg border border-navy-700 bg-navy-900/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-mint"
                    />
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="w-full rounded-full bg-mint py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-mint-dark disabled:opacity-60"
                    >
                      {formState === "sending" ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          {dict.comingSoon.submit}
                        </span>
                      ) : (
                        dict.comingSoon.submit
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
