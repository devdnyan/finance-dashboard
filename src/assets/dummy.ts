type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

const DummyTransactions: Transaction[] = [
  {
    id: "tx-001",
    date: "2024-03-01",
    amount: 5000.00,
    category: "Salary",
    type: "income"
  },
  {
    id: "tx-002",
    date: "2024-03-02",
    amount: 45.50,
    category: "Food",
    type: "expense"
  },
  {
    id: "tx-003",
    date: "2024-03-04",
    amount: 120.00,
    category: "Utilities",
    type: "expense"
  },
  {
    id: "tx-004",
    date: "2024-03-05",
    amount: 300.00,
    category: "Travel",
    type: "expense"
  },
  {
    id: "tx-005",
    date: "2024-03-07",
    amount: 15.75,
    category: "Food",
    type: "expense"
  },
  {
    id: "tx-006",
    date: "2024-03-10",
    amount: 200.00,
    category: "Misc",
    type: "income"
  },
  {
    id: "tx-007",
    date: "2024-03-12",
    amount: 85.00,
    category: "Travel",
    type: "expense"
  },
  {
    id: "tx-008",
    date: "2024-03-15",
    amount: 12.00,
    category: "Food",
    type: "expense"
  },
  {
    id: "tx-009",
    date: "2024-03-18",
    amount: 60.00,
    category: "Utilities",
    type: "expense"
  },
  {
    id: "tx-010",
    date: "2024-03-20",
    amount: 25.00,
    category: "Misc",
    type: "expense"
  }
];

export default DummyTransactions;
export type { Transaction };