import Card from "./summary/Card";
import LChart from "./summary/LineChart";
import PiChart from "./summary/PiChart";

export default function Summary() {
    return (
        <>
            <div>
                <h2>Summary</h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    <Card 
                        className="row-span-2"
                        title="Total Balance" 
                        value={10000} 
                    >
                        <p className="text-sm text-gray-500">+10% from last month</p>
                    </Card>
                    <Card 
                        className=""
                        title="Total Income" 
                        value={5000} 
                    >
                        <p className="text-sm text-gray-500">+5% from last month</p>
                    </Card>
                    <Card 
                        title="Total Expenses" 
                        value={3000} 
                    >
                        <p className="text-sm text-gray-500">+2% from last month</p>
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