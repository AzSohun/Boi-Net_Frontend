import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <div className="text-center space-y-8 max-w-sm px-6">
                <div className="w-24 h-24 rounded-4xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 dark:text-slate-700 mx-auto mb-8">
                    <Info className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Archived or Missing</h2>
                <p className="text-slate-500 font-medium leading-relaxed">The literary work you are looking for is not currently in our active catalog.</p>
                <button
                    onClick={() => navigate('/books')}
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/20"
                >
                    Back to Library
                </button>
            </div>
        </div>
    );
}
