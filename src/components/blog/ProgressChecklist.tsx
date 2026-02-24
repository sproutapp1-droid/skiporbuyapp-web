"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProgressChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const progress = items.length > 0 ? (checked.size / items.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="my-8 rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6"
    >
      {/* Progress bar */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">
          {checked.size} of {items.length} complete
        </span>
        <span className="text-sm font-semibold text-mint">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-navy-900/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-mint to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Items */}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-navy-800/50"
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                  checked.has(i)
                    ? "border-mint bg-mint"
                    : "border-navy-600 bg-navy-900/50"
                }`}
              >
                {checked.has(i) && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-3 w-3 text-navy-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  checked.has(i) ? "text-slate-500 line-through" : "text-slate-300"
                }`}
              >
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
