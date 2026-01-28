import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';

export const SignUp = () => {
  // Load premium fonts
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your registration logic here
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image & Info */}
            <div className="hidden lg:block space-y-8 animate-fade-in-left sticky top-24">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm animate-slide-down">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary" style={{ WebkitFontSmoothing: 'antialiased' }}>Join 50,000+ Car Enthusiasts</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight animate-slide-up" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>
                  Start Your
                  <span className="block text-primary mt-2">Premium Journey</span>
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', WebkitFontSmoothing: 'antialiased' }}>
                  Create your account and unlock exclusive benefits designed for car care professionals and enthusiasts.
                </p>
              </div>

              {/* Hero Image */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1632823469434-e3e4fbc8b125?w=800&auto=format&fit=crop&q=80" 
                    alt="Professional car care" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-xl font-bold mb-2" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                      Join Our Community
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Inter', sans-serif" }}>
                      Get access to exclusive deals, rewards program, and professional-grade car care products trusted by enthusiasts worldwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Risk-Free Guarantee</h3>
                    <p className="text-sm text-slate-600 leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Inter', sans-serif" }}>
                      Not satisfied? Get a full refund within 30 days, no questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="animate-fade-in-right">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-lg border border-slate-200 ">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>Create Account</h2>
                  <p className="text-slate-600" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Inter', sans-serif" }}>Fill in your details to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                      <label htmlFor="firstName" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                        <User className="h-4 w-4 text-primary" />
                        First Name
                      </label>
                      <div className="relative group">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          required
                          style={{ WebkitFontSmoothing: 'antialiased' }}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                        />
                        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                      <label htmlFor="lastName" className="text-sm font-medium text-slate-700" style={{ WebkitFontSmoothing: 'antialiased' }}>
                        Last Name
                      </label>
                      <div className="relative group">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          required
                          style={{ WebkitFontSmoothing: 'antialiased' }}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                        />
                        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        required
                        style={{ WebkitFontSmoothing: 'antialiased' }}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                      />
                      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.25s' }}>
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      <Phone className="h-4 w-4 text-primary" />
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        required
                        style={{ WebkitFontSmoothing: 'antialiased' }}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                      />
                      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      <Lock className="h-4 w-4 text-primary" />
                      Password
                    </label>
                    <div className="relative group">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        style={{ WebkitFontSmoothing: 'antialiased' }}
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <p className="text-xs text-slate-500" style={{ WebkitFontSmoothing: 'antialiased' }}>Must be at least 8 characters with a mix of letters and numbers</p>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.35s' }}>
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      <Lock className="h-4 w-4 text-primary" />
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        style={{ WebkitFontSmoothing: 'antialiased' }}
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors" style={{ WebkitFontSmoothing: 'antialiased' }}>
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors" style={{ WebkitFontSmoothing: 'antialiased' }}>
                        Send me exclusive offers and product updates
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group animate-slide-up"
                    style={{ animationDelay: '0.45s' }}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create My Account
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500">Or sign up with</span>
                    </div>
                  </div>

                  {/* Social Sign Up Options */}
                  <div className="flex justify-center" style={{ animationDelay: '0.55s' }}>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 hover:shadow-md group"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">Google</span>
                    </button>

                
                  </div>

                  {/* Sign In Link */}
                  <p className="text-center text-sm text-slate-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    Already have an account?{' '}
                    <Link 
                      to="/signin" 
                      className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.65s' }}>
                <Shield className="h-4 w-4" />
                <span>Your information is protected with enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUp;