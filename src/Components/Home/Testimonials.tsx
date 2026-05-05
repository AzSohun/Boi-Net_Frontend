import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
    const testimonials = [
        { name: "Sarah Jameson", role: "PhD Researcher", text: "BoiNet changed how I organize my research. The annotations tool is a masterpiece. Highly recommend for any academic." },
        { name: "David Chen", role: "Creative Director", text: "The collection of art books is unmatched. I find inspiration every morning before starting my design work." }
    ];

    return (
        <section className="py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">
                            <Quote className="w-4 h-4" />
                            Reader Voices
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            Wisdom Shared, <br /><span className="text-indigo-600 italic font-serif">Community Driven.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-12 rounded-[48px] bg-slate-900 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-white space-y-8 relative overflow-hidden group shadow-2xl"
                        >
                            <Quote className="w-16 h-16 text-indigo-500/10 absolute top-10 right-10 group-hover:scale-125 transition-transform duration-1000" />
                            <p className="text-xl md:text-3xl font-medium leading-tight relative z-10 italic">"{t.text}"</p>
                            <div className="flex items-center gap-5 relative z-10 pt-4">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center font-black text-xl shadow-2xl">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="font-black text-2xl leading-none tracking-tight">{t.name}</p>
                                    <p className="text-indigo-400 dark:text-indigo-300 text-sm font-black uppercase tracking-[0.2em] mt-2">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
