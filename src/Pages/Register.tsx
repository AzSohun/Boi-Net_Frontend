import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import AuthLayout from '../Components/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/authService';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
        setError("");

        try {
            await registerUser({ name, email, password });
            alert("Register User Successfull"); // Can implement any alert library.
            navigate("/login");
        } catch (error: any) {
            setError(error.response.data || "Register Failed, try Again")
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <AuthLayout
            title="Initialize Identity"
            subtitle="Begin your integration into the global discourse network."
            type="register"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Universal Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                required
                                type="text"
                                placeholder="Julian Barnes"
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
                                placeholder="Create secure key"
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
                        I accept the <span className="text-slate-950 dark:text-white font-black uppercase tracking-wider">Network Protocols</span> and agree to the communal standards of discourse.
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
                            Register Identity
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
}
