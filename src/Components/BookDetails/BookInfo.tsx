import { Star, BookOpen, Calendar, Globe, Hash } from 'lucide-react';
import type { Book } from '../../types/book';
import DetailItem from './DetailItem';


interface BookInfoProps {
    book: Book;
}

export default function BookInfo({ book }: BookInfoProps) {
    return (
        <div className="space-y-16">
            <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="px-5 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-indigo-500/20">
                        {book.genre}
                    </span>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800">
                        <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-white tracking-widest">5.0</span>
                    </div>
                </div>

                <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                    {book.title}
                </h1>

                <div className="flex items-center gap-6 pt-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-600 blur-xl opacity-20 rounded-full" />
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(book.author)}&background=6366f1&color=fff`}
                            alt={book.author}
                            className="w-16 h-16 rounded-full relative z-10 border-4 border-white dark:border-slate-950 shadow-xl"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">Author / Creator</p>
                        <p className="text-2xl font-black text-indigo-600 dark:text-white tracking-tight">{book.author}</p>
                    </div>
                </div>
            </div>

            {/* Narrative Summary */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">The Story</h3>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-900" />
                </div>
                <p className="text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium tracking-tight">
                    {book.description}
                </p>
            </div>

            {/* Metadata Intelligence */}
            <div className="grid sm:grid-cols-2 gap-6">
                <DetailItem icon={BookOpen} label="Vol. Size" value={`${book.pageCount} Pages`} />
                <DetailItem icon={Calendar} label="Circulation" value={book.publishedDate} />
                <DetailItem icon={Globe} label="Registry" value={book.publisher} />
                <DetailItem icon={Hash} label="Catalog ID" value={book.isbn} />
            </div>
        </div>
    );
}
