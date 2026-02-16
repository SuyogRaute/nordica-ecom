import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BannerCarousel } from "@/components/home/addcoroseul";
import { MarqueeBar } from "@/components/home/marquee";
import { useEffect } from "react";
import BG from "@/assets/image.png"
import BG_MOBILE from "@/assets/hero-mobile.png"

export function HeroSection() {

  return (
    <>
      {/* Marquee Sale Bar */}
      <MarqueeBar />

      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={BG_MOBILE} />
            {/* <img
              src={BG}
              alt=""
              className="w-full h-full object-cover"
            /> */}
          </picture>
          {/* Dark overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-gradient-to-br 
from-black/80 
via-black/65
to-black/10
" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-primary blur-2xl" />
        </div>

        <div className="container-wide relative z-10 py-12 sm:py-16 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 text-primary mb-4 sm:mb-6 opacity-0 animate-fade-up">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Premium Car Care Products</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 opacity-0 animate-fade-up animation-delay-100">
                Professional Detailing
                <h2 className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 leading-tight">Made Simple</h2>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-up animation-delay-200 ">
                Premium car wash and detailing gear shipped directly to your door across north america. Achieve showroom results from your own driveway.
              </p>
              {/* Desktop CTAs - Hidden on mobile */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-up animation-delay-300">

                <Button variant="hero-outline" size="xl" className="text-white border-white/30 hover:bg-white/ 10 bg-primary" asChild>
                  <Link to="/products?category=Detailing-Accessories">
                    New Arrivals
                  </Link>
                </Button>
              </div>

              {/* Trust badges - Hidden on mobile */}
              <div className="hidden lg:block mt-10 pt-8 border-t border-white/10 opacity-0 animate-fade-up animation-delay-400">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-background/60 text-sm">
                  <div className="flex items-center gap-2">

                  </div>
                  {/* <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    100% Satisfaction
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Canadian Owned
                  </div> */}
                </div>
              </div>
            </div>

            {/* Banner Carousel Area */}
            <div className="relative opacity-0 animate-fade-up animation-delay-200">
              <BannerCarousel />

              {/* Mobile CTA Button - Shows only on mobile/tablet */}
              <div className="lg:hidden mt-6 flex flex-col gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full group shadow-xl shadow-primary/30"
                  asChild
                >
                  <Link to="/products" className="flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  variant="hero-outline"
                  size="lg"
                  className="w-full text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link to="/products?category=Detailing-Accessories" className="flex items-center justify-center">
                    New Arrivals
                  </Link>
                </Button>
              </div>

              {/* Floating stats card */}
              {/* <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-elevated p-1 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-1xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">4.9/5</p>
                    <p className="text-xs text-muted-foreground">2,500+ Reviews</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}