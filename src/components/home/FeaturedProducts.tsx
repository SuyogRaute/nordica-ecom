import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useCurrency } from '@/contexts/CurrencyContext';





export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { formatPrice } = useCurrency();

  const products = [
    {
      id: 1,
      name: "Premium Microfiber Towel Set",
      price: 34.99,
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&h=400&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Professional Foam Cannon",
      price: 89.99,
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop",
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Ceramic Coating Kit",
      price: 149.99,
      rating: 5.0,
      reviews: 421,
      image: "https://images.unsplash.com/photo-1625628226292-41f25a9418e5?w=600&h=400&fit=crop",
      badge: "Premium"
    },
    {
      id: 4,
      name: "Dual Action Polisher",
      price: 199.99,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
      badge: "Top Rated"
    },
    {
      id: 5,
      name: "All-in-One Detailing Kit",
      price: 124.99,
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=600&h=400&fit=crop",
      badge: "Popular"
    },
    {
      id: 6,
      name: "Glass Cleaning Kit",
      price: 45.99,
      rating: 4.6,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&h=400&fit=crop",
      badge: "Essential"
    },
    {
      id: 7,
      name: "Tire Shine & Dressing",
      price: 28.99,
      rating: 4.8,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
      badge: "Best Value"
    },
    {
      id: 8,
      name: "Interior Detailing Bundle",
      price: 79.99,
      rating: 4.9,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
      badge: "Complete Set"
    },
    {
      id: 9,
      name: "Paint Protection Film",
      price: 299.99,
      rating: 5.0,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&h=400&fit=crop",
      badge: "Professional"
    }
  ];

  const productsPerPage = 3;
  const totalSlides = products.length;
  const totalPages = Math.ceil(totalSlides / productsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + productsPerPage) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - productsPerPage;
      return newIndex < 0 ? Math.floor(totalSlides / productsPerPage) * productsPerPage : newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + productsPerPage) % totalSlides);
  };

  const goToPage = (index) => {
    setCurrentIndex(index * productsPerPage);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our most popular detailing products trusted by professionals worldwide
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / productsPerPage)}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>

                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {formatPrice(product.price)}
                    </p>

                    <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
            <button
              onClick={goToPrevious}
              className="h-12 w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-xl hover:scale-110 pointer-events-auto -translate-x-6 border-2 border-slate-200"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </button>
            <button
              onClick={goToNext}
              className="h-12 w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-xl hover:scale-110 pointer-events-auto translate-x-6 border-2 border-slate-200"
              aria-label="Next products"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / productsPerPage) === index
                  ? "w-10 bg-blue-600 shadow-lg"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto">
            View All Products
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}