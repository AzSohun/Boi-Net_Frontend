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
    );
}
