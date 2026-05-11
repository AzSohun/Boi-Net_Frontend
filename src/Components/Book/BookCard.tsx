import { motion } from 'motion/react';
import { ShoppingBag, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types/book';

interface BookCardProps {
    book: Book;
    index: number;
}

export default function BookCard({ book, index }: BookCardProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
            onClick={() => navigate(`/books/${book.id}`)}
            className="group cursor-pointer"
        >
            <div className="relative aspect-3/4 rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-700 border border-slate-100 dark:border-slate-800">
                {!book.isAvailable && (
                    <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        Out of Stock
                    </div>
                )}

                <img
                    src={book.coverPhoto}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white/80 text-sm font-medium line-clamp-2 leading-relaxed">
                            {book.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-white font-black text-3xl tracking-tighter">${(book.price ?? 0).toFixed(2)}</span>
                            <button className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-white hover:text-indigo-600 transition-all active:scale-95 shadow-xl">
                                <ShoppingBag className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl font-black text-slate-900 dark:text-white shadow-lg group-hover:opacity-0 transition-opacity flex items-center gap-2 text-sm tracking-tight">
                    <span className="text-indigo-600 text-xs font-black">$</span>
                    {(book.price ?? 0).toFixed(2)}
                </div>
            </div>

            <div className="mt-8 space-y-3 px-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                        {book.genre}
                    </span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600" />)}
                    </div>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-1 leading-none">
                    {book.title}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-900">
                    <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                        {book.author}
                    </p>
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
