"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";

type FormState = "idle" | "sending" | "sent";

export default function WaitlistForm({
  dict,
  className = "",
  compact = false,
  centered = false,
}: {
  dict: Dictionary;
  className?: string;
  compact?: boolean;
  centered?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    <div className={className}>
      {/* Coming Soon badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`mb-5 flex items-center ${centered ? "justify-center" : "justify-center lg:justify-start"}`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-sm font-medium text-mint backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
          </span>
          {dict.comingSoon.title}
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        {formState === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`rounded-2xl border border-mint/20 bg-mint/5 backdrop-blur-sm ${compact ? "p-5" : "p-6 sm:p-8"}`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-mint/20">
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-mint"
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {dict.comingSoon.success}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {dict.comingSoon.successDesc}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className={
              compact
                ? "flex flex-col gap-3"
                : "flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3"
            }
          >
            {compact ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.comingSoon.namePlaceholder}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 focus:bg-white/10 focus:ring-1 focus:ring-mint/20"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.comingSoon.emailPlaceholder}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 focus:bg-white/10 focus:ring-1 focus:ring-mint/20"
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="group relative w-full overflow-hidden rounded-xl bg-mint py-3.5 text-sm font-bold text-navy-900 transition-all hover:shadow-lg hover:shadow-mint/25 disabled:opacity-60"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {formState === "sending" && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    )}
                    {dict.comingSoon.submit}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={dict.comingSoon.namePlaceholder}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 focus:bg-white/10 focus:ring-1 focus:ring-mint/20 sm:w-auto sm:flex-1"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.comingSoon.emailPlaceholder}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-mint/50 focus:bg-white/10 focus:ring-1 focus:ring-mint/20 sm:w-auto sm:flex-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="group relative overflow-hidden rounded-xl bg-mint px-8 py-3.5 text-sm font-bold text-navy-900 transition-all hover:shadow-lg hover:shadow-mint/25 disabled:opacity-60"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {formState === "sending" && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    )}
                    {dict.comingSoon.submit}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
                </button>
                {error && (
                  <p className="text-sm text-red-400 sm:col-span-full">{error}</p>
                )}
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {/* Trust line */}
      {formState !== "sent" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-3 flex items-center gap-1.5 text-xs text-slate-500 ${centered ? "justify-center" : "justify-center lg:justify-start"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          No spam, ever. Unsubscribe anytime.
        </motion.p>
      )}
    </div>
  );
}
