import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "@/i18n/settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Skip Or Buy: Worth It? — Cost Per Use Calculator App",
    template: "%s | Skip Or Buy: Worth It?",
  },
  description:
    "Calculate the cost per use of anything before you buy. Compare products, get instant verdicts, and make smarter purchase decisions. One-time purchase — no subscription, no ads.",
  keywords: [
    "cost per use calculator",
    "price per use",
    "cost per wear",
    "is it worth buying",
    "worth it calculator",
    "purchase decision tool",
    "skip or buy",
    "price per wear calculator",
    "cost per use app",
    "should I buy it",
    "value for money calculator",
    "compare products value",
    "smart shopping app",
    "buy or skip",
    "cost per use clothing",
    "cost per use electronics",
    "cost per use shoes",
    "price per use app",
    "pre-purchase calculator",
    "spending decision app",
  ],
  authors: [{ name: "Skip Or Buy" }],
  creator: "Skip Or Buy",
  publisher: "Skip Or Buy",
  metadataBase: new URL("https://skiporbuyapp.com"),
  alternates: {
    canonical: "https://skiporbuyapp.com",
    languages: {
      en: "/en",
      es: "/es",
      fr: "/fr",
      de: "/de",
      zh: "/zh",
      "zh-HK": "/zh-HK",
      ja: "/ja",
      it: "/it",
    },
  },
  openGraph: {
    title: "Skip Or Buy: Worth It? — Know the Real Cost Before You Buy",
    description:
      "Calculate the cost per use of anything in seconds. 33 built-in categories with smart benchmarks. Compare products side by side. One-time purchase — no subscription, no ads.",
    url: "https://skiporbuyapp.com",
    siteName: "Skip Or Buy: Worth It?",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/images/logo.png",
        width: 1024,
        height: 1024,
        alt: "Skip Or Buy: Worth It? App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skip Or Buy: Worth It? — Cost Per Use Calculator",
    description:
      "Calculate the cost per use of anything before you buy. Compare products, get instant verdicts. No subscription, no ads.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "utilities",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Skip Or Buy: Worth It?",
    description:
      "Calculate the cost per use of anything before you buy. Compare products, get instant verdicts, and make smarter purchase decisions.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "4.99",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: undefined,
    url: "https://skiporbuyapp.com",
    image: "https://skiporbuyapp.com/images/logo.png",
    author: {
      "@type": "Organization",
      name: "Skip Or Buy",
      email: "skiporbuyapp@gmail.com",
      url: "https://skiporbuyapp.com",
    },
    keywords:
      "cost per use, price per use, cost per wear, worth it calculator, purchase decision, compare products, smart shopping",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is cost per use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cost per use is a simple formula: the total price of an item divided by the number of times you use it. It tells you the real value of a purchase.",
        },
      },
      {
        "@type": "Question",
        name: "Is Skip Or Buy a subscription?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Skip Or Buy: Worth It? is a one-time purchase. You pay once and own it forever. There are no subscriptions, no ads, and no in-app purchases.",
        },
      },
      {
        "@type": "Question",
        name: "What categories are included in the cost per use calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The app includes 33 built-in categories covering clothing, footwear, electronics, kitchen items, furniture, fitness gear, beauty products, and more. Each category comes with real-world benchmarks.",
        },
      },
      {
        "@type": "Question",
        name: "Does the cost per use app need internet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The app works completely offline. All calculations happen on your device.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data stored in the cloud?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All your data is stored locally on your device. We don't have accounts, cloud storage, or any way to access your data.",
        },
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Skip Or Buy: Worth It?",
    url: "https://skiporbuyapp.com",
    description:
      "Cost per use calculator app — know the real cost before you buy.",
    publisher: {
      "@type": "Organization",
      name: "Skip Or Buy",
      email: "skiporbuyapp@gmail.com",
    },
  };

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="canonical" href={`https://skiporbuyapp.com/${lang}`} />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
