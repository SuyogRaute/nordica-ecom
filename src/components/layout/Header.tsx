import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserProfile from '@/components/home/UserProfile';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const { currency, setCurrency } = useCurrency();
  const { totalItems } = useCart();

  // Mock user data - Replace with your actual auth context/state
  const currentUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    // avatar: 'https://example.com/avatar.jpg' // Optional
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
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
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Currency Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-1 text-foreground/80">
                  {currency}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem 
                  onClick={() => setCurrency('USD')}
                  className="cursor-pointer"
                >
                  🇺🇸 USD - US Dollar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setCurrency('CAD')}
                  className="cursor-pointer"
                >
                  🇨🇦 CAD - Canadian Dollar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Profile - Desktop */}
            <div className="hidden lg:block">
              <UserProfile user={currentUser} />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card border-border">
                {/* Mobile User Profile Section */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-base shadow-lg">
                      {currentUser.firstName[0]}{currentUser.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {currentUser.firstName} {currentUser.lastName}
                      </h3>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </div>
                  <Link to="/settings">
                    <Button variant="outline" className="w-full" size="sm">
                      View Profile Settings
                    </Button>
                  </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Currency Switcher Mobile */}
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Currency</p>
                    <div className="flex gap-2">
                      <Button 
                        variant={currency === 'USD' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setCurrency('USD')}
                      >
                        🇺🇸 USD
                      </Button>
                      <Button 
                        variant={currency === 'CAD' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setCurrency('CAD')}
                      >
                        🇨🇦 CAD
                      </Button>
                    </div>
                  </div>

                  {/* Quick Links Mobile */}
                  <div className="pt-4 mt-4 border-t border-border space-y-2">
                    <Link to="/myorders" className="block py-2 text-sm text-foreground hover:text-primary transition-colors">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block py-2 text-sm text-foreground hover:text-primary transition-colors">
                      Wishlist
                    </Link>
                    <button className="block py-2 text-sm text-red-600 hover:text-red-700 transition-colors w-full text-left">
                      Sign Out
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;