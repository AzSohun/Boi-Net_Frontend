import { motion } from 'motion/react';
import { Share2, Terminal, Globe } from 'lucide-react';

export default function CommunityCTA() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-slate-950 dark:bg-white rounded-[3rem] overflow-hidden p-12 md:p-24 text-center space-y-12 border border-slate-800 dark:border-slate-100">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.2)_0,transparent_70%)] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8 relative z-10"
                    >
                        <div className="inline-flex items-center gap-6 text-indigo-400 dark:text-indigo-600">
                            <Share2 className="w-6 h-6" />
                            <Terminal className="w-6 h-6" />
                            <Globe className="w-6 h-6" />
                        </div>

                        <h2 className="text-4xl md:text-7xl font-black text-white dark:text-slate-950 tracking-tighter leading-[0.85]">
                            Ready to <br />
                            <span className="text-indigo-400 dark:text-indigo-600 italic font-serif lowercase">initialize</span> <br />
                            your access?
                        </h2>

                        <p className="text-xl text-slate-400 dark:text-slate-500 font-medium max-w-2xl mx-auto">
                            Join the collective. Gain early access to experimental manuscripts, live discussions, and the global BoiNet discourse layer.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <button className="h-16 px-12 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-900 dark:hover:bg-slate-100 dark:hover:text-slate-950 transition-all shadow-xl shadow-indigo-600/20">
                                Create Identity
                            </button>
                            <button className="h-16 px-12 bg-transparent border-2 border-slate-800 dark:border-slate-200 text-white dark:text-slate-950 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-slate-950 dark:hover:bg-slate-950 dark:hover:text-white transition-all">
                                The Bluebook
                            </button>
                        </div>
                    </motion.div>

                    <div className="absolute bottom-0 left-0 p-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 dark:text-slate-950/20">Protocol 4.0 // Collective</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
