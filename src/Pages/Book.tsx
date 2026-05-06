import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useGetAllBooks } from '../Hooks/useBooks';
import BooksHeader from '../Components/Book/BooksHeader';
import FilterDrawer from '../Components/Book/FilterDrawer';
import BookCard from '../Components/Book/BookCard';
import Pagination from '../Components/Book/Pagination';


type SortBy = 'title' | 'price' | 'date';

export default function Books() {
    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState('All');
    const [authorFilter, setAuthorFilter] = useState('All');
    const [isbnFilter, setIsbnFilter] = useState('');
    const [availabilityOnly, setAvailabilityOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortBy>('date');
    const [isAsc, setIsAsc] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    // Derived Data for Filters (In a real app, these would come from an API)
    const genres = ['All', 'Technical', 'Fantasy', 'Classic', 'Education', 'Drama', 'Self-Help', 'History', 'Dystopian'];
    const authors = ['All', 'Robert C. Martin', 'Andrew Hunt', 'J.R.R. Tolkien', 'F. Scott Fitzgerald', 'Thomas H. Cormen', 'Bibhutibhushan Bandyopadhyay', 'James Clear', 'Yuval Noah Harari', 'Martin Kleppmann', 'George Orwell'];

    // TanStack Query Hook
    const { data: allBooks, isLoading, isError } = useGetAllBooks({
        search: searchTerm,
        genre: genreFilter === 'All' ? undefined : genreFilter,
        author: authorFilter === 'All' ? undefined : authorFilter,
        isbn: isbnFilter || undefined,
        isavailable: availabilityOnly || undefined,
        sortBy: sortBy,
        asc: isAsc,
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleResetFilters = () => {
        setGenreFilter('All');
        setAuthorFilter('All');
        setIsbnFilter('');
        setAvailabilityOnly(false);
        setSearchTerm('');
        setSortBy('date');
        setCurrentPage(1);
    };

    // Pagination Logic
    const totalPages = allBooks ? Math.ceil(allBooks.length / pageSize) : 0;
    const paginatedBooks = useMemo(() => {
        if (!allBooks) return [];
        const start = (currentPage - 1) * pageSize;
        return allBooks.slice(start, start + pageSize);
    }, [allBooks, currentPage, pageSize]);

    // Calculate active filters count
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (genreFilter !== 'All') count++;
        if (authorFilter !== 'All') count++;
        if (isbnFilter) count++;
        if (availabilityOnly) count++;
        if (searchTerm) count++;
        return count;
    }, [genreFilter, authorFilter, isbnFilter, availabilityOnly, searchTerm]);

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
                <BooksHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    isAsc={isAsc}
                    setIsAsc={setIsAsc}
                    activeFiltersCount={activeFiltersCount}
                    onReset={handleResetFilters}
                />

                <AnimatePresence>
                    {showFilters && (
                        <FilterDrawer
                            sortBy={sortBy}
                            setSortBy={(val) => { setSortBy(val); setCurrentPage(1); }}
                            genreFilter={genreFilter}
                            setGenreFilter={(val) => { setGenreFilter(val); setCurrentPage(1); }}
                            authorFilter={authorFilter}
                            setAuthorFilter={(val) => { setAuthorFilter(val); setCurrentPage(1); }}
                            isbnFilter={isbnFilter}
                            setIsbnFilter={(val) => { setIsbnFilter(val); setCurrentPage(1); }}
                            availabilityOnly={availabilityOnly}
                            setAvailabilityOnly={(val) => { setAvailabilityOnly(val); setCurrentPage(1); }}
                            genres={genres}
                            authors={authors}
                            onReset={handleResetFilters}
                        />
                    )}
                </AnimatePresence>

                {isLoading ? (
                    <div className="py-40 flex flex-col items-center justify-center gap-6">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Syncing Library...</p>
                    </div>
                ) : isError ? (
                    <div className="py-40 text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-4xl bg-red-50 dark:bg-red-950/20 text-red-500 mb-8">
                            <LayoutGrid className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Connection Error</h2>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">Failed to reach the database. Please verify your connection and try again.</p>
                    </div>
                ) : paginatedBooks.length > 0 ? (
                    <div className="space-y-24">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                            {paginatedBooks.map((book, i) => (
                                <BookCard key={book.id} book={book} index={i} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-40 text-center space-y-10"
                    >
                        <div className="relative inline-flex items-center justify-center">
                            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150" />
                            <div className="relative w-32 h-32 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700 shadow-xl">
                                <LayoutGrid className="w-12 h-12" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Silence in the Stacks</h2>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">We couldn't find any literary works matching your current criteria. Perhaps a different search term or genre?</p>
                        </div>
                        <button
                            onClick={handleResetFilters}
                            className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5 active:scale-95"
                        >
                            Reset All Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
