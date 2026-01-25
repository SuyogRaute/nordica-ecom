import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, Check, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Edit states for each section
  const [editingContact, setEditingContact] = useState(true);
  const [editingShipping, setEditingShipping] = useState(true);
  const [editingPayment, setEditingPayment] = useState(true);

  // Form data states
  const [contactData, setContactData] = useState({ email: '', phone: '' });
  const [shippingData, setShippingData] = useState({
    firstName: '', lastName: '', address: '', apartment: '',
    city: '', state: '', zip: '', country: currency === 'USD' ? 'United States' : 'Canada'
  });
  const [paymentData, setPaymentData] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  const shippingRates = {
    standard: currency === 'USD' ? 9.99 : 14.99,
    express: currency === 'USD' ? 19.99 : 29.99,
    priority: currency === 'USD' ? 39.99 : 49.99,
  };

  const shipping = subtotal >= 99 && shippingMethod === 'standard' ? 0 : shippingRates[shippingMethod as keyof typeof shippingRates];
  const tax = (subtotal + shipping) * 0.13;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    navigate('/checkout/success');
  };

  const handleContactUpdate = () => {
    setEditingContact(false);
  };

  const handleShippingUpdate = () => {
    setEditingShipping(false);
  };

  const handlePaymentUpdate = () => {
    setEditingPayment(false);
  };

  const isContactComplete = contactData.email && contactData.phone;
  const isShippingComplete = shippingData.firstName && shippingData.lastName && 
    shippingData.address && shippingData.city && shippingData.state && shippingData.zip;
  const isPaymentComplete = paymentData.cardName && paymentData.cardNumber && 
    paymentData.expiry && paymentData.cvv;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-[100vw] overflow-x-hidden">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 text-foreground">
            CHECKOUT
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* Contact Information */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 w-full overflow-hidden">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="font-display text-base sm:text-lg md:text-xl text-foreground">
                      CONTACT INFORMATION
                    </h2>
                    {isContactComplete && !editingContact && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingContact(true)}
                        className="flex items-center gap-1 md:gap-2 h-8 md:h-9"
                      >
                        <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Update</span>
                      </Button>
                    )}
                  </div>

                  {editingContact ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full">
                          <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            required 
                            value={contactData.email}
                            onChange={(e) => setContactData({...contactData, email: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="phone" className="text-sm md:text-base">Phone</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            required 
                            value={contactData.phone}
                            onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                      </div>
                      {isContactComplete && (
                        <Button
                          type="button"
                          onClick={handleContactUpdate}
                          className="w-full sm:w-auto text-sm md:text-base"
                        >
                          <Check className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Save Contact Info
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2 w-full overflow-hidden">
                      <p className="text-xs md:text-sm text-foreground break-words">
                        <span className="font-medium">Email:</span> {contactData.email}
                      </p>
                      <p className="text-xs md:text-sm text-foreground break-words">
                        <span className="font-medium">Phone:</span> {contactData.phone}
                      </p>
                    </div>
                  )}
                </div>

                {/* Shipping Address */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 w-full overflow-hidden">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="font-display text-base sm:text-lg md:text-xl text-foreground flex items-center gap-2">
                      <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <span className="hidden sm:inline">SHIPPING ADDRESS</span>
                      <span className="sm:hidden">SHIPPING</span>
                    </h2>
                    {isShippingComplete && !editingShipping && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingShipping(true)}
                        className="flex items-center gap-1 md:gap-2 h-8 md:h-9"
                      >
                        <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Update</span>
                      </Button>
                    )}
                  </div>

                  {editingShipping ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full">
                          <Label htmlFor="firstName" className="text-sm md:text-base">First Name</Label>
                          <Input 
                            id="firstName" 
                            required 
                            value={shippingData.firstName}
                            onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="lastName" className="text-sm md:text-base">Last Name</Label>
                          <Input 
                            id="lastName" 
                            required 
                            value={shippingData.lastName}
                            onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="sm:col-span-2 w-full">
                          <Label htmlFor="address" className="text-sm md:text-base">Address</Label>
                          <Input 
                            id="address" 
                            required 
                            value={shippingData.address}
                            onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="sm:col-span-2 w-full">
                          <Label htmlFor="apartment" className="text-sm md:text-base">Apartment, Suite, etc. (optional)</Label>
                          <Input 
                            id="apartment" 
                            value={shippingData.apartment}
                            onChange={(e) => setShippingData({...shippingData, apartment: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="city" className="text-sm md:text-base">City</Label>
                          <Input 
                            id="city" 
                            required 
                            value={shippingData.city}
                            onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="state" className="text-sm md:text-base">State/Province</Label>
                          <Input 
                            id="state" 
                            required 
                            value={shippingData.state}
                            onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="zip" className="text-sm md:text-base">ZIP/Postal Code</Label>
                          <Input 
                            id="zip" 
                            required 
                            value={shippingData.zip}
                            onChange={(e) => setShippingData({...shippingData, zip: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="country" className="text-sm md:text-base">Country</Label>
                          <Input 
                            id="country" 
                            value={shippingData.country}
                            onChange={(e) => setShippingData({...shippingData, country: e.target.value})}
                            required 
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                      </div>
                      {isShippingComplete && (
                        <Button
                          type="button"
                          onClick={handleShippingUpdate}
                          className="w-full sm:w-auto text-sm md:text-base"
                        >
                          <Check className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Save Shipping Address
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-1 w-full overflow-hidden">
                      <p className="text-xs md:text-sm font-medium text-foreground break-words">
                        {shippingData.firstName} {shippingData.lastName}
                      </p>
                      <p className="text-xs md:text-sm text-foreground break-words">{shippingData.address}</p>
                      {shippingData.apartment && (
                        <p className="text-xs md:text-sm text-foreground break-words">{shippingData.apartment}</p>
                      )}
                      <p className="text-xs md:text-sm text-foreground break-words">
                        {shippingData.city}, {shippingData.state} {shippingData.zip}
                      </p>
                      <p className="text-xs md:text-sm text-foreground break-words">{shippingData.country}</p>
                    </div>
                  )}
                </div>

                {/* Shipping Method */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 w-full overflow-hidden">
                  <h2 className="font-display text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-foreground">
                    SHIPPING METHOD
                  </h2>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="w-full">
                    <div className="space-y-3">
                      <label className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg cursor-pointer transition-colors gap-2 md:gap-3 w-full ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-center gap-2 md:gap-3 w-full">
                          <RadioGroupItem value="standard" id="standard" className="h-4 w-4 md:h-5 md:w-5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm md:text-base">Standard Shipping</p>
                            <p className="text-xs md:text-sm text-muted-foreground">5-7 business days</p>
                          </div>
                          <span className="font-medium text-foreground text-sm md:text-base whitespace-nowrap ml-2">
                            {subtotal >= 99 ? 'FREE' : formatPrice(shippingRates.standard)}
                          </span>
                        </div>
                      </label>

                      <label className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg cursor-pointer transition-colors gap-2 md:gap-3 w-full ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-center gap-2 md:gap-3 w-full">
                          <RadioGroupItem value="express" id="express" className="h-4 w-4 md:h-5 md:w-5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm md:text-base">Express Shipping</p>
                            <p className="text-xs md:text-sm text-muted-foreground">2-3 business days</p>
                          </div>
                          <span className="font-medium text-foreground text-sm md:text-base whitespace-nowrap ml-2">
                            {formatPrice(shippingRates.express)}
                          </span>
                        </div>
                      </label>

                      <label className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg cursor-pointer transition-colors gap-2 md:gap-3 w-full ${shippingMethod === 'priority' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-center gap-2 md:gap-3 w-full">
                          <RadioGroupItem value="priority" id="priority" className="h-4 w-4 md:h-5 md:w-5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm md:text-base">Priority Shipping</p>
                            <p className="text-xs md:text-sm text-muted-foreground">1-2 business days</p>
                          </div>
                          <span className="font-medium text-foreground text-sm md:text-base whitespace-nowrap ml-2">
                            {formatPrice(shippingRates.priority)}
                          </span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 w-full overflow-hidden">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="font-display text-base sm:text-lg md:text-xl text-foreground flex items-center gap-2">
                      <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <span className="hidden sm:inline">PAYMENT INFORMATION</span>
                      <span className="sm:hidden">PAYMENT</span>
                    </h2>
                    {isPaymentComplete && !editingPayment && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPayment(true)}
                        className="flex items-center gap-1 md:gap-2 h-8 md:h-9"
                      >
                        <Edit2 className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-xs md:text-sm">Update</span>
                      </Button>
                    )}
                  </div>

                  {editingPayment ? (
                    <div className="space-y-4">
                      <div className="w-full">
                        <Label htmlFor="cardName" className="text-sm md:text-base">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          required 
                          value={paymentData.cardName}
                          onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                          className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                        />
                      </div>
                      <div className="w-full">
                        <Label htmlFor="cardNumber" className="text-sm md:text-base">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          required 
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                          className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="w-full">
                          <Label htmlFor="expiry" className="text-sm md:text-base">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY" 
                            required 
                            value={paymentData.expiry}
                            onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                        <div className="w-full">
                          <Label htmlFor="cvv" className="text-sm md:text-base">CVV</Label>
                          <Input 
                            id="cvv" 
                            placeholder="123" 
                            required 
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                            className="mt-1 bg-secondary border-border w-full text-sm md:text-base" 
                          />
                        </div>
                      </div>
                      {isPaymentComplete && (
                        <Button
                          type="button"
                          onClick={handlePaymentUpdate}
                          className="w-full sm:w-auto text-sm md:text-base"
                        >
                          <Check className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Save Payment Info
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2 w-full overflow-hidden">
                      <p className="text-xs md:text-sm text-foreground break-words">
                        <span className="font-medium">Card:</span> •••• •••• •••• {paymentData.cardNumber.slice(-4)}
                      </p>
                      <p className="text-xs md:text-sm text-foreground break-words">
                        <span className="font-medium">Name:</span> {paymentData.cardName}
                      </p>
                      <p className="text-xs md:text-sm text-foreground break-words">
                        <span className="font-medium">Expires:</span> {paymentData.expiry}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 sticky top-24 w-full overflow-hidden">
                  <h2 className="font-display text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-foreground">
                    ORDER SUMMARY
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 max-h-[200px] md:max-h-[300px] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap ml-2">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 md:space-y-3 border-t border-border pt-3 md:pt-4">
                    <div className="flex justify-between text-xs md:text-sm lg:text-base text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm lg:text-base text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm lg:text-base text-muted-foreground">
                      <span>Estimated Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base lg:text-lg font-bold text-foreground border-t border-border pt-2 md:pt-3">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-4 md:mt-6 gradient-primary text-sm md:text-base" 
                    size="lg"
                    disabled={isProcessing || !isContactComplete || !isShippingComplete || !isPaymentComplete}
                  >
                    {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                  </Button>

                  <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm text-muted-foreground justify-center">
                    <Shield className="h-3 w-3 md:h-4 md:w-4 text-success" />
                    Secure SSL Encryption
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;