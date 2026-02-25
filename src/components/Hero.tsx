"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";
import StoreBadges from "./StoreBadges";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";

type FormState = "idle" | "sending" | "sent";

export default function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const screenshotSrc = `/images/screenshots/${lang}-1.png`;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setFormState("idle");
    }
  };

  return (
    <section id="download" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-mint blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-purple-500 blur-[150px]"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(46, 230, 168, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 230, 168, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {dict.hero.headline}{" "}
                <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
                  {dict.hero.headlineAccent}
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 max-w-xl text-lg text-slate-400 sm:text-xl leading-relaxed">
                {dict.hero.subline}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10">
                {/* Available on iOS badge */}
                <div className="mb-5 flex items-center justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-sm font-medium text-mint backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                    </span>
                    {dict.hero.availableOnIos}
                  </span>
                </div>

                {/* Store badges */}
                <StoreBadges dict={dict} className="justify-center lg:justify-start" />

                {/* Android waitlist */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm text-slate-400 mb-3 flex items-center gap-2 justify-center lg:justify-start">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-slate-500">
                      <path d="M17.523 2.246l1.476 2.544a.5.5 0 11-.866.502l-1.5-2.586A9.593 9.593 0 0012 1.5a9.593 9.593 0 00-4.633 1.206L5.867 5.292a.5.5 0 11-.866-.502L6.477 2.246C3.134 4.246.75 7.828.75 12h22.5c0-4.172-2.384-7.754-5.727-9.754zM7.5 9a1 1 0 110-2 1 1 0 010 2zm9 0a1 1 0 110-2 1 1 0 010 2zM.75 12v8.25A2.25 2.25 0 003 22.5h18a2.25 2.25 0 002.25-2.25V12H.75z" />
                    </svg>
                    {dict.hero.androidComingSoon}
                  </p>

                  {formState === "sent" ? (
                    <div className="flex items-center gap-2 text-sm text-mint">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {dict.comingSoon.success}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={dict.comingSoon.namePlaceholder}
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 sm:w-auto sm:flex-1"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={dict.comingSoon.emailPlaceholder}
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 sm:w-auto sm:flex-1"
                      />
                      <button
                        type="submit"
                        disabled={formState === "sending"}
                        className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
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
                      {error && <p className="text-sm text-red-400">{error}</p>}
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* App Screenshot */}
          <FadeIn delay={0.2} direction="right" className="flex-shrink-0">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-16 rounded-full bg-gradient-to-b from-mint/15 via-mint/5 to-transparent blur-3xl" />
              <div className="relative w-[280px] sm:w-[320px] rounded-3xl overflow-hidden shadow-2xl shadow-navy-950/80">
                <Image
                  src={screenshotSrc}
                  alt="Skip Or Buy app screenshot"
                  width={640}
                  height={1386}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
