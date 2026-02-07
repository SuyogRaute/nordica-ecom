export interface Video {
  url: string;
  title: string;
  description?: string;
  subtitle?: string;
}

export interface Review {
  name: string;
  rating: number;
  title: string;
  date: string;
  verified: boolean;
  comment: string;
  images?: string[];
  helpfulCount: number;
}

export interface Specifications {
  brand: string;
  material: string;
  weight: string;
  dimensions: string;
  capacity?: string;
  manufacturer: string;
}

export interface RatingBreakdown {
  stars: number;
  percentage: number;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  image: string;
  images: string[];
  features: string[];
  compatibility: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
  url?: string;
  brand: string;
  specifications: Specifications;
  videos?: {
    main: Video;
    additional: Video[];
  };
  reviews: Review[];
  ratingBreakdown: RatingBreakdown[];
  country: 'USA' | 'CAD' | null;
}

export const DEFAULT_REVIEWS: Review[] = [
  {
    name: "John Doe",
    rating: 5,
    title: "Perfect Product!",
    date: "2 days ago",
    verified: true,
    comment: "This is hands down the best car care product I've ever purchased. The quality is exceptional and it works exactly as advertised. Installation was super easy and it's made such a difference in my detailing routine. Highly recommend to anyone serious about car care!",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&h=200&fit=crop"
    ],
    helpfulCount: 24
  },
  {
    name: "Sarah Miller",
    rating: 4,
    title: "Great value for money",
    date: "1 week ago",
    verified: true,
    comment: "Really impressed with the quality. Works great and is very durable. The only reason I'm giving 4 stars instead of 5 is that shipping took a bit longer than expected, but the product itself is fantastic. Would definitely buy again.",
    helpfulCount: 12
  },
  {
    name: "Mike Rodriguez",
    rating: 5,
    title: "Professional Quality",
    date: "2 weeks ago",
    verified: true,
    comment: "As a professional detailer, I'm always skeptical of new products. But this exceeded my expectations. The build quality is solid, it performs consistently, and my clients have noticed the difference. Already ordered 3 more for my team. A must-have tool!",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop"
    ],
    helpfulCount: 45
  },
  {
    name: "Emily Kim",
    rating: 5,
    title: "Exceeded expectations!",
    date: "3 weeks ago",
    verified: true,
    comment: "I was hesitant to spend this much on a car care product, but I'm so glad I did. It's made my weekly car washing so much easier and more effective. The results speak for themselves - my car looks showroom fresh every time. Worth every penny!",
    helpfulCount: 18
  }
];

export const DEFAULT_VIDEOS = {
  main: {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
    title: "Product Video",
    description: "Watch this detailed demonstration to see how the Detail Guardz product works and learn professional installation tips. See the innovative design features that make this the top choice for car care enthusiasts and professional detailers."
  },
  additional: [
    {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
      title: "Installation Guide",
      subtitle: "Step-by-step setup instructions"
    },
    {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
      title: "Customer Review",
      subtitle: "Real users share their experience"
    },
    {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
      title: "Pro Tips & Tricks",
      subtitle: "Expert advice for best results"
    }
  ]
};

export const DEFAULT_RATING_BREAKDOWN: RatingBreakdown[] = [
  { stars: 5, percentage: 75, count: 423 },
  { stars: 4, percentage: 15, count: 85 },
  { stars: 3, percentage: 6, count: 34 },
  { stars: 2, percentage: 3, count: 17 },
  { stars: 1, percentage: 1, count: 5 },
];

export const DEFAULT_SPECIFICATIONS: Specifications = {
  brand: "DETAIL GUARDZ",
  material: "High-Grade Plastic Resin",
  weight: "525 Grams",
  dimensions: "10.43\"L x 10.43\"W x 2.56\"H",
  capacity: "5 Gallons",
  manufacturer: "DETAIL GUARDZ Canada"
};

export const categories = [
  { id: 'Detailing-Accessories', name: 'Detailing Accessories', slug: 'Detailing-Accessories' },
];

export const products: Product[] = [
  {
    id: 'Dirt-Lock-Insert',
    name: 'Dirt Lock Car Wash Insert – Bucket Filter for 3–8 Gallon Round Pails – Traps Debris, Prevents Swirl Marks – Self-Locking Rubber Grips, Venturi Flow, Cleaning Tool ',
    slug: 'Detailing-Accessories',
    description: 'The Dirt Lock car wash bucket filter is a detailing tool that protects your vehicle\'s paint from swirl marks and scratches.',
    longDescription: 'The Dirt Lock car wash bucket filter is the most effective way to protect your vehicle\'s paint from swirl marks and scratches. It works by trapping dirt and debris at the bottom of the bucket, keeping your wash water clean. The patented Venturi design uses the movement of your hand to create a pulsed suction that draws dirt underneath the filter and keeps it there.',
    price: 24.99,
    originalPrice: null,
    category: 'Detailing-Accessories',
    image: 'https://m.media-amazon.com/images/I/71FKBeRc4cL._AC_SX679_.jpg',
    images: ['https://m.media-amazon.com/images/I/71FKBeRc4cL._AC_SX679_.jpg'],
    features: [
      'Patented Venturi Pulsed Suction',
      'Self-Locking Rubber Grips',
      'Traps Dirt and Debris',
      'Prevents Swirl Marks',
      'Fits 3-8 Gallon Buckets'
    ],
    compatibility: ['3-8 Gallon Round Pails'],
    rating: 4.9,
    reviewCount: 247,
    inStock: true,
    badge: 'Best Seller',
    url: "https://www.amazon.com/Detail-Guardz-Dirt-Bucket-Insert/dp/B07CKC4M9D?ref_=ast_sto_dp&th=1",
    brand: "DETAIL GUARDZ",
    specifications: DEFAULT_SPECIFICATIONS,
    videos: DEFAULT_VIDEOS,
    reviews: DEFAULT_REVIEWS,
    ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
    country: null
  },
  {
    id: 'Dirt-Lock-Scrub-Wall',
    name: 'Dirt Lock Scrub Wall 180/360 – Washboard Attachment Dirt Lock - Bucket Filter – Vertical Cleaning Tool for Brushes, Mitts ',
    slug: 'dirt-lock-scrub-wall',
    description: 'The Scrub Wall attachment turns your Dirt Lock into a vertical cleaning surface for your mitts and brushes.',
    longDescription: 'The Scrub Wall attachment expands your Dirt Lock\'s cleaning capabilities by providing a vertical surface to scrub your wash mitts, brushes, and sponges. It simply clicks into the Dirt Lock and allows you to clean your tools more effectively by using the vertical motion. Available in 180-degree or 360-degree configurations.',
    price: 20.99,
    category: 'Detailing-Accessories',
    image: 'https://m.media-amazon.com/images/I/61Qgfvha82L._AC_SX466_.jpg',
    images: ['https://m.media-amazon.com/images/I/61Qgfvha82L._AC_SX466_.jpg'],
    features: [
      'Vertical Cleaning Surface',
      'Attaches to Dirt Lock',
      'Cleans Mitts and Brushes',
      'Modular Design',
      'Chemical Resistant'
    ],
    compatibility: ['Dirt Lock Filter'],
    rating: 4.8,
    reviewCount: 183,
    inStock: true,
    badge: 'Popular',
    url: "https://www.amazon.com/DETAIL-GUARDZ-Bucket-Filter-Washboard/dp/B09CRX2D31?ref_=ast_sto_dp&th=1",
    brand: "DETAIL GUARDZ",
    specifications: DEFAULT_SPECIFICATIONS,
    videos: DEFAULT_VIDEOS,
    reviews: DEFAULT_REVIEWS,
    ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
    country: null
  },
  {
    id: 'Dirt-Lock-Scrub-Pump',
    name: 'The Dirt Lock Scrub and Pump Attachment for Car Wash Bucket Filter ',
    slug: 'dirt-lock-scrub-pump',
    description: 'The Scrub and Pump attachment uses the motion of your hand to pump clean water into your mitt.',
    longDescription: 'The Scrub and Pump is the ultimate Dirt Lock attachment. As you scrub your mitt against the surface, it uses the pressure of your hand to pump clean, filtered water back into your mitt, ensuring that you are always using the cleanest water possible on your vehicle\'s paint.',
    price: 16.99,
    category: 'Detailing-Accessories',
    image: 'https://m.media-amazon.com/images/I/61P-hSN61ML._AC_SY300_SX300_QL70_FMwebp_.jpg',
    images: ['https://m.media-amazon.com/images/I/61P-hSN61ML._AC_SY300_SX300_QL70_FMwebp_.jpg'],
    features: [
      'Active Pumping Action',
      'Ensures Clean Mitt',
      'Attaches to Dirt Lock',
      'Durable Construction',
      'Patented Technology'
    ],
    compatibility: ['Dirt Lock Filter'],
    rating: 4.7,
    reviewCount: 412,
    inStock: true,
    url: "https://www.amazon.com/DETAIL-GUARDZ-Attachment-Bucket-Filter/dp/B08FTK9PJJ?ref_=ast_sto_dp&th=1",
    brand: "DETAIL GUARDZ",
    specifications: DEFAULT_SPECIFICATIONS,
    videos: DEFAULT_VIDEOS,
    reviews: DEFAULT_REVIEWS,
    ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
    country: null
  },
  {
    id: 'Pad-Washer-System',
    name: 'Dirt Lock Pad Washer System Attachment with Spray Cleaner (Black)',
    slug: 'dirt-lock-pad-washer-attachment',
    description: 'The Pad Washer System allows you to clean your polishing pads quickly and easily using your bucket.',
    longDescription: 'The Detail Guardz Pad Washer System is the most efficient way to clean your polishing pads. It uses the Dirt Lock\'s pulse technology to deep clean your pads without damaging them. The kit includes a specialized spray cleaner to help break down old wax and polish.',
    price: 79.99,
    category: 'Detailing-Accessories',
    image: 'https://m.media-amazon.com/images/I/710cuaz8RzS._AC_SY300_SX300_QL70_FMwebp_.jpg',
    images: ['https://m.media-amazon.com/images/I/710cuaz8RzS._AC_SY300_SX300_QL70_FMwebp_.jpg'],
    features: [
      'Professional Pad Cleaning',
      'Works with Dual Action Polishers',
      'Environmentally Friendly',
      'Includes Pad Cleaner Spray',
      'Attaches to Dirt Lock'
    ],
    compatibility: ['Dirt Lock Filter', 'All Polishing Pads'],
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    url: "https://www.amazon.com/Detail-Guardz-Washer-Attachment-Cleaner/dp/B07VGMKW7S?ref_=ast_sto_dp&th=1",
    brand: "DETAIL GUARDZ",
    specifications: DEFAULT_SPECIFICATIONS,
    videos: DEFAULT_VIDEOS,
    reviews: DEFAULT_REVIEWS,
    ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
    country: null
  },
  {
    id: 'Hose-Roller-4pk',
    name: '4pcs Plastic Hose Roller for Cars, Trucks & Motorcycles - Car Wheel Rolling System Tool Preventing Stucking and Snagging Under Tires (Black)',
    slug: 'hose-roller-4-pack',
    description: 'Prevent your hose from getting stuck under your tires with these innovative rollers.',
    longDescription: 'Stop the frustration of your hose getting caught under your tires while washing your car. These hose rollers slide under your tires and provide a smooth rolling surface for your hose to glide across. The 4-pack ensures you have one for every tire.',
    price: 19.99,
    category: 'Detailing-Accessories',
    image: 'https://m.media-amazon.com/images/I/61w2m+bKp8L._AC_SX466_.jpg',
    images: ['https://m.media-amazon.com/images/I/61w2m+bKp8L._AC_SX466_.jpg'],
    features: [
      'Anti-Jam Roller System',
      'Universal Fit',
      'Sturdy Construction',
      'Easy to Install',
      'Set of 4'
    ],
    compatibility: ['All Vehicles', 'Cars', 'Trucks', 'Motorcycles'],
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    url: "https://www.amazon.com/DETAIL-GUARDZ-Hose-Guide-Motorcycles/dp/B0FHKTM2YW?ref_=ast_sto_dp&th=1",
    brand: "DETAIL GUARDZ",
    specifications: DEFAULT_SPECIFICATIONS,
    videos: DEFAULT_VIDEOS,
    reviews: DEFAULT_REVIEWS,
    ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
    country: null
  },
  {
    id: 'Dirt-Lock-Pad-Washer-Bundle-Kit',
    name: 'DETAIL GUARDZ The Dirt Lock Pad Washer Bundle Complete Kit (Black) Includes Dirt Lock Bucket Filter',
    slug: 'dirt-lock-pad-washer-bundle-kit',
    description: 'Complete kit including the Dirt Lock bucket filter and the Pad Washer attachment for professional results.',
    longDescription: 'The Detail Guardz Dirt Lock Pad Washer Bundle is the ultimate solution for cleaning your polishing pads. This complete kit includes the world-famous Dirt Lock bucket filter and the specialized Pad Washer attachment. The system uses the pulse technology of the Dirt Lock to deep clean your pads without damage, ensuring they are ready for their next use.',
    price: 45.99,
    category: 'Detailing-Accessories',
    image: 'https://m.media-amazon.com/images/I/61jDCK8t-1S._AC_SX466_.jpg',
    images: ['https://m.media-amazon.com/images/I/61jDCK8t-1S._AC_SX466_.jpg'],
    features: [
      'Includes Dirt Lock Filter',
      'Deep Cleans Polishing Pads',
      'Pulse Technology',
      'Prevents Pad Damage',
      'Fits Standard 5 Gallon Buckets'
    ],
    compatibility: ['3-8 Gallon Round Pails'],
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    url: "https://www.amazon.com/DETAIL-GUARDZ-Washer-Bundle-Complete/dp/B088WZ9STB?ref_=ast_sto_dp",
    brand: "DETAIL GUARDZ",
    specifications: DEFAULT_SPECIFICATIONS,
    videos: DEFAULT_VIDEOS,
    reviews: DEFAULT_REVIEWS,
    ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
    country: null
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
