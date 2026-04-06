import './App.css'

import Summary from './components/dashboard/Summary';
import NavigationBar from './components/nav/NavigationBar';
import TransactionTable from './components/Transactions/TransactionTable';
import { FinanceProvider } from './context/FinanceContext';


function App() {
    return (
        <FinanceProvider>
            <div className="flex flex-col h-screen bg-gray-50">
                <NavigationBar />
                <div className="flex flex-col xl:flex-row gap-4 p-4 flex-1 xl:overflow-hidden">
                    <div className="flex-[4] overflow-y-auto">
                        <Summary />
                    </div>
                    <div className="flex-[3] h-full">
                        <TransactionTable />
                    </div>
                </div>
            </div>
        </FinanceProvider>
    );
}

export default App;