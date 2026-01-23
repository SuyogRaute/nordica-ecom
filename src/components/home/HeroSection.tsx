import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
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

          {/* Video/Image Area */}
          <div className="relative opacity-0 animate-fade-up animation-delay-200">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-foreground/50">
  {!videoPlaying ? (
    <>
      {/* Thumbnail */}
      <img
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        className="w-full h-full object-cover"
        alt="Video preview"
      />

      {/* Play Button */}
      <button
        onClick={() => setVideoPlaying(true)}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-primary-foreground ml-1" />
          </div>
        </div>
      </button>
    </>
  ) : (
    <>
      {/* ================= OPTION 1: LOCAL VIDEO ================= */}
      {/* Uncomment this if you want local video */}
      {/*
      <video
        src={v}
        autoPlay
        controls
        className="absolute inset-0 w-full h-full object-cover"
      />
      */}

      {/* ================= OPTION 2: YOUTUBE VIDEO ================= */}
     <iframe
  className="absolute inset-0 w-full h-full"
  src="https://www.youtube.com/embed/6_65LmVJBYk?si=GIW14sJ7uXwHYG9l?autoplay=1&rel=0"
  title="YouTube video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>


      {/* Close Button */}
      <button
        onClick={() => setVideoPlaying(false)}
        className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm hover:bg-black"
      >
        ✕ Close
      </button>
    </>
  )}
</div>


            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-elevated p-1 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-1xl">⭐</span>
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
  );
}