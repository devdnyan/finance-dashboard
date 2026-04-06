type CardProps = {
    title: string;
    value: string | number;
    children: React.ReactNode;
    className?: string;
}

export default function Card({title, value, children, className}: CardProps) {
    return (
        <>
            <div className={`rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-4 shadow-[0_8px_20px_-16px_rgba(15,23,42,0.55)] transition-transform duration-200 hover:-translate-y-0.5 ${className || ''}`}>
                <h3 className="text-sm font-semibold tracking-wide text-slate-600">{title}</h3>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">${Number(value).toLocaleString()}</p>
                {children}
            </div>
        
        </>
    );
}