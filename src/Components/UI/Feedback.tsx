import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X,
    CheckCircle2,
    AlertCircle,
    Info,
    AlertTriangle
} from 'lucide-react';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: FeedbackType;
}

interface ConfirmOptions {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: 'danger' | 'primary';
}

interface FeedbackContextType {
    showToast: (message: string, type?: FeedbackType) => void;
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (!context) throw new Error('useFeedback must be used within a FeedbackProvider');
    return context;
};

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        options: ConfirmOptions;
        resolve: (value: boolean) => void;
    } | null>(null);

    const showToast = useCallback((message: string, type: FeedbackType = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const confirm = useCallback((options: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setConfirmState({
                isOpen: true,
                options: {
                    ...options,
                    confirmLabel: options.confirmLabel || 'Confirm',
                    cancelLabel: options.cancelLabel || 'Cancel',
                    type: options.type || 'primary'
                },
                resolve,
            });
        });
    }, []);

    const handleConfirm = (value: boolean) => {
        if (confirmState) {
            confirmState.resolve(value);
            setConfirmState(null);
        }
    };

    return (
        <FeedbackContext.Provider value={{ showToast, confirm }}>
            {children}

            {/* Toasts Container */}
            <div className="fixed bottom-6 right-6 z-200 flex flex-col gap-3">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${toast.type === 'success' ? 'bg-emerald-50/90 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' :
                                toast.type === 'error' ? 'bg-red-50/90 dark:bg-red-500/10 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' :
                                    toast.type === 'warning' ? 'bg-amber-50/90 dark:bg-amber-500/10 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400' :
                                        'bg-slate-50/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            {toast.type === 'success' && <CheckCircle2 size={18} />}
                            {toast.type === 'error' && <AlertCircle size={18} />}
                            {toast.type === 'warning' && <AlertTriangle size={18} />}
                            {toast.type === 'info' && <Info size={18} />}
                            <span className="text-sm font-bold">{toast.message}</span>
                            <button
                                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                                className="ml-2 hover:opacity-70"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {confirmState && (
                    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => handleConfirm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-4xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 text-center"
                        >
                            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${confirmState.options.type === 'danger'
                                ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                }`}>
                                {confirmState.options.type === 'danger' ? <AlertTriangle size={32} /> : <Info size={32} />}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{confirmState.options.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                                {confirmState.options.message}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleConfirm(false)}
                                    className="flex-1 py-3 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all font-display"
                                >
                                    {confirmState.options.cancelLabel}
                                </button>
                                <button
                                    onClick={() => handleConfirm(true)}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 font-display ${confirmState.options.type === 'danger'
                                        ? 'bg-red-600 hover:bg-red-700 shadow-red-900/20'
                                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-900/20'
                                        }`}
                                >
                                    {confirmState.options.confirmLabel}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </FeedbackContext.Provider>
    );
};
