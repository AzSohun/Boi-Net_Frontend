export default function Stats() {
    const stats = [
        { label: "Volumes", val: "2.4M+" },
        { label: "Community", val: "850k" },
        { label: "Authors", val: "15k+" },
        { label: "Daily Reads", val: "45k" }
    ];

    return (
        <section className="py-24 border-y border-slate-100 dark:border-slate-900 bg-[#FDFCFB] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-slate-900 dark:text-white">
                {stats.map((s, i) => (
                    <div key={i} className="space-y-2">
                        <div className="text-4xl md:text-6xl font-black tracking-tighter">{s.val}</div>
                        <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
