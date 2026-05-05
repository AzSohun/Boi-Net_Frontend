import {
  Monitor,
  Sun,
  Moon,
  BookOpen,
  ArrowRight,
  Library,
  BookMarked,
  Sparkles,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Star,
  Menu,
  X,
  ChevronRight,
  Quote
} from 'lucide-react';
import { motion, type Variants, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// --- Types ---
type Theme = 'light' | 'dark' | 'system';

// --- Components ---

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

const Logo = () => (
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

// --- Animation Variants ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.21, 1.02, 0.47, 0.98]
    }
  })
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem('theme', theme);

    const updateTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const navLinks = [
    { name: 'Home', active: true },
    { name: 'Books', active: false },
    { name: 'About', active: false }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden transition-colors duration-500">

      {/* Sticky Navigation */}
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
                <button className="w-full py-5 text-slate-900 dark:text-white font-black text-2xl border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] active:scale-95 transition-transform">
                  Login
                </button>
                <button className="w-full py-5 bg-indigo-600 text-white font-black text-2xl rounded-[2rem] shadow-2xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-transform">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[800px] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1)_0,rgba(15,23,42,0)_70%)]" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-10 md:space-y-14"
            >
              <motion.div custom={0} variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-indigo-700 dark:text-indigo-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">
                <Sparkles className="w-4 h-4" />
                The Future of Reading
              </motion.div>

              <motion.h1 custom={1} variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.9] md:leading-[0.85]">
                Discover Your Next <br />
                <span className="text-indigo-600 dark:text-indigo-500 italic font-serif font-bold">Favorite Book</span>
              </motion.h1>

              <motion.div custom={2} variants={fadeInUp} className="max-w-2xl space-y-10">
                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium tracking-tight">
                  Welcome to BoiNet! Your massive collection of favorite books is now at your fingertips. Discover your chosen stories today.
                </p>
                <div className="flex flex-wrap gap-5">
                  <button className="bg-indigo-600 text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-slate-900 dark:hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-4 group active:scale-95">
                    Browse Collection <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 px-10 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:border-indigo-600 dark:hover:border-indigo-500 transition-all active:scale-95">
                    Learn More
                  </button>
                </div>
              </motion.div>

              <motion.div custom={3} variants={fadeInUp} className="pt-4 flex items-center gap-8 text-slate-900 dark:text-white">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[6px] border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?u=boi${i}`} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-black text-sm md:text-base tracking-tight">10,000+ Active Readers</p>
                  <div className="flex text-indigo-500 dark:text-indigo-400 gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* --- Hero Image --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.21, 1.02, 0.47, 0.98] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[5rem] bg-white dark:bg-slate-900 p-4 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] dark:shadow-none border border-slate-100 dark:border-slate-800">
                <div className="relative aspect-[3/4] rounded-[4.2rem] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
                    alt="Library Atmosphere"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Floating Content - Improved Glassmorphism */}
                  <div className="absolute bottom-10 left-10 right-10 p-10 rounded-[3rem] bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border border-white/20 dark:border-slate-700/30 text-white shadow-2xl">
                    <TrendingUp className="w-10 h-10 mb-5 text-indigo-400" />
                    <p className="font-bold text-2xl md:text-3xl leading-tight text-white">Trending: "The Art of Knowledge Curation"</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 blur-[120px] -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/10 blur-[120px] -z-10 animate-pulse delay-1000" />
            </motion.div>
          </div>
        </section>

        {/* --- Featured Stats --- */}
        <section className="py-24 border-y border-slate-100 dark:border-slate-900 bg-[#FDFCFB] dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-slate-900 dark:text-white">
            {[
              { label: "Volumes", val: "2.4M+" },
              { label: "Community", val: "850k" },
              { label: "Authors", val: "15k+" },
              { label: "Daily Reads", val: "45k" }
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-6xl font-black tracking-tighter">{s.val}</div>
                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { icon: Library, title: "Massive Collection", desc: "Access millions of books across all genres and languages at any time.", color: "bg-indigo-600" },
              { icon: BookMarked, title: "Smart Annotations", desc: "Shared notes and insights that sync seamlessly across all your devices.", color: "bg-blue-600" },
              { icon: Shield, title: "Private & Secure", desc: "Your reading habits are strictly confidential and fully encrypted.", color: "bg-slate-900 dark:bg-slate-800" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-12 rounded-[40px] border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-10 text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-bold tracking-tight text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Testimonials --- */}
        <section className="py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">
                  <Quote className="w-4 h-4" />
                  Reader Voices
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                  Wisdom Shared, <br /><span className="text-indigo-600 italic font-serif">Community Driven.</span>
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "Sarah Jameson", role: "PhD Researcher", text: "BoiNet changed how I organize my research. The annotations tool is a masterpiece. Highly recommend for any academic." },
                { name: "David Chen", role: "Creative Director", text: "The collection of art books is unmatched. I find inspiration every morning before starting my design work." }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-12 rounded-[48px] bg-slate-900 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-white space-y-8 relative overflow-hidden group shadow-2xl"
                >
                  <Quote className="w-16 h-16 text-indigo-500/10 absolute top-10 right-10 group-hover:scale-125 transition-transform duration-1000" />
                  <p className="text-xl md:text-3xl font-medium leading-tight relative z-10 italic">"{t.text}"</p>
                  <div className="flex items-center gap-5 relative z-10 pt-4">
                    <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center font-black text-xl shadow-2xl">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-2xl leading-none tracking-tight">{t.name}</p>
                      <p className="text-indigo-400 dark:text-indigo-300 text-sm font-black uppercase tracking-[0.2em] mt-2">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-40 px-6">
          <div className="max-w-6xl mx-auto rounded-[6rem] bg-indigo-600 dark:bg-indigo-700 py-32 px-12 relative overflow-hidden text-center space-y-12 shadow-[0_80px_160px_-40px_rgba(79,70,229,0.4)]">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Zap className="absolute top-10 left-10 w-48 h-48 -rotate-12" />
              <Globe className="absolute bottom-10 right-10 w-48 h-48 rotate-12" />
            </div>

            <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] relative z-10">
              Your Journey <br />
              <span className="italic text-indigo-100 font-serif">Starts Here.</span>
            </h2>
            <p className="text-indigo-100 text-xl md:text-3xl font-medium max-w-3xl mx-auto relative z-10 leading-tight">
              Join thousands of readers and discover the power of curated knowledge at your fingertips.
            </p>
            <div className="relative z-10 flex justify-center pt-10">
              <button className="bg-white text-indigo-600 px-16 py-7 rounded-[2.5rem] font-black text-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95 duration-500 uppercase tracking-widest leading-none">
                Join Now Free
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* --- Reverted Footer --- */}
      <footer className="bg-white dark:bg-slate-950 pt-40 pb-20 px-6 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-10 max-w-sm">
              <Logo />
              <p className="text-slate-500 dark:text-slate-400 text-2xl font-light leading-snug tracking-tight">
                Empowering readers through a seamless digital experience. Connecting you with the world's wisdom.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-20">
              <div className="space-y-10">
                <p className="text-slate-900 dark:text-white uppercase text-xs tracking-[0.4em] font-black underline decoration-indigo-600 decoration-4 underline-offset-8">Explore</p>
                <ul className="space-y-6 font-bold text-slate-500 dark:text-slate-400 text-xl">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Library</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Authors</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Community</a></li>
                </ul>
              </div>
              <div className="space-y-10">
                <p className="text-slate-900 dark:text-white uppercase text-xs tracking-[0.4em] font-black underline decoration-indigo-600 decoration-4 underline-offset-8">Company</p>
                <ul className="space-y-6 font-bold text-slate-500 dark:text-slate-400 text-xl">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-10 col-span-2 lg:col-span-1">
                <p className="text-slate-900 dark:text-white uppercase text-xs tracking-[0.4em] font-black underline decoration-indigo-600 decoration-4 underline-offset-8">Newsletter</p>
                <div className="flex gap-3 mt-6">
                  <input type="email" placeholder="Email" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-600 transition-all w-full font-bold dark:text-white" />
                  <button className="bg-indigo-600 text-white p-5 rounded-2xl hover:bg-slate-900 dark:hover:bg-indigo-700 transition-all shadow-xl">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-slate-400 dark:text-slate-500 font-bold text-sm tracking-tight text-center">
              &copy; {new Date().getFullYear()} BoiNet. Built with <span className="text-slate-900 dark:text-white">ASP.NET Core</span> & <span className="text-slate-900 dark:text-white">React</span>.
            </p>
            <div className="flex gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity dark:text-white">
              <Globe className="w-6 h-6" />
              <Zap className="w-6 h-6" />
              <Shield className="w-6 h-6" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
