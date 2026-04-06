export default function CustomTooltip({ active, payload, name, total }: any){


  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div 
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md text-sm">
        
        <p
          className="font-semibold"
          style={{ color: data.fill }}
        >
          {data[name]}
        </p>

        <p className="mt-1 opacity-80">
          Total:{" "}
          <span className="font-semibold">
            ${data[total].toLocaleString()}
          </span>
        </p>
      </div>
    );
  }

  return null;
};