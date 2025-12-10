import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const shopCategories = [
  { name: "All Products", href: "/shop", description: "Browse our complete collection" },
  { name: "New Arrivals", href: "/shop/new", description: "Latest products just added" },
  { name: "Detailing Accessories", href: "/shop/accessories", description: "Wash mitts, brushes & tools" },
  { name: "Liquids & Chemicals", href: "/shop/liquids", description: "Soaps, waxes & coatings" },
  { name: "Microfiber", href: "/shop/microfiber", description: "Premium towels & cloths" },
  { name: "Bundles & Kits", href: "/shop/bundles", description: "Complete detailing packages" },
  { name: "Apparel & Merch", href: "/shop/apparel", description: "Show your Detail Guardz pride" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">DG</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl tracking-tight text-foreground">Detail Guardz</span>
                <span className="block text-xs text-muted-foreground -mt-1">Premium Car Care</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-foreground font-medium">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
                      {shopCategories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={category.href}
                              className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="nav" asChild>
              <Link to="/about">About Us</Link>
            </Button>
            <Button variant="nav" asChild>
              <Link to="/where-to-buy">Where to Buy</Link>
            </Button>
            <Button variant="nav" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/canada"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Canada Store</span>
            </Link>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                0
              </span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border animate-fade-in">
            <nav className="py-4 space-y-1">
              {/* Shop Dropdown */}
              <div>
                <button
                  onClick={() => setShopMenuOpen(!shopMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                >
                  <span>Shop</span>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", shopMenuOpen && "rotate-180")} />
                </button>
                {shopMenuOpen && (
                  <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                    {shopCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className="block px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="block px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/where-to-buy"
                className="block px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Where to Buy
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/canada"
                className="flex items-center gap-2 px-4 py-3 text-primary font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="w-4 h-4" />
                Canada Store
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
