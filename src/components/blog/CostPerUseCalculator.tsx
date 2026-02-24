"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CostPerUseCalculator() {
  const [price, setPrice] = useState("");
  const [uses, setUses] = useState("");

  const priceNum = parseFloat(price) || 0;
  const usesNum = parseInt(uses) || 0;
  const costPerUse = usesNum > 0 ? priceNum / usesNum : 0;

  const getVerdict = () => {
    if (!priceNum || !usesNum) return null;
    if (costPerUse <= 1)
      return { label: "Worth It!", color: "text-verdict-worth", bg: "bg-verdict-worth/10 border-verdict-worth/20" };
    if (costPerUse <= 5)
      return { label: "Think Twice", color: "text-verdict-think", bg: "bg-verdict-think/10 border-verdict-think/20" };
    return { label: "Skip It", color: "text-verdict-skip", bg: "bg-verdict-skip/10 border-verdict-skip/20" };
  };

  const verdict = getVerdict();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="my-8 rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6"
    >
      <h4 className="mb-4 font-heading text-lg font-bold text-white">
        Quick Cost Per Use Calculator
      </h4>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">
            Price ($)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 120"
            className="w-full rounded-lg border border-navy-700/50 bg-navy-900/50 px-4 py-2.5 text-white placeholder-slate-600 transition-colors focus:border-mint/30 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-slate-400">
            Expected Uses
          </label>
          <input
            type="number"
            value={uses}
            onChange={(e) => setUses(e.target.value)}
            placeholder="e.g. 200"
            className="w-full rounded-lg border border-navy-700/50 bg-navy-900/50 px-4 py-2.5 text-white placeholder-slate-600 transition-colors focus:border-mint/30 focus:outline-none"
          />
        </div>
      </div>

      {priceNum > 0 && usesNum > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4"
        >
          <div className="flex items-center justify-between rounded-xl border border-navy-700/50 bg-navy-900/30 p-4">
            <div>
              <div className="text-sm text-slate-400">Cost Per Use</div>
              <div className="font-heading text-2xl font-bold text-white">
                ${costPerUse.toFixed(2)}
              </div>
            </div>
            {verdict && (
              <div
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${verdict.bg} ${verdict.color}`}
              >
                {verdict.label}
              </div>
            )}
          </div>

          <a
            href="#download"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-mint transition-colors hover:text-mint-dark"
          >
            Get more with Skip or Buy
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}
