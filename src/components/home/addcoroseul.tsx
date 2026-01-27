import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner slides - admin can easily update these
  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
      alt: "Banner 1"
    },
    {
      image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&h=600&fit=crop",
      alt: "Banner 2"
    },
    {
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
      alt: "Banner 3"
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? bannerSlides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-foreground/50 group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}