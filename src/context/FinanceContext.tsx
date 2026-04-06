import React, { createContext, useContext, useMemo, useState } from 'react';
import { groupDataByCategory } from '../utils/helperfunctions';


type Transaction = {
    id: string;
    date: string;
    amount: number;
    category: string;
    type: "income" | "expense";
}

interface FinanceContextType {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    groupedData: { chartData: any[]; total: number };
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    gettransactionById: (id: string) => Transaction | undefined;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const initialTransactions: Transaction[] = [

  { id: "tx-001", date: "2023-01-02", amount: 4800, category: "Salary", type: "income" },
  { id: "tx-002", date: "2023-01-05", amount: 120, category: "Food", type: "expense" },
  { id: "tx-003", date: "2023-01-10", amount: 200, category: "Travel", type: "expense" },

  { id: "tx-004", date: "2023-02-02", amount: 5000, category: "Salary", type: "income" },
  { id: "tx-005", date: "2023-02-06", amount: 90, category: "Food", type: "expense" },
  { id: "tx-006", date: "2023-02-12", amount: 150, category: "Utilities", type: "expense" },

  { id: "tx-007", date: "2023-03-01", amount: 5100, category: "Salary", type: "income" },
  { id: "tx-008", date: "2023-03-07", amount: 60, category: "Food", type: "expense" },
  { id: "tx-009", date: "2023-03-15", amount: 250, category: "Travel", type: "expense" },

  { id: "tx-010", date: "2023-04-01", amount: 4900, category: "Salary", type: "income" },
  { id: "tx-011", date: "2023-04-08", amount: 140, category: "Food", type: "expense" },
  { id: "tx-012", date: "2023-04-20", amount: 180, category: "Utilities", type: "expense" },

  { id: "tx-013", date: "2023-05-01", amount: 5200, category: "Salary", type: "income" },
  { id: "tx-014", date: "2023-05-09", amount: 110, category: "Food", type: "expense" },
  { id: "tx-015", date: "2023-05-18", amount: 300, category: "Travel", type: "expense" },

  { id: "tx-016", date: "2023-06-01", amount: 5300, category: "Salary", type: "income" },
  { id: "tx-017", date: "2023-06-05", amount: 70, category: "Food", type: "expense" },
  { id: "tx-018", date: "2023-06-14", amount: 200, category: "Utilities", type: "expense" },

  { id: "tx-019", date: "2023-07-01", amount: 5400, category: "Salary", type: "income" },
  { id: "tx-020", date: "2023-07-11", amount: 130, category: "Food", type: "expense" },
  { id: "tx-021", date: "2023-07-19", amount: 220, category: "Travel", type: "expense" },

  { id: "tx-022", date: "2023-08-01", amount: 5000, category: "Salary", type: "income" },
  { id: "tx-023", date: "2023-08-06", amount: 95, category: "Food", type: "expense" },
  { id: "tx-024", date: "2023-08-17", amount: 180, category: "Utilities", type: "expense" },

  { id: "tx-025", date: "2023-09-01", amount: 5100, category: "Salary", type: "income" },
  { id: "tx-026", date: "2023-09-09", amount: 150, category: "Food", type: "expense" },
  { id: "tx-027", date: "2023-09-21", amount: 260, category: "Travel", type: "expense" },

  { id: "tx-028", date: "2023-10-01", amount: 5500, category: "Salary", type: "income" },
  { id: "tx-029", date: "2023-10-05", amount: 85, category: "Food", type: "expense" },
  { id: "tx-030", date: "2023-10-18", amount: 190, category: "Utilities", type: "expense" },

  { id: "tx-031", date: "2023-11-01", amount: 5300, category: "Salary", type: "income" },
  { id: "tx-032", date: "2023-11-10", amount: 140, category: "Food", type: "expense" },
  { id: "tx-033", date: "2023-11-22", amount: 300, category: "Travel", type: "expense" },

  { id: "tx-034", date: "2023-12-01", amount: 6000, category: "Salary", type: "income" },
  { id: "tx-035", date: "2023-12-08", amount: 200, category: "Food", type: "expense" },
  { id: "tx-036", date: "2023-12-20", amount: 400, category: "Misc", type: "expense" },

  { id: "tx-037", date: "2024-01-01", amount: 6100, category: "Salary", type: "income" },
  { id: "tx-038", date: "2024-01-06", amount: 130, category: "Food", type: "expense" },
  { id: "tx-039", date: "2024-01-18", amount: 220, category: "Travel", type: "expense" },

  { id: "tx-040", date: "2024-02-01", amount: 5900, category: "Salary", type: "income" },
  { id: "tx-041", date: "2024-02-09", amount: 100, category: "Food", type: "expense" },
  { id: "tx-042", date: "2024-02-21", amount: 180, category: "Utilities", type: "expense" },

  { id: "tx-043", date: "2024-03-01", amount: 6200, category: "Salary", type: "income" },
  { id: "tx-044", date: "2024-03-07", amount: 150, category: "Food", type: "expense" },
  { id: "tx-045", date: "2024-03-19", amount: 250, category: "Travel", type: "expense" },

  { id: "tx-046", date: "2024-04-01", amount: 6000, category: "Salary", type: "income" },
  { id: "tx-047", date: "2024-04-11", amount: 120, category: "Food", type: "expense" },
  { id: "tx-048", date: "2024-04-23", amount: 210, category: "Utilities", type: "expense" },

  { id: "tx-049", date: "2024-05-01", amount: 6300, category: "Salary", type: "income" },
  { id: "tx-050", date: "2024-05-08", amount: 140, category: "Food", type: "expense" },
  { id: "tx-051", date: "2024-05-20", amount: 300, category: "Travel", type: "expense" },

  { id: "tx-052", date: "2024-06-01", amount: 6400, category: "Salary", type: "income" },
  { id: "tx-053", date: "2024-06-05", amount: 110, category: "Food", type: "expense" },
  { id: "tx-054", date: "2024-06-15", amount: 200, category: "Utilities", type: "expense" },

  { id: "tx-055", date: "2024-07-01", amount: 6500, category: "Salary", type: "income" },
  { id: "tx-056", date: "2024-07-09", amount: 160, category: "Food", type: "expense" },
  { id: "tx-057", date: "2024-07-21", amount: 280, category: "Travel", type: "expense" },

  { id: "tx-058", date: "2024-08-01", amount: 6200, category: "Salary", type: "income" },
  { id: "tx-059", date: "2024-08-06", amount: 130, category: "Food", type: "expense" },
  { id: "tx-060", date: "2024-08-18", amount: 220, category: "Utilities", type: "expense" },

  { id: "tx-061", date: "2024-09-01", amount: 6300, category: "Salary", type: "income" },
  { id: "tx-062", date: "2024-09-10", amount: 170, category: "Food", type: "expense" },
  { id: "tx-063", date: "2024-09-22", amount: 300, category: "Travel", type: "expense" },

  { id: "tx-064", date: "2024-10-01", amount: 6600, category: "Salary", type: "income" },
  { id: "tx-065", date: "2024-10-07", amount: 140, category: "Food", type: "expense" },
  { id: "tx-066", date: "2024-10-19", amount: 250, category: "Utilities", type: "expense" },

  { id: "tx-067", date: "2024-11-01", amount: 6400, category: "Salary", type: "income" },
  { id: "tx-068", date: "2024-11-08", amount: 180, category: "Food", type: "expense" },
  { id: "tx-069", date: "2024-11-20", amount: 320, category: "Travel", type: "expense" },

  { id: "tx-070", date: "2024-12-01", amount: 7000, category: "Salary", type: "income" },
  { id: "tx-071", date: "2024-12-09", amount: 220, category: "Food", type: "expense" },
  { id: "tx-072", date: "2024-12-21", amount: 500, category: "Misc", type: "expense" }
];


export function FinanceProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const { chartData, total} = useMemo(() => {
            const expenseData = transactions.filter(tx => tx.type === "expense");
            const groupedData = groupDataByCategory(expenseData);
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
    }, [transactions]);
    const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
        let income = 0, expenses = 0;
        transactions.forEach(tx => {
            if (tx.type === "income") {
                income += tx.amount;
            } else {
                expenses += Math.abs(tx.amount);
            }
        });
        return { totalBalance: income - expenses, totalIncome: income, totalExpenses: expenses };
    }, [transactions]);

    const gettransactionById = (id: string) => {
        return transactions.find(tx => tx.id === id);
    };

    return (
        <FinanceContext.Provider value={{ transactions, setTransactions, groupedData: { chartData, total }, totalBalance, totalIncome, totalExpenses, gettransactionById }}>
            {children}
        </FinanceContext.Provider>
    );
}


export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
