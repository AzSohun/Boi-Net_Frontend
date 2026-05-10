import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Filter,
    Book as BookIcon,
    X,
    Image as ImageIcon,
    Loader2,
    Grid,
    List as ListIcon,
    Download,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { bookService } from '../../Services/bookService';
import type { Book, CreateBookFormData } from '../../types/book';

export default function BookManagement() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const [formData, setFormData] = useState<CreateBookFormData>({
        title: '',
        description: '',
        author: '',
        publisher: '',
        isbn: '',
        price: 0,
        imageFile: null,
        pageCount: 0,
        genre: 'General',
        isAvailable: true,
        publishDate: ''
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
                genre: book.genre || 'General',
                isAvailable: book.isAvailable,
                publishDate: book.publishDate || ''
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
                genre: 'General',
                isAvailable: true,
                publishDate: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
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
            if (value !== null && value !== undefined) {
                if (key === 'publishDate' && !value) return;
                data.append(key, value as any);
            }
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
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.isbn?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Book Library</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage, catalog and track your book inventory.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm mr-2">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                            <Grid size={18} />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                            <ListIcon size={18} />
                        </button>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
                    >
                        <Plus size={18} />
                        Add Book
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, author or ISBN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm text-slate-800 dark:text-slate-200"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-32 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="text-sm font-medium text-slate-500">Retrieving library data...</p>
                </div>
            ) : filteredBooks.length === 0 ? (
                <div className="py-32 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mb-4">
                        <BookIcon size={32} />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No books found matching your criteria.</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6" : "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"}>
                    <AnimatePresence>
                        {filteredBooks.map((book, idx) => (
                            viewMode === 'grid' ? (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-900 hover:shadow-lg transition-all"
                                >
                                    <div className="aspect-[4/5] relative bg-slate-100 dark:bg-slate-800">
                                        {book.coverPhoto ? (
                                            <img src={book.coverPhoto} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700"><BookIcon size={48} /></div>
                                        )}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                            <button onClick={() => handleOpenModal(book)} className="p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(book.id)} className="p-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl text-slate-600 dark:text-slate-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div>
                                            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{book.genre}</p>
                                            <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 mt-0.5">{book.title}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{book.author}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">${book.price}</span>
                                            <div className={`flex items-center gap-1.5 text-[10px] font-bold ${book.isAvailable ? 'text-blue-600 dark:text-blue-400' : 'text-red-500'}`}>
                                                {book.isAvailable ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                                {book.isAvailable ? 'AVAILABLE' : 'OUT OF STOCK'}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div key={book.id} className="group border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all flex items-center gap-4 px-6 py-4">
                                    <div className="w-12 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                                        {book.coverPhoto && <img src={book.coverPhoto} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate">{book.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{book.author} • {book.isbn}</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-50 uppercase tracking-wider">Genre</p>
                                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{book.genre}</p>
                                    </div>
                                    <div className="hidden sm:block text-right w-24">
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-50 uppercase tracking-wider">Price</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">${book.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleOpenModal(book)} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(book.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Configure properties for the library resource.</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <FormInput label="Title" value={formData.title} required placeholder="Enter book title" onChange={(v) => setFormData({ ...formData, title: v })} />
                                        <FormInput label="Author" value={formData.author} required placeholder="Enter author name" onChange={(v) => setFormData({ ...formData, author: v })} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormInput label="Price ($)" type="number" value={String(formData.price)} required onChange={(v) => setFormData({ ...formData, price: Number(v) })} />
                                            <FormInput label="Pages" type="number" value={String(formData.pageCount)} onChange={(v) => setFormData({ ...formData, pageCount: Number(v) })} />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <FormInput label="Publisher" value={formData.publisher} placeholder="Enter publisher" onChange={(v) => setFormData({ ...formData, publisher: v })} />
                                        <FormInput label="ISBN" value={formData.isbn} placeholder="ISBN number" onChange={(v) => setFormData({ ...formData, isbn: v })} />
                                        <FormInput label="Genre" value={formData.genre} placeholder="e.g. Fiction" onChange={(v) => setFormData({ ...formData, genre: v })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm text-slate-700 dark:text-slate-300 resize-none"
                                        placeholder="A brief summary of the book content..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-2 text-left">
                                    <div className="flex-1">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Cover Artwork</label>
                                        <div className="relative">
                                            <input type="file" id="cover-upload" className="hidden" onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })} />
                                            <label htmlFor="cover-upload" className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-900 transition-all text-slate-500 dark:text-slate-400 group">
                                                <ImageIcon size={20} className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                                                <span className="text-xs font-semibold truncate">{formData.imageFile ? formData.imageFile.name : 'Choose image file...'}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 h-full mb-2">
                                        <input type="checkbox" id="avail-check" checked={formData.isAvailable} onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })} className="w-5 h-5 rounded-lg border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-transparent" />
                                        <label htmlFor="avail-check" className="text-xs font-bold text-slate-600 dark:text-slate-400">Available for Borrowing</label>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
                                    <button type="submit" className="flex-[2] py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-900/10 dark:shadow-none">Save Library Resource</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FormInputProps {
    label: string;
    value: string | number | undefined | null;
    type?: string;
    required?: boolean;
    placeholder?: string;
    onChange: (value: string) => void;
}

function FormInput({ label, value, type = "text", required, placeholder, onChange }: FormInputProps) {
    return (
        <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">{label} {required && '*'}</label>
            <input
                required={required}
                type={type}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder={placeholder}
            />
        </div>
    );
}
