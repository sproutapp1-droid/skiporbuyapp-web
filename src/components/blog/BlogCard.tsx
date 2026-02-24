"use client";

import Link from "next/link";
import { getCategoryGradient } from "@/lib/blog-types";
import type { BlogPostMeta } from "@/lib/blog-types";
import type { Locale } from "@/i18n/settings";

export default function BlogCard({
  post,
  lang,
}: {
  post: BlogPostMeta;
  lang: Locale;
}) {
  const gradient = getCategoryGradient(post.category);

  return (
    <Link href={`/${lang}/blog/${post.slug}`}>
      <article className="group h-full rounded-2xl border border-navy-700/50 bg-navy-800/30 transition-all hover:border-mint/20 hover:bg-navy-800/60 hover:shadow-xl hover:shadow-mint/5">
        {/* Category gradient bar */}
        <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${gradient}`} />

        <div className="p-6">
          {/* Category pill */}
          <span
            className={`inline-block rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-semibold text-white`}
          >
            {post.category}
          </span>

          {/* Title */}
          <h3 className="mt-4 font-heading text-lg font-bold text-white transition-colors group-hover:text-mint line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-slate-400 line-clamp-3">
            {post.description}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
