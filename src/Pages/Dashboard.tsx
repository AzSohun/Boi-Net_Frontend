import { motion } from 'motion/react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    LogOut,
    TrendingUp,
    Clock,
    Star,
    Plus
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, clearAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const statusCards = [
        { title: 'Books Read', value: '24', icon: BookOpen, color: 'bg-indigo-500' },
        { title: 'Network Rank', value: '#12', icon: TrendingUp, color: 'bg-emerald-500' },
        { title: 'Community', value: '1.2k', icon: Users, color: 'bg-blue-500' },
        { title: 'Session Time', value: '4.5h', icon: Clock, color: 'bg-amber-500' },
    ];

    const recentBooks = [
        { id: 1, title: 'Neuromancer', author: 'William Gibson', progress: 85, cover: 'https://images.unsplash.com/photo-1543004218-ee14110497f9?auto=format&fit=crop&q=80&w=100' },
        { id: 2, title: 'Snow Crash', author: 'Neal Stephenson', progress: 40, cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=100' },
        { id: 3, title: 'Hyperion', author: 'Dan Simmons', progress: 100, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=100' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#02040a] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-[#05070a] lg:flex">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">B</div>
                        <span className="font-black text-xl tracking-tighter dark:text-white uppercase">BoiNet</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20">
                        <LayoutDashboard size={18} />
                        Overview
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl text-sm font-bold transition-colors">
                        <BookOpen size={18} />
                        My Library
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl text-sm font-bold transition-colors">
                        <Users size={18} />
                        Network
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl text-sm font-bold transition-colors">
                        <Settings size={18} />
                        Settings
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-sm font-black uppercase tracking-widest transition-colors"
                    >
                        <LogOut size={18} />
                        Disconnect
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#05070a]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-black tracking-tighter dark:text-white uppercase italic font-serif">Command Deck</h1>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Active Node</p>
                            <p className="font-bold text-sm dark:text-white">{user?.name || 'Guest Explorer'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 border-2 border-indigo-600/30 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${user?.id || 1}`} alt="User avatar" />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-12">
                    {/* Welcome Section */}
                    <section className="relative overflow-hidden bg-slate-950 rounded-[2.5rem] p-10 text-white">
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        <div className="absolute bottom-0 right-0 w-125 h-125 bg-indigo-600/20 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/70">Synchronization Complete</span>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-5xl font-black tracking-tighter italic font-serif">Welcome home, {user?.name?.split(' ')[0]}.</h2>
                                <p className="text-slate-400 font-medium text-lg italic tracking-wide">Continue your journey through the global narrative layer.</p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all">
                                    <Plus size={18} />
                                    New Entry
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-xl font-bold backdrop-blur-md transition-all">
                                    Explore Network
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Stats Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statusCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2.5 rounded-xl ${card.color} text-white`}>
                                        <card.icon size={20} />
                                    </div>
                                    <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12%</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{card.title}</p>
                                    <p className="text-3xl font-black dark:text-white tracking-tighter uppercase">{card.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Reading List */}
                        <section className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tighter dark:text-white uppercase">Active Protocols</h3>
                                    <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">Ongoing Library Integrations</p>
                                </div>
                                <button className="text-[10px] font-black text-indigo-600 hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-[0.2em] border-2 border-indigo-600/20 px-4 py-2 rounded-full">Archive View</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recentBooks.map((book) => (
                                    <div key={book.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:border-indigo-600/30 transition-all hover:shadow-2xl hover:shadow-indigo-600/5">
                                        <div className="flex gap-4">
                                            <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 shadow-xl shadow-black/10">
                                                <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-black text-base dark:text-white tracking-tight truncate leading-tight">{book.title}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{book.author}</p>
                                                <div className="flex gap-1 mt-3">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} size={10} className={s <= 4 ? "text-indigo-500 fill-indigo-500" : "text-slate-200 dark:text-slate-800"} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                                                <span>Sync Progress</span>
                                                <span className="text-indigo-500">{book.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${book.progress}%` }}
                                                    className="h-full bg-indigo-600 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 text-slate-300 dark:text-slate-700 hover:text-indigo-600 hover:border-indigo-600 transition-all p-8 group">
                                    <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Initialize New Protocol</span>
                                </button>
                            </div>
                        </section>

                        {/* Network Feed */}
                        <section className="space-y-6">
                            <h3 className="text-2xl font-black tracking-tighter dark:text-white uppercase italic font-serif">Communal Frequency</h3>
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-3 pb-8 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?u=meta${i}`} alt="" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black dark:text-white uppercase">Explorer Node {i}</p>
                                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">2h ago</p>
                                            </div>
                                        </div>
                                        <p className="text-sm dark:text-slate-300 font-medium leading-relaxed italic">
                                            "Just finished the hyper-realist study of dystopian literature. The parallels to our current architecture are profound."
                                        </p>
                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-indigo-600">
                                            <button className="flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform">
                                                <Star size={12} fill="currentColor" />
                                                Elevate
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button className="w-full py-4 bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-colors">
                                    Join the discourse
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
