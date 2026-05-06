import { motion } from 'motion/react';
import ContactHero from '../Components/Contact/ContactHero';
import ContactInfo from '../Components/Contact/ContactInfo';
import ContactForm from '../Components/Contact/ContactForm';


export default function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-950 min-h-screen pt-20 pb-32 relative overflow-hidden"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 dark:bg-indigo-900/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-slate-50/50 dark:bg-slate-900/10 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <ContactHero />

            <section className="px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                        <div className="lg:col-span-5 sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <ContactInfo />
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <ContactForm />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map or Visual Placeholder Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
                        <div className="aspect-video md:aspect-21/9 w-full relative">
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
                                alt=""
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-indigo-600/5 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950 px-8 py-10 md:px-12 md:py-16 flex flex-col justify-end">
                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Core Node: Manhattan</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.9]">
                                        Deep working, <br />
                                        <span className="text-indigo-400 italic font-serif lowercase">globally</span> distributed.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Subtle background text for stylistic depth */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-[0.02] dark:opacity-[0.03] select-none">
                    <span className="text-[20vw] font-black uppercase leading-none tracking-tighter">BoiNet</span>
                </div>
            </section>
        </motion.div>
    );
}
