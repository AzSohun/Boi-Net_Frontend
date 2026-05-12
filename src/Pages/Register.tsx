import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/authService';
import { useAuth } from '../Context/AuthContext';
import AuthLayout from '../Components/Auth/AuthLayout';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [accessToken, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await registerUser({ name, email, password });
            // Registration successful
            navigate("/login", { state: { message: "Account created successfully. Please login." } });
        } catch (err: any) {
            setError(err.response?.data?.message || err.response?.data || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Join BoiNet"
            subtitle="Create an account to start your personal library."
            type="register"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent border-b-slate-100 dark:border-b-slate-800 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-950 transition-all font-bold text-slate-950 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@boinet.io"
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent border-b-slate-100 dark:border-b-slate-800 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-950 transition-all font-bold text-slate-950 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent border-b-slate-100 dark:border-b-slate-800 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-950 transition-all font-bold text-slate-950 dark:text-white placeholder:text-slate-100 dark:placeholder:text-slate-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-indigo-600"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 ml-1">
                    <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 w-4 h-4 rounded border-slate-200 bg-slate-50 dark:bg-slate-900 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium cursor-pointer">
                        I accept the <span className="text-slate-950 dark:text-white font-black uppercase tracking-wider">Terms of Service</span> and agree to the <span className="text-slate-950 dark:text-white font-black uppercase tracking-wider">Community Guidelines</span>.
                    </label>
                </div>

                <button
                    disabled={isLoading}
                    className="w-full h-16 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-4 group active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-black/10 dark:shadow-white/5"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Create My Account
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
}
