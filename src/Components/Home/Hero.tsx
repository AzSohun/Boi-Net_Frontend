import { motion, type Variants } from 'motion/react';
import { Sparkles, ArrowRight, TrendingUp, Star } from 'lucide-react';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.21, 1.02, 0.47, 0.98]
        }
    })
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[800px] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1)_0,rgba(15,23,42,0)_70%)]" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-10 md:space-y-14"
                >
                    <motion.div custom={0} variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-indigo-700 dark:text-indigo-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">
                        <Sparkles className="w-4 h-4" />
                        The Future of Reading
                    </motion.div>

                    <motion.h1 custom={1} variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.9] md:leading-[0.85]">
                        Discover Your Next <br />
                        <span className="text-indigo-600 dark:text-indigo-500 italic font-serif font-bold">Favorite Book</span>
                    </motion.h1>

                    <motion.div custom={2} variants={fadeInUp} className="max-w-2xl space-y-10">
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium tracking-tight">
                            Welcome to BoiNet! Your massive collection of favorite books is now at your fingertips. Discover your chosen stories today.
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <button className="bg-indigo-600 text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-slate-900 dark:hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-4 group active:scale-95">
                                Browse Collection <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 px-10 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:border-indigo-600 dark:hover:border-indigo-500 transition-all active:scale-95">
                                Learn More
                            </button>
                        </div>
                    </motion.div>

                    <motion.div custom={3} variants={fadeInUp} className="pt-4 flex items-center gap-8 text-slate-900 dark:text-white">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[6px] border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-lg">
                                    <img src={`https://i.pravatar.cc/100?u=boi${i}`} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="font-black text-sm md:text-base tracking-tight">10,000+ Active Readers</p>
                            <div className="flex text-indigo-500 dark:text-indigo-400 gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* --- Hero Image --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.21, 1.02, 0.47, 0.98] }}
                    className="relative hidden lg:block"
                >
                    <div className="relative z-10 rounded-[5rem] bg-white dark:bg-slate-900 p-4 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] dark:shadow-none border border-slate-100 dark:border-slate-800">
                        <div className="relative aspect-[3/4] rounded-[4.2rem] overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
                                alt="Library Atmosphere"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-slate-950/80 via-transparent to-transparent opacity-60" />

                            {/* Floating Content - Improved Glassmorphism */}
                            <div className="absolute bottom-10 left-10 right-10 p-10 rounded-[3rem] bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border border-white/20 dark:border-slate-700/30 text-white shadow-2xl">
                                <TrendingUp className="w-10 h-10 mb-5 text-indigo-400" />
                                <p className="font-bold text-2xl md:text-3xl leading-tight text-white">Trending: "The Art of Knowledge Curation"</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 blur-[120px] -z-10 animate-pulse" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/10 blur-[120px] -z-10 animate-pulse delay-1000" />
                </motion.div>
            </div>
        </section>
    );
}
