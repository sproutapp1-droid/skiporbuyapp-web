"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: dict.header.features, href: "#features" },
    { label: dict.header.howItWorks, href: "#how-it-works" },
    { label: dict.header.pricing, href: "#pricing" },
    { label: "Blog", href: `/${lang}/blog` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher lang={lang} />
          <a
            href="#download"
            className="group relative overflow-hidden rounded-full bg-mint px-5 py-2 text-sm font-semibold text-navy-900 transition-all hover:shadow-lg hover:shadow-mint/25"
          >
            <span className="relative z-10">{dict.header.download}</span>
            <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
          </a>
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
              <motion.a
                href="#download"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-2 rounded-full bg-mint px-5 py-3 text-center text-sm font-semibold text-navy-900"
              >
                {dict.header.download}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
