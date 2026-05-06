import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

interface FilterDrawerProps {
    sortBy: string;
    setSortBy: (val: any) => void;
    genreFilter: string;
    setGenreFilter: (val: string) => void;
    authorFilter: string;
    setAuthorFilter: (val: string) => void;
    isbnFilter: string;
    setIsbnFilter: (val: string) => void;
    availabilityOnly: boolean;
    setAvailabilityOnly: (val: boolean) => void;
    genres: string[];
    authors: string[];
    onReset: () => void;
}

export default function FilterDrawer({
    sortBy, setSortBy,
    genreFilter, setGenreFilter,
    authorFilter, setAuthorFilter,
    isbnFilter, setIsbnFilter,
    availabilityOnly, setAvailabilityOnly,
    genres, authors,
    onReset
}: FilterDrawerProps) {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
        >
            <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 grid md:grid-cols-4 gap-8 shadow-inner">
                {/* Sort */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</p>
                    <div className="flex flex-col gap-2">
                        {['title', 'price', 'date'].map((option) => (
                            <button
                                key={option}
                                onClick={() => setSortBy(option)}
                                className={`px-4 py-2 rounded-xl text-left text-sm font-bold transition-all flex items-center justify-between ${sortBy === option ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                                <span className="capitalize">{option}</span>
                                {sortBy === option && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Genre Filter */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Genre</p>
                    <select
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-600"
                    >
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                {/* Author Filter */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Author</p>
                    <select
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-600"
                    >
                        {authors.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                {/* ISBN Filter */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ISBN Registry</p>
                    <input
                        type="text"
                        value={isbnFilter}
                        onChange={(e) => setIsbnFilter(e.target.value)}
                        placeholder="e.g. 978-01..."
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-600"
                    />
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
                    <label className="flex items-center gap-4 cursor-pointer group">
                        <div
                            onClick={() => setAvailabilityOnly(!availabilityOnly)}
                            className={`w-12 h-6 rounded-full transition-all relative ${availabilityOnly ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${availabilityOnly ? 'left-7' : 'left-1'}`} />
                        </div>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600">Available Only</span>
                    </label>

                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest pt-4"
                    >
                        <X className="w-3 h-3" />
                        Reset All
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
