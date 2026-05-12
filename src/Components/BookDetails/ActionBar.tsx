import { useState } from 'react';
import { ShoppingBag, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Book } from '../../types/book';
import { CheckoutService } from '../../Services/checkoutService';
import { PaymentModal } from '../Checkout/PaymentModel';

interface ActionBarProps {
    book: Book;
}

export default function ActionBar({ book }: ActionBarProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAcquireNow = async () => {
        if (!book.id) return;

        setIsProcessing(true);
        setError(null);

        try {
            // 1. Create the order
            const orderPayload = {
                OrderItems: [{ BookId: book.id, Quantity: 1 }]
            };
            const orderResponse = await CheckoutService.createOrder(orderPayload);
            const orderId = orderResponse.orderid ?? orderResponse.orderId ?? orderResponse.OrderId ?? orderResponse.id ?? orderResponse.Id;

            if (!orderId) {
                throw new Error("Order creation failed: No order ID returned");
            }

            // 2. Get the payment intent
            const paymentResponse = await CheckoutService.getPaymentIntent(orderId);

            // 3. Show the modal
            setClientSecret(paymentResponse.clientSecret);
        } catch (err: any) {
            console.error("Checkout initialization failed:", err);
            setError("Initialization failed. Please try again.");
            // Auto-clear error after 3 seconds
            setTimeout(() => setError(null), 3000);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="sticky bottom-8 z-50 transform mt-16">
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-sm"
                        >
                            <div className="bg-red-600 text-white p-4 rounded-2xl shadow-xl text-center text-xs font-black uppercase tracking-widest ring-4 ring-red-600/20">
                                {error}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-slate-950 dark:bg-slate-900 rounded-[3rem] p-4 pr-6 flex items-center justify-between shadow-2xl shadow-indigo-600/20 border border-white/5 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="pl-6 space-y-0.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Acquisition Protocol</p>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-white decoration-indigo-500 decoration-4 underline-offset-4">${(book.price ?? 0).toFixed(2)}</span>
                            {!book.isAvailable && (
                                <span className="text-[10px] font-black uppercase px-3 py-1 bg-white/5 text-white/40 rounded-full tracking-widest border border-white/10">Sold Out</span>
                            )}
                        </div>
                    </div>

                    <button
                        disabled={!book.isAvailable || isProcessing}
                        onClick={handleAcquireNow}
                        className={`relative overflow-hidden px-12 py-5 rounded-4xl font-black text-base uppercase tracking-widest flex items-center gap-4 transition-all active:scale-95 group ${book.isAvailable
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/20'
                            : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing
                            </>
                        ) : (
                            <>
                                {book.isAvailable ? <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" /> : <Sparkles className="w-5 h-5 opacity-20" />}
                                {book.isAvailable ? 'Acquire Now' : 'Out of Stock'}
                            </>
                        )}

                        {book.isAvailable && !isProcessing && (
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                    </button>
                </div>
            </div>

            {clientSecret && (
                <PaymentModal
                    clientSecret={clientSecret}
                    onClose={() => setClientSecret(null)}
                    bookTitle={book.title}
                    price={book.price}
                />
            )}
        </>
    );
}
