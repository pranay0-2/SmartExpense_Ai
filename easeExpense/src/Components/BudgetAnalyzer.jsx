import React, { useState } from "react";
import styles from "./BudgetAnalyzer.module.css";

import { GoogleGenerativeAI } from "@google/generative-ai";

const BudgetAnalyzer = () => {
    const [transactions, setTransactions] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState(""); // Input for monthly income
    const [optimizedBudget, setOptimizedBudget] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOptimizedBudget = async () => {
        if (!monthlyIncome) {
            alert("Please enter your monthly income.");
            return;
        }

        setLoading(true);
        const formattedTransactions = JSON.stringify({ transactions, monthlyIncome }, null, 2);

        const genAI = new GoogleGenerativeAI("AIzaSyDnBSxfDexdvh-BxNwx2rvc2Cm7nUsNXDM");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `I have an array of transactions containing item name, category, date, amount, and my total monthly income in Indian Rupees (₹). Please analyze these transactions and create a fully optimized monthly budget.

    **Return only valid JSON without any explanations, markdown, or extra text.** The JSON should follow this format:

    {
      "optimized_budget": {
        "Total Income": 50000,
        "Food & Groceries": 8000,
        "Transportation": 3000,
        "Housing & Utilities": 12000,
        "Entertainment": 5000,
        "Healthcare": 4000,
        "Shopping": 3000,
        "Miscellaneous": 2000,
        "Education & Learning": 2500,
        "Subscriptions & Memberships": 1500,
        "Personal Care & Wellness": 1000,
        "Bills & Loan Payments": 5000,
        "Insurance": 2000,
        "Gifts & Donations": 1000,
        "Travel & Vacations": 3000,
        "Investments & Savings": 10000,
        "Electronics & Gadgets": 2000,
        "Emergency Fund": 5000
      },
      "justification": "This budget ensures stability while allowing for savings and discretionary spending."
    }

    Now analyze these transactions and return the JSON response only:
    ${formattedTransactions}`;

        try {
            const result = await model.generateContent(prompt);
            const responseText = await result.response.text();

            // Extract JSON safely
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("Invalid response format");

            const parsedBudget = JSON.parse(jsonMatch[0]); // Parse extracted JSON
            setOptimizedBudget(parsedBudget);
        } catch (error) {
            console.error("Error fetching optimized budget:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Optimized Budget Planner</h2>

            <label>Enter Monthly Income (₹):</label>
            <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className={styles.input}
            />

            {!loading && (
                <button onClick={fetchOptimizedBudget} className={styles.button}>
                    Get Optimized Budget
                </button>
            )}

            {loading && <p className={styles.loading}>Generating Budget...</p>}

            {optimizedBudget && (
                <div className={styles.budget}>
                    <h3>Optimized Monthly Budget</h3>
                    <ul>
                        {Object.entries(optimizedBudget.optimized_budget).map(([key, value]) => (
                            <li key={key}>{key}: ₹{value.toLocaleString("en-IN")}</li>
                        ))}
                    </ul>
                    <p><strong>Justification:</strong> {optimizedBudget.justification}</p>
                </div>
            )}
        </div>
    );
};

export default BudgetAnalyzer;
