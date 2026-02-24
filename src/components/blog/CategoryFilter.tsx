"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/blog-types";
import type { BlogPostMeta } from "@/lib/blog-types";
import type { Locale } from "@/i18n/settings";
import BlogCard from "./BlogCard";

export default function CategoryFilter({
  posts,
  lang,
}: {
  posts: BlogPostMeta[];
  lang: Locale;
}) {
  const [active, setActive] = useState("All");

  const categoryCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: posts.filter((p) => p.category === cat.name).length,
  }));

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Filter pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("All")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            active === "All"
              ? "bg-mint text-navy-900 font-semibold"
              : "border border-navy-700/50 bg-navy-800/30 text-slate-400 hover:border-navy-600 hover:text-slate-300"
          }`}
        >
          All
          <span className="ml-1.5 text-xs opacity-70">{posts.length}</span>
        </button>
        {categoryCounts.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === cat.name
                ? "bg-mint text-navy-900 font-semibold"
                : "border border-navy-700/50 bg-navy-800/30 text-slate-400 hover:border-navy-600 hover:text-slate-300"
            }`}
          >
            {cat.name}
            <span className="ml-1.5 text-xs opacity-70">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard post={post} lang={lang} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
