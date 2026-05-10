import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    TrendingUp,
    Clock,
    Star,
    Plus,
    ShieldCheck,
    BarChart3,
    Database,
    FileText,
    Activity,
    Bell,
    Search,
    Grid,
    List as ListIcon,
    Filter,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Role } from '../types/auth';

export default function Dashboard() {
    const { user, clearAuth } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const isManagement = user?.userRole === Role.SuperAdmin || user?.userRole === Role.Admin;
    const accentColor = isManagement ? 'emerald' : 'indigo';
    const roleLabel = user?.userRole === Role.SuperAdmin ? 'Super Admin' : user?.userRole === Role.Admin ? 'Admin' : 'Explorer';

    // --- Admin Stats ---
    const adminStats = [
        { title: 'Total Users', value: '12,482', icon: Users, trend: '+4.2%', color: 'from-emerald-500/20 to-emerald-500/5' },
        { title: 'Global Revenue', value: '$84,200', icon: BarChart3, trend: '+12.5%', color: 'from-blue-500/20 to-blue-500/5' },
        { title: 'Live Nodes', value: '342', icon: Database, trend: 'Active', color: 'from-indigo-500/20 to-indigo-500/5' },
        { title: 'Security Risk', value: 'Low', icon: ShieldCheck, trend: 'Optimal', color: 'from-amber-500/20 to-amber-500/5' },
    ];

    // --- User Stats ---
    const userStats = [
        { title: 'Wishlist Items', value: (user?.wishlist?.length || 0).toString(), icon: Star, trend: 'Personal', color: 'from-indigo-500/20 to-indigo-500/5' },
        { title: 'Network Rank', value: '#12', icon: TrendingUp, trend: 'Top 5%', color: 'from-emerald-500/20 to-emerald-500/5' },
        { title: 'Community', value: '1.2k', icon: Users, trend: '+12', color: 'from-blue-500/20 to-blue-500/5' },
        { title: 'Reading Time', value: '4.5h', icon: Clock, trend: 'Today', color: 'from-amber-500/20 to-amber-500/5' },
    ];

    const statusCards = isManagement ? adminStats : userStats;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-slate-900 dark:text-slate-100 flex overflow-hidden font-sans">

            {/* Sidebar - Glassmorphism */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="relative z-50 flex-col bg-white/70 dark:bg-black/40 backdrop-blur-2xl border-r border-slate-200 dark:border-white/5 transition-all duration-300 ease-in-out hidden md:flex"
            >
                <div className="p-6 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center gap-3"
                            >
                                <div className={`w-10 h-10 bg-${accentColor}-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-${accentColor}-600/20`}>B</div>
                                <span className="font-black text-2xl tracking-tighter uppercase italic font-serif">BoiNet</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <ChevronRight size={20} className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active accent={accentColor} expanded={isSidebarOpen} />
                    {isManagement ? (
                        <>
                            <SidebarItem icon={Users} label="User Control" expanded={isSidebarOpen} />
                            <SidebarItem icon={BookOpen} label="Library Registry" expanded={isSidebarOpen} />
                            <SidebarItem icon={ShieldCheck} label="Security Core" expanded={isSidebarOpen} />
                            <SidebarItem icon={BarChart3} label="Analytics" expanded={isSidebarOpen} />
                        </>
                    ) : (
                        <>
                            <SidebarItem icon={BookOpen} label="My Library" expanded={isSidebarOpen} />
                            <SidebarItem icon={Users} label="Social Feed" expanded={isSidebarOpen} />
                            <SidebarItem icon={Star} label="Wishlist" expanded={isSidebarOpen} />
                        </>
                    )}
                    <SidebarItem icon={Settings} label="System Config" expanded={isSidebarOpen} />
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-white/5">
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ x: 5 }}
                        className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'} py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 rounded-2xl transition-all font-bold text-sm tracking-tight`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-3 font-black uppercase tracking-widest text-[11px]">Terminate</span>}
                    </motion.button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-150 h-150 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                {/* Global Header */}
                <header className="h-20 flex items-center justify-between px-8 z-20 relative">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                            <div className={`w-8 h-8 bg-${accentColor}-600 rounded-xl flex items-center justify-center text-white font-black`}>B</div>
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight dark:text-white uppercase font-mono">
                                {isManagement ? `ACCESS_LVL_${user?.userRole}` : 'DASHBOARD_V2'}
                            </h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] font-mono">
                                System Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-2xl">
                            <Search size={16} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="bg-transparent border-none outline-none text-sm font-medium w-48 placeholder:text-slate-500"
                            />
                        </div>

                        <button className="relative p-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>

                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className={`text-[9px] font-black uppercase text-${accentColor}-500 tracking-[0.2em]`}>{roleLabel}</p>
                                <p className="font-bold text-sm tracking-tight">{user?.name || 'Explorer'}</p>
                            </div>
                            <div className={`w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/5 border-2 border-${accentColor}-600/20 overflow-hidden p-0.5`}>
                                <img
                                    src={user?.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'admin'}`}
                                    alt="Avatar"
                                    className="w-full h-full rounded-[14px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto px-8 pt-4 pb-12 z-10 custom-scrollbar">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="max-w-7xl mx-auto space-y-8"
                    >
                        {/* Hero Welcome Card */}
                        <motion.section
                            variants={itemVariants}
                            className={`relative h-64 rounded-[2.5rem] overflow-hidden flex flex-col justify-center px-12 group`}
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${isManagement ? 'from-emerald-600 via-emerald-700 to-slate-900' : 'from-indigo-600 via-indigo-700 to-slate-900'} transition-all duration-700 group-hover:scale-105`} />
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_40%)]" />

                            <div className="relative space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white/90"
                                >
                                    <Activity size={12} className="animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{isManagement ? 'Management Override Active' : 'User Session: Standard'}</span>
                                </motion.div>
                                <h2 className="text-5xl font-black tracking-tighter text-white font-serif italic">
                                    {isManagement ? `Welcome, ${user?.name?.split(' ')[0]}.` : `Dashboard home, ${user?.name?.split(' ')[0]}.`}
                                </h2>
                                <p className="text-white/70 font-medium text-lg italic max-w-lg leading-relaxed">
                                    {isManagement
                                        ? `Operations are proceeding within nominal parameters. Your ${roleLabel} clearance provides full system oversight.`
                                        : "Your personal library collection is synchronizing with the global narrative layer."}
                                </p>
                            </div>

                            <div className="absolute bottom-10 right-12 flex gap-4">
                                {isManagement ? (
                                    <div className="flex gap-3">
                                        <ActionButton label="Generate Report" icon={FileText} onClick={() => { }} dark />
                                        <ActionButton label="System Log" icon={ShieldCheck} onClick={() => { }} />
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <ActionButton label="Add Book" icon={Plus} onClick={() => { }} dark />
                                        <ActionButton label="Community" icon={Users} onClick={() => { }} />
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        {/* Bento Stats Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statusCards.map((stat, i) => (
                                <StatCard key={i} {...stat} index={i} />
                            ))}
                        </section>

                        {/* Main Information Layer */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Left Column - Dynamic Content */}
                            <motion.section variants={itemVariants} className="lg:col-span-8 space-y-6">
                                <div className="flex items-center justify-between pb-2">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-black tracking-tight uppercase font-serif italic underline decoration-2 decoration-emerald-500 underline-offset-8">
                                            {isManagement ? 'Network Operations' : 'Active Registry'}
                                        </h3>
                                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                                            <button className="p-2 rounded-lg bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white"><Grid size={16} /></button>
                                            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><ListIcon size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5">
                                            <Filter size={12} />
                                            Filter
                                        </button>
                                        <button className={`text-[10px] font-black px-5 py-2 rounded-xl bg-${accentColor}-600 text-white shadow-lg shadow-${accentColor}-600/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest`}>
                                            View All
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {isManagement ? (
                                        // Admin View: User Management Widgets
                                        <>
                                            <ManagementWidget
                                                title="Node Health"
                                                value="99.8%"
                                                status="Healthy"
                                                icon={Activity}
                                            />
                                            <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors">
                                                <div className="space-y-4">
                                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                                                        <Users size={24} />
                                                    </div>
                                                    <h4 className="text-xl font-black tracking-tight leading-tight uppercase font-serif">Awaiting Verification</h4>
                                                    <p className="text-slate-400 text-sm font-medium">There are 12 new explorer nodes requesting narrative access.</p>
                                                </div>
                                                <button className="mt-8 flex items-center justify-between group-hover:px-2 transition-all">
                                                    <span className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-500">Initialize Verification</span>
                                                    <ChevronRight size={16} className="text-emerald-500" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        // User View: Book Cards
                                        [
                                            { id: 1, title: 'Neuromancer', author: 'William Gibson', progress: 85, color: 'indigo' },
                                            { id: 2, title: 'Hyperion', author: 'Dan Simmons', progress: 42, color: 'emerald' },
                                        ].map((book) => (
                                            <BookProgressCard key={book.id} {...book} />
                                        ))
                                    )}
                                </div>

                                {/* Secondary list - More detailed log/list */}
                                <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
                                    <div className="p-8 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                                        <h4 className="font-black text-lg tracking-tight uppercase font-serif italic">
                                            {isManagement ? 'System Traffic' : 'Community Discourse'}
                                        </h4>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"><Settings size={18} /></button>
                                    </div>
                                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                                        {(isManagement ? adminLogData : userFeedData).map((item, i) => (
                                            <LogItem key={i} {...item} />
                                        ))}
                                    </div>
                                </div>
                            </motion.section>

                            {/* Right Column - Side Widgets */}
                            <motion.section variants={itemVariants} className="lg:col-span-4 space-y-8">

                                {/* Profile Snapshot Card */}
                                <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 text-center space-y-6 relative overflow-hidden group border-b-4 border-b-emerald-500/20">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-4xl border-4 border-white dark:border-slate-800 shadow-2xl shadow-black/20 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                                            <img
                                                src={user?.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'admin'}`}
                                                className="w-full h-full object-cover"
                                                alt=""
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                <Settings size={20} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black tracking-tight">{user?.name}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{user?.email}</p>
                                        </div>
                                        <div className={`px-4 py-1.5 bg-${accentColor}-500/10 text-${accentColor}-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-${accentColor}-500/20`}>
                                            {roleLabel} Status: Verified
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                        <div className="text-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration</p>
                                            <p className="text-xs font-bold">Verified Node</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Storage</p>
                                            <p className="text-xs font-bold">1.2 GB / 5GB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Help/Status Card */}
                                <div className={`bg-linear-to-br from-slate-900 to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl`}>
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-${accentColor}-600/20 blur-2xl`} />
                                    <h4 className="text-lg font-black tracking-tight uppercase font-serif italic z-10 relative">System Support</h4>
                                    <p className="text-slate-400 text-sm font-medium mt-2 z-10 relative">Need assistance with your {isManagement ? 'administrative tools' : 'narrative library'}?</p>
                                    <button className={`mt-6 w-full py-4 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-${accentColor}-600/30`}>
                                        Open Support Ticket
                                    </button>
                                </div>

                                {/* Calendar/Daily Card */}
                                <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Temporal Log</h4>
                                        <Clock size={16} className="text-slate-400" />
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { time: '09:00', event: 'Registry Scan', type: 'system' },
                                            { time: '14:30', event: 'Node Sync', type: 'network' },
                                        ].map((evt, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <span className="text-[10px] font-black text-slate-400 w-8">{evt.time}</span>
                                                <div className="flex-1 pb-4 border-l-2 border-emerald-500 pl-4 relative">
                                                    <div className="absolute top-0 -left-1.25 w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                                                    <p className="text-xs font-bold leading-none">{evt.event}</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{evt.type}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </motion.section>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

// --- Subcomponents ---

function SidebarItem({ icon: Icon, label, active = false, accent = 'indigo', expanded = true }: any) {
    return (
        <button className={`
      w-full flex items-center transition-all duration-300 rounded-2xl group
      ${expanded ? 'px-4' : 'justify-center'} py-3.5
      ${active
                ? `bg-${accent}-600 text-white shadow-xl shadow-${accent}-600/20`
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
    `}>
            <Icon size={20} />
            {expanded && (
                <span className={`ml-4 text-[13px] font-bold tracking-tight ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                    {label}
                </span>
            )}
            {expanded && active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>
    );
}

function StatCard({ title, value, icon: Icon, trend, color, index }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`relative bg-linear-to-br ${color} bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] shadow-sm group transition-all duration-500 overflow-hidden`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} strokeWidth={1} />
            </div>
            <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-3xl bg-white dark:bg-white/10 shadow-lg text-slate-900 dark:text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    <Icon size={24} />
                </div>
                <div className="text-right z-10">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
                        {trend}
                    </span>
                </div>
            </div>
            <div className="space-y-1 z-10 relative">
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">{title}</p>
                <p className="text-4xl font-black dark:text-white tracking-tighter leading-none">{value}</p>
            </div>
        </motion.div>
    );
}

function ActionButton({ label, icon: Icon, onClick, dark = false }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
        px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all shadow-lg
        ${dark
                    ? 'bg-slate-900 text-white hover:bg-black active:shadow-none'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md active:shadow-none'}
      `}
        >
            <Icon size={16} />
            {label}
        </motion.button>
    );
}

function BookProgressCard({ title, author, progress, color }: any) {
    return (
        <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] group hover:border-indigo-500/50 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                    <h4 className="text-lg font-black tracking-tight leading-none uppercase font-serif italic decoration-indigo-500/30 underline underline-offset-4">{title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{author}</p>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden text-[8px] flex items-center justify-center font-bold">
                            U{i}
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Sync Progress</span>
                    <span className={`text-[10px] font-black text-${color}-500 font-mono`}>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full bg-${color}-500 rounded-full`}
                    />
                </div>
            </div>
        </div>
    );
}

function ManagementWidget({ title, value, status, icon: Icon }: any) {
    return (
        <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-emerald-500/50 transition-all shadow-sm">
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                    <Icon size={20} />
                </div>
                <span className="text-[11px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {status}
                </span>
            </div>
            <div className="mt-8">
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">{title}</p>
                <p className="text-5xl font-black dark:text-white tracking-tighter uppercase font-mono italic">{value}</p>
            </div>
        </div>
    );
}

function LogItem({ title, desc, time, type }: any) {
    const isAlert = type === 'alert' || type === 'critical';
    const isSync = type === 'sync' || type === 'info';

    return (
        <div className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-4">
                <div className={`
             w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
             ${isAlert ? 'bg-red-500/10 text-red-500' : isSync ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}
          `}>
                    {isAlert ? <AlertCircle size={20} /> : isSync ? <CheckCircle2 size={20} /> : <Activity size={20} />}
                </div>
                <div>
                    <h5 className="text-sm font-bold tracking-tight">{title}</h5>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">{desc}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{time || 'Now'}</p>
                <p className={`text-[8px] font-black uppercase tracking-widest mt-1 ${isAlert ? 'text-red-500' : isSync ? 'text-blue-500' : 'text-slate-400'}`}>
                    {type}
                </p>
            </div>
        </div>
    );
}

// --- Mock Data ---

const adminLogData = [
    { title: 'Security Protocol 07', desc: 'Auth validation pass from Node #124.', type: 'info', time: '12m ago' },
    { title: 'Unauthorized Access', desc: 'Firewall blocked request from 192.168.1.1.', type: 'alert', time: '45m ago' },
    { title: 'Data Migration', desc: 'Library registry backup successfully synced.', type: 'sync', time: '2h ago' },
    { title: 'New Admin Assigned', desc: 'Charlie D. granted access to system core.', type: 'info', time: '5h ago' },
];

const userFeedData = [
    { title: 'Alice V.', desc: 'Added "The Wind-Up Bird Chronicle" to wishlist.', type: 'activity', time: '12m ago' },
    { title: 'Bob S.', desc: 'Started reading "Dune (1965)". Progress: 5%.', type: 'reader', time: '45m ago' },
    { title: 'Community Alert', desc: 'New discussion active in Cyberpunk forum.', type: 'info', time: '2h ago' },
    { title: 'Achievement', desc: 'You have read 5 books this month. Level Up.', type: 'sync', time: '5h ago' },
];
