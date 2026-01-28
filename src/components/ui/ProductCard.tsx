import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <Link 
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badge */}
          {product.badge && (
            <Badge 
              className={`absolute top-3 left-3 ${
                product.badge === 'Sale' 
                  ? 'bg-destructive text-destructive-foreground' 
                  : product.badge === 'New'
                  ? 'bg-success text-success-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {product.badge}
            </Badge>
          )}

         {/* Quick Add */}
<div
  className="
    absolute inset-x-0 bottom-0 p-4
    bg-gradient-to-t from-background/90 to-transparent

    /* Mobile: always visible */
    opacity-100 translate-y-0

    /* Desktop: show on hover only */
    lg:opacity-0 lg:translate-y-4
    lg:group-hover:opacity-100 lg:group-hover:translate-y-0

    transition-all duration-300
  "
>
  <Button 
    onClick={handleAddToCart}
    className="w-full gradient-primary"
    size="sm"
  >
    <ShoppingCart className="h-4 w-4 mr-2" />
    Add to Cart
  </Button>
</div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category.replace('-', ' ')}
          </p>
          
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-accent text-accent' 
                      : 'text-muted-foreground/30'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
