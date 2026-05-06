import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface BooksHeaderProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    showFilters: boolean;
    setShowFilters: (val: boolean) => void;
    isAsc: boolean;
    setIsAsc: (val: boolean) => void;
    activeFiltersCount: number;
    onReset: () => void;
}

export default function BooksHeader({
    searchTerm, setSearchTerm,
    showFilters, setShowFilters,
    isAsc, setIsAsc,
    activeFiltersCount,
    onReset
}: BooksHeaderProps) {
    return (
        <div className="space-y-16 mb-20">
            {/* Hero Section */}
            <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-1 bg-indigo-600 rounded-full" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400">Library Catalog</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                    Find your next <br />
                    <span className="text-indigo-600 italic font-serif">Obsession.</span>
                </h1>
            </div>

            {/* Integrated Toolbar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                {/* Search Bar - Expanded */}
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search titles, authors or ISBN registry..."
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl pl-16 pr-6 py-5 text-lg font-bold dark:text-white focus:outline-none focus:border-indigo-600/50 transition-all shadow-sm group-hover:bg-white dark:group-hover:bg-slate-900 duration-300"
                    />
                </div>

                {/* Action Controls */}
                <div className="flex items-stretch gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-3 px-8 py-5 rounded-3xl border-2 transition-all font-black text-xs uppercase tracking-widest relative ${showFilters ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 dark:text-white hover:border-indigo-600'}`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg animate-in zoom-in duration-300">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setIsAsc(!isAsc)}
                        className="px-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:border-indigo-600 transition-all text-slate-400 hover:text-indigo-600 group"
                        title={isAsc ? "Sort Ascending" : "Sort Descending"}
                    >
                        <ArrowUpDown className={`w-5 h-5 transition-transform duration-500 ${isAsc ? 'rotate-180' : ''}`} />
                    </button>

                    {activeFiltersCount > 0 && (
                        <button
                            onClick={onReset}
                            className="px-6 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-3xl hover:bg-red-500 hover:text-white transition-all group border-2 border-transparent"
                            title="Clear all filters"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
