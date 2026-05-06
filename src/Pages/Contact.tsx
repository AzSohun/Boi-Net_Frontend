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

            <section className="px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-20 lg:gap-32">
                        <div className="lg:col-span-5">
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
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
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
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="aspect-21/9 rounded-[4rem] bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
                        <img
                            src="https://images.unsplash.com/photo-1449156001935-d28615058721?auto=format&fit=crop&q=80&w=2000"
                            alt="Workspace"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply" />
                        <div className="absolute inset-x-0 bottom-0 p-12 bg-linear-to-t from-slate-900/80 to-transparent">
                            <p className="text-white text-4xl font-black tracking-tighter italic font-serif">Deep working, globally distributed.</p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
