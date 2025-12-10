import { Truck, Shield, Leaf, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Canadian Shipping",
    description: "Free shipping on orders over $75. Most orders delivered within 3-5 business days across Canada.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product is tested and approved by professional detailers. 100% satisfaction guarantee.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Options",
    description: "Many of our products are biodegradable and safe for the environment without compromising results.",
  },
  {
    icon: Award,
    title: "Pro-Grade Products",
    description: "The same products trusted by professional detailing shops, now available for home enthusiasts.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container-wide">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Detail Guardz?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to bringing you the best car care experience with premium products and exceptional service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-background rounded-xl p-6 lg:p-8 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
