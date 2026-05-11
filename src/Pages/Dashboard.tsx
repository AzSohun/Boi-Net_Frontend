import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    LogOut,
    Search,
    Bell,
    Menu,
    X,
    TrendingUp,
    Database,
    Shield,
    BarChart,
    ChevronRight,
    Plus,
    Home as HomeIcon,
    Sun,
    Moon,
    Monitor,
    type LucideIcon
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Role, type UserDto } from '../types/auth'
import BookManagement from '../Components/Dashboard/BookManagement';
import UserManagement from '../Components/Dashboard/UserManagement';

type DashboardSection = 'overview' | 'users' | 'library' | 'analytics' | 'settings';
type Theme = 'light' | 'dark' | 'system';

interface OverviewProps {
    user: UserDto | null;
    isManagement: boolean;
    setActiveSection: (section: DashboardSection) => void;
}

export default function Dashboard({ theme, setTheme }: { theme: Theme, setTheme: (t: Theme) => void }) {
    const { user, clearAuth } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const isManagement = user?.userRole === Role.SuperAdmin || user?.userRole === Role.Admin;

    const navItems = isManagement ? [
        { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'users', icon: Users, label: 'Users' },
        { id: 'library', icon: BookOpen, label: 'Books' },
        { id: 'analytics', icon: BarChart, label: 'Analytics' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ] : [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'library', icon: BookOpen, label: 'Explore Books' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-50`}
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">B</div>
                        {isSidebarOpen && <span className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">BoiNet</span>}
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    <Link
                        to="/"
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100`}
                    >
                        <HomeIcon size={20} />
                        {isSidebarOpen && <span className="text-sm font-medium">Back Website</span>}
                    </Link>

                    <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as DashboardSection)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeSection === item.id
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 2} />
                            {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                            {activeSection === item.id && isSidebarOpen && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-medium`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                {/* Top Header */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors">
                            <Search size={14} className="text-slate-400 dark:text-slate-500" />
                            <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none text-xs w-48 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-200" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                                className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            >
                                <AnimatePresence mode="wait">
                                    {theme === 'light' && <motion.div key="light" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}><Sun size={20} /></motion.div>}
                                    {theme === 'dark' && <motion.div key="dark" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}><Moon size={20} /></motion.div>}
                                    {theme === 'system' && <motion.div key="system" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}><Monitor size={20} /></motion.div>}
                                </AnimatePresence>
                            </button>

                            <AnimatePresence>
                                {isThemeMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsThemeMenuOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-1.5 z-20"
                                        >
                                            {[
                                                { id: 'light', icon: Sun, label: 'Light' },
                                                { id: 'dark', icon: Moon, label: 'Dark' },
                                                { id: 'system', icon: Monitor, label: 'System' }
                                            ].map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => {
                                                        setTheme(m.id as Theme);
                                                        setIsThemeMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${theme === m.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <m.icon size={14} />
                                                    {m.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{user?.name}</p>
                                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase mt-0.5">{user?.userRole === Role.SuperAdmin ? 'Super Admin' : user?.userRole === Role.Admin ? 'Curator' : 'Explorer'}</p>
                            </div>
                            <img
                                src={user?.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
                                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                                alt="Profile"
                            />
                        </div>
                    </div>
                </header>

                {/* Viewport Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeSection === 'library' ? <BookManagement /> :
                                    activeSection === 'users' ? <UserManagement /> :
                                        <Overview user={user} isManagement={isManagement} setActiveSection={setActiveSection} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}

function Overview({ user, setActiveSection }: OverviewProps) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
                    Welcome back, <span className="italic text-indigo-600 dark:text-indigo-400">{user?.name ? user.name.split(' ')[0] : 'User'}</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here is what is happening with BoiNet today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Active Users" value="1,280" icon={Users} trend="+12%" color="blue" />
                <StatCard label="Book Catalog" value="48.2K" icon={BookOpen} trend="+5.4k" color="indigo" />
                <StatCard label="System Status" value="Online" icon={Database} trend="Stable" color="blue" />
                <StatCard label="Security" value="Active" icon={Shield} trend="Secure" color="slate" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">Growth Analytics</h3>
                            <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs outline-none text-slate-600 dark:text-slate-400">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end gap-3 px-2">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="flex-1 space-y-2">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider px-2">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-left">Operational Logs</h3>
                            <button className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'New books added', user: 'Admin', time: '2m ago' },
                                { title: 'System update completed', user: 'System', time: '1h ago' },
                                { title: 'Permissions updated', user: 'Super Admin', time: '3h ago' },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500"><TrendingUp size={16} /></div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">{log.title}</p>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mt-0.5">BY {log.user}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-500">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-indigo-600 p-8 rounded-4xl text-white space-y-6 shadow-xl shadow-indigo-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 blur-2xl" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold">Manage Resources</h3>
                            <p className="text-indigo-100 text-sm mt-2 opacity-80 font-medium">Quickly add or edit library items.</p>
                        </div>
                        <div className="space-y-3 relative z-10">
                            <button
                                onClick={() => setActiveSection('library')}
                                className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 hover:bg-slate-50 transition-all active:scale-95"
                            >
                                <Plus size={18} />
                                Add New Book
                            </button>
                            <button className="w-full py-3 bg-indigo-500 text-white border border-indigo-400 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-400 transition-all">
                                <TrendingUp size={18} />
                                System Health
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 text-left">Recently Joined</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 15}`} alt="" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">User {i}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Status: Online</p>
                                    </div>
                                    <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><ChevronRight size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    trend: string;
    color: 'blue' | 'indigo' | 'slate';
}

function StatCard({ label, value, icon: Icon, trend, color }: StatCardProps) {
    const colors = {
        blue: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400',
        indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400',
        slate: 'text-slate-600 bg-slate-50 dark:bg-slate-500/10 dark:text-slate-400',
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${colors[color]}`}>
                <Icon size={24} strokeWidth={2} />
            </div>
            <div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400">{trend}</span>
                </div>
            </div>
        </div>
    );
}


// --- End of Dashboard ---
