export default function CustomTooltip({ active, payload, name, total }: any){


  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div 
        className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-lg shadow-slate-900/5">
        
        <p
          className="font-semibold"
          style={{ color: data.fill }}
        >
          {data[name]}
        </p>

        <p className="mt-1 text-slate-600">
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