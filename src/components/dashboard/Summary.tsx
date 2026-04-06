import { useFinance } from "../../context/FinanceContext";
import Card from "./summary/Card";
import LChart from "./summary/LineChart";
import PiChart from "./summary/PiChart";

export default function Summary() {

    const{ totalBalance, totalIncome, totalExpenses, topCategory } = useFinance();
    return (
        <section className="space-y-3 xl:flex xl:h-full xl:flex-col xl:space-y-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-5 xl:flex-shrink-0">
                <div className="mb-3 flex items-end justify-between">
                    <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Summary</h2>
                    <p className="text-xs font-medium text-slate-500">Updated from live transaction data</p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:gap-4">
                    <Card 
                        title="Total Balance" 
                        value={totalBalance} 
                    >
                        <p className="text-xs font-medium text-slate-500">+10% from last month</p>
                    </Card>
                    <Card 
                        className=""
                        title="Total Income" 
                        value={totalIncome} 
                    >
                        <p className="text-xs font-medium text-slate-500">+5% from last month</p>
                    </Card>
                    <Card 
                        title="Total Expenses" 
                        value={totalExpenses} 
                    >
                        <p className="text-xs font-medium text-slate-500">+2% from last month</p>
                    </Card>
                    <Card 
                        title="Top Category" 
                        value={topCategory?.total || 0} 
                    >
                        <p className="text-xs font-medium text-slate-500">{topCategory?.name || "No data available"}</p>
                    </Card>
                </div>
            </div>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-7 md:items-stretch xl:min-h-0 xl:flex-1 xl:gap-4">
                    <div className="md:col-span-4 md:h-full xl:min-h-0"><LChart /></div>
                    <div className="md:col-span-3 md:h-full xl:min-h-0"><PiChart /></div>
                </div>
        </section>
    );
}