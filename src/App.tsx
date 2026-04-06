import Summary from './components/dashboard/Summary';
import NavigationBar from './components/nav/NavigationBar';
import TransactionTable from './components/Transactions/TransactionTable';
import { FinanceProvider } from './context/FinanceContext';


function App() {
    return (
        <FinanceProvider>
            <div className="min-h-screen text-slate-900">
                <NavigationBar />
                <main className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-3 py-4 sm:px-4 lg:px-6 xl:h-[calc(100vh-88px)] xl:flex-row xl:overflow-hidden">
                    <section className="flex-[4] xl:h-full">
                        <Summary />
                    </section>
                    <aside className="flex-[3] h-full">
                        <TransactionTable />
                    </aside>
                </main>
            </div>
        </FinanceProvider>
    );
}

export default App;