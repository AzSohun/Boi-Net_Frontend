import { motion } from 'motion/react';

export default function ContactHero() {
    return (
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.05)_0,transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.03)_0,transparent_50%)]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-16"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3"
                        >
                            <div className="w-12 h-px bg-indigo-600 dark:bg-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 dark:text-indigo-400">
                                Liaison Protocol
                            </span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-black leading-[0.85] tracking-tight text-slate-950 dark:text-white uppercase">
                            Begin your <br />
                            <span className="text-indigo-600 italic font-serif lowercase pr-4">narrative</span>
                            shift.
                        </h1>
                    </div>

                    <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-xl font-medium tracking-tight leading-relaxed border-l-2 border-slate-100 dark:border-slate-800 pl-8 md:pl-10 py-1">
                        Whether you're a reader, an author, or a potential partner, we're here to help explore the intersections of technology and story.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
