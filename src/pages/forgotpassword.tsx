import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Link 
            to="/signin" 
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors mb-8 group animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-lg border border-slate-200 animate-fade-in-up">
            {!isSuccess ? (
              <>
                {/* Icon */}
                <div className="mb-6 animate-slide-down">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <h1 className="text-3xl font-bold text-slate-900 mb-3" style={{ WebkitFontSmoothing: 'antialiased' }}>Forgot Password?</h1>
                  <p className="text-slate-600 leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased' }}>
                    No worries! Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group animate-slide-up"
                    style={{ animationDelay: '0.3s' }}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Additional Help */}
                <div className="mt-8 p-4 bg-slate-50 rounded-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <p className="text-sm text-slate-600 text-center">
                    Remember your password?{' '}
                    <Link to="/signin" className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center animate-scale-in">
                  {/* Success Icon */}
                  <div className="mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-bounce-in">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  </div>

                  {/* Success Message */}
                  <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ WebkitFontSmoothing: 'antialiased' }}>Check Your Email</h2>
                  <p className="text-slate-600 mb-2" style={{ WebkitFontSmoothing: 'antialiased' }}>
                    We've sent password reset instructions to:
                  </p>
                  <p className="text-primary font-semibold mb-6" style={{ WebkitFontSmoothing: 'antialiased' }}>{email}</p>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed" style={{ WebkitFontSmoothing: 'antialiased' }}>
                      Click the link in the email to reset your password. If you don't see the email, check your spam folder.
                    </p>

                    <div className="pt-4">
                      <Link to="/signin">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group">
                          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                          Back to Sign In
                        </Button>
                      </Link>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-sm text-slate-600 hover:text-primary transition-colors"
                    >
                      Didn't receive the email? <span className="font-semibold">Resend</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Shield className="h-4 w-4" />
            <span>Your data is protected with 256-bit encryption</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;