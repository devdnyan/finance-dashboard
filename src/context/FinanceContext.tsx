import React, { createContext, useMemo, useState } from 'react';
import { groupDataByCategory } from '../utils/helperfunctions';
import type { Transaction } from '../assets/tmonths';
import DummyTransactions from '../assets/tmonths';

type ChartData = {
    name: string;
    total: number;
    fill: string;
}

interface FinanceContextType {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    groupedData: { chartData: ChartData[]; total: number };
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    gettransactionById: (id: string) => Transaction | undefined;
    topCategory: { name: string; total: number } | null;
}


const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(DummyTransactions);
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

    const [topCategory, setTopCategories] = useState<{ name: string; total: number } | null>(null);
    let data = chartData;
    data.sort((a, b) => b.total - a.total)
    if (data.length > 0) {
        const top = data[0];
        if (!topCategory || top.name !== topCategory.name) {
            setTopCategories({ name: top.name, total: top.total });
        }
    }
    const gettransactionById = (id: string) => {
        return transactions.find(tx => tx.id === id);
    };

    return (
        <FinanceContext.Provider value={{ transactions, setTransactions, groupedData: { chartData, total }, totalBalance, totalIncome, totalExpenses, gettransactionById, topCategory }}>
            {children}
        </FinanceContext.Provider>
    );
}
