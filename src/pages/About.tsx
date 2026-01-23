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
        <section className="relative py-6 lg:py-10 overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900">




  {/* Animated gradient mesh background */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Large animated orbs with professional colors */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-emerald-600/20 via-teal-600/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-slate-600/20 via-slate-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-slate-700/15 to-transparent rounded-full blur-2xl"></div>
    
    {/* Floating particles - subtle white/gray */}
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
    <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
    <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-slate-300/40 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
    <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
    
    {/* Animated grid pattern */}
    <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
      backgroundSize: '60px 60px'
    }}></div>
  </div>

  {/* Diagonal accent lines with professional gradient */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-emerald-500 via-emerald-600/50 to-transparent transform rotate-12 origin-top"></div>
    <div className="absolute top-0 right-32 w-0.5 h-full bg-gradient-to-b from-slate-400 via-slate-500/50 to-transparent transform rotate-12 origin-top"></div>
    <div className="absolute top-0 left-20 w-0.5 h-full bg-gradient-to-b from-slate-500 via-slate-600/30 to-transparent transform -rotate-12 origin-top"></div>
  </div>

  {/* Animated shine effect */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-x-12 animate-shimmer"></div>
  </div>

  <div className="container-wide relative z-10">
    {/* Breadcrumb navigation */}
    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 group">
      <Link 
        to="/" 
        className="hover:text-emerald-400 transition-all duration-300 flex items-center gap-1 hover:gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </Link>
      <span className="text-slate-500">/</span>
      <span className="text-white font-medium">About Us</span>
    </nav>

    {/* Main content with grid layout */}
    <div className="grid lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7">
        {/* Professional accent badge with subtle glow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 text-sm font-medium mb-6 backdrop-blur-sm shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Est. Since 2004
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Passionate About Cars.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 inline-block mt-2 relative">
            Obsessed With Quality.
            {/* Professional underline with subtle gradient */}
            {/* <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 5 100 2 150 5C200 8 250 7 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg> */}
          </span>
        </h1>
        
        <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
          Detail Guardz was born from a simple idea: every car enthusiast deserves access to professional-grade detailing products without the professional price tag.
        </p>

        {/* Enhanced stats row with professional styling */}
        <div className="flex flex-wrap gap-8 pt-6 border-t border-slate-700/50">
          <div className="group flex flex-col relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-4xl font-bold text-emerald-400 mb-1 relative">10K+</span>
            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors relative">Happy Customers</span>
          </div>
          <div className="group flex flex-col relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-4xl font-bold text-emerald-400 mb-1 relative">50+</span>
            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors relative">Premium Products</span>
          </div>
          <div className="group flex flex-col relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-4xl font-bold text-emerald-400 mb-1 relative">100%</span>
            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors relative">Quality Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Professional visual element on the right with 4 cards */}
      <div className="lg:col-span-5 relative hidden lg:block">
        <div className="relative w-full h-[500px]">
          {/* Card 1 - Premium Quality */}
          <div className="absolute top-0 right-0 w-64 h-40 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 transform rotate-6 hover:rotate-3 hover:scale-105 transition-all duration-500 shadow-2xl shadow-black/20 hover:shadow-emerald-500/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-3 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white font-semibold">Premium Quality</span>
            </div>
            <p className="text-slate-400 text-sm relative">Professional-grade products for enthusiasts</p>
          </div>

          {/* Card 2 - Fair Pricing */}
          <div className="absolute bottom-0 left-0 w-64 h-40 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 transform -rotate-6 hover:-rotate-3 hover:scale-105 transition-all duration-500 shadow-2xl shadow-black/20 hover:shadow-emerald-500/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-3 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-white font-semibold">Fair Pricing</span>
            </div>
            <p className="text-slate-400 text-sm relative">Quality without the premium markup</p>
          </div>

          {/* Card 3 - Fast Shipping */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 w-56 h-36 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-5 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-2xl shadow-black/20 hover:shadow-emerald-500/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-2 relative">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-sm">Fast Shipping</span>
            </div>
            <p className="text-slate-400 text-xs relative">Quick delivery to your doorstep</p>
          </div>

          {/* Card 4 - Expert Support */}
          <div className="absolute top-32 left-4 w-52 h-32 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-2xl shadow-black/20 hover:shadow-emerald-500/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-2 mb-2 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-sm">Expert Support</span>
            </div>
            <p className="text-slate-400 text-xs relative">Always here to help you shine</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style >{`
  @keyframes shimmer {
    0% {
      transform: translateX(-100%) skewX(-12deg);
    }
    100% {
      transform: translateX(200%) skewX(-12deg);
    }
  }
  
  .animate-shimmer {
    animation: shimmer 8s infinite;
  }
`}</style>
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
