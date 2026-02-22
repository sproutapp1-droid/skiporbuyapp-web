"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";
import StoreBadges from "./StoreBadges";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";

export default function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const screenshotSrc = `/images/screenshots/${lang}-1.png`;

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
              <StoreBadges dict={dict} className="mt-10 justify-center lg:justify-start" />
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
