type CardProps = {
    title: string;
    value: string | number;
    children: React.ReactNode;
    className?: string;
}

export default function Card({title, value, children, className}: CardProps) {
    return (
        <>
            <div className={`bg-gray-100 p-4 rounded-lg shadow ${className || ''}`}>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-2xl font-bold">${value.toLocaleString()}</p>
                {children}
            </div>
        
        </>
    );
}