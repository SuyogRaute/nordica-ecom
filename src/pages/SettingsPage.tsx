import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Package, 
  Settings as SettingsIcon,
  Bell,
  Lock,
  Heart,
  LogOut,
  Save,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/layout/Layout';

const Settings = () => {
  // Profile State
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });

  // Payment Information State
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: 'John Doe',
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/25',
    cvv: '***',
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: false,
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleProfileSave = () => {
    // In a real app, this would call an API
    setSavedMessage('Profile information saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleShippingSave = () => {
    setSavedMessage('Shipping address saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handlePaymentSave = () => {
    setSavedMessage('Payment information saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Settings</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-6xl mb-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent pb-4">
              Account Settings
            </h1>
            <p className="text-slate-600 text-lg">
              Manage your account details, shipping preferences, and payment methods
            </p>
          </div>

          {/* Success Message */}
          {savedMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <Save className="w-5 h-5" />
              {savedMessage}
            </div>
          )}

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Desktop Sidebar Navigation - Hidden on mobile, shown on lg and above */}
            <aside className="hidden lg:block space-y-2">
              <Link 
                to="/settings" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/20"
              >
                <SettingsIcon className="w-5 h-5" />
                <span className="font-medium">General Settings</span>
              </Link>
              
              <Link 
                to="/myorders" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <Package className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                <span className="text-slate-700 group-hover:text-slate-900 font-medium">My Orders</span>
              </Link>

              <Link 
                to="/wishlist" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <Heart className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                <span className="text-slate-700 group-hover:text-slate-900 font-medium">Wishlist</span>
              </Link>

              <Link 
                to="/security" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <Lock className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                <span className="text-slate-700 group-hover:text-slate-900 font-medium">Security</span>
              </Link>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 group w-full">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Profile Section */}
              <Card className="border-slate-200 shadow-lg shadow-slate-900/5 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-display">Profile Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </div>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone
                        </div>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleProfileSave}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 shadow-lg shadow-slate-900/20"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address Section */}
              <Card className="border-slate-200 shadow-lg shadow-slate-900/5 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-display">Shipping Address</CardTitle>
                      <CardDescription>Manage your default delivery address</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="shipFirstName" className="text-slate-700 font-medium">First Name</Label>
                      <Input
                        id="shipFirstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipLastName" className="text-slate-700 font-medium">Last Name</Label>
                      <Input
                        id="shipLastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address" className="text-slate-700 font-medium">Address</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="apartment" className="text-slate-700 font-medium">
                        Apartment, Suite, etc. <span className="text-slate-400">(optional)</span>
                      </Label>
                      <Input
                        id="apartment"
                        value={shippingAddress.apartment}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-700 font-medium">City</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-slate-700 font-medium">State/Province</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-slate-700 font-medium">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-slate-700 font-medium">Country</Label>
                      <Input
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleShippingSave}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 shadow-lg shadow-slate-900/20"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Address
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information Section */}
              <Card className="border-slate-200 shadow-lg shadow-slate-900/5 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-display">Payment Information</CardTitle>
                      <CardDescription>Manage your payment methods securely</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="nameOnCard" className="text-slate-700 font-medium">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="cardNumber" className="text-slate-700 font-medium">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-slate-700 font-medium">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-slate-700 font-medium">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={4}
                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900 font-medium">Secure Payment</p>
                        <p className="text-xs text-blue-700 mt-1">
                          Your payment information is encrypted and securely stored. We never store your CVV.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handlePaymentSave}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 shadow-lg shadow-slate-900/20"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="border-slate-200 shadow-lg shadow-slate-900/5 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-display">Notification Preferences</CardTitle>
                      <CardDescription>Choose how you want to hear from us</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label htmlFor="orderUpdates" className="text-base font-medium cursor-pointer">Order Updates</Label>
                        <p className="text-sm text-slate-600">Get notified about your order status</p>
                      </div>
                      <Switch
                        id="orderUpdates"
                        checked={notifications.orderUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label htmlFor="promotions" className="text-base font-medium cursor-pointer">Promotions & Offers</Label>
                        <p className="text-sm text-slate-600">Receive exclusive deals and discounts</p>
                      </div>
                      <Switch
                        id="promotions"
                        checked={notifications.promotions}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter" className="text-base font-medium cursor-pointer">Newsletter</Label>
                        <p className="text-sm text-slate-600">Monthly tips and product highlights</p>
                      </div>
                      <Switch
                        id="newsletter"
                        checked={notifications.newsletter}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms" className="text-base font-medium cursor-pointer">SMS Notifications</Label>
                        <p className="text-sm text-slate-600">Text alerts for urgent updates</p>
                      </div>
                      <Switch
                        id="sms"
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Sidebar Navigation - Shown after Newsletter section on mobile */}
              <div className="lg:hidden">
  <Card className="border-slate-200 shadow-lg shadow-slate-900/5">
    <CardContent className="pt-6 space-y-2">
      <Link 
        to="/myorders" 
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 group border border-slate-200"
      >
        <Package className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
        <span className="text-slate-700 group-hover:text-slate-900 font-medium">My Orders</span>
      </Link>

      <Link 
        to="/wishlist" 
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 group border border-slate-200"
      >
        <Heart className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
        <span className="text-slate-700 group-hover:text-slate-900 font-medium">Wishlist</span>
      </Link>

      <Link 
        to="/security" 
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 group border border-slate-200"
      >
        <Lock className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
        <span className="text-slate-700 group-hover:text-slate-900 font-medium">Security</span>
      </Link>

      <div className="pt-4 mt-4 border-t border-slate-200">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 group w-full border border-slate-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </CardContent>
  </Card>
</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;