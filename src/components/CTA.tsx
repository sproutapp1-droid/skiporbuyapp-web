"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import StoreBadges from "./StoreBadges";
import type { Dictionary } from "@/i18n/getDictionary";

type FormState = "idle" | "sending" | "sent";

export default function CTA({ dict }: { dict: Dictionary }) {
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
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-navy-700/50 bg-gradient-to-br from-navy-800/80 to-navy-800/30 px-8 py-16 text-center backdrop-blur-sm sm:px-16 sm:py-20">
            {/* Animated gradient blobs */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], x: [-20, 20, -20] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-mint/10 blur-[80px]"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], x: [20, -20, 20] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-500/8 blur-[80px]"
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(46, 230, 168, 0.5) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {dict.cta.title}{" "}
                <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
                  {dict.cta.titleAccent}
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
                {dict.cta.subtitle}
              </p>

              {/* Store badges */}
              <StoreBadges dict={dict} className="mt-8 justify-center" />

              {/* Android waitlist */}
              <div className="mx-auto mt-8 max-w-lg border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400 mb-3 flex items-center gap-2 justify-center">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-slate-500">
                    <path d="M17.523 2.246l1.476 2.544a.5.5 0 11-.866.502l-1.5-2.586A9.593 9.593 0 0012 1.5a9.593 9.593 0 00-4.633 1.206L5.867 5.292a.5.5 0 11-.866-.502L6.477 2.246C3.134 4.246.75 7.828.75 12h22.5c0-4.172-2.384-7.754-5.727-9.754zM7.5 9a1 1 0 110-2 1 1 0 010 2zm9 0a1 1 0 110-2 1 1 0 010 2zM.75 12v8.25A2.25 2.25 0 003 22.5h18a2.25 2.25 0 002.25-2.25V12H.75z" />
                  </svg>
                  {dict.hero.androidComingSoon}
                </p>

                {formState === "sent" ? (
                  <div className="flex items-center gap-2 text-sm text-mint justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {dict.comingSoon.success}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-center">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={dict.comingSoon.namePlaceholder}
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 sm:w-auto sm:flex-1 sm:max-w-[180px]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={dict.comingSoon.emailPlaceholder}
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 sm:w-auto sm:flex-1 sm:max-w-[180px]"
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
