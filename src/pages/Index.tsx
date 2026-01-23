import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { Helmet } from "react-helmet";
import  FeaturesProducts  from "@/components/home/FeaturedProducts";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Detail Guardz | Premium Car Care Products in Canada</title>
        <meta
          name="description"
          content="Shop premium car wash and detailing products shipped across Canada. Professional-quality microfiber, wash mitts, chemicals & accessories. Free shipping over $75."
        />
        <meta name="keywords" content="car detailing, car wash, microfiber, detailing supplies, car care, Canada" />
        <link rel="canonical" href="https://detailguardz.com" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <FeaturesProducts />
          <FeaturesSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
