import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import DummyTransactions from "../../../assets/tmonths";
import { groupDataByCategory } from "../../../utils/helperfunctions";
import type { GroupedData } from "../../../utils/helperfunctions";
import CustomTooltip from "./ToolTipLabel";
import { useMemo } from "react";

const groupedData: GroupedData[] = groupDataByCategory(DummyTransactions);

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function PiChart() {
    
    const { chartData, total} = useMemo(() => {
        let sum = 0;
        const data = groupedData.map((item, index) => {
            sum += Math.abs(item.total);
            return {
                name: item.category,
                total: Math.abs(item.total),
                fill: COLORS[index % COLORS.length]
            }
        });
        return { chartData: data, total: sum };
    }, [groupedData]);
    console.log(chartData);
    
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
            <h2 className="text-sm font-bold text-gray-700 tracking-wide mb-6">
                Category Breakdown
            </h2>
            
            <div className="flex items-center justify-between h-[300px] w-full">
                
                <div className="flex-[1.5] h-full w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
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
                        <span className="text-[10px] uppercase text-gray-400 font-bold">Total</span>
                        <span className="text-lg font-bold text-gray-800">₹{(total / 1000).toFixed(1)}k</span>
                    </div>
                </div>

                <div className="flex-1 pl-6">
                    <ul className="space-y-4">
                        {chartData.map((entry, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.fill }} />
                                    <span className="text-sm font-semibold text-gray-600">{entry.name}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-400 tabular-nums">
                                    {((entry.total / total) * 100).toFixed(0)}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}