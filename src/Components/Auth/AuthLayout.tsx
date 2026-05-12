import React from 'react';
import { motion } from 'motion/react';
import { Library, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    type: 'login' | 'register';
}

export default function AuthLayout({ children, title, subtitle, type }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-[#02040a] flex flex-col lg:flex-row relative overflow-hidden">
            {/* Back to Home Button */}
            <Link
                to="/"
                className="absolute top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
                <ArrowLeft className="w-3 h-3" />
                Back to Home
            </Link>
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] dark:opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
            </div>

            {/* Hero Visual Side */}
            <div className="hidden lg:flex lg:w-[45%] bg-slate-950 dark:bg-[#05070a] relative overflow-hidden items-center justify-center p-20 border-r border-white/5">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
                        alt="Library"
                        className="w-full h-full object-cover opacity-20 grayscale scale-110 motion-safe:animate-[subtle-zoom_20s_infinite_alternate]"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 via-transparent to-slate-950" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 w-full space-y-16"
                >
                    <div className="space-y-6">
                        <div className="w-16 h-1 bg-indigo-600" />
                        <h2 className="text-8xl font-black text-white tracking-tighter leading-[0.8] uppercase italic font-serif">
                            The <br />
                            World of <br />
                            <span className="text-indigo-500 lowercase not-italic font-sans">Stories.</span>
                        </h2>
                    </div>

                    <p className="text-slate-400 text-sm font-medium tracking-wide max-w-sm leading-relaxed border-l-2 border-indigo-600 pl-6">
                        Discover thousands of books, connect with fellow readers, and build your personal digital library in the most connected literary network.
                    </p>

                    <div className="pt-12 flex items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden ring-4 ring-indigo-500/10">
                                    <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Readers Online Now</span>
                    </div>
                </motion.div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 relative z-10 overflow-y-auto">
                <div className="w-full max-w-lg mx-auto py-12 md:py-0 flex-1 flex flex-col justify-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ rotate: -10, scale: 0.9 }}
                                animate={{ rotate: 0, scale: 1 }}
                                className="w-14 h-14 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30 group"
                            >
                                <Library className="w-7 h-7 group-hover:scale-110 transition-transform" />
                            </motion.div>
                            <div className="space-y-2">
                                <h1 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none">
                                    {title}
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg italic font-serif">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 shadow-2xl shadow-black/5 dark:shadow-none border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12">
                            {children}
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                {type === 'login' ? "Don't have an account?" : "Already a member?"}
                                {' '}
                                <Link
                                    to={type === 'login' ? '/register' : '/login'}
                                    className="text-indigo-600 font-black hover:text-slate-950 dark:hover:text-white transition-colors border-b-2 border-indigo-600 pb-0.5 ml-2"
                                >
                                    {type === 'login' ? "Create Account" : "Sign In"}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Subtle Branding Bottom */}
                <div className="hidden lg:flex items-center justify-between mt-auto pt-12 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-800">
                    <span>BoiNet // Reader Auth</span>
                    <span>Since 2024</span>
                </div>
            </div>
        </div>
    );
}
