import { Zap, Globe } from 'lucide-react';

export default function CTA() {
    return (
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
    );
}
