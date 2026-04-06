import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer } from 'recharts';
import { XAxis, YAxis, Tooltip } from 'recharts';
import DummyTransactions from '../../../assets/tmonths';
import type { Transaction } from '../../../assets/tmonths';
import CustomTooltip from './ToolTipLabel';

type dataVars = {
    month: string;
    amount: number;
}

const data: dataVars[] = groupByMonth(DummyTransactions);

function groupByMonth(data: Transaction[]) : dataVars[] {
    const grouped: Record<string, number> = {};
    
    data.forEach(tx => {
        const month = tx.date.slice(0,7);

        if(grouped[month] === undefined) {
            grouped[month] = 0;
        }
        grouped[month] += tx.type === 'income' ? tx.amount : -tx.amount;
    })

    return Object.entries(grouped)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a,b) => a.month.localeCompare(b.month));
}

const toShort = (value: number) => {
    if(value === 0 ) return '0';
    return `${Math.floor(value / 1000)}k`;
}

const yTicks = [0, 2000, 4000, 5000, 6000, 7000, 8000];

export default function LChart() {
    return (
        <div className="flex h-[21rem] w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_20px_-16px_rgba(15,23,42,0.55)] sm:h-[22rem] sm:p-5 xl:h-full xl:min-h-0">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-slate-600">Cash Flow Trend</h2>

            <div className="min-h-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    
                    <XAxis 
                        dataKey="month" 
                        axisLine={true} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12 }} 
                        dy={10}
                    />
                    
                    <YAxis 
                        width={50}
                        axisLine={true} 
                        tickLine={false} 
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        tickFormatter={toShort}
                        domain={['dataMin - 500', 'auto']}
                        ticks={yTicks}
                    />

                    <Tooltip 
                        content={<CustomTooltip name="month" total="amount" />}
                    />

                    <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />

                    <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#4f46e5" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}