import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('failed');
            setMessage('No order token provided.');
            return;
        }

        const processPayment = async () => {
            try {
                // 1. Capture the payment
                const captureRes = await fetch(`${API_URL}/api/payment/capture`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: token }),
                });
                const captureData = await captureRes.json();

                if (captureData.success) {
                    // 2. Verify the payment
                    const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: token }),
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        clearCart();
                        setStatus('success');
                        setMessage(`Payment verified successfully! Order ID: ${verifyData.customOrderId}`);
                    } else {
                        setStatus('failed');
                        setMessage('Payment verification failed.');
                    }
                } else {
                    setStatus('failed');
                    setMessage('Payment capture failed.');
                }
            } catch (error) {
                console.error('Error during payment completion:', error);
                setStatus('failed');
                setMessage('An error occurred during payment processing.');
            }
        };

        processPayment();
    }, [searchParams, clearCart]);

    return (
        <Layout>
            <div className="pt-32 pb-16 min-h-[70vh] flex items-center justify-center">
                <div className="container mx-auto px-4 max-w-md text-center">
                    {status === 'processing' && (
                        <div className="space-y-4">
                            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                            <h1 className="text-2xl font-bold">Processing...</h1>
                            <p className="text-muted-foreground">{message}</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-6">
                            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                            <h1 className="text-3xl font-display font-bold">Payment Successful!</h1>
                            <p className="text-muted-foreground">{message}</p>
                            <div className="pt-4">
                                <Link to="/products">
                                    <Button className="w-full sm:w-auto gradient-primary">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === 'failed' && (
                        <div className="space-y-6">
                            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
                            <h1 className="text-3xl font-display font-bold">Payment Failed</h1>
                            <p className="text-muted-foreground">{message}</p>
                            <div className="pt-4 space-y-3">
                                <Button
                                    onClick={() => navigate('/checkout')}
                                    variant="outline"
                                    className="w-full border-primary text-primary hover:bg-primary/5"
                                >
                                    Return to Checkout
                                </Button>
                                <Link to="/contact">
                                    <Button variant="ghost" className="w-full text-muted-foreground">
                                        Contact Support
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PaymentSuccess;
