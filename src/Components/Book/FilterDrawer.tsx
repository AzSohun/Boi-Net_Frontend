import { motion } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';

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
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 64 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden"
        >
            <div className="p-1 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                <div className="bg-slate-50/50 dark:bg-slate-950/20 p-8 rounded-[2.3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Sorting Box */}
                    <div className="space-y-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Ordering</h4>
                        <div className="grid grid-cols-1 gap-2">
                            {['title', 'price', 'date'].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    className={`px-5 py-3 rounded-2xl text-left text-sm font-bold transition-all flex items-center justify-between border-2 ${sortBy === option ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                                >
                                    <span className="capitalize">{option}</span>
                                    {sortBy === option && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categorization */}
                    <div className="space-y-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Categorization</h4>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-slate-400 ml-1">Genre</label>
                            <select
                                value={genreFilter}
                                onChange={(e) => setGenreFilter(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-600 transition-all cursor-pointer appearance-none"
                            >
                                {genres.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Identification */}
                    <div className="space-y-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Identification</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 ml-1">Author</label>
                                <select
                                    value={authorFilter}
                                    onChange={(e) => setAuthorFilter(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-600 appearance-none"
                                >
                                    {authors.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-slate-400 ml-1">ISBN Reference</label>
                                <input
                                    type="text"
                                    value={isbnFilter}
                                    onChange={(e) => setIsbnFilter(e.target.value)}
                                    placeholder="Registry lookup..."
                                    className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-600 placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rules & Actions */}
                    <div className="flex flex-col justify-between space-y-8">
                        <div className="space-y-5">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Listing Rules</h4>
                            <button
                                onClick={() => setAvailabilityOnly(!availabilityOnly)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${availabilityOnly ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-400' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'}`}
                            >
                                <span className="text-sm font-bold uppercase tracking-wider">In Stock Only</span>
                                <div className={`w-10 h-5 rounded-full transition-all relative ${availabilityOnly ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${availabilityOnly ? 'left-6' : 'left-1'}`} />
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={onReset}
                            className="group flex items-center justify-center gap-3 w-full py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl hover:border-red-500/50"
                        >
                            <RotateCcw className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                            Reset Config
                        </button>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
