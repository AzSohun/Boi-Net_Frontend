import { motion } from 'motion/react';
import { Library, BookMarked, Shield } from 'lucide-react';

export default function Features() {
    const features = [
        { icon: Library, title: "Massive Collection", desc: "Access millions of books across all genres and languages at any time.", color: "bg-indigo-600" },
        { icon: BookMarked, title: "Smart Annotations", desc: "Shared notes and insights that sync seamlessly across all your devices.", color: "bg-blue-600" },
        { icon: Shield, title: "Private & Secure", desc: "Your reading habits are strictly confidential and fully encrypted.", color: "bg-slate-900 dark:bg-slate-800" }
    ];

    return (
        <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-12 rounded-[40px] border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-10 text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                            <feature.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-bold tracking-tight text-lg">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
