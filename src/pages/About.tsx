import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Detail Guardz - Canadian Car Care Company</title>
        <meta
          name="description"
          content="Learn about Detail Guardz, a Canadian-owned car care company dedicated to bringing premium detailing products to enthusiasts across Canada."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
            <div className="container-wide relative z-10">
              <nav className="flex items-center gap-2 text-sm text-background/60 mb-8">
                <Link to="/" className="hover:text-background">Home</Link>
                <span>/</span>
                <span className="text-background">About Us</span>
              </nav>
              <div className="max-w-3xl">
                <h1 className="text-4xl lg:text-5xl font-bold text-background mb-6">
                  Passionate About Cars.<br />
                  <span className="text-primary">Obsessed With Quality.</span>
                </h1>
                <p className="text-xl text-background/70 leading-relaxed">
                  Detail Guardz was born from a simple idea: every car enthusiast deserves access to professional-grade detailing products without the professional price tag.
                </p>
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-16 lg:py-24">
            <div className="container-wide">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Story</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Founded in Canada, Detail Guardz started as a passion project by car enthusiasts who were frustrated with the lack of quality detailing products available locally.
                    </p>
                    <p>
                      We spent years testing products, learning from professional detailers, and understanding what truly makes a difference in achieving that showroom finish. The result? A carefully curated collection of products that actually deliver on their promises.
                    </p>
                    <p>
                      Today, we're proud to serve thousands of customers across Canada, from weekend warriors to professional mobile detailers. Every product we sell has been tested in real-world conditions and approved by our team.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=500&fit=crop"
                    alt="Detail Guardz team working on a car"
                    className="rounded-2xl shadow-elevated"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-elevated">
                    <p className="text-3xl font-bold">2018</p>
                    <p className="text-sm opacity-80">Founded in Canada</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 lg:py-24 bg-secondary">
            <div className="container-wide">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Drives Us</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Our core values guide everything we do, from product selection to customer service.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Award, title: "Quality First", description: "We only sell products we'd use on our own cars." },
                  { icon: Users, title: "Community", description: "We're building a community of passionate detailers." },
                  { icon: MapPin, title: "Canadian Roots", description: "Proudly Canadian-owned and operated." },
                  { icon: Heart, title: "Customer Love", description: "Your satisfaction is our top priority." },
                ].map((value) => (
                  <div key={value.title} className="bg-background rounded-xl p-6 text-center shadow-soft">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 lg:py-24">
            <div className="container-wide text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Browse our collection and discover why thousands of Canadians trust Detail Guardz.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
