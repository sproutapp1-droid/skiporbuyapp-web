import { getDictionary } from "@/i18n/getDictionary";
import { type Locale } from "@/i18n/settings";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemBridge from "@/components/ProblemBridge";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PhoneShowcase from "@/components/PhoneShowcase";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ComingSoon from "@/components/ComingSoon";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main>
        <Hero dict={dict} lang={lang} />
        <ProblemBridge dict={dict} />
        <Features dict={dict} />
        <HowItWorks dict={dict} />
        <PhoneShowcase dict={dict} lang={lang} />
        <Pricing dict={dict} />
        <FAQ dict={dict} />
        <CTA dict={dict} />
      </main>
      <Footer lang={lang} dict={dict} />
      <CookieBanner lang={lang} dict={dict} />
      <ComingSoon dict={dict} />
    </>
  );
}
