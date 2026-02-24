import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug, getCategoryGradient } from "@/lib/blog";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/settings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogRenderer from "@/components/blog/BlogRenderer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareBar from "@/components/blog/ShareBar";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ lang: locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      authors: ["Skip Or Buy"],
      images: [{ url: "/images/logo.png", width: 1024, height: 1024, alt: "Skip Or Buy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/images/logo.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Locale;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const dict = await getDictionary(lang);
  const gradient = getCategoryGradient(post.category);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: { "@type": "Organization", name: "Skip Or Buy" },
    publisher: {
      "@type": "Organization",
      name: "Skip Or Buy",
      logo: {
        "@type": "ImageObject",
        url: "https://skiporbuyapp.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://skiporbuyapp.com/${lang}/blog/${slug}`,
    },
    keywords: post.keywords.join(", "),
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://skiporbuyapp.com/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `https://skiporbuyapp.com/${lang}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <Header lang={lang} dict={dict} />
      <ShareBar title={post.title} slug={slug} />

      <main className="min-h-screen pt-24 pb-20 lg:pb-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />

        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link
              href={`/${lang}`}
              className="transition-colors hover:text-mint"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${lang}/blog`}
              className="transition-colors hover:text-mint"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-12 max-w-3xl">
            <span
              className={`inline-block rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-semibold text-white`}
            >
              {post.category}
            </span>

            <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>{post.readingTime} min read</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>Skip Or Buy Team</span>
            </div>

            {/* Gradient divider */}
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />
          </header>

          {/* Content area with sidebar TOC */}
          <div className="flex gap-12">
            {/* Table of Contents - desktop sidebar */}
            <aside className="hidden xl:block w-56 shrink-0">
              <TableOfContents />
            </aside>

            {/* Article content */}
            <article className="min-w-0 max-w-3xl flex-1">
              <BlogRenderer content={post.content} dict={dict} />
            </article>
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict} />
    </>
  );
}
