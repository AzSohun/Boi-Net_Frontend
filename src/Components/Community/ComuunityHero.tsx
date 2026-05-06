import { motion } from 'motion/react';
import { Users, Zap, Radio } from 'lucide-react';

export default function CommunityHero() {
    return (
        <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.08)_0,transparent_50%)]" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.05)_0,transparent_50%)]" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-16"
                >
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Network Online</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-9xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.85] uppercase">
                            The <br />
                            <span className="text-indigo-600 italic font-serif lowercase">Nexus</span> of <br />
                            Stories.
                        </h1>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-slate-100 dark:border-slate-800">
                        <div className="space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Active Nodes</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                                Connect with over 1.2M bibliophiles across 142 distinct linguistic regions.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Radio className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Live Discourse</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                                Real-time commentary layers pinned to every paragraph of the BoiNet library.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Neural Sync</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                                AI-curated reading circles that match your narrative velocity and preferences.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
