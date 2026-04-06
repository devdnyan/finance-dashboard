import { createElement } from "react";
import type { Transaction } from "../assets/tmonths";

const amountFormatter =  (row: Transaction) => {
    const isIncome = row.type === "income";
    const formattedAmount = row.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return createElement(
        "span",
        { className: `font-medium ${isIncome ? "text-emerald-600" : "text-red-500"}` },
        `${isIncome ? "+" : "-"}$${formattedAmount}`
    );
};

const dateBody = (row: Transaction) => 
    createElement(
        "span",
        { className: "text-gray-800 font-medium" },
        new Date(row.date).toLocaleDateString("en-IN", {
            month: "short",
            day: "2-digit",
        })
    );


    const textBody = (text: string) => (
        createElement(
            "span",
            { className: "text-gray-800 font-medium capitalize" },
            text
        )
    );


export { amountFormatter, dateBody, textBody };


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