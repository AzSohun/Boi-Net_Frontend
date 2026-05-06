import { motion } from 'motion/react';
import { ArrowUpRight, Globe, Book, X } from 'lucide-react';

const InstagramIcon = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

interface AuthorProps {
    author: {
        id: string;
        name: string;
        role: string;
        bio: string;
        image: string;
        stats: { books: number; readers: string; followers: string };
        colors: string;
    };
    index: number;
}

export default function AuthorCard({ author, index }: AuthorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative"
        >
            <div className={`absolute inset-0 bg-linear-to-br ${author.colors} rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />

            <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 h-full flex flex-col gap-10 transition-transform duration-500 hover:-translate-y-2">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-full md:w-48 h-64 md:h-48 rounded-4xl overflow-hidden shrink-0 relative">
                        <img
                            src={author.image}
                            alt={author.name}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400">{author.role}</span>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic font-serif">
                                {author.name}
                            </h3>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                            {author.bio}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-50 dark:border-slate-800">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Book className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Works</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{author.stats.books}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Globe className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Reach</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{author.stats.readers}</p>
                    </div>
                    <div className="flex items-end justify-end gap-3 text-slate-400">
                        <InstagramIcon className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition-colors" />
                        <X className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition-colors" />
                    </div>
                </div>

                <button className="h-16 w-full rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 group/btn hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all">
                    View Full Profile
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
