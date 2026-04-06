import { createElement } from "react";
import type { Transaction } from "../assets/tmonths";

const amountFormatter =  (row: Transaction) => {
    const isIncome = row.type === "income";
    const formattedAmount = row.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return createElement(
        "span",
        { className: `font-semibold ${isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}` },
        `${isIncome ? "+" : "-"}$${formattedAmount}`
    );
};

const dateBody = (row: Transaction) => 
    createElement(
        "span",
        { className: "font-medium text-slate-700 dark:text-slate-300" },
        new Date(row.date).toLocaleDateString("en-IN", {
            month: "short",
            day: "2-digit",
        })
    );


const textBody = (text: string) => (
        createElement(
            "span",
            { className: "font-medium text-slate-700 capitalize dark:text-slate-300" },
            text
        )
    );

const typeBody = (row: Transaction) => (
    createElement(
        "span",
        {
            className: `inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                row.type === "income"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
            }`
        },
        row.type
    )
);


export { amountFormatter, dateBody, textBody, typeBody };


    // const amountFormatter = (row: Transaction) => {
    //     const isIncome = row.type === "income";
    //     return (
    //         <span className={`font-medium ${isIncome ? "text-emerald-600" : "text-gray-800"}`}>
    //             {isIncome ? "+" : "-"}${row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    //         </span>
    //     );
    // };

    // const dateBody = (row: Transaction) => (
    //     <span className="text-gray-800 font-medium">
    //         {new Date(row.date).toLocaleDateString("en-IN", {
    //             month: "short",
    //             day: "2-digit",
    //         })}
    //     </span>
    // );

    //     const textBody = (text: string) => (
    //     <span className="text-gray-800 font-medium capitalize">{text}</span>
    // );