import { Globe, Zap, Shield, ArrowRight } from 'lucide-react';
import { Logo } from './Navbar';

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
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div className="space-y-10 col-span-2">
                            <p className="text-slate-900 dark:text-white uppercase text-xs tracking-[0.4em] font-black underline decoration-indigo-600 decoration-4 underline-offset-8">Newsletter</p>
                            <div className="space-y-6">
                                <form className="relative max-w-xl group" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="Join our mailing list"
                                        className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-full px-8 py-6 text-xl font-bold dark:text-white focus:outline-none focus:border-indigo-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 pr-36"
                                    />
                                    <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-8 rounded-full hover:bg-slate-900 dark:hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center group/btn active:scale-95 leading-none font-black text-sm uppercase tracking-widest whitespace-nowrap">
                                        Join <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                                <p className="text-slate-400 dark:text-slate-500 text-lg font-medium tracking-tight">Weekly digests of the best stories and curated insights.</p>
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
