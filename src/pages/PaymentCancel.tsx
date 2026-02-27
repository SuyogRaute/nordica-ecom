import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="pt-32 pb-16 min-h-[70vh] flex items-center justify-center">
                <div className="container mx-auto px-4 max-w-md text-center">
                    <div className="space-y-6">
                        <XCircle className="w-20 h-20 text-yellow-500 mx-auto" />
                        <h1 className="text-3xl font-display font-bold">Payment Cancelled</h1>
                        <p className="text-muted-foreground">
                            Your payment process was cancelled before completion. No charges were made.
                        </p>
                        <div className="pt-4 space-y-3">
                            <Button
                                onClick={() => navigate('/checkout')}
                                className="w-full gradient-primary"
                            >
                                Try Again
                            </Button>
                            <Link to="/cart">
                                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                                    Return to Cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentCancel;
