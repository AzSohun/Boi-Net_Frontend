import { motion } from 'motion/react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.21, 1.02, 0.47, 0.98] as const
        }
    })
};

export default function AboutHero() {
    return (
        <section className="relative py-32 md:py-48 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08)_0,transparent_50%)]" />
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    custom={0}
                    className="space-y-12 text-center md:text-left"
                >
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                        Stories That <br />
                        <span className="text-indigo-600 italic font-serif">Shape Worlds.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl font-medium tracking-tight leading-snug">
                        BoiNet is more than a digital library. It's a sanctuary for the curious, a gateway to infinite perspectives, and a community built on the shared love of knowledge.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
