type CardProps = {
    title: string;
    value: string | number;
    children: React.ReactNode;
    className?: string;
}

export default function Card({title, value, children, className}: CardProps) {
    const paletteByTitle: Record<string, string> = {
        "Total Balance": "border-indigo-200/80 from-indigo-50/70 to-white text-indigo-700",
        "Total Income": "border-emerald-200/80 from-emerald-50/70 to-white text-emerald-700",
        "Total Expenses": "border-rose-200/80 from-rose-50/70 to-white text-rose-700",
        "Top Category": "border-amber-200/80 from-amber-50/70 to-white text-amber-700",
    };
    const accent = paletteByTitle[title] ?? "border-slate-200/80 from-white to-slate-50 text-slate-700";

    return (
        <>
            <div className={`rounded-2xl border bg-gradient-to-br p-4 shadow-[0_8px_20px_-16px_rgba(15,23,42,0.55)] transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800/70 dark:text-slate-100 ${accent} ${className || ''}`}>
                <h3 className="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300">{title}</h3>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">${Number(value).toLocaleString()}</p>
                {children}
            </div>
        
        </>
    );
}