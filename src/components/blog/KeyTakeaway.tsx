"use client";

import { motion } from "framer-motion";

interface KeyTakeawayProps {
  label?: string;
  children: React.ReactNode;
  cta?: boolean;
}

export default function KeyTakeaway({
  label = "KEY TAKEAWAY",
  children,
  cta = false,
}: KeyTakeawayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="my-8 rounded-xl border-l-[3px] border-mint bg-mint/5 p-6 backdrop-blur-sm"
    >
      <div className="mb-2 text-xs font-bold tracking-widest text-mint uppercase">
        {label}
      </div>
      <div className="text-slate-300 leading-relaxed">{children}</div>
      {cta && (
        <a
          href="#download"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-mint transition-colors hover:text-mint-dark"
        >
          Try Skip or Buy
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      )}
    </motion.div>
  );
}
