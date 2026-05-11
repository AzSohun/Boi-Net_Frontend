import { ShoppingBag } from 'lucide-react';
import type { Book } from '../../types/book';

interface ActionBarProps {
    book: Book;
}

export default function ActionBar({ book }: ActionBarProps) {
    return (
        <div className="sticky bottom-8 z-50 transform mt-16">
            <div className="bg-slate-950 dark:bg-indigo-600 rounded-[3rem] p-4 pr-6 flex items-center justify-between shadow-2xl shadow-indigo-600/30 border border-white/10 ring-1 ring-white/10">
                <div className="pl-6 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Full Edition</p>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-white">${(book.price ?? 0).toFixed(2)}</span>
                        {!book.isAvailable && (
                            <span className="text-[10px] font-black uppercase px-3 py-1 bg-white/10 text-white/60 rounded-full tracking-widest">Sold Out</span>
                        )}
                    </div>
                </div>
                <button
                    disabled={!book.isAvailable}
                    className={`px-12 py-5 rounded-[2rem] font-black text-base uppercase tracking-widest flex items-center gap-4 transition-all active:scale-95 ${book.isAvailable ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                >
                    <ShoppingBag className="w-5 h-5" />
                    {book.isAvailable ? 'Acquire Now' : 'Join Waitlist'}
                </button>
            </div>
        </div>
    );
}
