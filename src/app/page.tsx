import { Hero } from "@/components/Hero";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { Pricing } from "@/components/Pricing";
import { WashFeatures } from "@/components/WashFeatures";
import { Impact } from "@/components/Impact";
import { VisitUs } from "@/components/VisitUs";
import { FaqPreview } from "@/components/FaqPreview";
import { CTABanner } from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <Pricing />
      <WashFeatures />
      <Impact />
      <VisitUs />
      <FaqPreview />
      <CTABanner />
    </>
  );
}
