import { useState } from "react";
import DummyTransactions from "../../assets/tmonths";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { amountFormatter, dateBody, textBody} from "../../utils/tablehelper";


type Transaction = {
    id: string;
    date: string;
    amount: number;
    category: string;
    type: "income" | "expense";
};

export default function TransactionTable() {
    const [globalFilter, setGlobalFilter] = useState<string>('');

    const handleAddTransaction = () => {
        console.log("Open Add Transaction Modal/Form");
    };

    const handleEdit = (rowData: Transaction) => {
        console.log("Editing transaction:", rowData.id);
    };

    const handleDelete = (rowData: Transaction) => {
        console.log("Deleting transaction:", rowData.id);
    };


    const actionBodyTemplate = (rowData: Transaction) => {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleEdit(rowData)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                    title="Edit"
                >
                    <img src="/icons/edit.svg" alt="Edit" className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </button>
                <button
                    onClick={() => handleDelete(rowData)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Delete"
                >
                    <img src="/icons/delete.svg" alt="Delete" className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </button>
            </div>
        );
    };

    const headerElement = (
        <div className="pt-2 pb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900 xl:text-base">Recent Activity</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-64">
                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full xl:w-[10rem] border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <button
                    onClick={handleAddTransaction}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-200 transition-all active:scale-95
                    xl:px-3 xl:py-1 xl:text-base"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    New Transaction
                </button>
            </div>
        </div>
    );

    const emptyStateTemplate = (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No transactions found</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm">
                {globalFilter 
                    ? <>We couldn't find anything matching <span className="font-semibold text-gray-700">"{globalFilter}"</span>. Try adjusting your search term.</>
                    : "There are no recent transactions to display at this time."}
            </p>
        </div>
    );

    return (
        <div className="flex flex-col p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] sticky top-[80px] h-[calc(100vh-100px)] xl:static xl:h-full z-10"> 
            <DataTable
                header={headerElement}
                value={DummyTransactions}
                globalFilter={globalFilter} 
                emptyMessage={emptyStateTemplate}
                scrollable
                scrollHeight="flex" 
                dataKey="id"
                sortField="date"
                sortOrder={-1}
                pt={{
                    root: { className: 'h-full flex flex-col' },
                    header: { className: 'bg-transparent border-none p-0' },
                    wrapper: { className: 'h-full' },
                    table: { className: 'min-w-full text-left border-collapse' },
                    thead: { className: 'bg-gray-50/80 rounded-lg' },
                    headerRow: { className: 'text-gray-600 text-sm' },
                    emptyMessage: { className: 'border-none' },
                    bodyRow: { className: 'border-b border-gray-100 hover:bg-gray-50/50 transition-colors' }
                }}
            >
                <Column field="date" header="Date" sortable body={dateBody} headerClassName="py-3 px-4 font-semibold rounded-l-lg border-none" className="py-4 px-4 border-none" />
                <Column field="amount" header="Amount" sortable body={amountFormatter} headerClassName="py-3 px-4 font-semibold border-none" className="py-4 px-4 border-none" />
                <Column field="category" header="Category" sortable body={(row) => textBody(row.category)} headerClassName="py-3 px-4 font-semibold border-none" className="py-4 px-4 border-none" />
                <Column field="type" header="Type" sortable body={(row) => textBody(row.type)} headerClassName="py-3 px-4 font-semibold rounded-r-lg border-none" className="py-4 px-4 border-none" />
                <Column 
                    header="Actions" 
                    body={actionBodyTemplate} 
                    headerClassName="py-3 px-4 font-semibold rounded-r-lg border-none" 
                    className="py-4 px-4 border-none" 
                    exportable={false} 
                    style={{ minWidth: '100px' }}
                />
            </DataTable>
        </div>
    );
}