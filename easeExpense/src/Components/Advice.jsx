import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./Advice.module.css"; // Import the CSS Module

const Advice = () => {
    const [insights, setInsights] = useState(null);
    const [listArr, setListArr] = useState([]);
    // const listArr = useSelector(store => store.transactionSlice)
    useEffect(() => {
        const fetchList = async () => {
            const resp = await fetch("http://localhost:3300/expenses");
            console.log(resp)
            const jsonresp = await resp.json();
            console.log(jsonresp)
            setListArr(jsonresp.reverse())
        }
        try {
            fetchList();
        } catch (error) {
            console.log(error)
        }
    }, [])
    console.log(listArr);

    // const fetchResponse = async () => {
    //     try {
    //         const formattedTransactions = JSON.stringify(transArr, null, 2);
    //         const genAI = new GoogleGenerativeAI("AIzaSyDnBSxfDexdvh-BxNwx2rvc2Cm7nUsNXDM");
    //         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    //         const prompt = `I have an array of transactions containing item name, category, date, and amount. Please analyze these transactions and provide insights in a structured JSON format.

    //   Insights should include:
    //   1. **Spending Trends**: An overview of how spending changed over time.
    //   2. **Category Breakdown**: The total amount spent per category.
    //   3. **High-Value Transactions**: List of transactions where the amount exceeds a significant threshold.
    //   4. **Savings Suggestions**: Recommendations on where spending can be optimized.
    //   5. **Additional Insights**: Any other useful patterns.

    //   **Transactions:**
    //   ${formattedTransactions}

    //   **Return JSON in the following format:**
    //   {
    //     "spending_trends": "...",
    //     "category_breakdown": { "Food": 500, "Electronics": 1200, "Entertainment": 150 },
    //     "high_value_transactions": [ { "item": "Laptop", "category": "Electronics", "date": "2025-03-10", "amount": 1200 } ],
    //     "savings_suggestions": [ "Reduce entertainment expenses by limiting non-essential purchases." ],
    //     "additional_insights": "..."
    //   }

    //   Now, analyze the transactions and return the JSON output in the exact format above.
    //   `;

    //         const result = await model.generateContent(prompt);
    //         const responseText = await result.response.text();
    //         setInsights(JSON.parse(responseText));
    //     } catch (error) {
    //         console.error("Error fetching AI insights:", error);
    //     }
    // };
    const fetchResponse = async () => {
        try {
            const formattedTransactions = JSON.stringify(listArr, null, 2);
            const genAI = new GoogleGenerativeAI("AIzaSyDnBSxfDexdvh-BxNwx2rvc2Cm7nUsNXDM");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `I have an array of transactions containing item name, category, date, and amount. Please analyze these transactions and provide insights in a structured JSON format.
      
          **Return ONLY valid JSON output (no explanations, no markdown, no extra text).** Example format:
          {
            "spending_trends": "...",
            "category_breakdown": { "Food": 500, "Electronics": 1200 },
            "high_value_transactions": [ { "item": "Laptop", "category": "Electronics", "date": "2025-03-10", "amount": 1200 } ],
            "savings_suggestions": [ "Reduce entertainment expenses." ],
            "additional_insights": "..."
          }

          **Please give Detail saving suggestions but word limit is under 250 words**
      
          Now analyze these transactions:
          ${formattedTransactions}
          `;

            const result = await model.generateContent(prompt);
            const responseText = await result.response.text();

            // Extract valid JSON using regex (removes possible markdown formatting)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                setInsights(JSON.parse(jsonMatch[0]));
            } else {
                throw new Error("Invalid JSON format received.");
            }

        } catch (error) {
            console.error("Error fetching AI insights:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Transaction Insights</h2>

            {insights == null && <button onClick={fetchResponse} className={styles.button}>
                Fetch AI Insights
            </button>}



            {insights && (
                <div className={styles.outerDiv}>
                    <div className={styles.content}>
                        {/* Spending Trends */}
                        <div className={styles.section}>
                            <h3>Spending Trends 📈 </h3>
                            <p>{insights.spending_trends}</p>
                        </div>
                        {/* Additional Insights */}
                        <div className={styles.section}>
                            <h3> Additional Insights 🧐</h3>
                            <p>{insights.additional_insights}</p>
                        </div>

                        {/* Category Breakdown */}
                        <div className={styles.section}>
                            <h3> Category Breakdown📊</h3>
                            <ul>
                                {Object.entries(insights.category_breakdown).map(([category, amount]) => (
                                    <li key={category}>
                                        <strong>{category}:</strong> ₹{amount}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* High-Value Transactions */}
                        <div className={styles.section}>
                            <h3> High-Value Transactions 💰</h3>
                            <ul>
                                {insights.high_value_transactions.map((txn, index) => (
                                    <li key={index}>
                                        <strong>{txn.item}</strong> - ₹{txn.amount} ({txn.date})
                                    </li>
                                ))}
                            </ul>
                        </div>



                    </div>
                    {/* Savings Suggestions */}
                    <div className={styles.sectionOut}>
                        <h3> Savings Suggestions💡</h3>
                        <ul>
                            {insights.savings_suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Advice;
