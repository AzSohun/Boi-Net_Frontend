import { useState } from 'react';
import { useGetAllBooks } from '../Hooks/useBooks';
// আপনার BookCard কম্পোনেন্টের পাথ অনুযায়ী ইমপোর্টটি মিলিয়ে নেবেন
// import BookCard from '../Components/Book/BookCard'; 

export default function Book() {
    // ১. ফিল্টার এবং পেজিনেশনের জন্য State
    const [searchInput, setSearchInput] = useState(''); // ইনপুটের জন্য
    const [searchQuery, setSearchQuery] = useState(''); // API কলের জন্য (Enter চাপলে আপডেট হবে)
    const [genre, setGenre] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [isAsc, setIsAsc] = useState(false); // ডিফল্টভাবে নতুন বই আগে দেখাবে
    const [pageCount, setPageCount] = useState(1);
    const pageSize = 10;

    // ২. TanStack Query হুক কল করা (State গুলো প্যারামিটার হিসেবে পাঠানো হচ্ছে)
    const { data: books, isLoading, isError } = useGetAllBooks({
        search: searchQuery,
        genre: genre,
        sortBy: sortBy,
        asc: isAsc,
        pagecount: pageCount,
        pagesize: pageSize,
    });

    // ৩. ইভেন্ট হ্যান্ডলার
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchInput); // সাবমিট করলে API কল হবে
        setPageCount(1); // নতুন সার্চে প্রথম পেজে ফিরে যাবে
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
        setPageCount(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setPageCount(1);
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore the Library</h1>
                <p className="text-gray-500 mt-2 text-lg">Find your next favorite book from our massive collection.</p>
            </div>

            {/* Filter & Search Bar Section */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="w-full md:w-1/3 relative">
                    <input
                        type="text"
                        placeholder="Search books by title..."
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                        🔍
                    </button>
                </form>

                {/* Filters */}
                <div className="flex w-full md:w-auto gap-3">
                    <select
                        value={genre}
                        onChange={handleGenreChange}
                        className="flex-1 md:w-40 py-2.5 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option value="">All Genres</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Programming">Programming</option>
                        <option value="History">History</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="flex-1 md:w-40 py-2.5 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option value="date">Latest Addition</option>
                        <option value="title">Alphabetical</option>
                        <option value="price">Price</option>
                    </select>

                    <button
                        onClick={() => setIsAsc(!isAsc)}
                        className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium transition-colors"
                        title="Toggle Ascending/Descending"
                    >
                        {isAsc ? '⬆️ Asc' : '⬇️ Desc'}
                    </button>
                </div>
            </div>

            {/* Content Section (Loading, Error, or Grid) */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : isError ? (
                <div className="text-center text-red-500 bg-red-50 p-6 rounded-xl border border-red-100">
                    Failed to fetch books. Please check your connection.
                </div>
            ) : books?.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-xl font-semibold text-gray-700">No books found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <>
                    {/* Grid of Books */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {books?.map((book) => (
                            // আপনার BookCard কম্পোনেন্টটি এখানে ব্যবহার করবেন
                            // <BookCard key={book.id} book={book} />
                            <div key={book.id} className="p-4 border rounded-xl shadow-sm bg-white">
                                <img src={book.coverPhoto} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                <h3 className="font-bold text-gray-900 truncate">{book.title}</h3>
                                <p className="text-sm text-gray-500">By {book.author}</p>
                                <p className="font-semibold text-indigo-600 mt-2">৳{book.price}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Section */}
                    <div className="mt-12 flex justify-center items-center gap-4">
                        <button
                            onClick={() => setPageCount(p => Math.max(1, p - 1))}
                            disabled={pageCount === 1}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>
                        <span className="font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                            Page {pageCount}
                        </span>
                        <button
                            // যেহেতু ব্যাকএন্ডে TotalCount নেই, আমরা চেক করছি রিটার্ন হওয়া ডাটা pageSize এর সমান কি না
                            onClick={() => setPageCount(p => p + 1)}
                            disabled={books && books.length < pageSize}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}