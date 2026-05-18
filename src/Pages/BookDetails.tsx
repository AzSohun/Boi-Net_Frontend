import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useGetBookById } from '../Hooks/useBooks';
import EmptyState from '../Components/BookDetails/EmptyState';
import BookCover from '../Components/BookDetails/BookCover';
import BookInfo from '../Components/BookDetails/BookInfo';
import ActionBar from '../Components/BookDetails/ActionBar';

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const bookId = id ? parseInt(id, 10) : undefined;
    const { data: rawBook, isLoading, isError } = useGetBookById(bookId!);

    // Handle potential API response wrapping (e.g., { data: book }) or array response
    let book = rawBook && 'data' in (rawBook as any) ? (rawBook as any).data : rawBook;
    if (Array.isArray(book)) {
        book = book[0];
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin relative" />
                </div>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] animate-pulse">Consulting Archives...</p>
            </div>
        );
    }

    if (isError || !book) {
        return <EmptyState />;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto"
            >
                {/* Navigation */}
                <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => navigate('/books')}
                    className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors mb-16 font-black uppercase text-[10px] tracking-[0.3em]"
                >
                    <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-indigo-600 transition-all">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    Return to Library
                </motion.button>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-12 xl:col-span-5"
                    >
                        <BookCover book={book} />
                    </motion.div>

                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-12 xl:col-span-7"
                    >
                        <BookInfo book={book} />
                        <ActionBar book={book} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
