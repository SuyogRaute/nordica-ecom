import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mike T.",
    location: "Toronto, ON",
    rating: 5,
    text: "Best microfiber towels I've ever used. No streaks, no scratches. My car has never looked better. Will definitely be ordering more!",
    product: "Premium Microfiber Set",
  },
  {
    name: "Sarah L.",
    location: "Vancouver, BC",
    rating: 5,
    text: "The complete detailing kit was exactly what I needed to get started. Great quality products and the instructions made it so easy.",
    product: "Beginner's Bundle",
  },
  {
    name: "James K.",
    location: "Calgary, AB",
    rating: 5,
    text: "Shipping was incredibly fast for Canada. Products are professional quality. I'm a mobile detailer and switched to Detail Guardz full time.",
    product: "Pro Wash Mitt",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container-wide">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers across Canada who trust Detail Guardz for their car care needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-background rounded-2xl p-6 lg:p-8 shadow-soft relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Purchased</p>
                  <p className="text-sm font-medium text-primary">{testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "10,000+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "200+", label: "Products" },
            { value: "100%", label: "Canadian Owned" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
