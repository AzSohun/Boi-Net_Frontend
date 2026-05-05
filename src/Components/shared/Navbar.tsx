import {
    Sun,
    Moon,
    Monitor,
    BookOpen,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const Logo = () => (
    <div className="flex items-center gap-3 group cursor-pointer">
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
    </div>
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', active: true },
        { name: 'Books', active: false },
        { name: 'About', active: false }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/50 dark:border-slate-800/50 h-16 md:h-20 shadow-sm'
            : 'bg-transparent h-20 md:h-24'
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Logo />

                <div className="hidden md:flex items-center gap-12 font-bold text-sm tracking-tight text-slate-600 dark:text-slate-400">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href="#"
                            className={`transition-all relative group py-1 ${item.active ? 'text-indigo-600' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 rounded-full transition-all duration-300 ${item.active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <ThemeToggle theme={theme} setTheme={setTheme} />

                    <div className="hidden sm:flex items-center gap-4 md:gap-8">
                        <button className="text-sm font-black text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 transition-all">
                            Login
                        </button>
                        <button className="bg-indigo-600 text-white px-7 py-3.5 rounded-2xl text-sm font-black hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/10 active:scale-95">
                            Get Started
                        </button>
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
                        className="fixed inset-0 bg-[#FDFCFB] dark:bg-slate-950 z-40 flex flex-col pt-28 px-10 md:hidden"
                    >
                        <div className="space-y-8">
                            {navLinks.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href="#"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-5xl font-black block tracking-tighter ${item.active ? 'text-indigo-600' : 'text-slate-900 dark:text-white'}`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                        <div className="mt-auto pb-16 space-y-4">
                            <button className="w-full py-5 text-slate-900 dark:text-white font-black text-2xl border-2 border-slate-100 dark:border-slate-800 rounded-4xl active:scale-95 transition-transform">
                                Login
                            </button>
                            <button className="w-full py-5 bg-indigo-600 text-white font-black text-2xl rounded-4xl shadow-2xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-transform">
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
