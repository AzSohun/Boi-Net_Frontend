import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyHero() {
    return (
        <section className="relative py-32 md:py-48 px-6 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-200 h-200 bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.21, 1.02, 0.47, 0.98] }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-indigo-100 dark:border-indigo-500/20 shadow-sm"
                >
                    <Lock className="w-3 h-3" />
                    Data Integrity Protocol
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 1.02, 0.47, 0.98] }}
                    className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] mb-12"
                >
                    Your Privacy, <br />
                    <span className="text-indigo-600 italic font-serif">Uncompromised.</span>
                </motion.h1 >

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 1.02, 0.47, 0.98] }}
                    className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight"
                >
                    At BoiNet, we believe your reading data is as personal as your thoughts. We've built our architecture around transparency, security, and your absolute control.
                </motion.p>
            </div>
        </section>
    );
}
