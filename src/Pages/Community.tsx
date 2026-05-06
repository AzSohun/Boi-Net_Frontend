import { motion } from 'motion/react';
import CommunityHero from '../Components/Community/ComuunityHero';
import CommunityEvents from '../Components/Community/CommunityEvents';
import CommunityCTA from '../Components/Community/CommunityCTA';


const DiscussionNodes = [
    { label: 'Speculative Ethics', participants: '12K', activity: 'High', color: 'bg-blue-500' },
    { label: 'Post-Digital Prose', participants: '8.4K', activity: 'Steady', color: 'bg-indigo-500' },
    { label: 'The Archive', participants: '45K', activity: 'High', color: 'bg-slate-500' },
    { label: 'Neural Narratives', participants: '3.1K', activity: 'New', color: 'bg-emerald-500' },
    { label: 'Bio-Scripting', participants: '15K', activity: 'High', color: 'bg-purple-500' },
    { label: 'The Void Discourse', participants: '67K', activity: 'Critical', color: 'bg-red-500' },
];

export default function Community() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-950 min-h-screen pb-32"
        >
            <CommunityHero />

            {/* Discussion Nodes Section */}
            <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="space-y-4 text-center max-w-2xl mx-auto">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Active Discourse</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Discourse Nodes.</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Join specialized thematic clusters where the future of literature is debated in real-time.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
                        {DiscussionNodes.map((node, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-600 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${node.color} shadow-[0_0_8px_rgba(99,102,241,0.5)]`} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{node.activity} Activity</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic font-serif">
                                        {node.label}
                                    </h4>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{node.participants} Nodes Integrated</p>
                                </div>
                                <div className="absolute bottom-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CommunityEvents />
            <CommunityCTA />
        </motion.div>
    );
}
