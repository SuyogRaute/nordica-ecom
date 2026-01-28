import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BannerCarousel } from "@/components/home/addcoroseul";
import { MarqueeBar } from "@/components/home/marquee";
import { useEffect } from "react";

export function HeroSection() {
  
  return (
    <>
      {/* Marquee Sale Bar */}
      <MarqueeBar />
      
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 via-foreground/85 to-foreground/80" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-primary blur-2xl" />
        </div>

        <div className="container-wide relative z-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 opacity-0 animate-fade-up">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Premium Car Care Products</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6 opacity-0 animate-fade-up animation-delay-100">
                Professional Detailing
                <span className="block text-primary">Made Simple</span>
              </h1>

              <p className="text-lg sm:text-xl text-background/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-up animation-delay-200">
                Premium car wash and detailing gear shipped directly to your door across Canada. Achieve showroom results from your own driveway.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-up animation-delay-300">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" className="text-background border-background/20 hover:bg-background/10" asChild>
                  <Link to="/shop/new">
                    New Arrivals
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-10 pt-8 border-t border-background/10 opacity-0 animate-fade-up animation-delay-400">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-background/60 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Free Shipping Over $75
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    100% Satisfaction
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Canadian Owned
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Carousel Area */}
            <div className="relative opacity-0 animate-fade-up animation-delay-200">
              <BannerCarousel />

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-elevated p-4 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">4.9/5</p>
                    <p className="text-xs text-muted-foreground">2,500+ Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}