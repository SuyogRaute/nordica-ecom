import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Shared Product Data
const productSlides = [
  {
    image: "https://m.media-amazon.com/images/I/71FKBeRc4cL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    title: "Bucket Filter",
    subtitle: "Premium Quality",
    description: "Dirt Lock Car Wash Insert – Traps Debris, Prevents Swirl Marks",
  },
  {
    image: "https://m.media-amazon.com/images/I/710cuaz8RzS._AC_SX466_.jpg",
    title: "Dirt Lock Pad Washer System",
    subtitle: "Professional Grade",
    description: "Dirt Lock Pad Washer System with Spray Cleaner",
  },
  {
    image: "https://m.media-amazon.com/images/I/71D+tIPz01L._AC_SL1500_.jpg",
    title: "Dirt Lock Scrub Wall",
    subtitle: "Essential Tool",
    description: "Washboard Attachment – Vertical Cleaning for Brushes & Mitts",
  }
];

export function BannerCarousel() {
  return (
    <>
      {/* Desktop Carousel - Hidden on mobile */}
      <div className="hidden md:block">
        <DesktopCarousel />
      </div>

      {/* Mobile Carousel - Hidden on desktop */}
      <div className="md:hidden">
        <MobileCarousel />
      </div>
    </>
  );
}

// --- DESKTOP CAROUSEL COMPONENT ---
function DesktopCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () => setCurrentSlide((prev) => (prev === 0 ? productSlides.length - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % productSlides.length);

  return (
    <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 group border border-primary/10">
      <div className="relative w-full h-full">
        {productSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          >
            <div className="absolute inset-0 grid grid-cols-2">
              {/* Product Image Side */}
              <div className="relative bg-gradient-to-br from-white via-slate-50 to-slate-100 h-full">
                <div className="flex items-center justify-center p-6 lg:p-4 h-full">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-[90%] h-[90%] object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>
              </div>

              {/* Content Side */}
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center p-8 lg:p-10 flex">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                </div>
                <div className="relative z-10 space-y-4 max-w-md w-full">
                  {slide.subtitle && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-lg shadow-primary/20">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-semibold text-primary tracking-wide uppercase">{slide.subtitle}</span>
                    </div>
                  )}
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{slide.title}</h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-primary via-primary to-yellow-400 rounded-full shadow-lg shadow-primary/30" />
                    <div className="h-1 w-6 bg-gradient-to-r from-yellow-400 to-transparent rounded-full" />
                  </div>
                  <p className="text-base lg:text-lg text-slate-300 leading-relaxed">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Controls */}
      <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-xl">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-xl">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {productSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-10 bg-primary shadow-lg shadow-primary/50" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- MOBILE CAROUSEL COMPONENT ---
function MobileCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? productSlides.length - 1 : prev - 1));
    }
  };
  return (
    <div
      className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-primary/10 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full h-full">
        {productSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? "opacity-100 scale-100 animate-slide-hint" : "opacity-0 scale-105"}`}
          >
            <div className="relative h-full grid grid-cols-2 gap-2 p-2">
              {/* Background Accents */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Image Side */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full h-full bg-gradient-to-br from-white to-slate-100 rounded-xl p-2 shadow-xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '12px 12px' }} />
                </div>
              </div>

              {/* Content Side */}
              <div className="relative flex flex-col">
                {/* Subtitle Badge at Top */}
                {slide.subtitle && (
                  <div className="mb-2">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
                      <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-bold text-primary tracking-wide uppercase">{slide.subtitle}</span>
                    </div>
                  </div>
                )}

                {/* Title and Description Card - Full Height */}
                <div className="flex-1 bg-slate-800/90 backdrop-blur-xl rounded-xl p-3 border border-slate-700/50 shadow-xl flex flex-col justify-center space-y-2">
                  <h3 className="text-sm font-bold text-white leading-tight">{slide.title}</h3>
                  <div className="h-0.5 w-10 bg-primary rounded-full" />
                  <p className="text-[10px] text-slate-300 leading-relaxed">{slide.description}</p>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shine" />
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Style for shine animation */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 4s infinite;
        }
        @keyframes slide-hint {
          0%, 85%, 100% { transform: translateX(0); }
          90% { transform: translateX(-12px); }
          95% { transform: translateX(-6px); }
        }
        .animate-slide-hint {
          animation: slide-hint 4s infinite ease-in-out;
        }
      `}</style>
    </div>

  );
}

export default BannerCarousel;

//testing

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import productVideo from "@/assets/product-video.mp4";

// // Shared Product Data
// const productSlides = [
//   {
//     image: "https://m.media-amazon.com/images/I/71FKBeRc4cL._AC_SY300_SX300_QL70_FMwebp_.jpg",
//     title: "Bucket Filter",
//     subtitle: "Premium Quality",
//     description: "Dirt Lock Car Wash Insert – Traps Debris, Prevents Swirl Marks",
//   },
//   {
//     image: "https://m.media-amazon.com/images/I/710cuaz8RzS._AC_SX466_.jpg",
//     title: "Dirt Lock Pad Washer System",
//     subtitle: "Professional Grade",
//     description: "Dirt Lock Pad Washer System with Spray Cleaner",
//   },
//   {
//     image: "https://m.media-amazon.com/images/I/71D+tIPz01L._AC_SL1500_.jpg",
//     title: "Dirt Lock Scrub Wall",
//     subtitle: "Essential Tool",
//     description: "Washboard Attachment – Vertical Cleaning for Brushes & Mitts",
//   }
// ];

// export function BannerCarousel() {
//   return (
//     <>
//       {/* Desktop Carousel - Hidden on mobile */}
//       <div className="hidden md:block">
//         <DesktopCarousel />
//       </div>

//       {/* Mobile Carousel - Hidden on desktop */}
//       <div className="md:hidden">
//         <MobileCarousel />
//       </div>
//     </>
//   );
// }

// // --- DESKTOP CAROUSEL COMPONENT ---
// function DesktopCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % productSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const goToSlide = (index: number) => setCurrentSlide(index);
//   const goToPrevious = () =>
//     setCurrentSlide((prev) => (prev === 0 ? productSlides.length - 1 : prev - 1));
//   const goToNext = () =>
//     setCurrentSlide((prev) => (prev + 1) % productSlides.length);

//   return (
//     <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 group border border-primary/10">
//       <div className="relative w-full h-full">
//         {/* VIDEO SIDE (new) */}
//         <div className="absolute inset-0 grid grid-cols-2">
//           <div className="relative bg-black h-full">
//             <video
//               src={productVideo}
//               className="w-full h-full object-cover"
//               autoPlay
//               muted
//               loop
//               playsInline
//             />
//           </div>

//           {/* Content Side (unchanged) */}
//           <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center p-8 lg:p-10 flex">
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl animate-pulse" />
//               <div
//                 className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-2xl animate-pulse"
//                 style={{ animationDelay: "1.5s" }}
//               />
//             </div>
//             <div className="relative z-10 space-y-4 max-w-md w-full">
//               {productSlides[currentSlide].subtitle && (
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-lg shadow-primary/20">
//                   <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
//                   <span className="text-xs font-semibold text-primary tracking-wide uppercase">
//                     {productSlides[currentSlide].subtitle}
//                   </span>
//                 </div>
//               )}
//               <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
//                 {productSlides[currentSlide].title}
//               </h2>
//               <div className="flex items-center gap-2">
//                 <div className="h-1 w-12 bg-gradient-to-r from-primary via-primary to-yellow-400 rounded-full shadow-lg shadow-primary/30" />
//                 <div className="h-1 w-6 bg-gradient-to-r from-yellow-400 to-transparent rounded-full" />
//               </div>
//               <p className="text-base lg:text-lg text-slate-300 leading-relaxed">
//                 {productSlides[currentSlide].description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* OLD IMAGE CARDS COMMENTED OUT */}
//         {/*
//         {productSlides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-all duration-700 ${
//               index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
//             }`}
//           >
//             <div className="absolute inset-0 grid grid-cols-2">
//               <div className="relative bg-gradient-to-br from-white via-slate-50 to-slate-100 h-full">
//                 <div className="flex items-center justify-center p-6 lg:p-4 h-full">
//                   <div className="absolute inset-0 opacity-30">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
//                     <div
//                       className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"
//                       style={{ animationDelay: "1s" }}
//                     />
//                   </div>
//                   <div className="relative z-10 w-full h-full flex items-center justify-center">
//                     <img
//                       src={slide.image}
//                       alt={slide.title}
//                       className="w-[90%] h-[90%] object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-110"
//                     />
//                   </div>
//                   <div
//                     className="absolute inset-0 opacity-[0.03]"
//                     style={{
//                       backgroundImage:
//                         "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
//                       backgroundSize: "20px 20px",
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center p-8 lg:p-10 flex">
//                 ...
//               </div>
//             </div>
//           </div>
//         ))}
//         */}
//       </div>

//       {/* Desktop Controls */}
//       <button
//         onClick={goToPrevious}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-xl"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={goToNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-xl"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>

//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
//         {productSlides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`h-2.5 rounded-full transition-all duration-300 ${
//               index === currentSlide
//                 ? "w-10 bg-primary shadow-lg shadow-primary/50"
//                 : "w-2.5 bg-white/40 hover:bg-white/60"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- MOBILE CAROUSEL COMPONENT ---
// function MobileCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [touchStart, setTouchStart] = useState<number | null>(null);
//   const [touchEnd, setTouchEnd] = useState<number | null>(null);

//   const minSwipeDistance = 50;

//   const onTouchStart = (e: React.TouchEvent) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchMove = (e: React.TouchEvent) =>
//     setTouchEnd(e.targetTouches[0].clientX);

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;

//     if (isLeftSwipe) {
//       setCurrentSlide((prev) => (prev + 1) % productSlides.length);
//     } else if (isRightSwipe) {
//       setCurrentSlide((prev) =>
//         prev === 0 ? productSlides.length - 1 : prev - 1
//       );
//     }
//   };

//   return (
//     <div
//       className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-primary/10 touch-pan-y"
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//     >
//       <div className="relative w-full h-full">
//         {/* VIDEO FOR MOBILE */}
//         <div className="absolute inset-0">
//           <video
//             src={productVideo}
//             className="w-full h-full object-cover"
//             autoPlay
//             muted
//             loop
//             playsInline
//           />
//         </div>

//         {/* OLD IMAGE CARDS COMMENTED OUT */}
//         {/*
//         {productSlides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-all duration-700 ${
//               index === currentSlide ? "opacity-100 scale-100 animate-slide-hint" : "opacity-0 scale-105"
//             }`}
//           >
//             <div className="relative h-full grid grid-cols-2 gap-2 p-2">
//               ...
//             </div>
//           </div>
//         ))}
//         */}
//       </div>

//       {/* Style for shine animation (kept in case you re-enable cards) */}
//       <style>{`
//         @keyframes shine {
//           0% { transform: translateX(-100%) skewX(-12deg); }
//           100% { transform: translateX(200%) skewX(-12deg); }
//         }
//         .animate-shine {
//           animation: shine 4s infinite;
//         }
//         @keyframes slide-hint {
//           0%, 85%, 100% { transform: translateX(0); }
//           90% { transform: translateX(-12px); }
//           95% { transform: translateX(-6px); }
//         }
//         .animate-slide-hint {
//           animation: slide-hint 4s infinite ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default BannerCarousel;
