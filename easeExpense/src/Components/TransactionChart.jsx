import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./TransactionChart.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4569", "#A28DFF", "#8D99AE"];

// Shortened labels for better fit
const CATEGORY_LABELS = {
    "Food & Groceries": "Food",
    "Transportation": "Transport",
    "Housing & Utilities": "Housing",
    "Entertainment": "Fun",
    "Healthcare": "Health",
    "Shopping": "Shop",
    "Miscellaneous": "Misc",
    "Education & Learning": "Edu",
    "Subscriptions & Memberships": "Subs",
    "Personal Care & Wellness": "Care",
    "Bills & Loan Payments": "Bills",
    "Insurance": "Ins",
    "Gifts & Donations": "Gifts",
    "Travel & Vacations": "Travel",
    "Investments & Savings": "Invest",
    "Electronics & Gadgets": "Electro"
};

const TransactionChart = ({ transactions }) => {
    console.log(transactions)
    const categoryTotals = transactions.reduce((acc, transaction) => {
        if (!transaction.category || isNaN(transaction.amount)) return acc;
        acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount);
        return acc;
    }, {});
    console.log(categoryTotals)

    const chartData = Object.keys(categoryTotals).map((category, index) => ({
        name: CATEGORY_LABELS[category] || category, // Short labels for chart
        fullName: category, // Full names for tooltip
        value: categoryTotals[category],
        color: COLORS[index % COLORS.length],
    }));

    if (chartData.length === 0) return <p className={styles.noData}>No transactions to display.</p>;

    return (
        <div className={styles.chartContainer}>
            <h2 className={styles.chartTitle}>Expense Analysis</h2>
            <PieChart width={300} height={300}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100} // Small but clear
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`₹${value}`, props.payload.fullName]} />
                <Legend wrapperStyle={{ fontSize: "15px" }} />
            </PieChart>
        </div>
    );
};

export default TransactionChart;
