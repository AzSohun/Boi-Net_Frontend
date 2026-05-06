
interface AboutSectionHeaderProps {
    title: string;
    subtitle: string;
    badge?: string;
    className?: string;
    centered?: boolean;
}

export default function AboutSectionHeader({
    title,
    subtitle,
    badge,
    className = "",
    centered = false
}: AboutSectionHeaderProps) {
    return (
        <div className={`space-y-6 max-w-3xl ${centered ? 'text-center mx-auto' : ''} ${className}`}>
            {badge && (
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    {badge}
                </div>
            )}
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                {title}
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">
                {subtitle}
            </p>
        </div>
    );
}
