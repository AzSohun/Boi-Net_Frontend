import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthorsHero() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32 relative z-10">
            <div className="space-y-8 max-w-2xl">
                <div className="inline-flex items-center gap-3">
                    <div className="w-12 h-px bg-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">The Collective</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.85]">
                    Architects <br />
                    <span className="text-indigo-600 italic font-serif lowercase">of the</span> <br />
                    Void.
                </h1>
            </div>

            <div className="lg:max-w-xs space-y-6">
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Meet the visionaries who navigate the silence between words to bring you the stories that define our digital age.
                </p>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link to="/contact" className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:text-indigo-600 transition-colors group">
                        Partner with us
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
