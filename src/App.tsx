import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WhereToBuy from "./pages/WhereToBuy";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Cart from "./pages/Cart";
import Products from "./pages/Product";
import { Scroll } from "lucide-react";
import ScrolltoTop from "./components/ScrolltoTop";
import ProductDetail from "./pages/ProductDetailpage";
import Checkout from "./pages/Checkout";
import Settings from "./pages/SettingsPage";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/Orderdetailpage";
import SignIn from "./pages/signinpage";
import SignUp from "./pages/signuppage";
import ForgotPassword from "./pages/forgotpassword";
import ReturnItem from "./pages/Returnitem";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
      <CartProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrolltoTop />
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/where-to-buy" element={<WhereToBuy />} />
          <Route path="/canada" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/myorders/:orderId" element={<OrderDetail />} />
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/return-item/:orderId" element={<ReturnItem/>}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </CartProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
