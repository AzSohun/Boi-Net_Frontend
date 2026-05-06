import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';

export default function ContactHero() {
    return (
        <section className="relative py-32 md:py-48 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08)_0,transparent_50%)]" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.21, 1.02, 0.47, 0.98] }}
                    className="space-y-12"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] border border-indigo-100 dark:border-indigo-500/20">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Connect With BoiNet
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                        Let's Start a <br />
                        <span className="text-indigo-600 italic font-serif">Conversation.</span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-3xl font-medium tracking-tight leading-snug">
                        Whether you're a reader, an author, or a potential partner, we're here to help explore the future of knowledge together.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
