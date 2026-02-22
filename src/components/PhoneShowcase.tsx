"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/settings";

const screenshotNumbers = [3, 2, 5, 6];

export default function PhoneShowcase({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const screenshots = screenshotNumbers.map((num) => ({
    src: `/images/screenshots/${lang}-${num}.png`,
    alt: `Skip Or Buy app screenshot ${num}`,
  }));

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const callouts = [
    {
      title: dict.phoneShowcase.instantVerdicts,
      description: dict.phoneShowcase.instantVerdictsDesc,
      side: "left" as const,
      color: "text-verdict-worth",
      borderColor: "border-verdict-worth/20",
    },
    {
      title: dict.phoneShowcase.smartCategories,
      description: dict.phoneShowcase.smartCategoriesDesc,
      side: "left" as const,
      color: "text-verdict-think",
      borderColor: "border-verdict-think/20",
    },
    {
      title: dict.phoneShowcase.compareSideBySide,
      description: dict.phoneShowcase.compareSideBySideDesc,
      side: "right" as const,
      color: "text-mint",
      borderColor: "border-mint/20",
    },
    {
      title: dict.phoneShowcase.shareCards,
      description: dict.phoneShowcase.shareCardsDesc,
      side: "right" as const,
      color: "text-verdict-skip",
      borderColor: "border-verdict-skip/20",
    },
  ];

  const leftCallouts = callouts.filter((c) => c.side === "left");
  const rightCallouts = callouts.filter((c) => c.side === "right");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-navy-700 to-transparent" />

      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-mint blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {dict.phoneShowcase.title}{" "}
              <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
                {dict.phoneShowcase.titleAccent}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              {dict.phoneShowcase.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-12">
          {/* Left callouts */}
          <div className="flex flex-col gap-5 lg:w-72">
            {leftCallouts.map((callout, i) => (
              <FadeIn key={callout.title} delay={i * 0.12} direction="right">
                <div className={`group rounded-xl border ${callout.borderColor} bg-navy-800/30 p-5 text-right backdrop-blur-sm transition-all duration-300 hover:bg-navy-800/60 hover:shadow-lg lg:text-right`}>
                  <h3 className={`font-heading font-semibold ${callout.color}`}>
                    {callout.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                    {callout.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Screenshot Carousel */}
          <FadeIn delay={0.15}>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-[280px] sm:w-[320px] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/80">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <Image
                        src={screenshots[currentIndex].src}
                        alt={screenshots[currentIndex].alt}
                        width={640}
                        height={1386}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Navigation arrows */}
              <button
                onClick={goPrev}
                className="absolute left-[-48px] top-1/2 -translate-y-1/2 hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-navy-700/50 bg-navy-800/80 text-slate-400 backdrop-blur-sm transition-all hover:border-mint/30 hover:text-mint hover:bg-navy-800"
                aria-label="Previous screenshot"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="absolute right-[-48px] top-1/2 -translate-y-1/2 hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-navy-700/50 bg-navy-800/80 text-slate-400 backdrop-blur-sm transition-all hover:border-mint/30 hover:text-mint hover:bg-navy-800"
                aria-label="Next screenshot"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="mt-6 flex justify-center gap-2">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-6 bg-mint"
                        : "w-2 bg-navy-700 hover:bg-navy-600"
                    }`}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right callouts */}
          <div className="flex flex-col gap-5 lg:w-72">
            {rightCallouts.map((callout, i) => (
              <FadeIn key={callout.title} delay={i * 0.12 + 0.25} direction="left">
                <div className={`group rounded-xl border ${callout.borderColor} bg-navy-800/30 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-navy-800/60 hover:shadow-lg`}>
                  <h3 className={`font-heading font-semibold ${callout.color}`}>
                    {callout.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                    {callout.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
