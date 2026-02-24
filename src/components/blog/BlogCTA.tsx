"use client";

import { motion } from "framer-motion";
import StoreBadges from "../StoreBadges";
import type { Dictionary } from "@/i18n/getDictionary";

export default function BlogCTA({ dict }: { dict: Dictionary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative my-12 overflow-hidden rounded-2xl border border-navy-700/50 bg-gradient-to-br from-navy-800/80 to-navy-800/30 px-8 py-12 text-center backdrop-blur-sm"
    >
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-mint/10 blur-[60px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [20, -20, 20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-purple-500/8 blur-[60px]"
      />

      <div className="relative">
        <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
          Calculate the real cost{" "}
          <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
            before you buy
          </span>
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          Stop guessing. Skip or Buy shows you the cost per use of anything — so
          you only buy what&apos;s truly worth it.
        </p>
        <StoreBadges dict={dict} className="mt-8 justify-center" />
      </div>
    </motion.div>
  );
}
