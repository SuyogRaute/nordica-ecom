import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  Search,
  Filter,
  Download,
  RotateCcw,
  MessageCircle,
  Eye,
  MapPin,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import Layout from '@/components/layout/Layout';

// Order status types
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  paymentMethod: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'DG-2026-001234',
    date: '2026-01-20',
    status: 'delivered',
    total: 299.99,
    items: [
      {
        id: '1',
        name: 'Premium Ceramic Coating Kit',
        quantity: 1,
        price: 149.99,
        image: '/api/placeholder/80/80'
      },
      {
        id: '2',
        name: 'Microfiber Towel Set (6-Pack)',
        quantity: 2,
        price: 75.00,
        image: '/api/placeholder/80/80'
      }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    trackingNumber: 'TRK123456789',
    paymentMethod: 'Visa •••• 1234'
  },
  {
    id: '2',
    orderNumber: 'DG-2026-001235',
    date: '2026-01-22',
    status: 'shipped',
    total: 89.99,
    items: [
      {
        id: '3',
        name: 'Glass Cleaner Pro',
        quantity: 3,
        price: 89.99,
        image: '/api/placeholder/80/80'
      }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    estimatedDelivery: '2026-01-25',
    trackingNumber: 'TRK987654321',
    paymentMethod: 'Mastercard •••• 5678'
  },
  {
    id: '3',
    orderNumber: 'DG-2026-001236',
    date: '2026-01-23',
    status: 'processing',
    total: 449.99,
    items: [
      {
        id: '4',
        name: 'Complete Detailing Kit',
        quantity: 1,
        price: 449.99,
        image: '/api/placeholder/80/80'
      }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    estimatedDelivery: '2026-01-28',
    paymentMethod: 'Visa •••• 1234'
  },
  {
    id: '4',
    orderNumber: 'DG-2026-001237',
    date: '2026-01-15',
    status: 'cancelled',
    total: 59.99,
    items: [
      {
        id: '5',
        name: 'Wheel Cleaner',
        quantity: 1,
        price: 59.99,
        image: '/api/placeholder/80/80'
      }
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Visa •••• 1234'
  }
];

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

const OrderCard = ({ order, currency, formatPrice }: { 
  order: Order; 
  currency: string; 
  formatPrice: (price: number) => string;
}) => {
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <CardContent className="p-0">
        {/* Order Header */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 p-6 border-b border-slate-200">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Link to={`/orders/${order.id}`} className="hover:underline">
                  <h3 className="font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors">
                    Order {order.orderNumber}
                  </h3>
                </Link>
                <Badge className={`${statusConfig.color} border font-medium flex items-center gap-1.5`}>
                  <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`}></span>
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Ordered: {new Date(order.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <Truck className="w-4 h-4" />
                    <span>Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600 mb-1">Total</p>
              <p className="text-2xl font-bold text-slate-900">{formatPrice(order.total)}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate">{item.name}</h4>
                <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Grid */}
        <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Shipping Address</p>
              <p className="text-sm text-slate-900">{order.shippingAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <Package className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Payment Method</p>
              <p className="text-sm text-slate-900">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Tracking Number (if shipped) */}
        {order.trackingNumber && order.status === 'shipped' && (
          <div className="px-6 pb-6">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-600 font-medium mb-0.5">Tracking Number</p>
                    <p className="text-sm font-mono font-semibold text-blue-900">{order.trackingNumber}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Track Package
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex flex-wrap gap-3">
          <Link to={`/myorders/${order.id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Invoice
          </Button>
          {order.status === 'delivered' && (
            <Link to={`/return-item/${order.id}`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                <RotateCcw className="w-4 h-4" />
                Return Items
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MyOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { currency } = useCurrency();

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

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/settings" className="hover:text-slate-900 transition-colors">
              Account
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">My Orders</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-6xl mb-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-slate-600 text-lg">
              Track, manage, and review your order history
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search orders by number or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-300 h-12"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white border-slate-300 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{mockOrders.length}</p>
              </div>
              <p className="text-sm text-slate-600">Total Orders</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {mockOrders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
              <p className="text-sm text-slate-600">In Transit</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {mockOrders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <p className="text-sm text-slate-600">Delivered</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {mockOrders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <p className="text-sm text-slate-600">Processing</p>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  currency={currency}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
              <p className="text-slate-600 mb-6">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : "You haven't placed any orders yet"}
              </p>
              <Link to="/products">
                <Button className="bg-slate-900 hover:bg-slate-800">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;