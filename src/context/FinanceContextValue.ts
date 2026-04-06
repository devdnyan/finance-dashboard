import { createContext } from "react";
import type { Transaction } from "../assets/tmonths";

type ChartData = {
    name: string;
    total: number;
    fill: string;
};

export interface FinanceContextType {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    groupedData: { chartData: ChartData[]; total: number };
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    gettransactionById: (id: string) => Transaction | undefined;
    topCategory: { name: string; total: number } | null;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);