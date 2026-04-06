import React, { useMemo, useState } from 'react';
import { groupDataByCategory } from '../utils/helperfunctions';
import type { Transaction } from '../assets/tmonths';
import DummyTransactions from '../assets/tmonths';
import { FinanceContext } from './FinanceContextValue';


const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function FinanceProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(DummyTransactions);
    const { chartData, total } = useMemo(() => {
            const expenseData = transactions.filter(tx => tx.type === "expense");
            const groupedData = groupDataByCategory(expenseData);
            const data = groupedData.map((item, index) => {
                return {
                    name: item.category,
                    total: Math.abs(item.total),
                    fill: COLORS[index % COLORS.length]
                }
            });
            const totalAmount = data.reduce((sum, item) => sum + item.total, 0);
            return { chartData: data, total: totalAmount };
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

    const topCategory = useMemo(() => {
        if (chartData.length === 0) {
            return null;
        }

        const sortedData = [...chartData].sort((a, b) => b.total - a.total);
        return { name: sortedData[0].name, total: sortedData[0].total };
    }, [chartData]);
    const gettransactionById = (id: string) => {
        return transactions.find(tx => tx.id === id);
    };

    return (
        <FinanceContext.Provider value={{ transactions, setTransactions, groupedData: { chartData, total }, totalBalance, totalIncome, totalExpenses, gettransactionById, topCategory }}>
            {children}
        </FinanceContext.Provider>
    );
}
