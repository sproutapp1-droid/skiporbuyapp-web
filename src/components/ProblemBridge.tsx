"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";
import type { Dictionary } from "@/i18n/getDictionary";

function RevealCard({
  label,
  detail,
  costPerUse,
  comparison,
  verdict,
  verdictColor,
  borderColor,
  glowColor,
  icon,
  revealLabel,
}: {
  label: string;
  detail: string;
  costPerUse: string;
  comparison: string;
  verdict: string;
  verdictColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
  revealLabel: string;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border ${borderColor} bg-navy-800/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-500`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow */}
      <div
        className={`absolute -top-20 -right-20 h-40 w-40 rounded-full ${glowColor} blur-[80px] transition-opacity duration-500 ${
          revealed ? "opacity-100" : "opacity-30"
        }`}
      />

      <div className="relative">
        {/* Icon and label */}
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${revealed ? verdictColor.replace("text-", "bg-").replace("400", "/15").replace("500", "/15") : "bg-white/5"} transition-colors duration-500`}>
            {icon}
          </div>
          <span className="text-lg font-semibold text-white">{label}</span>
        </div>

        {/* Usage detail */}
        <p className="text-sm text-slate-400 mb-6">{detail}</p>

        {/* Reveal area */}
        <div className="min-h-[120px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                onClick={() => setRevealed(true)}
                className={`group/btn relative rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95`}
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {revealLabel}
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-3xl sm:text-4xl font-heading font-bold ${verdictColor} mb-1`}
                >
                  {costPerUse}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-slate-500 mb-3"
                >
                  {comparison}
                </motion.p>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${
                    verdict === "WORTH IT" || verdict === "SKIP IT"
                      ? ""
                      : ""
                  } ${verdictColor} ${verdictColor.replace("text-", "bg-").replace("400", "/10").replace("500", "/10")}`}
                >
                  {verdict}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemBridge({ dict }: { dict: Dictionary }) {
  const pb = dict.problemBridge;

  return (
    <section className="relative py-24 md:py-32">
      {/* Subtle divider gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-navy-700 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {pb.title}{" "}
              <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
                {pb.titleAccent}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              {pb.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Two contrasting cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <RevealCard
              label={pb.goodLabel}
              detail={pb.goodDetail}
              costPerUse={pb.goodCostPerUse}
              comparison={pb.goodComparison}
              verdict={pb.goodVerdict}
              verdictColor="text-emerald-400"
              borderColor="border-emerald-500/20 hover:border-emerald-500/40"
              glowColor="bg-emerald-500/20"
              revealLabel={pb.revealButton}
              icon={
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <RevealCard
              label={pb.badLabel}
              detail={pb.badDetail}
              costPerUse={pb.badCostPerUse}
              comparison={pb.badComparison}
              verdict={pb.badVerdict}
              verdictColor="text-red-400"
              borderColor="border-red-500/20 hover:border-red-500/40"
              glowColor="bg-red-500/20"
              revealLabel={pb.revealButton}
              icon={
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </FadeIn>
        </div>

        {/* Closing line */}
        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {pb.closingLine}
          </p>
        </FadeIn>

        {/* Boots Theory reference */}
        <FadeIn delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-navy-700" />
            <p className="text-sm text-slate-500 italic text-center max-w-lg">
              {pb.bootsTheory}
            </p>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-navy-700" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
