import {
  BookOpen,
  ArrowRight,
  Library,
  BookMarked,
  Sparkles,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';

// লোগো কম্পোনেন্ট
const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative flex items-center justify-center w-11 h-11 overflow-hidden rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20 group-hover:bg-indigo-700 transition-all duration-300">
      <motion.div
        initial={{ rotate: -15, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <BookOpen className="w-6 h-6 text-white" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
      Boi<span className="text-indigo-600">Net</span>
    </span>
  </div>
);

// অ্যানিমেশন ভেরিয়েন্টস (Explicitly Typed)
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
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {/* স্টিকি নেভিগেশন */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-12 font-bold text-sm tracking-tight">
            {[
              { name: 'Home', active: true },
              { name: 'Books', active: false },
              { name: 'About', active: false }
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={`transition-all relative group ${item.active ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                {item.name}
                {item.active && <span className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button className="text-sm font-black text-slate-600 hover:text-indigo-600 transition-colors pointer-events-auto">
              Login
            </button>
            <button className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-sm font-black hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-900/10 active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* হিরো সেকশন */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.06)_0,rgba(255,255,255,0)_100%)]" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.div custom={0} variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-700 text-[11px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4" />
                The Future of Reading
              </motion.div>

              <motion.h1 custom={1} variants={fadeInUp} className="text-6xl md:text-[5.2rem] font-bold tracking-tight text-slate-900 leading-[0.95]">
                Discover Your Next <br />
                <span className="text-indigo-600 italic font-serif">Favorite Book</span>
              </motion.h1>

              <motion.div custom={2} variants={fadeInUp} className="max-w-xl space-y-8">
                <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
                  BoiNet-এ আপনাকে স্বাগতম! আপনার প্রিয় বইয়ের বিশাল সংগ্রহশালা এখন আপনার হাতের মুঠোয়। আজই আপনার পছন্দের বইটি খুঁজে বের করুন।
                </p>
                <div className="flex flex-wrap gap-5">
                  <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-3 group">
                    Browse Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-lg hover:border-indigo-600 transition-all">
                    Learn More
                  </button>
                </div>
              </motion.div>

              <motion.div custom={3} variants={fadeInUp} className="pt-4 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-slate-900 font-black text-sm tracking-tight">10,000+ Active Readers</p>
                  <div className="flex text-indigo-500 gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* হিরো ইমেজ সেকশন */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[64px] bg-slate-100 aspect-[4/5] overflow-hidden shadow-2xl group border-[12px] border-white">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
                  alt="Library"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white max-w-xs">
                  <TrendingUp className="w-8 h-8 mb-4 text-indigo-400" />
                  <p className="font-bold text-xl leading-tight">Trending: "The Art of Knowledge Curation"</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 blur-[100px] -z-10 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 blur-[100px] -z-10 animate-pulse delay-700" />
            </motion.div>
          </div>
        </section>

        {/* ফিচার সেকশন (বেন্টো গ্রিড স্টাইল) */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { icon: Library, title: "Massive Collection", desc: "Access millions of books across all genres and languages.", color: "bg-indigo-600" },
              { icon: BookMarked, title: "Smart Annotations", desc: "Shared notes and insights that live across all your devices.", color: "bg-blue-600" },
              { icon: Shield, title: "Private & Secure", desc: "Your reading habits are yours alone. Encrypted and safe.", color: "bg-slate-900" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 text-white shadow-lg`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* কল টু অ্যাকশন */}
        <section className="py-40 px-6">
          <div className="max-w-6xl mx-auto rounded-[56px] bg-indigo-600 py-24 px-12 relative overflow-hidden text-center space-y-10 shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Zap className="absolute top-10 left-10 w-40 h-40 -rotate-12" />
              <Globe className="absolute bottom-10 right-10 w-40 h-40 rotate-12" />
            </div>

            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight relative z-10">
              Ready to Start Your <br />
              <span className="italic text-indigo-200 font-serif">Literary Journey?</span>
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl font-medium max-w-2xl mx-auto relative z-10">
              Join thousands of readers and discover the power of curated knowledge at your fingertips.
            </p>
            <div className="relative z-10 flex justify-center pt-6">
              <button className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95">
                Join Now for Free
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* মডার্ন ফুটার */}
      <footer className="bg-white pt-32 pb-16 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-8 max-w-sm">
              <Logo />
              <p className="text-slate-500 text-xl font-light leading-relaxed">
                Empowering readers through a seamless digital experience. Connecting you with the world's wisdom.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
              <div className="space-y-6">
                <p className="text-slate-900 uppercase text-xs tracking-widest font-black">Explore</p>
                <ul className="space-y-4 font-bold text-slate-500">
                  <li><a href="#" className="hover:text-indigo-600">Library</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Authors</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Community</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-slate-900 uppercase text-xs tracking-widest font-black">Company</p>
                <ul className="space-y-4 font-bold text-slate-500">
                  <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-6 col-span-2 lg:col-span-1">
                <p className="text-slate-900 uppercase text-xs tracking-widest font-black">Newsletter</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all w-full" />
                  <button className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-slate-900 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 font-bold text-sm tracking-tight text-center">
              &copy; {new Date().getFullYear()} BoiNet. Built with <span className="text-slate-900">ASP.NET Core</span> & <span className="text-slate-900">React</span>.
            </p>
            <div className="flex gap-8 grayscale opacity-40">
              <Globe className="w-5 h-5" />
              <Zap className="w-5 h-5" />
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
