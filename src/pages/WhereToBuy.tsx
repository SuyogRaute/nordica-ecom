import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { MapPin, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet";

const retailers = [
  { name: "AutoZone Canada", location: "Multiple Locations", type: "National Retailer" },
  { name: "Canadian Tire", location: "Multiple Locations", type: "National Retailer" },
  { name: "Pro Detail Supply", location: "Toronto, ON", type: "Specialty Store" },
  { name: "Detail Depot", location: "Vancouver, BC", type: "Specialty Store" },
  { name: "Auto Obsessed", location: "Calgary, AB", type: "Specialty Store" },
  { name: "Shine Supply Canada", location: "Montreal, QC", type: "Specialty Store" },
];

const WhereToBuy = () => {
  return (
    <>
      <Helmet>
        <title>Where to Buy | Find Detail Guardz Retailers in Canada</title>
        <meta
          name="description"
          content="Find Detail Guardz products near you. Locate authorized retailers and specialty detailing stores across Canada."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Header */}
          <section className="bg-secondary py-12 lg:py-16">
            <div className="container-wide">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <span>/</span>
                <span className="text-foreground">Where to Buy</span>
              </nav>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Where to Buy</h1>
              <p className="text-muted-foreground mt-2">Find Detail Guardz products near you</p>
            </div>
          </section>

          <section className="py-12 lg:py-20">
            <div className="container-wide">
              {/* Online Store CTA */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 mb-12 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
                  Shop Our Online Store
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                  Can't find a retailer nearby? Shop directly from us with free shipping on orders over $75 across Canada.
                </p>
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/shop">Shop Online Now</Link>
                </Button>
              </div>

              {/* Search */}
              <div className="max-w-md mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter your city or postal code"
                    className="pl-12 h-12"
                  />
                </div>
              </div>

              {/* Retailers Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {retailers.map((retailer) => (
                  <div key={retailer.name} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{retailer.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{retailer.location}</p>
                        <span className="inline-block text-xs bg-secondary px-2 py-1 rounded-full text-secondary-foreground">
                          {retailer.type}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Become a Retailer */}
              <div className="mt-16 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">Become a Retailer</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Interested in carrying Detail Guardz products in your store? We'd love to hear from you.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
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

export default WhereToBuy;
