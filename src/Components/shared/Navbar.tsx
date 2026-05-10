import {
    Sun,
    Moon,
    Monitor,
    BookOpen,
    Menu,
    X,
    LayoutDashboard,
    LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

type Theme = 'light' | 'dark' | 'system';

export const Logo = () => (
    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20 group-hover:bg-indigo-700 transition-all duration-300">
            <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
        </div>
        <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
            Boi<span className="text-indigo-600">Net</span>
        </span>
    </Link>
);

const ThemeToggle = ({ theme, setTheme }: { theme: Theme, setTheme: (t: Theme) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const modes: { id: Theme, icon: any, label: string }[] = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'system', icon: Monitor, label: 'System' }
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 relative group overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {theme === 'light' && <motion.div key="sun" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}><Sun className="w-5 h-5 md:w-6 md:h-6" /></motion.div>}
                    {theme === 'dark' && <motion.div key="moon" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}><Moon className="w-5 h-5 md:w-6 md:h-6" /></motion.div>}
                    {theme === 'system' && <motion.div key="system" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}><Monitor className="w-5 h-5 md:w-6 md:h-6" /></motion.div>}
                </AnimatePresence>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute right-0 mt-3 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none p-2 z-50 overflow-hidden"
                        >
                            {modes.map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => {
                                        setTheme(mode.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${theme === mode.id
                                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <mode.icon className="w-4 h-4" />
                                    {mode.label}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Navbar({ theme, setTheme }: { theme: Theme, setTheme: (t: Theme) => void }) {
    const { accessToken, clearAuth } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        clearAuth();
        navigate('/');
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Books', path: '/books' },
        { name: 'Authors', path: '/authors' },
        { name: 'Community', path: '/community' },
        { name: 'About', path: '/about' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/50 dark:border-slate-800/50 h-16 md:h-20 shadow-sm'
            : 'bg-transparent h-20 md:h-24'
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Logo />

                <div className="hidden md:flex items-center gap-8 lg:gap-12 font-bold text-sm tracking-tight text-slate-600 dark:text-slate-400">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `transition-all relative group py-1 ${isActive ? 'text-indigo-600' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                        >
                            {({ isActive }) => (
                                <>
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <ThemeToggle theme={theme} setTheme={setTheme} />

                    <div className="hidden sm:flex items-center gap-4 md:gap-6">
                        {accessToken ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2 text-sm font-black text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 transition-all"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-black text-red-500 hover:text-red-600 px-2 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-black text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 transition-all"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 text-white px-7 py-3 rounded-xl text-sm font-black hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/10 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative z-50"
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Solid Background */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                        className="fixed inset-0 bg-[#FDFCFB] dark:bg-slate-950 z-40 flex flex-col pt-28 px-10 md:hidden overflow-y-auto"
                    >
                        <div className="space-y-6">
                            {navLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                >
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => `text-4xl font-black block tracking-tighter ${isActive ? 'text-indigo-600' : 'text-slate-900 dark:text-white'}`}
                                    >
                                        {item.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto pb-16 space-y-4">
                            {accessToken ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full py-5 text-indigo-600 dark:text-indigo-400 font-black text-2xl border-2 border-indigo-600/20 rounded-4xl active:scale-95 transition-transform flex items-center justify-center gap-3"
                                    >
                                        <LayoutDashboard className="w-8 h-8" />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-5 text-red-500 font-black text-2xl border-2 border-red-500/20 rounded-4xl active:scale-95 transition-transform flex items-center justify-center gap-3"
                                    >
                                        <LogOut className="w-8 h-8" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full py-5 text-slate-900 dark:text-white font-black text-2xl border-2 border-slate-100 dark:border-slate-800 rounded-4xl active:scale-95 transition-transform flex items-center justify-center"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full py-5 bg-indigo-600 text-white font-black text-2xl rounded-4xl shadow-2xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-transform flex items-center justify-center"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
