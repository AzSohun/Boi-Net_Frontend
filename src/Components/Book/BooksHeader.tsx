import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface BooksHeaderProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    showFilters: boolean;
    setShowFilters: (val: boolean) => void;
    isAsc: boolean;
    setIsAsc: (val: boolean) => void;
}

export default function BooksHeader({
    searchTerm, setSearchTerm,
    showFilters, setShowFilters,
    isAsc, setIsAsc
}: BooksHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-0.5 bg-indigo-600 rounded-full" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">Library Catalog</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                    Find your next <br />
                    <span className="text-indigo-600 italic font-serif">Obsession.</span>
                </h1>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-100">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search title, author or ISBN..."
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-4xl pl-16 pr-6 py-5 text-lg font-bold dark:text-white focus:outline-none focus:border-indigo-600/50 transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all font-black text-sm uppercase tracking-widest ${showFilters ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 dark:text-white hover:border-indigo-600'}`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {showFilters ? 'Apply Filters' : 'Filters'}
                    </button>
                    <button
                        onClick={() => setIsAsc(!isAsc)}
                        className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-600 transition-all text-slate-400 hover:text-indigo-600 dark:text-slate-600"
                    >
                        <ArrowUpDown className={`w-6 h-6 transition-transform duration-300 ${isAsc ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
}
