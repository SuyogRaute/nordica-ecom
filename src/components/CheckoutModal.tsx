import React, { useState, useEffect, useRef } from 'react';
import {
    X, CreditCard, CheckCircle, XCircle,
    Loader2, Lock, AlertCircle, LogIn, UserPlus, Eye, EyeOff,
    Download, FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrency } from '@/contexts/CurrencyContext';
import type { Product } from '@/data/products';

declare global {
    interface Window { paypal?: any; }
}

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AYx3w_UehDykoxHbMPeH-szLHZKm5IYaciKvbT2vx52lnuAJbTbcFPwxj-qbgWzRaqziZ20MsOqXGcRt';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface CheckoutModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

type AuthTab = 'login' | 'register';
type Step = 'auth' | 'payment' | 'success' | 'failed';

interface UserState {
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface OrderResult {
    customOrderId: string;
    amount: string;
    currency: string;
    productName: string;
    shippingAddress: string;
    payerEmail: string;
    payerName: string;
    captureId: string;
    createdAt: string;
}

function generateInvoiceHTML(order: OrderResult, user: UserState, product: Product): string {
    const date = new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
    const subtotal = parseFloat(order.amount);
    const tax = 0;
    const total = subtotal + tax;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice ${order.customOrderId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; background: #fff; padding: 40px; }
    .invoice-wrapper { max-width: 720px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 2px solid #111; }
    .brand { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .brand span { color: #e63946; }
    .invoice-meta { text-align: right; }
    .invoice-meta h1 { font-size: 28px; font-weight: 700; color: #111; letter-spacing: 2px; text-transform: uppercase; }
    .invoice-meta p { font-size: 13px; color: #666; margin-top: 4px; }
    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 36px; }
    .party h3 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 8px; }
    .party p  { font-size: 13px; line-height: 1.7; color: #333; }
    .party strong { color: #111; font-weight: 600; }
    .status-badge { display: inline-block; background: #d4edda; color: #155724; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 28px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    thead tr { background: #111; color: #fff; }
    thead th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    thead th:last-child { text-align: right; }
    tbody tr { border-bottom: 1px solid #f0f0f0; }
    tbody td { padding: 14px 16px; font-size: 13px; color: #333; vertical-align: top; }
    tbody td:last-child { text-align: right; font-weight: 600; }
    tbody tr:nth-child(even) { background: #fafafa; }
    .totals { margin-left: auto; width: 280px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
    .totals-row span:first-child { color: #666; }
    .totals-total { display: flex; justify-content: space-between; padding: 12px 0 0; font-size: 16px; font-weight: 800; color: #111; border-top: 2px solid #111; margin-top: 4px; }
    .payment-info { margin-top: 36px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #111; }
    .payment-info h3 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 10px; }
    .payment-info p  { font-size: 12px; color: #444; line-height: 1.8; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 11px; color: #999; line-height: 1.8; }
    @media print { body { padding: 20px; } .no-print { display: none !important; } }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    <div class="header">
      <div class="brand">DETAIL <span>GUARDZ</span></div>
      <div class="invoice-meta">
        <h1>Invoice</h1>
        <p>Invoice No: <strong>${order.customOrderId}</strong></p>
        <p>Date: ${date}</p>
      </div>
    </div>
    <div class="parties">
      <div class="party">
        <h3>From</h3>
        <p><strong>Detail Guardz</strong><br />detailguardz.com<br />support@detailguardz.com</p>
      </div>
      <div class="party">
        <h3>Bill To / Ship To</h3>
        <p><strong>${user.name}</strong><br />${user.email}<br />${user.phone}<br />${user.address}</p>
      </div>
    </div>
    <div class="status-badge">✓ Payment Confirmed</div>
    <table>
      <thead>
        <tr>
          <th style="width:50%">Description</th>
          <th>SKU</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${order.productName}</td>
          <td style="font-size:11px; color:#888;">${product.id}</td>
          <td>1</td>
          <td>$${subtotal.toFixed(2)}</td>
          <td>$${subtotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <div class="totals">
      <div class="totals-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="totals-row"><span>Tax</span><span>$${tax.toFixed(2)}</span></div>
      <div class="totals-row"><span>Shipping</span><span>Free</span></div>
      <div class="totals-total"><span>Total Paid</span><span>$${total.toFixed(2)} ${order.currency}</span></div>
    </div>
    <div class="payment-info">
      <h3>Payment Details</h3>
      <p>
        <strong>Method:</strong> PayPal<br />
        <strong>Transaction ID:</strong> ${order.captureId || 'N/A'}<br />
        <strong>PayPal Email:</strong> ${order.payerEmail}<br />
        <strong>Status:</strong> Completed & Captured
      </p>
    </div>
    <div class="footer">
      <p>Thank you for your purchase, ${user.name}!</p>
      <p>Questions? Contact us at support@detailguardz.com</p>
      <p style="margin-top:8px; font-size:10px; color:#bbb;">
        This is a computer-generated invoice. No signature required.<br />
        Order ID: ${order.customOrderId}
      </p>
    </div>
  </div>
</body>
</html>`;
}

function downloadInvoice(order: OrderResult, user: UserState, product: Product) {
    const html = generateInvoiceHTML(order, user, product);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${order.customOrderId}.html`;
    link.click();
    URL.revokeObjectURL(url);
}

function printInvoice(order: OrderResult, user: UserState, product: Product) {
    const html = generateInvoiceHTML(order, user, product);
    const win = window.open('', '_blank', 'width=800,height=900');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
}

// ─────────────────────────────────────────────────────────────────────────────
const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, isOpen, onClose }) => {
    const { formatPrice } = useCurrency();

    const [step, setStep] = useState<Step>('auth');
    const [authTab, setAuthTab] = useState<AuthTab>('login');
    const [loggedInUser, setLoggedInUser] = useState<UserState | null>(null);
    const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

    // Login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [showLoginPwd, setShowLoginPwd] = useState(false);

    // Register form
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regAddress, setRegAddress] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regErrors, setRegErrors] = useState<Record<string, string>>({});
    const [regLoading, setRegLoading] = useState(false);
    const [showRegPwd, setShowRegPwd] = useState(false);

    // PayPal
    const [paypalLoaded, setPaypalLoaded] = useState(false);
    const [paypalError, setPaypalError] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const paypalButtonRef = useRef<HTMLDivElement>(null);
    const paypalRendered = useRef(false);
    const loggedInUserRef = useRef<UserState | null>(null);

    useEffect(() => {
        loggedInUserRef.current = loggedInUser;
    }, [loggedInUser]);

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('auth');
            setAuthTab('login');
            setLoggedInUser(null);
            loggedInUserRef.current = null;
            setOrderResult(null);
            setLoginEmail(''); setLoginPassword(''); setLoginError('');
            setRegName(''); setRegEmail(''); setRegPhone('');
            setRegAddress(''); setRegPassword(''); setRegErrors({});
            setPaypalError('');
            setPaymentLoading(false);
            paypalRendered.current = false;
            if (paypalButtonRef.current) paypalButtonRef.current.innerHTML = '';
        }
    }, [isOpen]);

    // Load PayPal SDK (sandbox mode)
    useEffect(() => {
        if (!isOpen) return;

        if (window.paypal) {
            console.log('[PayPal SDK] already loaded');
            setPaypalLoaded(true);
            return;
        }

        if (document.getElementById('paypal-sdk')) {
            const check = setInterval(() => {
                if (window.paypal) {
                    clearInterval(check);
                    setPaypalLoaded(true);
                }
            }, 150);
            return () => clearInterval(check);
        }

        console.log('[PayPal SDK] injecting script (sandbox mode)...');
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&components=buttons`;
        script.async = true;
        script.onload = () => {
            console.log('[PayPal SDK] loaded successfully');
            setPaypalLoaded(true);
        };
        script.onerror = () => {
            setPaypalError('Failed to load PayPal SDK. Check your sandbox Client ID and internet connection.');
        };
        document.body.appendChild(script);
    }, [isOpen]);

    // Mount PayPal buttons
    useEffect(() => {
        if (step !== 'payment') return;
        if (!paypalLoaded) return;
        if (!window.paypal) return;
        if (paypalRendered.current) return;
        if (!paypalButtonRef.current) return;

        const user = loggedInUserRef.current;
        if (!user || !user.userId) {
            console.debug('[PayPal] Waiting for user data...');
            return;
        }

        console.log('[PayPal] Rendering sandbox buttons for user:', user.userId);
        paypalRendered.current = true;
        setPaymentLoading(true);

        window.paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 50 },

            createOrder: async () => {
                try {
                    const res = await fetch(`${API_BASE}/api/payment/create`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            amount: product.price.toFixed(2),
                            productName: product.name,
                            productId: product.id,
                            userId: user.userId,
                            currency: 'USD',
                        }),
                    });

                    const data = await res.json();
                    if (!res.ok || data.error || !data.orderId) {
                        throw new Error(data.error || 'Failed to create PayPal order');
                    }
                    console.log('[createOrder] Success – Order ID:', data.orderId);
                    return data.orderId;
                } catch (err: any) {
                    setPaypalError(err.message || 'Could not initialize payment');
                    console.error('[createOrder] Error:', err);
                    throw err;
                }
            },

            onApprove: async (data: { orderID: string }) => {
                try {
                    const capRes = await fetch(`${API_BASE}/api/payment/capture`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderId: data.orderID }),
                    });
                    const capData = await capRes.json();
                    if (!capRes.ok) throw new Error(capData.error || 'Capture failed');

                    const verRes = await fetch(`${API_BASE}/api/payment/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderId: data.orderID, userDetails: user }),
                    });
                    const verData = await verRes.json();

                    if (verData.success) {
                        setOrderResult({
                            customOrderId: verData.customOrderId || verData.custom_order_id || '',
                            amount: verData.amount,
                            currency: verData.currency || 'USD',
                            productName: product.name,
                            shippingAddress: user.address,
                            payerEmail: verData.payerEmail || user.email,
                            payerName: verData.payerName || user.name,
                            captureId: verData.captureId || verData.capture_id || '',
                            createdAt: verData.createdAt || verData.create_time || new Date().toISOString(),
                        });
                        setStep('success');
                    } else {
                        throw new Error(verData.message || 'Verification failed');
                    }
                } catch (err: any) {
                    setPaypalError(err.message || 'Payment processing failed');
                    setStep('failed');
                }
            },

            onError: (err: any) => {
                console.error('[PayPal onError]', err);
                setPaypalError('PayPal encountered an error. Please check console and try again.');
                setStep('failed');
            },

            onCancel: () => {
                setPaypalError('Payment was cancelled.');
                paypalRendered.current = false;
            },
        })
            .render(paypalButtonRef.current)
            .then(() => {
                console.log('[PayPal] Buttons rendered successfully (sandbox)');
                setPaymentLoading(false);
            })
            .catch((err: any) => {
                console.error('[PayPal render failed]', err);
                paypalRendered.current = false;
                setPaymentLoading(false);
                setPaypalError('Failed to show PayPal buttons. Check console for details.');
            });
    }, [step, paypalLoaded, loggedInUser, product]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        if (!loginEmail.trim() || !loginPassword) {
            setLoginError('Email and password required.');
            return;
        }
        setLoginLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
            });
            const data = await res.json();
            if (data.success && data.user) {
                loggedInUserRef.current = data.user;
                setLoggedInUser(data.user);
                setStep('payment');
            } else {
                setLoginError(data.error || 'Login failed.');
            }
        } catch {
            setLoginError('Cannot connect to server. Is backend running?');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!regName.trim() || regName.trim().length < 2) errs.name = 'Full name required (min 2 chars)';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errs.email = 'Valid email required';
        if (!/^\+?[\d\s\-()]{7,15}$/.test(regPhone)) errs.phone = 'Valid phone required';
        if (!regAddress.trim() || regAddress.trim().length < 10) errs.address = 'Full address required';
        if (!regPassword || regPassword.length < 6) errs.password = 'Password ≥ 6 characters';
        setRegErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setRegLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: regName.trim(),
                    email: regEmail.trim(),
                    phone: regPhone.trim(),
                    address: regAddress.trim(),
                    password: regPassword,
                }),
            });
            const data = await res.json();

            if (data.success && data.user) {
                loggedInUserRef.current = data.user;
                setLoggedInUser(data.user);
                setStep('payment');
            } else if (res.status === 409) {
                setRegErrors({ email: 'Email already registered.' });
                setLoginEmail(regEmail.trim());
                setLoginError('Email already in use. Please log in.');
                setAuthTab('login');
            } else {
                setRegErrors({ general: data.error || 'Registration failed.' });
            }
        } catch {
            setRegErrors({ general: 'Network error — check backend.' });
        } finally {
            setRegLoading(false);
        }
    };

    const handleClose = () => {
        paypalRendered.current = false;
        if (paypalButtonRef.current) paypalButtonRef.current.innerHTML = '';
        onClose();
    };

    const ProductStrip = () => (
        <div className="flex gap-3 p-3 bg-secondary rounded-lg mb-5">
            <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-contain rounded-md bg-card flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-2">{product.name}</p>
                <p className="text-base font-bold text-primary mt-0.5">{formatPrice(product.price)}</p>
            </div>
        </div>
    );

    if (!isOpen) return null;

    const stepTitles: Record<Step, string> = {
        auth: authTab === 'login' ? 'Log In to Continue' : 'Create Account',
        payment: 'Complete Payment',
        success: 'Order Confirmed!',
        failed: 'Payment Failed',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-2">
                        {step === 'auth' && authTab === 'login' && <LogIn className="h-5 w-5 text-primary" />}
                        {step === 'auth' && authTab === 'register' && <UserPlus className="h-5 w-5 text-primary" />}
                        {step === 'payment' && <CreditCard className="h-5 w-5 text-primary" />}
                        {step === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {step === 'failed' && <XCircle className="h-5 w-5 text-red-500" />}
                        <h2 className="font-semibold text-foreground">{stepTitles[step]}</h2>
                    </div>
                    <button onClick={handleClose} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-secondary">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-5">
                    {/* Progress bar */}
                    {(step === 'auth' || step === 'payment') && (
                        <div className="flex items-center gap-2 mb-5">
                            <div className={`flex items-center gap-1.5 text-xs font-semibold ${step === 'auth' ? 'text-primary' : 'text-green-500'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'auth' ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'}`}>
                                    {step === 'auth' ? '1' : '✓'}
                                </div>
                                Account
                            </div>
                            <div className="flex-1 h-px bg-border" />
                            <div className={`flex items-center gap-1.5 text-xs font-semibold ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                                    2
                                </div>
                                Payment
                            </div>
                        </div>
                    )}

                    {/* AUTH STEP */}
                    {step === 'auth' && (
                        <>
                            <ProductStrip />

                            <div className="flex rounded-lg border border-border overflow-hidden mb-5">
                                <button
                                    onClick={() => { setAuthTab('login'); setLoginError(''); }}
                                    className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 ${authTab === 'login' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                                >
                                    <LogIn className="h-3.5 w-3.5" /> Log In
                                </button>
                                <button
                                    onClick={() => { setAuthTab('register'); setRegErrors({}); }}
                                    className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 ${authTab === 'register' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                                >
                                    <UserPlus className="h-3.5 w-3.5" /> Register
                                </button>
                            </div>

                            {authTab === 'login' && (
                                <form onSubmit={handleLogin} className="space-y-4">
                                    {loginError && (
                                        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-lg">
                                            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-amber-800 dark:text-amber-200">{loginError}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <Input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type={showLoginPwd ? 'text' : 'password'}
                                                value={loginPassword}
                                                onChange={e => setLoginPassword(e.target.value)}
                                                className="pr-10"
                                            />
                                            <button type="button" onClick={() => setShowLoginPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {showLoginPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full gradient-primary" disabled={loginLoading}>
                                        {loginLoading ? <> <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Logging in...</> : 'Log In & Continue'}
                                    </Button>
                                </form>
                            )}

                            {authTab === 'register' && (
                                <form onSubmit={handleRegister} className="space-y-3">
                                    <p className="text-xs text-muted-foreground">
                                        Create a free account to place your order and track deliveries.
                                    </p>

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <Input placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} />
                                        {regErrors.name && <p className="text-xs text-red-500 mt-0.5">{regErrors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <Input type="email" placeholder="john@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                                        {regErrors.email && <p className="text-xs text-red-500 mt-0.5">{regErrors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <Input type="tel" placeholder="+1 (555) 000-0000" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                                        {regErrors.phone && <p className="text-xs text-red-500 mt-0.5">{regErrors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Shipping Address <span className="text-red-500">*</span>
                                        </label>
                                        <textarea placeholder="123 Main St, City, State, ZIP, Country" value={regAddress} onChange={e => setRegAddress(e.target.value)} rows={2} className="w-full px-3 py-2 text-sm rounded-md border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
                                        {regErrors.address && <p className="text-xs text-red-500 mt-0.5">{regErrors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Input type={showRegPwd ? 'text' : 'password'} placeholder="Min. 6 characters" value={regPassword} onChange={e => setRegPassword(e.target.value)} className="pr-10" />
                                            <button type="button" onClick={() => setShowRegPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {showRegPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {regErrors.password && <p className="text-xs text-red-500 mt-0.5">{regErrors.password}</p>}
                                    </div>

                                    <Button type="submit" className="w-full gradient-primary" disabled={regLoading}>
                                        {regLoading ? <> <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating...</> : 'Create Account & Continue'}
                                    </Button>
                                </form>
                            )}
                        </>
                    )}

                    {/* PAYMENT STEP */}
                    {step === 'payment' && loggedInUser && (
                        <div className="space-y-4">
                            <ProductStrip />

                            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded-lg text-sm">
                                <p className="font-medium">Ordering as: {loggedInUser.name}</p>
                                <p className="text-xs mt-0.5">📧 {loggedInUser.email}</p>
                                <p className="text-xs mt-0.5">📦 {loggedInUser.address}</p>
                            </div>

                            {paypalError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                                    {paypalError}
                                </div>
                            )}

                            {paymentLoading && (
                                <div className="py-6 text-center text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                                    Preparing payment...
                                </div>
                            )}

                            <div ref={paypalButtonRef} className="min-h-[200px] rounded border border-border p-2 bg-secondary/30" />

                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs"
                                disabled={paymentLoading}
                                onClick={() => {
                                    if (paypalButtonRef.current) paypalButtonRef.current.innerHTML = '';
                                    paypalRendered.current = false;
                                    setPaypalError('');
                                    setPaymentLoading(false);
                                    setStep('auth');
                                }}
                            >
                                ← Change account
                            </Button>
                        </div>
                    )}

                    {/* SUCCESS STEP */}
                    {step === 'success' && orderResult && loggedInUser && (
                        <div className="space-y-4 text-center">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                            <h3 className="text-2xl font-bold">Payment Successful!</h3>
                            <p className="text-muted-foreground">Your order has been placed.</p>
                            <div className="bg-secondary p-4 rounded-lg">
                                <p className="font-medium">Order ID: {orderResult.customOrderId}</p>
                            </div>
                            <Button className="w-full" onClick={handleClose}>
                                Continue Shopping
                            </Button>
                        </div>
                    )}

                    {/* FAILED STEP */}
                    {step === 'failed' && (
                        <div className="space-y-4 text-center">
                            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                            <h3 className="text-2xl font-bold">Payment Failed</h3>
                            <p className="text-muted-foreground">Please try again.</p>
                            <Button className="w-full gradient-primary" onClick={() => setStep('payment')}>
                                Try Again
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
