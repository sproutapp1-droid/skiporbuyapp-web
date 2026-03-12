"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import StoreBadges from "./StoreBadges";
import type { Dictionary } from "@/i18n/getDictionary";

export default function CTA({ dict }: { dict: Dictionary }) {
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
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
