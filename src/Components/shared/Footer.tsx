import { Globe, Zap, Shield, ArrowRight } from 'lucide-react';
import { Logo } from './Navbar';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 pt-40 pb-20 px-6 border-t border-slate-100 dark:border-slate-900">
            <div className="max-w-7xl mx-auto space-y-32">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                    <div className="space-y-10 max-w-sm">
                        <Logo />
                        <p className="text-slate-500 dark:text-slate-400 text-2xl font-light leading-snug tracking-tight">
                            Empowering readers through a seamless digital experience. Connecting you with the world's wisdom.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
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
                                <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</Link></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div className="space-y-10 col-span-2">
                            <p className="text-slate-900 dark:text-white uppercase text-xs tracking-[0.4em] font-black underline decoration-indigo-600 decoration-4 underline-offset-8">Newsletter</p>
                            <div className="space-y-6">
                                <form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
                                    <div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl focus-within:border-indigo-600/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            className="flex-1 bg-transparent border-none px-4 py-2.5 text-sm font-medium dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 min-w-0"
                                        />
                                        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl hover:bg-slate-900 transition-all shadow-md flex items-center justify-center group/btn active:scale-95 leading-none font-bold text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                                            Join <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                                <p className="text-slate-400 dark:text-slate-500 text-[13px] font-medium leading-relaxed max-w-xs">Join our community of 50,000+ readers for weekly insights.</p>
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
    );
}
