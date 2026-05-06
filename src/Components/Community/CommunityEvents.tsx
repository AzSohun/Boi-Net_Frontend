import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowUpRight, PlayCircle } from 'lucide-react';

const events = [
    {
        title: 'Neon Pulse: Author Q&A',
        type: 'Digital Stream',
        date: 'May 12, 2026',
        time: '19:00 UTC',
        speaker: 'Elena Vance',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'The Art of World Protocol',
        type: 'Writing Workshop',
        date: 'May 15, 2026',
        time: '14:30 UTC',
        speaker: 'Julian Barnes-Lee',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'Historical Echoes',
        type: 'Listening Party',
        date: 'May 20, 2026',
        time: '18:00 UTC',
        speaker: 'Sofia Al-Farsi',
        image: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=1000'
    }
];

export default function CommunityEvents() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Transmission Schedule</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter">Live Events.</h2>
                    </div>
                    <button className="text-xs font-black uppercase tracking-widest border-b-2 border-indigo-600 pb-1 hover:text-indigo-600 transition-colors">
                        View All Events
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {events.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-600 border border-white/20">
                                        {event.type}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <PlayCircle className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {event.time}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <span className="text-[10px] font-black text-indigo-600 uppercase">
                                                {event.speaker.split(' ')[0][0]}{event.speaker.split(' ')[1][0]}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">{event.speaker}</span>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
