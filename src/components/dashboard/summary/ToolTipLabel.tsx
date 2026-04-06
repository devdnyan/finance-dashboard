export default function CustomTooltip({ active, payload, name, total }: any){


  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div 
        className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        
        <p
          className="font-semibold"
          style={{ color: data.fill }}
        >
          {data[name]}
        </p>

        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Total:{" "}
          <span className="font-bold">
            ${data[total].toLocaleString()}
          </span>
        </p>
      </div>
    );
  }

  return null;
};