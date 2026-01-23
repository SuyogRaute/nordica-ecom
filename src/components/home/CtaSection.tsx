import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-10 right-32 w-48 h-48 rounded-full bg-primary blur-2xl" />
          </div>

          <div className="relative z-10 px-6 py-16 lg:px-16 lg:py-20 text-center lg:text-left">
            <div className="lg:max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Proudly Serving Canada</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-background mb-4">
                Ready to Transform Your Car Care Routine?
              </h2>
              <p className="text-lg text-background/70 mb-8 leading-relaxed">
                Join thousands of Canadian car enthusiasts who trust Detail Guardz for premium detailing products. Free shipping on orders over $75.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/products">
                    Start Shopping
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" className="text-background border-background/20 hover:bg-background/10" asChild>
                  <Link to="/where-to-buy">
                    Find a Retailer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
