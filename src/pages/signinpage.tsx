import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';

export const SignIn = () => {
  // Load premium fonts
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your authentication logic here
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding & Image */}
            <div className="hidden lg:flex flex-col justify-center space-y-8 animate-fade-in-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm animate-slide-down">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Secure & Trusted</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight animate-slide-up" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>
                  Welcome Back to
                  <span className="block text-primary mt-2">Detail Guardz</span>
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', WebkitFontSmoothing: 'antialiased' }}>
                  Sign in to access your account and continue your premium car care journey.
                </p>
              </div>

              {/* Hero Image */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80" 
                    alt="Premium car detailing" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-lg font-semibold mb-1" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                      Premium Car Care Products
                    </p>
                    <p className="text-white/80 text-sm" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Inter', sans-serif" }}>
                      Professional-grade solutions for enthusiasts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="animate-fade-in-right">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-lg border border-slate-200 ">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>Sign In</h2>
                  <p className="text-slate-600" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: "'Inter', sans-serif" }}>Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        required
                        style={{ WebkitFontSmoothing: 'antialiased' }}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white group-hover:border-slate-400"
                      />
                      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      <Lock className="h-4 w-4 text-primary" />
                      Password
                    </label>
                    <div className="relative group">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors" style={{ WebkitFontSmoothing: 'antialiased' }}>Remember me</span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
                      style={{ WebkitFontSmoothing: 'antialiased' }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group animate-slide-up"
                    style={{ animationDelay: '0.4s' }}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
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
                      <span className="px-4 bg-white text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Options */}
                  <div className="flex justify-center" style={{ animationDelay: '0.6s' }}>
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

                  {/* Sign Up Link */}
                  <p className="text-center text-sm text-slate-600 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </form>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Shield className="h-4 w-4" />
                <span>Your data is protected with 256-bit encryption</span>
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

export default SignIn;