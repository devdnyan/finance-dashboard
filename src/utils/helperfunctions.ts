import type { Transaction } from "../assets/dummy";

type GroupedData = {
    category: string;
    total: number;
}

function groupDataByCategory(DummyTransactions: Transaction[]) : GroupedData[] {
    const grouped: Record<string, number> = {};

    DummyTransactions.forEach((tx: Transaction) => {
        if(tx.category === "Salary"){
            return;
        }
        if (!grouped[tx.category]) {
            grouped[tx.category] = 0;
        }
        grouped[tx.category] += tx.type === 'income' ? tx.amount : -tx.amount;
    });

    return Object.entries(grouped).map(([category, total]) => ({
        category,
        total
    }));    
}

export { groupDataByCategory };
export type { GroupedData };