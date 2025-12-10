import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const products = [
  {
    id: 1,
    name: "Premium Wash Mitt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop",
    category: "Accessories",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Microfiber Towel 6-Pack",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Microfiber",
    badge: "New",
  },
  {
    id: 3,
    name: "pH Neutral Car Shampoo",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop",
    category: "Liquids",
  },
  {
    id: 4,
    name: "Complete Starter Kit",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",
    category: "Bundles",
    badge: "Sale",
  },
  {
    id: 5,
    name: "Ceramic Spray Coating",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop",
    category: "Liquids",
  },
  {
    id: 6,
    name: "Detail Guardz T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Apparel",
  },
  {
    id: 7,
    name: "Wheel Cleaning Brush Set",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Interior Detail Kit",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",
    category: "Bundles",
    badge: "Popular",
  },
];

const Shop = () => {
  return (
    <>
      <Helmet>
        <title>Shop All Products | Detail Guardz Canada</title>
        <meta
          name="description"
          content="Browse our complete collection of premium car detailing products. Wash mitts, microfiber, chemicals, bundles and more. Free Canadian shipping over $75."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Page Header */}
          <section className="bg-secondary py-12 lg:py-16">
            <div className="container-wide">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <span>/</span>
                <span className="text-foreground">Shop</span>
              </nav>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">All Products</h1>
              <p className="text-muted-foreground mt-2">Browse our complete collection of premium car care products</p>
            </div>
          </section>

          {/* Filters & Products */}
          <section className="py-8 lg:py-12">
            <div className="container-wide">
              {/* Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button variant="ghost" size="sm">All</Button>
                  <Button variant="ghost" size="sm">Accessories</Button>
                  <Button variant="ghost" size="sm">Liquids</Button>
                  <Button variant="ghost" size="sm">Microfiber</Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Featured
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop/product/${product.id}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${
                          product.badge === 'Sale' 
                            ? 'bg-destructive text-destructive-foreground' 
                            : product.badge === 'New'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-foreground text-background'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</span>
                      <h3 className="font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">${product.price.toFixed(2)} CAD</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Shop;
