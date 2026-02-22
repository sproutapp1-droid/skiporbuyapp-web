"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";

type FormState = "idle" | "sending" | "sent";

export default function ComingSoon({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem("coming-soon-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("coming-soon-dismissed", "true");
    setVisible(false);
  };

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
        handleDismiss();
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setFormState("idle");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/70 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-4 w-full max-w-md rounded-2xl border border-navy-700/50 bg-navy-800/95 p-8 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
              aria-label={dict.comingSoon.dismiss}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-mint"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {dict.comingSoon.success}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {dict.comingSoon.successDesc}
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white font-heading">
                  {dict.comingSoon.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {dict.comingSoon.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={dict.comingSoon.namePlaceholder}
                    required
                    className="w-full rounded-xl border border-navy-700 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-mint"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.comingSoon.emailPlaceholder}
                    required
                    className="w-full rounded-xl border border-navy-700 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-mint"
                  />

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full rounded-full bg-mint py-3 text-sm font-semibold text-navy-900 transition hover:bg-mint-dark disabled:opacity-60"
                  >
                    {formState === "sending" ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
