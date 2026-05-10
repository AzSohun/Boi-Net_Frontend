import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Filter,
    ChevronRight,
    Book as BookIcon,
    X,
    Image as ImageIcon,
    Check,
    Loader2
} from 'lucide-react';
import { bookService } from '../../Services/bookService';
import type { Book, CreateBookFormData } from '../../types/book';

export default function BookManagement() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    // Form State
    const [formData, setFormData] = useState<CreateBookFormData>({
        title: '',
        description: '',
        author: '',
        publisher: '',
        isbn: '',
        price: 0,
        imageFile: null,
        pageCount: 0,
        genre: '',
        isAvailable: true,
        publishedDate: ''
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (book: Book | null = null) => {
        if (book) {
            setEditingBook(book);
            setFormData({
                title: book.title,
                description: book.description,
                author: book.author,
                publisher: book.publisher || '',
                isbn: book.isbn || '',
                price: book.price,
                imageFile: null,
                pageCount: book.pageCount || 0,
                genre: book.genre || '',
                isAvailable: book.isAvailable,
                publishedDate: book.publishedDate || ''
            });
        } else {
            setEditingBook(null);
            setFormData({
                title: '',
                description: '',
                author: '',
                publisher: '',
                isbn: '',
                price: 0,
                imageFile: null,
                pageCount: 0,
                genre: '',
                isAvailable: true,
                publishedDate: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await bookService.deleteBook(id);
                setBooks(prev => prev.filter(b => b.id !== id));
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) data.append(key, value as any);
        });

        try {
            if (editingBook) {
                await bookService.updateBook(editingBook.id, data);
            } else {
                await bookService.createBook(data);
            }
            fetchBooks();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Submit failed", error);
        }
    };

    const filteredBooks = books.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase font-serif italic">Library Registry</h2>
                    <p className="text-slate-400 text-sm font-medium mt-1">Manage and monitor the global narrative collective.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                    <Plus size={18} />
                    Initialize Node
                </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-medium text-sm"
                    />
                </div>
                <button className="px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 className="animate-spin mb-4" size={40} />
                            <p className="font-black uppercase tracking-widest text-[10px]">Synchronizing Library...</p>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className="col-span-full py-20 bg-white dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-slate-400">
                            <BookIcon size={48} className="mb-4 opacity-20" />
                            <p className="font-bold">No results found in current sector.</p>
                        </div>
                    ) : filteredBooks.map((book) => (
                        <motion.div
                            key={book.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 hover:border-emerald-500/50 transition-all shadow-sm flex flex-col"
                        >
                            <div className="flex gap-4">
                                <div className="w-24 h-32 bg-slate-100 dark:bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/5 group-hover:rotate-2 transition-transform">
                                    {book.coverPhoto ? (
                                        <img src={book.coverPhoto} alt={book.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <BookIcon size={32} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between pt-1">
                                    <div>
                                        <h3 className="font-black text-lg leading-tight uppercase font-serif italic line-clamp-1">{book.title}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{book.author}</p>
                                        <div className="flex gap-2 mt-3">
                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">{book.genre || 'Narrative'}</span>
                                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-slate-500 rounded-md text-[8px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10">${book.price}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(book)}
                                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal - Modern Glassmorphism */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight uppercase font-serif italic">
                                        {editingBook ? 'Terminal Update' : 'Narrative Initialization'}
                                    </h3>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Book Identity Specification</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Book Title</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-sm"
                                            placeholder="e.g. Neuromancer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Author Entity</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-sm"
                                            placeholder="e.g. William Gibson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Genre Classification</label>
                                        <input
                                            type="text"
                                            value={formData.genre}
                                            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-sm"
                                            placeholder="e.g. Cyberpunk"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Acquisition Price</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-sm"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Narrative Core (Description)</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-sm resize-none"
                                        placeholder="Enter visual summaries or data extracts..."
                                    />
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Visual ID (Cover Image)</label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="w-full px-5 py-8 bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all gap-2"
                                            >
                                                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full group-hover:scale-110 transition-transform">
                                                    <ImageIcon size={20} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                    {formData.imageFile ? formData.imageFile.name : 'Upload Data Stream'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 px-6 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-2 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                                    >
                                        {editingBook ? 'Confirm Update' : 'Initialize Node'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
