
export default function AuthorsCTA() {
    return (
        <section className="mt-48 py-32 border-t border-slate-100 dark:border-slate-800">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                        Are you the next <br />
                        <span className="text-indigo-600 italic font-serif lowercase">voice</span> of reform?
                    </h2>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md">
                        We're always looking for experimental thinkers and narrative disruptors. Reach out to join our author collective.
                    </p>
                </div>

                <div className="bg-slate-950 dark:bg-white rounded-[3rem] p-12 md:p-20 text-white dark:text-slate-950 space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] relative z-10">Submission Portal</p>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter relative z-10 font-serif italic">Launch your narrative.</h3>
                    <button className="h-20 w-full bg-white dark:bg-slate-950 text-indigo-600 dark:text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all relative z-10 shadow-2xl shadow-black/10">
                        Submit Manuscript
                    </button>
                </div>
            </div>
        </section>
    );
}
