import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24-48 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Detail Guardz Canada</title>
        <meta
          name="description"
          content="Get in touch with Detail Guardz. We're here to help with product questions, orders, and support. Canadian customer service team."
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
                <span className="text-foreground">Contact</span>
              </nav>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Contact Us</h1>
              <p className="text-muted-foreground mt-2">We're here to help with any questions</p>
            </div>
          </section>

          <section className="py-12 lg:py-20">
            <div className="container-wide">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Get In Touch</h2>
                    <p className="text-muted-foreground">
                      Have a question about a product? Need help with an order? We're here to help!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:info@detailguardz.com" className="text-muted-foreground hover:text-primary">
                          info@detailguardz.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a href="tel:+18001234567" className="text-muted-foreground hover:text-primary">
                          1-800-DETAIL
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Hours</p>
                        <p className="text-muted-foreground">Mon-Fri: 9am - 5pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">Serving all of Canada</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Name
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="What can we help with?"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
