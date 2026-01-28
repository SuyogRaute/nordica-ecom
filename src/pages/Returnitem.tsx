import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  ChevronRight,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  FileImage,
  Video,
  ArrowLeft,
  Info,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import Layout from '@/components/layout/Layout';
import { useCurrency } from '@/contexts/CurrencyContext';

// Order status types
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Return reason types
const returnReasons = [
  {
    id: 'defective',
    label: 'Defective/Broken Product',
    description: 'Product arrived damaged or not working properly',
    icon: '🔧'
  },
  {
    id: 'wrong_item',
    label: 'Wrong Product Received',
    description: 'Received a different item than ordered',
    icon: '📦'
  },
  {
    id: 'not_as_described',
    label: 'Not as Described',
    description: 'Product does not match description or images',
    icon: '❌'
  },
  {
    id: 'size_fit',
    label: 'Size/Fit Issue',
    description: 'Product does not fit as expected',
    icon: '📏'
  },
  {
    id: 'quality',
    label: 'Poor Quality',
    description: 'Product quality is below expectations',
    icon: '⭐'
  },
  {
    id: 'changed_mind',
    label: 'Changed Mind',
    description: 'No longer need the product',
    icon: '💭'
  },
  {
    id: 'other',
    label: 'Other Reason',
    description: 'Please provide details below',
    icon: '📝'
  }
];

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

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

// Mock orders data (in real app, fetch from API)
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

interface ItemReturnInfo {
  itemId: string;
  quantity: number;
  selected: boolean;
}

const ReturnItem = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [itemsToReturn, setItemsToReturn] = useState<ItemReturnInfo[]>([]);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [returnRequestId, setReturnRequestId] = useState<string>('');

  // Fetch order details
  useEffect(() => {
    // In real app, fetch from API using orderId
    const foundOrder = mockOrders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      // Initialize all items as selected for return with full quantity
      setItemsToReturn(
        foundOrder.items.map(item => ({
          itemId: item.id,
          quantity: item.quantity,
          selected: true
        }))
      );
    }
  }, [orderId]);

  // Currency conversion
  const conversionRates = { USD: 1, CAD: 1.35 };
  const formatPrice = (price: number) => {
    const convertedPrice = price * conversionRates[currency as keyof typeof conversionRates];
    const symbol = currency === 'CAD' ? 'CA$' : '$';
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  // Handle item selection toggle
  const toggleItemSelection = (itemId: string) => {
    setItemsToReturn(prev =>
      prev.map(item =>
        item.itemId === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Handle quantity change for specific item
  const updateItemQuantity = (itemId: string, quantity: number) => {
    setItemsToReturn(prev =>
      prev.map(item =>
        item.itemId === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Calculate total refund amount
  const calculateRefundAmount = () => {
    if (!order) return 0;
    return itemsToReturn
      .filter(item => item.selected)
      .reduce((total, returnItem) => {
        const orderItem = order.items.find(i => i.id === returnItem.itemId);
        return total + (orderItem ? orderItem.price * returnItem.quantity : 0);
      }, 0);
  };

  if (!order) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-12">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Not Found</h2>
            <p className="text-slate-600 mb-6">The order you're looking for doesn't exist.</p>
            <Link to="/myorders">
              <Button className="bg-slate-900 hover:bg-slate-800">
                Back to My Orders
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      // Check file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        alert('Only image and video files are allowed');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: reader.result as string,
          type: isImage ? 'image' : 'video'
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = '';
  };

  // Remove uploaded file
  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason) {
      alert('Please select a return reason');
      return;
    }

    const selectedItems = itemsToReturn.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert('Please select at least one item to return');
      return;
    }

    // Validate quantities
    for (const returnItem of selectedItems) {
      const orderItem = order.items.find(i => i.id === returnItem.itemId);
      if (orderItem && (returnItem.quantity < 1 || returnItem.quantity > orderItem.quantity)) {
        alert(`Invalid quantity for ${orderItem.name}`);
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const requestId = `RTN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setReturnRequestId(requestId);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/myorders');
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="border-green-200 shadow-xl">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Return Request Submitted!
                </h2>
                <p className="text-slate-600 mb-2">
                  Your return request has been successfully submitted.
                </p>
                <p className="text-slate-600 mb-2">
                  Order: <span className="font-semibold">{order?.orderNumber}</span>
                </p>
                <p className="text-slate-600 mb-8">
                  Return Request ID: <span className="font-mono font-semibold">{returnRequestId}</span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-900 font-semibold mb-2">
                    Estimated Refund: {formatPrice(calculateRefundAmount())}
                  </p>
                  <p className="text-sm text-blue-800">
                    We'll review your request within 24-48 hours and send you an email with further instructions.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/myorders')}
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  Back to My Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/myorders" className="hover:text-slate-900 transition-colors">
              My Orders
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Return Item</span>
          </nav>

          {/* Back Button */}
          <Link to="/myorders">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl mb-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Return Item
            </h1>
            <p className="text-slate-600 text-lg">
              Please provide details about your return request
            </p>
          </div>

          {/* Info Alert */}
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              You have 30 days from delivery to return items. All returns are subject to our return policy.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Information */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Order Information</CardTitle>
                  <Badge className="bg-slate-100 text-slate-700 border-slate-300">
                    {order.orderNumber}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <Calendar className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Order Date</p>
                      <p className="text-sm text-slate-900 font-semibold">
                        {new Date(order.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Shipping Address</p>
                      <p className="text-sm text-slate-900">{order.shippingAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <CreditCard className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Payment Method</p>
                      <p className="text-sm text-slate-900">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-slate-900">Select Items to Return</h3>
                    <p className="text-sm text-slate-600">
                      {itemsToReturn.filter(i => i.selected).length} of {order.items.length} selected
                    </p>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => {
                      const returnInfo = itemsToReturn.find(i => i.itemId === item.id);
                      if (!returnInfo) return null;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                            returnInfo.selected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={returnInfo.selected}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            className="mt-1"
                          />
                          <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <Package className="w-8 h-8 text-slate-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 mb-1">{item.name}</h4>
                            <p className="text-sm text-slate-600 mb-2">
                              Price: {formatPrice(item.price)} • Max Qty: {item.quantity}
                            </p>
                            {returnInfo.selected && (
                              <div className="flex items-center gap-3">
                                <Label htmlFor={`qty-${item.id}`} className="text-sm font-medium">
                                  Return Quantity:
                                </Label>
                                <Input
                                  id={`qty-${item.id}`}
                                  type="number"
                                  min="1"
                                  max={item.quantity}
                                  value={returnInfo.quantity}
                                  onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                                  className="w-20 h-8"
                                />
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">
                              {returnInfo.selected ? formatPrice(item.price * returnInfo.quantity) : formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-slate-900">Total Refund Amount:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(calculateRefundAmount())}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Reason */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                <CardTitle className="text-xl">Reason for Return *</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                  <div className="space-y-3">
                    {returnReasons.map((reason) => (
                      <label
                        key={reason.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedReason === reason.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <RadioGroupItem value={reason.id} id={reason.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{reason.icon}</span>
                            <span className="font-semibold text-slate-900">
                              {reason.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{reason.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Upload Images/Videos */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                <CardTitle className="text-xl">Upload Photos or Videos (Optional)</CardTitle>
                <p className="text-sm text-slate-600 mt-2">
                  Help us process your return faster by providing images or videos of the issue
                </p>
              </CardHeader>
              <CardContent className="p-6">
                {/* Upload Button */}
                <div className="mb-6">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-slate-400 mb-3" />
                      <p className="mb-2 text-sm text-slate-700">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">
                        Images or Videos (Max 10MB per file)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="relative group rounded-lg overflow-hidden border-2 border-slate-200"
                      >
                        {file.type === 'image' ? (
                          <img
                            src={file.preview}
                            alt="Upload preview"
                            className="w-full h-32 object-cover"
                          />
                        ) : (
                          <div className="w-full h-32 bg-slate-100 flex items-center justify-center">
                            <Video className="w-12 h-12 text-slate-400" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                          {file.file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Alert className="mt-4 border-slate-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs text-slate-600">
                    Accepted formats: JPG, PNG, GIF, MP4, MOV. Max file size: 10MB per file.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Additional Comments */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200">
                <CardTitle className="text-xl">Additional Details (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="message" className="text-base font-semibold mb-3 block">
                  Tell us more about the issue
                </Label>
                <Textarea
                  id="message"
                  placeholder="Please provide any additional information that might help us process your return..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {customMessage.length}/1000 characters
                </p>
              </CardContent>
            </Card>

            {/* Return Policy Notice */}
            <Card className="border-amber-200 bg-amber-50 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Return Policy
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Items must be unused and in original packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Returns are processed within 5-7 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Refunds will be issued to the original payment method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Return shipping costs may apply based on reason</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/myorders')}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-slate-900 hover:bg-slate-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnItem;