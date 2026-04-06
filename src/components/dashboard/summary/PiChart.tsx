import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./ToolTipLabel";
import { useFinance } from "../../../context/FinanceContext";

export default function PiChart() {
    
    const {groupedData} = useFinance();

    return (
        <div className="flex h-[21rem] w-full flex-col rounded-2xl border border-teal-100 bg-gradient-to-b from-white to-teal-50/40 p-4 shadow-[0_8px_20px_-16px_rgba(20,184,166,0.45)] sm:h-[22rem] sm:p-5 xl:h-full xl:min-h-0 dark:border-teal-900/50 dark:from-slate-900 dark:to-teal-950/35">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-teal-700 dark:text-teal-300">
                Category Breakdown
            </h2>
            
            <div className="flex min-h-0 flex-1 items-center justify-between gap-4 w-full">
                
                <div className="relative h-full w-full flex-[1.5]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={groupedData.chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%" 
                                outerRadius="90%"
                                paddingAngle={5} 
                                dataKey="total"
                                stroke="none"      
                            />
                            <Tooltip content={<CustomTooltip name="name" total="total" />} />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-500 dark:text-teal-300">Total</span>
                        <span className="text-lg font-bold text-teal-700 dark:text-teal-200">₹{(groupedData.total / 1000).toFixed(1)}k</span>
                    </div>
                </div>

                <div className="flex-1 pl-1 sm:pl-3">
                    <ul className="space-y-2.5">
                        {groupedData.chartData.map((entry, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.fill }} />
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.name}</span>
                                </div>
                                <span className="text-sm font-bold text-teal-600/80 dark:text-teal-300 tabular-nums">
                                    {((entry.total / groupedData.total) * 100).toFixed(0)}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}