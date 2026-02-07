import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useCurrency } from '@/contexts/CurrencyContext';
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { formatPrice } = useCurrency();

  const products = [
    {
      id: 1,
      name: "dirt Lock Car Wash Insert – Bucket Filter for 3–8 Gallon Round Pails – Traps Debris, Prevents Swirl Marks – Self-Locking Rubber Grips, Venturi Flow, Cleaning Tool ",
      price: 24.99,
      rating: 4.9,
      reviews: 234,
      image: "https://m.media-amazon.com/images/I/71FKBeRc4cL._AC_SX679_.jpg",
      badge: "Premium",
      url: "https://www.amazon.com/Detail-Guardz-Dirt-Bucket-Insert/dp/B07CKC4M9D?ref_=ast_sto_dp&th=1"
    },
    {
      id: 2,
      name: "Dirt Lock Scrub Wall 180/360 – Washboard Attachment Dirt Lock - Bucket Filter – Vertical Cleaning Tool for Brushes, Mitts",
      price: 20.99,
      rating: 4.8,
      reviews: 189,
      image: "https://m.media-amazon.com/images/I/71PucAJR9iL._AC_SX466_.jpg",
      badge: "Premium",
      url: "https://www.amazon.com/DETAIL-GUARDZ-Bucket-Filter-Washboard/dp/B09CRX2D31?ref_=ast_sto_dp&th=1"
    },
    {
      id: 3,
      name: "The Dirt Lock Scrub and Pump Attachment for Car Wash Bucket Filter",
      price: 16.99,
      rating: 5.0,
      reviews: 421,
      image: "https://m.media-amazon.com/images/I/71FXvGVXeHS._AC_SX466_.jpg",
      badge: "Premium",
      url: "https://www.amazon.com/DETAIL-GUARDZ-Attachment-Bucket-Filter/dp/B08FTK9PJJ?ref_=ast_sto_dp&th=1"
    },
    // {
    //   id: 4,
    //   name: "Dirt Lock Scrub and Pump Bundle Complete Kit (Includes Dirt Lock Car Wash Bucket Filter) ",
    //   price: 199.99,
    //   rating: 4.9,
    //   reviews: 156,
    //   image: "https://m.media-amazon.com/images/S/aplus-media/sc/8b3aa2c3-50fc-492d-b032-301bd651808d.__CR0,244,1000,619_PT0_SX970_V1___.jpg",
    //   badge: "Premium",
    //   url: "https://www.amazon.com/DETAIL-GUARDZ-Bundle-Complete-Bucket/dp/B08WWPLGNB?ref_=ast_sto_dp"
    // },
    {
      id: 5,
      name: "Dirt Lock Pad Washer System Attachment with Spray Cleaner",
      price: 124.99,
      rating: 4.7,
      reviews: 312,
      image: "https://m.media-amazon.com/images/I/710cuaz8RzS._AC_SX466_.jpg",
      badge: "Popular",
      url: "https://www.amazon.com/Detail-Guardz-Washer-Attachment-Cleaner/dp/B07VGMKW7S?ref_=ast_sto_dp&th=1"
    },
    {
      id: 6,
      name: "The Dirt Lock Pad Washer Bundle Complete Kit (Black) Includes Dirt Lock Bucket Filter",
      price: 45.99,
      rating: 4.6,
      reviews: 198,
      image: "https://m.media-amazon.com/images/I/61jDCK8t-1S._AC_SX466_.jpg",
      badge: "Premium",
      url: "https://www.amazon.com/DETAIL-GUARDZ-Washer-Bundle-Complete/dp/B088WZ9STB?ref_=ast_sto_dp"
    },
    {
      id: 7,
      name: "Hose Guide – 4pcs Plastic Hose Roller for Cars, Trucks & Motorcycles - Car Wheel Rolling System Tool Preventing Stucking and Snagging Under Tires ",
      price: 28.99,
      rating: 4.8,
      reviews: 267,
      image: "https://m.media-amazon.com/images/I/61wf9wewH5L._AC_SX466_.jpg",
      badge: "Premium",
      url: "https://www.amazon.com/DETAIL-GUARDZ-Hose-Guide-Motorcycles/dp/B0FHKTM2YW?ref_=ast_sto_dp&th=1"
    },
    // {
    //   id: 8,
    //   name: "The Microfiber and Foam Pad Cleaner Spray (6X 650ML)",
    //   price: 79.99,
    //   rating: 4.9,
    //   reviews: 345,
    //   image: "https://m.media-amazon.com/images/I/8153MDtrc5L._AC_SX466_.jpg",
    //   badge: "Premium",
    //   url: "https://www.amazon.com/DETAIL-GUARDZ-Microfiber-Cleaner-Spray/dp/B08WT79STZ?ref_=ast_sto_dp"
    // },
    // {
    //   id: 9,
    //   name: " Car Hose Guides (2 Pack Black)",
    //   price: 299.99,
    //   rating: 5.0,
    //   reviews: 178,
    //   image: "https://m.media-amazon.com/images/I/61d5UKVXwoL._AC_SX466_.jpg",
    //   badge: "Premium",
    //   url: "https://www.amazon.com/Detail-Guardz-Hose-Guide-Black/dp/B07ND4L2ML?ref_=ast_sto_dp&th=1"
    // }
  ];

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = products.length;
  const maxIndex = totalSlides - itemsPerPage;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next > maxIndex ? 0 : next;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, maxIndex]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? maxIndex : next;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [goToNext]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const totalDots = maxIndex + 1;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
            Discover our most popular detailing products trusted by professionals worldwide
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group h-full">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <span className="px-2 py-1 md:px-3 md:py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                          {product.badge}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      

                      <h3 className="text-sm md:text-sm font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem]">
                        {product.name}
                      </h3>

                      <p className="text-xl md:text-2xl font-bold text-blue-600 mb-3 md:mb-4">
                        {formatPrice(product.price)}
                      </p>
                      <Link
                        to={`${product.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <button className="w-full px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-xl hover:scale-110 pointer-events-auto -translate-x-4 md:-translate-x-6 border-2 border-slate-200 disabled:opacity-50"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
              </button>
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-xl hover:scale-110 pointer-events-auto translate-x-4 md:translate-x-6 border-2 border-slate-200 disabled:opacity-50"
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
              </button>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-10">
          {[...Array(totalDots)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${currentIndex === index
                  ? "w-8 md:w-10 bg-blue-600 shadow-lg"
                  : "w-2 md:w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden justify-center gap-3 mt-6">
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="h-10 w-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-md disabled:opacity-50"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5 text-gray-900" />
          </button>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="h-10 w-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-md disabled:opacity-50"
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5 text-gray-900" />
          </button>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link to={'/products'}>
          <button className="px-6 py-2.5 md:px-8 md:py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto text-sm md:text-base">
            View All Products
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}