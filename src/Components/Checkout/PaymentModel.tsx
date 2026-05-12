import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const isDarkMode = () => document.documentElement.classList.contains('dark');

interface CheckoutFormProps {
    onClose: () => void;
}

const CheckoutForm = ({ onClose }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isPaying, setIsPaying] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsPaying(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
        });

        if (error) {
            setErrorMessage(error.message ?? 'Transaction failed. Please check your credentials.');
        }
        setIsPaying(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-1 rounded-4xl border border-slate-100 dark:border-slate-800/50 overflow-hidden">
                <div className="p-6">
                    <PaymentElement
                        options={{
                            layout: 'accordion',
                        }}
                    />
                </div>
            </div>

            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                >
                    {errorMessage}
                </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-8 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                >
                    Abandon
                </button>
                <button
                    type="submit"
                    disabled={!stripe || isPaying}
                    className="flex-1 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                >
                    {isPaying ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Authorizing
                        </>
                    ) : (
                        'Confirm Acquisition'
                    )}
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 py-4">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secured via Stripe Protocol</span>
            </div>
        </form>
    );
};

interface PaymentModalProps {
    clientSecret: string;
    onClose: () => void;
    bookTitle?: string;
    price?: number;
}

export const PaymentModal = ({ clientSecret, onClose, bookTitle, price }: PaymentModalProps) => {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative max-w-xl w-full bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto max-h-[90vh] shadow-indigo-500/10 custom-scrollbar"
                >
                    <div className="p-8 md:p-12">
                        <div className="flex items-center justify-between mb-12">
                            <div className="space-y-1">
                                <h2 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic">Acquisition</h2>
                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Final Security Clearance</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all font-black uppercase text-[10px]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {bookTitle && (
                            <div className="mb-12 p-6 bg-indigo-50 dark:bg-indigo-500/5 rounded-3xl border-2 border-dashed border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Subject</p>
                                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{bookTitle}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Fee</p>
                                    <p className="text-xl font-black text-indigo-600">${price?.toFixed(2)}</p>
                                </div>
                            </div>
                        )}

                        <Elements stripe={stripePromise} options={{
                            clientSecret,
                            appearance: {
                                theme: isDarkMode() ? 'night' : 'stripe',
                                variables: {
                                    colorPrimary: '#4f46e5',
                                    colorBackground: isDarkMode() ? '#0f172a' : '#ffffff',
                                    colorText: isDarkMode() ? '#f8fafc' : '#1e293b',
                                    colorDanger: '#ef4444',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    spacingUnit: '4px',
                                    borderRadius: '16px',
                                },
                                rules: {
                                    '.Input': {
                                        border: '1px solid',
                                        borderColor: isDarkMode() ? '#1e293b' : '#e2e8f0',
                                        padding: '12px 16px',
                                    },
                                    '.Label': {
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        fontSize: '10px',
                                        letterSpacing: '0.1em',
                                        color: isDarkMode() ? '#94a3b8' : '#64748b',
                                        marginBottom: '8px'
                                    }
                                }
                            }
                        }}>
                            <CheckoutForm onClose={onClose} />
                        </Elements>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
