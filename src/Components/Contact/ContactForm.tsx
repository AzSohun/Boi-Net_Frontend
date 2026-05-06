import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-600 p-12 md:p-20 rounded-[4rem] text-white text-center space-y-8 shadow-2xl shadow-indigo-500/20"
            >
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Transmission Received.</h3>
                    <p className="text-indigo-100 text-xl font-medium">Our team will reach out within 24 standard earth hours.</p>
                </div>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                >
                    Send Another Message
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 lg:p-16 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Full Identity</label>
                            <input
                                required
                                type="text"
                                placeholder="Julian Barnes"
                                className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 dark:border-slate-800 focus:border-indigo-600 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Communication Node</label>
                            <input
                                required
                                type="email"
                                placeholder="hello@boinet.io"
                                className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 dark:border-slate-800 focus:border-indigo-600 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Inquiry Route</label>
                        <div className="relative">
                            <select className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-indigo-600 outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none cursor-pointer">
                                <option>General Exploration</option>
                                <option>Technical Support</option>
                                <option>Author Partnerships</option>
                                <option>Media & Press</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">The Narrative</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="How can we help shape your journey?"
                            className="w-full px-6 py-6 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-indigo-600 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800 resize-none"
                        />
                    </div>
                </div>

                <button
                    disabled={status === 'submitting'}
                    className="w-full h-16 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950 transition-all flex items-center justify-center gap-4 group active:scale-[0.98] disabled:opacity-50"
                >
                    {status === 'submitting' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Execute Protocol
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
