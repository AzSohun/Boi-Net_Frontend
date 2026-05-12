import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Download, Library } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6 pt-32">
            <div className="max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-200 dark:border-slate-800 shadow-2xl text-center relative overflow-hidden"
                >
                    {/* Background Accents */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -translate-y-1/2 pointer-events-none" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                        className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-500/20"
                    >
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </motion.div>

                    <h1 className="text-4xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic mb-4">Acquisition Successful</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12">Transmission highly secured and finalized</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <Link
                            to="/dashboard"
                            className="group p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-indigo-600 transition-all text-left"
                        >
                            <Library className="w-8 h-8 text-indigo-600 mb-4" />
                            <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest mb-1">View Library</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Access your acquired assets</p>
                        </Link>

                        <div className="group p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl opacity-50 cursor-not-allowed text-left">
                            <Download className="w-8 h-8 text-slate-400 mb-4" />
                            <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest mb-1">Download PDF</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Offline access coming soon</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/books')}
                        className="group flex items-center justify-center gap-3 w-full py-6 bg-indigo-600 text-white rounded-4xl font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all hover:scale-[1.01] active:scale-95"
                    >
                        Browse More Subject Data
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    BoiNet Security Protocol v4.2.0 • Transaction Finalized
                </p>
            </div>
        </div>
    );
}
