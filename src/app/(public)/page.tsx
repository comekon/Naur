import HeroSection from "@/components/sections/landing/HeroSection";
import MarqueeSection from "@/components/sections/landing/MarqueeSection";
import FeaturedMenuSection from "@/components/sections/landing/FeaturedMenuSection";
import OriginStorySection from "@/components/sections/landing/OriginStorySection";
import BestSellerSection from "@/components/sections/landing/BestSellerSection";
import LatestArticlesSection from "@/components/sections/landing/LatestArticlesSection";
import TestimonialSection from "@/components/sections/landing/TestimonialSection";
import CtaBannerSection from "@/components/sections/landing/CtaBannerSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <FeaturedMenuSection />
      <OriginStorySection />
      <BestSellerSection />
      <LatestArticlesSection />
      <TestimonialSection />
      <CtaBannerSection />
    </>
  );
}
