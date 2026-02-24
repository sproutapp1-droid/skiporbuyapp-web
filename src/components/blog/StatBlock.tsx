"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatBlockProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  format?: "currency" | "percentage" | "number";
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  format = "number",
}: Omit<StatBlockProps, "label">) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      if (format === "currency") {
        setDisplay(current.toLocaleString());
      } else if (format === "percentage") {
        setDisplay(current.toString());
      } else {
        setDisplay(current.toLocaleString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, format]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function StatBlock({ stats }: { stats: StatBlockProps[] }) {
  return (
    <div
      className={`my-8 grid gap-4 ${
        stats.length === 1
          ? "grid-cols-1 max-w-sm mx-auto"
          : stats.length === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6 text-center transition-all hover:border-mint/20 hover:shadow-lg hover:shadow-mint/5"
        >
          <div className="font-heading text-3xl font-bold text-white md:text-4xl">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              format={stat.format}
            />
          </div>
          <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
