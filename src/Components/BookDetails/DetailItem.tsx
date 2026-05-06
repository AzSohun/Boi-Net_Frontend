interface DetailItemProps {
    icon: any;
    label: string;
    value?: string | number;
}

export default function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
    return (
        <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-indigo-600 shadow-sm border border-slate-50 dark:border-slate-800">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                <p className="font-bold text-slate-900 dark:text-white leading-tight">{value || 'N/A'}</p>
            </div>
        </div>
    );
}
