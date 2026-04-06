import { useFinance } from "../../context/FinanceContext";
import Card from "./summary/Card";
import LChart from "./summary/LineChart";
import PiChart from "./summary/PiChart";

export default function Summary() {

    const{ totalBalance, totalIncome, totalExpenses, topCategory } = useFinance();
    return (
        <>
            <div>
                <h2>Summary</h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    <Card 
                        title="Total Balance" 
                        value={totalBalance} 
                    >
                        <p className="text-sm text-gray-500">+10% from last month</p>
                    </Card>
                    <Card 
                        className=""
                        title="Total Income" 
                        value={totalIncome} 
                    >
                        <p className="text-sm text-gray-500">+5% from last month</p>
                    </Card>
                    <Card 
                        title="Total Expenses" 
                        value={totalExpenses} 
                    >
                        <p className="text-sm text-gray-500">+2% from last month</p>
                    </Card>
                    <Card 
                        title="Top Category" 
                        value={topCategory?.total || 0} 
                    >
                        <p className="text-sm text-gray-500">{topCategory?.name || "No data available"}</p>
                    </Card>
                </div>
                <div className="flex flex-col md:grid grid-cols-7 gap-2 mt-4">
                    <div className="md:col-span-4"><LChart /></div>
                    <div className="md:col-span-3"><PiChart /></div>
                </div>
            </div>
        </>
    );
}