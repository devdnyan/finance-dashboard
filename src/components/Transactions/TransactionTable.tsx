import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
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
    const { transactions, setTransactions, gettransactionById } = useFinance();
    const [globalFilter, setGlobalFilter] = useState<string>('');


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        date: "",
        amount: "",
        category: "",
        type: "expense" as Transaction["type"],
    });

    const [formError, setFormError] = useState("");

    const isEditing = editingTransactionId !== null;

    const deriveTransactionType = (category: string): Transaction["type"] => {
        return category.trim().toLowerCase() === "salary" ? "income" : "expense";
    };

    const categorySuggestions = ["Salary", "Food", "Travel", "Utilities", "Misc"];

    const resetModalState = () => {
        setFormData({ date: "", amount: "", category: "", type: "expense" });
        setEditingTransactionId(null);
        setFormError("");
    };

    const openAddModal = () => {
        resetModalState();
        setFormData((prev) => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetModalState();
    };

    const generateTransactionId = () => {
        const datePart = new Date().getTime().toString(36);
        return datePart + Math.random().toString(36);
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => {
            if (field === "category") {
                return {
                    ...prev,
                    category: value,
                    type: deriveTransactionType(value),
                };
            }

            return { ...prev, [field]: value };
        });
        if (formError) {
            setFormError("");
        }
    };


    const handleAddTransaction = () => {
        openAddModal();
    };

    const handleEdit = (rowData: Transaction) => {
        const transaction = gettransactionById(rowData.id);
        if (transaction) {
            setEditingTransactionId(transaction.id);
            setFormData({
                date: transaction.date,
                amount: String(Math.abs(transaction.amount)),
                category: transaction.category,
                type: deriveTransactionType(transaction.category),
            });
            setFormError("");
            setIsModalOpen(true);
        } else {
            console.error("Transaction not found for ID:", rowData.id);
        }
    };

    const handleSubmitTransaction = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedCategory = formData.category.trim();
        const parsedAmount = Number(formData.amount);

        if (!formData.date || !trimmedCategory || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setFormError("Please provide a valid date, category, and a positive amount.");
            return;
        }

        const transactionPayload: Transaction = {
            id: editingTransactionId ?? generateTransactionId(),
            date: formData.date,
            amount: parsedAmount,
            category: trimmedCategory,
            type: deriveTransactionType(trimmedCategory),
        };
        
        setTransactions((prevTransactions) => {
            if (editingTransactionId) {
                return prevTransactions.map((tx) => (tx.id === editingTransactionId ? transactionPayload : tx));
            }

            return [transactionPayload, ...prevTransactions];
        });
        closeModal();
        alert(`Transaction ${editingTransactionId ? "updated" : "added"} successfully!`);
    };

    const handleDelete = (rowData: Transaction) => {
        setTransactions(prevTransactions => prevTransactions.filter(tx => tx.id !== rowData.id));
        alert("Transaction deleted successfully!");
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
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-200 transition-all active:scale-95 xl:px-3 xl:py-1 xl:text-base"
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
        <>
            <div className="z-10 flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_8px_20px_-16px_rgba(15,23,42,0.55)] backdrop-blur-sm">
                <DataTable
                    header={headerElement}
                    value={transactions}
                    globalFilter={globalFilter}
                    emptyMessage={emptyStateTemplate}
                    dataKey="id"
                    sortField="date"
                    sortOrder={-1}
                    pt={{
                        root: { className: 'h-full flex flex-col' },
                        header: { className: 'bg-transparent border-none p-0' },
                        wrapper: { className: 'h-full' },
                        table: { className: 'min-w-full text-left border-collapse' },
                        thead: { className: 'bg-slate-50/90 rounded-lg' },
                        headerRow: { className: 'text-slate-600 text-sm' },
                        emptyMessage: { className: 'border-none' },
                        bodyRow: { className: 'border-b border-slate-100 hover:bg-slate-50/70 transition-colors' }
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

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-slate-950/45 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit Transaction" : "Add New Transaction"}>
                    <div className="h-full w-full sm:w-4/5 lg:w-3/5 xl:w-3/7 rounded-none sm:rounded-l-2xl bg-gradient-to-b from-white to-slate-50 shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white/80">
                            <h3 className="text-lg font-semibold text-slate-900">{isEditing ? "Edit Transaction" : "Add New Transaction"}</h3>
                            <button type="button" onClick={closeModal} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors" aria-label="Close transaction form">
                                X
                            </button>
                        </div>

                        <form onSubmit={handleSubmitTransaction} className="px-6 py-6 space-y-5">
                            <div>
                                <label htmlFor="transaction-date" className="mb-1 block text-sm font-medium text-slate-700">Date</label>
                                <input
                                    id="transaction-date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="transaction-amount" className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
                                <input
                                    id="transaction-amount"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={(e) => handleInputChange("amount", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    placeholder="e.g. 1250"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="transaction-category" className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                                
                                <select 
                                    id="transaction-categories" 
                                    value={formData.category} 
                                    onChange={(e) => handleInputChange("category", e.target.value)} 
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categorySuggestions.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Type (Auto)</label>
                                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <p className="text-sm text-slate-600">Derived from category</p>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${formData.type === "income" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                                        {formData.type === "income" ? "Income (Salary)" : "Expense"}
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">Only "Salary" is treated as income. Every other category is saved as expense.</p>
                            </div>

                            {formError && (
                                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100">{formError}</p>
                            )}

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-1">
                                <button type="button" onClick={closeModal} className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="w-full sm:w-auto rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-300 hover:bg-indigo-700 transition-colors">
                                    {isEditing ? "Save Changes" : "Add Transaction"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}