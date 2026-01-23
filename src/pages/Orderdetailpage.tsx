import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  Download,
  RotateCcw,
  MessageCircle,
  MapPin,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  FileText,
  Printer,
  Share2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCurrency } from '@/contexts/CurrencyContext';
import Layout from '@/components/layout/Layout';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  sku: string;
}

interface TrackingEvent {
  status: string;
  location: string;
  date: string;
  time: string;
  description: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  estimatedDelivery?: string;
  trackingNumber?: string;
  carrier?: string;
  paymentMethod: string;
  customerEmail: string;
  trackingEvents?: TrackingEvent[];
}

// Mock data - in real app, fetch based on order ID
const mockOrder: Order = {
  id: '1',
  orderNumber: 'DG-2026-001234',
  date: '2026-01-20T10:30:00',
  status: 'shipped',
  subtotal: 274.99,
  shipping: 15.00,
  tax: 10.00,
  discount: 0,
  total: 299.99,
  items: [
    {
      id: '1',
      name: 'Premium Ceramic Coating Kit',
      quantity: 1,
      price: 149.99,
      image: '/api/placeholder/120/120',
      sku: 'CCK-PRO-001'
    },
    {
      id: '2',
      name: 'Microfiber Towel Set (6-Pack)',
      quantity: 2,
      price: 62.50,
      image: '/api/placeholder/120/120',
      sku: 'MFT-SET-006'
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567'
  },
  billingAddress: {
    name: 'John Doe',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  estimatedDelivery: '2026-01-25',
  trackingNumber: 'TRK123456789',
  carrier: 'UPS Ground',
  paymentMethod: 'Visa ending in 1234',
  customerEmail: 'john.doe@example.com',
  trackingEvents: [
    {
      status: 'In Transit',
      location: 'Philadelphia, PA',
      date: '2026-01-23',
      time: '14:30',
      description: 'Package is in transit to next facility'
    },
    {
      status: 'Departed Facility',
      location: 'Newark, NJ',
      date: '2026-01-22',
      time: '08:15',
      description: 'Package has left the facility'
    },
    {
      status: 'Arrived at Facility',
      location: 'Newark, NJ',
      date: '2026-01-21',
      time: '22:45',
      description: 'Package arrived at sorting facility'
    },
    {
      status: 'Picked Up',
      location: 'New York, NY',
      date: '2026-01-20',
      time: '16:00',
      description: 'Package picked up by carrier'
    },
    {
      status: 'Order Placed',
      location: 'Detail Guardz',
      date: '2026-01-20',
      time: '10:30',
      description: 'Order confirmed and being prepared'
    }
  ]
};

const getStatusConfig = (status: OrderStatus) => {
  const configs = {
    pending: {
      label: 'Pending',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      dotColor: 'bg-yellow-500'
    },
    processing: {
      label: 'Processing',
      icon: Package,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      dotColor: 'bg-blue-500'
    },
    shipped: {
      label: 'Shipped',
      icon: Truck,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      dotColor: 'bg-purple-500'
    },
    delivered: {
      label: 'Delivered',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200',
      dotColor: 'bg-green-500'
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      color: 'bg-red-100 text-red-800 border-red-200',
      dotColor: 'bg-red-500'
    }
  };
  return configs[status];
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const { currency } = useCurrency();
  const order = mockOrder; // In real app: fetch order by orderId
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  // Currency conversion rates (in a real app, fetch from API)
  const conversionRates = {
    USD: 1,
    CAD: 1.35
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * conversionRates[currency as keyof typeof conversionRates];
    const symbol = currency === 'CAD' ? 'CA$' : '$';
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/orders" className="hover:text-slate-900 transition-colors">
              My Orders
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">{order.orderNumber}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="font-display text-4xl md:text-5xl mb-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Order {order.orderNumber}
                </h1>
                <p className="text-slate-600">
                  Placed on {formatDate(order.date)}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="inline-flex">
              <Badge className={`${statusConfig.color} border font-medium text-base px-4 py-2 flex items-center gap-2`}>
                <StatusIcon className="w-5 h-5" />
                {statusConfig.label}
                <span className={`w-2.5 h-2.5 rounded-full ${statusConfig.dotColor} animate-pulse`}></span>
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tracking Information */}
              {order.trackingNumber && order.trackingEvents && (
                <Card className="border-slate-200 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-display">Package Tracking</CardTitle>
                        <CardDescription className="text-slate-600">
                          {order.carrier} • Tracking: {order.trackingNumber}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {order.estimatedDelivery && (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-900">
                          <Calendar className="w-5 h-5" />
                          <p className="font-semibold">
                            Estimated Delivery: {formatShortDate(order.estimatedDelivery)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tracking Timeline */}
                    <div className="relative space-y-6">
                      {order.trackingEvents.map((event, index) => (
                        <div key={index} className="relative flex gap-4">
                          {/* Timeline Line */}
                          {index !== order.trackingEvents!.length - 1 && (
                            <div className="absolute left-[15px] top-8 w-0.5 h-full bg-slate-200"></div>
                          )}
                          
                          {/* Timeline Dot */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            index === 0 
                              ? 'bg-purple-600 ring-4 ring-purple-100' 
                              : 'bg-slate-300'
                          }`}>
                            {index === 0 && <div className="w-3 h-3 bg-white rounded-full"></div>}
                          </div>

                          {/* Event Details */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-start justify-between gap-4 mb-1">
                              <h4 className={`font-semibold ${index === 0 ? 'text-purple-900' : 'text-slate-900'}`}>
                                {event.status}
                              </h4>
                              <span className="text-sm text-slate-500 whitespace-nowrap">
                                {formatShortDate(event.date)} at {event.time}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">{event.description}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                      <Truck className="w-4 h-4 mr-2" />
                      Track with {order.carrier}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Order Items */}
              <Card className="border-slate-200 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-display">Order Items</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                        <div className="w-24 h-24 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <Package className="w-10 h-10 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 mb-1">{item.name}</h4>
                          <p className="text-sm text-slate-600 mb-2">SKU: {item.sku}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-slate-600">Qty: {item.quantity}</span>
                            <span className="text-slate-400">•</span>
                            <span className="font-semibold text-slate-900">{formatPrice(item.price)} each</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-slate-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border-slate-200 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50/30 border-b border-slate-200">
                  <CardTitle className="text-xl font-display">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto py-4">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold text-sm">Contact Support</p>
                        <p className="text-xs text-slate-500">Get help with your order</p>
                      </div>
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" className="flex items-center gap-2 justify-start h-auto py-4">
                        <RotateCcw className="w-5 h-5 text-orange-600" />
                        <div className="text-left">
                          <p className="font-semibold text-sm">Return Items</p>
                          <p className="text-xs text-slate-500">Start a return request</p>
                        </div>
                      </Button>
                    )}
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto py-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <p className="font-semibold text-sm">Leave Review</p>
                        <p className="text-xs text-slate-500">Share your experience</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto py-4">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <div className="text-left">
                        <p className="font-semibold text-sm">Report Issue</p>
                        <p className="text-xs text-slate-500">Something wrong?</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="border-slate-200 shadow-lg overflow-hidden  top-24">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/30 border-b border-slate-200">
                  <CardTitle className="text-xl font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-semibold text-slate-900">{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Shipping</span>
                      <span className="font-semibold text-slate-900">{formatPrice(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax</span>
                      <span className="font-semibold text-slate-900">{formatPrice(order.tax)}</span>
                    </div>
                    {order.discount && order.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount</span>
                        <span className="font-semibold text-green-600">-{formatPrice(order.discount)}</span>
                      </div>
                    )}
                    <Separator className="my-3" />
                    <div className="flex justify-between">
                      <span className="font-bold text-lg text-slate-900">Total</span>
                      <span className="font-bold text-2xl text-slate-900">{formatPrice(order.total)}</span>
                    </div>
                    <div className="text-xs text-slate-500 text-center pt-2">
                      Prices shown in {currency}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-slate-200 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-slate-700" />
                    <CardTitle className="text-lg font-display">Shipping Address</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-slate-900">{order.shippingAddress.name}</p>
                    <p className="text-slate-600">{order.shippingAddress.street}</p>
                    <p className="text-slate-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-slate-600">{order.shippingAddress.country}</p>
                    <div className="flex items-center gap-2 pt-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="border-slate-200 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-700" />
                    <CardTitle className="text-lg font-display">Billing Address</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-slate-900">{order.billingAddress.name}</p>
                    <p className="text-slate-600">{order.billingAddress.street}</p>
                    <p className="text-slate-600">
                      {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                    </p>
                    <p className="text-slate-600">{order.billingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-slate-200 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50/30 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-slate-700" />
                    <CardTitle className="text-lg font-display">Payment Method</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-slate-900">{order.paymentMethod}</p>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span>{order.customerEmail}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;