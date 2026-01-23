import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Star, ShoppingCart, Check, Shield, Truck, RotateCcw, Minus, Plus, ChevronDown, Heart, Info, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { getProductBySlug, products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import ProductDescription from '@/components/productdetailpage/ProductDescription';
import ProductVideoSection from '@/components/productdetailpage/ProductVdieoSection';
import CustomerReviewsSection from '@/components/productdetailpage/ProdctReviewsection';

const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const product = getProductBySlug(slug || '');
    const { formatPrice } = useCurrency();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('blue');
    const [showMoreDetails, setShowMoreDetails] = useState(false);

    // Refs for scroll detection
    const aboutSectionRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [isImageSticky, setIsImageSticky] = useState(false);
    const exampleReviews = [
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
 const exampleData = {
    productName: "Detail Guardz",
    mainVideo: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
      title: "Product Video",
      description: "Watch this detailed demonstration to see how the Detail Guardz product works and learn professional installation tips. See the innovative design features that make this the top choice for car care enthusiasts and professional detailers."
    },
    additionalVideos: [
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
    useEffect(() => {
        const handleScroll = () => {
            if (!aboutSectionRef.current || !imageContainerRef.current) return;

            const aboutSection = aboutSectionRef.current.getBoundingClientRect();
            const imageContainer = imageContainerRef.current.getBoundingClientRect();

            // Check if "About this item" section is in viewport
            const isAboutInView = aboutSection.top <= window.innerHeight / 2;

            setIsImageSticky(isAboutInView);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!product) {
        return (
            <Layout>
                <div className="pt-10 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
                        <Link to="/products">
                            <Button>Back to Products</Button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    // Color options with actual product images
    const colorOptions = [
        {
            name: 'Black',
            value: 'black',
            image: product.image,
            price: product.price
        },
        {
            name: 'Blue',
            value: 'blue',
            image: product.image,
            price: product.price
        },
        {
            name: 'Gold',
            value: 'gold',
            image: product.image,
            price: product.price + 5
        },
        {
            name: 'Red',
            value: 'red',
            image: product.image,
            price: product.price
        },
        {
            name: 'Silver',
            value: 'silver',
            image: product.image,
            price: product.price + 3
        },
    ];

    const productImages = product.images || [product.image, product.image, product.image, product.image, product.image];

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const selectedColorOption = colorOptions.find(c => c.value === selectedColor) || colorOptions[0];
    const currentPrice = selectedColorOption.price;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: `${product.id}-${selectedColor}`,
                name: `${product.name} (${selectedColorOption.name})`,
                price: currentPrice,
                image: selectedColorOption.image,
                category: product.category,
            });
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleColorChange = (colorValue: string) => {
        setSelectedColor(colorValue);
        const colorOption = colorOptions.find(c => c.value === colorValue);
        if (colorOption) {
            setSelectedImage(0);
        }
    };

    return (
        <Layout>
            <div className="pt-10 pb-16">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 mb-6">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">Automotive</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-foreground transition-colors">Car Care</Link>
                        <span>/</span>
                        <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">
                            {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Detail Guardz Products</span>
                    </nav>
                </div>

                {/* Main Product Section */}
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Column - Images */}
                        <div
                            ref={imageContainerRef}
                            className={`lg:col-span-7 space-y-4 transition-all duration-300 ${isImageSticky ? 'lg:sticky lg:top-24 lg:self-start' : ''
                                }`}
                        >
                            {/* Main Image */}
                            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-border">
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8"
                                />
                                {product.badge && (
                                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                                        {product.badge}
                                    </Badge>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-6 gap-2">
                                {productImages.slice(0, 5).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx
                                                ? 'border-primary ring-2 ring-primary/20'
                                                : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                                {/* Video thumbnail */}
                                <button
                                    className="aspect-square rounded-lg border-2 border-border hover:border-primary/50 overflow-hidden bg-gray-100 flex items-center justify-center transition-all"
                                >
                                    <div className="text-center">
                                        <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-black/80 flex items-center justify-center">
                                            <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-medium">VIDEO</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Product Info */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Title */}
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 leading-tight">
                                    {product.name}
                                </h1>
                                <Link to="/brand/detail-guardz" className="text-sm text-primary hover:underline">
                                    Visit the DETAIL GUARDZ Store
                                </Link>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold">{product.rating}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                        ? 'fill-orange-400 text-orange-400'
                                                        : i < product.rating
                                                            ? 'fill-orange-400 text-orange-400'
                                                            : 'fill-none text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button className="text-sm text-primary hover:underline">
                                    ({product.reviewCount.toLocaleString()})
                                </button>
                            </div>

                            {/* Price */}
                            <div className="border-t border-b border-border py-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-foreground">
                                        {formatPrice(currentPrice)}
                                    </span>
                                    {currentPrice !== product.price && (
                                        <span className="text-lg text-muted-foreground line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                </div>
                                {product.inStock ? (
                                    <p className="text-sm text-green-600 font-medium mt-1">In Stock</p>
                                ) : (
                                    <p className="text-sm text-red-600 font-medium mt-1">Out of Stock</p>
                                )}
                            </div>

                            {/* Color Selection */}
                            <div>
                                <div className="mb-3">
                                    <span className="text-sm font-medium text-foreground">Color: </span>
                                    <span className="text-sm text-foreground font-semibold">
                                        {selectedColorOption.name}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => handleColorChange(color.value)}
                                            className={`group relative rounded-lg border-2 p-1 transition-all ${selectedColor === color.value
                                                    ? 'border-primary ring-2 ring-primary/20'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50">
                                                <img
                                                    src={color.image}
                                                    alt={color.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="text-center mt-1">
                                                <p className="text-[10px] text-muted-foreground">1 option</p>
                                                <p className="text-[10px] text-muted-foreground">from</p>
                                                <p className="text-xs font-semibold">{formatPrice(color.price)}</p>
                                            </div>
                                            {selectedColor === color.value && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-border rounded-lg">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={decrementQuantity}
                                            className="h-10 w-10 rounded-r-none"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <div className="h-10 w-16 flex items-center justify-center border-x border-border">
                                            <span className="font-semibold">{quantity}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={incrementQuantity}
                                            className="h-10 w-10 rounded-l-none"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        Subtotal: <span className="font-semibold text-foreground">{formatPrice(currentPrice * quantity)}</span>
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock || addedToCart}
                                        className="flex-1 h-12 text-base gap-2"
                                    >
                                        {addedToCart ? (
                                            <>
                                                <Check className="h-5 w-5" />
                                                Added to Cart
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="h-5 w-5" />
                                                Add to Cart
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-12 w-12"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Features/Benefits */}
                            <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground">5-Year Protection Guarantee</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground">Free Shipping on Orders Over $50</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <RotateCcw className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground">30-Day Money Back Guarantee</span>
                                </div>
                            </div>

                            {/* Product Details Table */}
                            <div className="border border-border rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <tbody>
                                        <tr className="border-b border-border">
                                            <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50 w-1/3">Brand</td>
                                            <td className="py-3 px-4 text-foreground">DETAIL GUARDZ</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Color</td>
                                            <td className="py-3 px-4 text-foreground capitalize">{selectedColorOption.name}</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Material</td>
                                            <td className="py-3 px-4 text-foreground">High-Grade Plastic Resin</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Item Weight</td>
                                            <td className="py-3 px-4 text-foreground">525 Grams</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Product Dimensions</td>
                                            <td className="py-3 px-4 text-foreground">10.43"L x 10.43"W x 2.56"H</td>
                                        </tr>
                                        <tr className={showMoreDetails ? 'border-b border-border' : ''}>
                                            <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Capacity</td>
                                            <td className="py-3 px-4 text-foreground">5 Gallons</td>
                                        </tr>
                                        {showMoreDetails && (
                                            <>
                                                <tr className="border-b border-border">
                                                    <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Compatibility</td>
                                                    <td className="py-3 px-4 text-foreground">
                                                        {product.compatibility?.join(', ') || 'Universal'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-4 font-medium text-foreground bg-gray-50/50">Manufacturer</td>
                                                    <td className="py-3 px-4 text-foreground">DETAIL GUARDZ Canada</td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                                <button
                                    onClick={() => setShowMoreDetails(!showMoreDetails)}
                                    className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm text-primary hover:bg-gray-50 transition-colors border-t border-border"
                                >
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showMoreDetails ? 'rotate-180' : ''}`} />
                                    {showMoreDetails ? 'See less' : 'See more'}
                                </button>
                            </div>

                            {/* About This Item - Added ref here */}
                            <div ref={aboutSectionRef}>
                                <h2 className="text-xl font-bold text-foreground mb-4">About this item</h2>
                                <ul className="space-y-3">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-foreground leading-relaxed">
                                            <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                                            <span>
                                                {feature.includes(':') ? (
                                                    <>
                                                        <strong className="font-semibold uppercase text-xs tracking-wide">
                                                            {feature.split(':')[0]}:
                                                        </strong>{' '}
                                                        {feature.split(':').slice(1).join(':')}
                                                    </>
                                                ) : (
                                                    feature
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Long Description */}
                            {product.longDescription && (
                                <div className="border-t border-border pt-6">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {product.longDescription}
                                    </p>
                                </div>
                            )}

                            {/* Report Link */}
                            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                </svg>
                                Report an issue with this product or seller
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rest of the sections remain the same */}
                <ProductDescription
                    heroImage={product.image}
                    heroImageAlt={product.name}
                    description="Using a set of Detail Guardz is the most efficient way to work around your vehicle without being interrupted by stubborn hose & cord jams. The roller system allows for effortless movements without the need to tug and adjust your equipment. This unique tool has a locking mechanism to instantly grip onto the tire to keep it firmly in place. Quickly slide the Detail Guardz underneath your tires and forget about your hoses and cords getting caught!"
                    features={[
                        {
                            image: product.image,
                            alt: "Line Guidance",
                            label: "LINE GUIDANCE"
                        },
                        {
                            image: product.image,
                            alt: "Universal Fit",
                            label: "UNIVERSAL FIT"
                        },
                        {
                            image: product.image,
                            alt: "Made in Canada",
                            label: "MADE IN CANADA"
                        },
                        {
                            image: product.image,
                            alt: "Anti-Jam",
                            label: "ANTI-JAM"
                        }
                    ]}
                />
                {/* Product Video Section - Add this after Product Description and before Product Information */}
                 <ProductVideoSection
        productName={exampleData.productName}
        mainVideo={exampleData.mainVideo}
        additionalVideos={exampleData.additionalVideos}
      />
                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="container mx-auto px-4 mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
                            <Link to={`/products?category=${product.category}`}>
                                <Button variant="outline">View All</Button>
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* Customer Reviews Section - Add this after Product Video and before Product Information */}
            <CustomerReviewsSection
        overallRating={4.8}
        totalReviews={564}
        ratingBreakdown={[
          { stars: 5, percentage: 75, count: 423 },
          { stars: 4, percentage: 15, count: 85 },
          { stars: 3, percentage: 6, count: 34 },
          { stars: 2, percentage: 3, count: 17 },
          { stars: 1, percentage: 1, count: 5 },
        ]}
        reviews={exampleReviews}
        onWriteReview={() => alert('Write a review clicked')}
        onLoadMore={() => alert('Load more clicked')}
      />
        </Layout>
    );
};

export default ProductDetail;