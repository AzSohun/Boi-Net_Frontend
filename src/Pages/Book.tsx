import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, Loader2 } from 'lucide-react';
import { useState } from 'react';
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
    const { data: books, isLoading, isError } = useGetAllBooks({
        search: searchTerm,
        genre: genreFilter === 'All' ? undefined : genreFilter,
        author: authorFilter === 'All' ? undefined : authorFilter,
        isbn: isbnFilter || undefined,
        isavailable: availabilityOnly || undefined,
        sortBy: sortBy,
        asc: isAsc,
        pagecount: currentPage,
        pagesize: pageSize,
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

    // If the API returns a full list (not truly paginated on the backend yet)
    const totalPages = books ? Math.ceil(books.length / pageSize) : 0;

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
                ) : books && books.length > 0 ? (
                    <div className="space-y-24">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                            {books.map((book, i) => (
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center space-y-6"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-4xl bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 mb-8">
                            <LayoutGrid className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">No results found</h2>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">We couldn't find any books matching your current filters. Try resetting or adjusting your search.</p>
                        <button
                            onClick={handleResetFilters}
                            className="text-indigo-600 font-black uppercase text-xs tracking-widest hover:underline"
                        >
                            Reset All Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
