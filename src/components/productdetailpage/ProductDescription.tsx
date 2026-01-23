// components/product/ProductDescription.tsx
interface FeatureImage {
  image: string;
  alt: string;
  label: string;
}

interface ProductDescriptionProps {
  heroImage: string;
  heroImageAlt: string;
  description: string;
  features: FeatureImage[];
}

const ProductDescription = ({ 
  heroImage, 
  heroImageAlt, 
  description, 
  features 
}: ProductDescriptionProps) => {
  return (
    <section>
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Product Description</h2>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt={heroImageAlt}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Description Text */}
          <div className="mb-10">
            <p className="text-foreground leading-relaxed text-base">
              {description}
            </p>
          </div>

          {/* Feature Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={feature.image} 
                    alt={feature.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
                    {feature.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;