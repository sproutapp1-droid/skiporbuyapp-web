import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { getDictionary } from "@/i18n/getDictionary";
import { type Locale } from "@/i18n/settings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/blog/CategoryFilter";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Smart shopping tips, cost per use guides, and money-saving strategies to help you buy less but better.",
  keywords: [
    "cost per use",
    "impulse buying",
    "no spend challenge",
    "smart shopping",
    "money saving tips",
    "budgeting",
  ],
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Skip Or Buy Blog",
    description:
      "Smart shopping tips, cost per use guides, and money-saving strategies",
    url: `https://skiporbuyapp.com/${lang}/blog`,
  };

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="min-h-screen pt-24 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />

        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                The{" "}
                <span className="bg-gradient-to-r from-mint to-emerald-400 bg-clip-text text-transparent">
                  Skip Or Buy
                </span>{" "}
                Blog
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                Smart shopping tips, cost per use guides, and money-saving
                strategies to help you buy less but better.
              </p>
            </div>
          </FadeIn>

          <CategoryFilter posts={posts} lang={lang} />
        </div>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
