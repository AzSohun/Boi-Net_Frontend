import { motion } from 'motion/react';
import { Heart, Globe, Shield, Award } from 'lucide-react';
import AboutSectionHeader from './AboutSectionHeader';

const values = [
    { icon: Heart, title: "Reader First", desc: "Every feature we build is designed to enhance the focus and joy of reading." },
    { icon: Globe, title: "Global Access", desc: "Knowledge should have no borders. We strive to make books accessible everywhere." },
    { icon: Shield, title: "Data Privacy", desc: "Your reading habits are yours alone. We never sell your personal insights." },
    { icon: Award, title: "Quality Curation", desc: "We prioritize depth and quality in our collection over mere quantity." }
];

export default function AboutValues() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex justify-center">
                    <AboutSectionHeader
                        badge="Our Core Values"
                        title="Built on principles that endure."
                        subtitle="Our commitment to our community drives every decision we make."
                        centered
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">{value.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
