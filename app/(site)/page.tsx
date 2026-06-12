import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { ProductsShowcase } from "@/components/home/products-showcase";
import { FeaturesSection } from "@/components/home/features-section";
import { ConfiguratorTeaser } from "@/components/home/configurator-teaser";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <ProductsShowcase />
      <FeaturesSection />
      <ConfiguratorTeaser />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
