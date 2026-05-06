import { motion } from 'motion/react';
import { Heart, Share2, ShieldCheck } from 'lucide-react';
import type { Book } from '../../types/book';


interface BookCoverProps {
    book: Book;
}

export default function BookCover({ book }: BookCoverProps) {
    return (
        <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-3/4.5 xl:sticky xl:top-32"
            >
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-2 opacity-10" />
                <div className="relative h-full rounded-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <img
                        src={book.coverPhoto}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-8 right-8 flex flex-col gap-4">
                        <button className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-xl text-slate-900 dark:text-white hover:bg-red-500 hover:text-white transition-all group">
                            <Heart className="w-6 h-6 group-active:scale-125 transition-transform" />
                        </button>
                        <button className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-xl text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white transition-all">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="p-10 bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Authenticity Verified</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    This is a certified edition of {book.title}. Guaranteed provenance and high-quality production directly from {book.publisher}.
                </p>
            </div>
        </div>
    );
}
