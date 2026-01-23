export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  features: string[];
  compatibility: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
}

export const categories = [
  { id: 'paint-protection', name: 'Paint Protection Film', slug: 'paint-protection' },
  { id: 'ceramic-coating', name: 'Ceramic Coating', slug: 'ceramic-coating' },
  { id: 'door-guards', name: 'Door Edge Guards', slug: 'door-guards' },
  { id: 'bumper-protection', name: 'Bumper Protection', slug: 'bumper-protection' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
];

export const products: Product[] = [
  {
    id: 'ppf-premium-kit',
    name: 'Premium PPF Full Body Kit',
    slug: 'premium-ppf-full-body-kit',
    description: 'Complete paint protection film kit for full vehicle coverage. Self-healing technology.',
    longDescription: 'Our Premium PPF Full Body Kit provides the ultimate protection for your vehicle\'s paint. Featuring advanced self-healing technology, this optically clear film guards against rock chips, scratches, swirl marks, and environmental contaminants while maintaining your car\'s showroom finish. The kit includes pre-cut panels designed for precise fitment on most popular vehicle models.',
    price: 899.99,
    originalPrice: 1099.99,
    category: 'paint-protection',
    image: '/src/assets/product-ppf.jpg',
    images: ['/src/assets/product-ppf.jpg'],
    features: [
      'Self-healing technology',
      '10-year warranty',
      'Optically clear finish',
      'UV resistant',
      'Stain resistant',
      'Easy installation'
    ],
    compatibility: ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Porsche', 'Toyota', 'Honda'],
    rating: 4.9,
    reviewCount: 247,
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 'ceramic-pro-coating',
    name: 'Ceramic Pro Coating Kit',
    slug: 'ceramic-pro-coating-kit',
    description: 'Professional-grade ceramic coating with 5-year protection guarantee.',
    longDescription: 'Experience the pinnacle of paint protection with our Ceramic Pro Coating Kit. This professional-grade formula creates an incredibly durable, hydrophobic barrier that repels water, dirt, and contaminants. The nano-ceramic technology bonds at the molecular level with your paint, providing unmatched gloss and protection that lasts for years.',
    price: 349.99,
    category: 'ceramic-coating',
    image: '/src/assets/product-ceramic.jpg',
    images: ['/src/assets/product-ceramic.jpg'],
    
    features: [
      '9H hardness rating',
      'Hydrophobic surface',
      'UV protection',
      '5-year durability',
      'Chemical resistant',
      'Enhanced gloss'
    ],
    compatibility: ['All vehicle types', 'Boats', 'Motorcycles', 'RVs'],
    rating: 4.8,
    reviewCount: 183,
    inStock: true,
    badge: 'New'
  },
  {
    id: 'door-edge-guards-universal',
    name: 'Universal Door Edge Guards',
    slug: 'universal-door-edge-guards',
    description: 'Invisible protection for door edges. Prevents chips and scratches.',
    longDescription: 'Protect the most vulnerable parts of your vehicle with our Universal Door Edge Guards. These precision-cut, crystal-clear guards wrap around door edges to prevent paint chips and scratches that commonly occur in parking lots. The flexible material conforms perfectly to any door edge contour for a virtually invisible installation.',
    price: 49.99,
    category: 'door-guards',
    image: '/src/assets/product-edge-guards.jpg',
    images: ['/src/assets/product-edge-guards.jpg'],
    features: [
      'Crystal clear finish',
      'Pre-cut for easy install',
      'Flexible material',
      '5-year warranty',
      'Fits most vehicles'
    ],
    compatibility: ['Universal fit for 4-door vehicles'],
    rating: 4.7,
    reviewCount: 412,
    inStock: true
  },
  {
    id: 'bumper-guard-kit',
    name: 'Front & Rear Bumper Guard Kit',
    slug: 'bumper-guard-kit',
    description: 'Heavy-duty protection for high-impact bumper areas.',
    longDescription: 'Shield your bumpers from everyday hazards with our comprehensive Front & Rear Bumper Guard Kit. Designed for the areas most susceptible to damage, this thick, durable film absorbs impacts from shopping carts, minor collisions, and road debris. The kit includes coverage for both front and rear bumper corners and edges.',
    price: 179.99,
    originalPrice: 219.99,
    category: 'bumper-protection',
    image: '/src/assets/product-bumper.jpg',
    images: ['/src/assets/product-bumper.jpg'],
    features: [
      'Extra-thick protection',
      'Impact resistant',
      'Pre-cut patterns',
      'Clear or matte finish',
      '7-year warranty'
    ],
    compatibility: ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Lexus', 'Acura'],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    badge: 'Sale'
  },
  {
    id: 'hood-protection-film',
    name: 'Hood Protection Film',
    slug: 'hood-protection-film',
    description: 'Full hood coverage film with enhanced thickness for highway protection.',
    longDescription: 'Maximum protection for maximum exposure. Our Hood Protection Film provides full coverage for your vehicle\'s hood—the area most exposed to rock chips and road debris on highways. With 50% thicker material than standard PPF, this film is engineered for drivers who demand the best protection.',
    price: 299.99,
    category: 'paint-protection',
    image: '/src/assets/product-ppf.jpg',
    images: ['/src/assets/product-ppf.jpg'],
    features: [
      '50% thicker material',
      'Highway-grade protection',
      'Self-healing',
      'Precision cut',
      '10-year warranty'
    ],
    compatibility: ['Most sedan and SUV models'],
    rating: 4.9,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 'headlight-protection',
    name: 'Headlight Protection Film',
    slug: 'headlight-protection-film',
    description: 'Crystal clear lens protection for headlights and taillights.',
    longDescription: 'Keep your lights crystal clear with our Headlight Protection Film. This specialized film protects expensive headlight and taillight assemblies from yellowing, hazing, and rock chips. The optically clear material maintains full light output while providing a barrier against UV damage and road debris.',
    price: 79.99,
    category: 'accessories',
    image: '/src/assets/product-ppf.jpg',
    images: ['/src/assets/product-ppf.jpg'],
    features: [
      'Optically clear',
      'Anti-yellowing',
      'UV blocking',
      'Easy removal',
      '5-year warranty'
    ],
    compatibility: ['Universal - headlights and taillights'],
    rating: 4.6,
    reviewCount: 234,
    inStock: true
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
