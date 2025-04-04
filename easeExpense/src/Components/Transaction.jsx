import { useEffect, useRef, useState } from "react";
import styles from "./Transaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/transactionSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
    const itemRef = useRef("");
    const amtRef = useRef("");
    const dateRef = useRef("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const expenseCategories = [
        "Food & Groceries",
        "Transportation",
        "Housing & Utilities",
        "Entertainment",
        "Healthcare",
        "Shopping",
        "Miscellaneous",
        "Education & Learning",
        "Subscriptions & Memberships",
        "Personal Care & Wellness",
        "Bills & Loan Payments",
        "Insurance",
        "Gifts & Donations",
        "Travel & Vacations",
        "Investments & Savings",
        "Electronics & Gadgets"
    ];

    const arr = useSelector(store => store.transactionSlice);
    console.log(arr);

    const fetchC = async (item) => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyDnBSxfDexdvh-BxNwx2rvc2Cm7nUsNXDM");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Classify the given item into one of the following expense categories: 
                           1. Food & Groceries  
2. Transportation  
3. Housing & Utilities  
4. Entertainment  
5. Healthcare  
6. Shopping  
7. Miscellaneous  
8. Education & Learning  
9. Subscriptions & Memberships  
10. Personal Care & Wellness  
11. Bills & Loan Payments  
12. Insurance  
13. Gifts & Donations  
14. Travel & Vacations  
15. Investments & Savings  
16. Electronics & Gadgets 

                          item=${item}

                           Return only the category name. (if you are unable to find one add it in Miscellaneous)`;

            const result = await model.generateContent(prompt);
            console.log(result.response.text());
            return result.response.text().trim();
        } catch (error) {
            console.log(error);
            return "Miscellaneous";
        }
    };

    const handleTransaction = async () => {
        setLoading(true);
        const category = await fetchC(itemRef.current.value);
        const transaction = {
            item: itemRef.current.value,
            amount: parseFloat(amtRef.current.value),
            date: dateRef.current.value,
            category: category,
        };
        const body = {
            item: itemRef.current.value,
            price: parseFloat(amtRef.current.value),
            date: dateRef.current.value,
            category: category,

        }

        itemRef.current.value = "";
        amtRef.current.value = "";
        dateRef.current.value = "";

        dispatch(transactionAction.addTransaction({ transaction }));

        console.log(transaction);

        async function sendTransaction() {
            try {
                const response = await fetch("http://localhost:3300/add-expenses", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([transaction])
                });


                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Transaction Success:", data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }

        sendTransaction();
    };

    return (
        <div className={styles["container"]}>


            <div className={styles["form"]}>
                <div className={styles["heading"]}>Add Transaction
                    <div onClick={() => { navigate("/") }}><IoIosCloseCircleOutline /></div> </div>
                <div className={styles["inps"]}>
                    <span>Item</span>
                    <input className={styles["TransactionDiv_Entry_inp"]} ref={itemRef}></input>
                </div>

                <div className={styles["inps"]}>
                    <span>Amount</span>
                    <input type="number" step={0.01} className={styles["TransactionDiv_Entry_inp"]} ref={amtRef}></input>
                </div>

                <div className={styles["inps"]}>
                    <span>Date</span>
                    <input type="date" className={styles["TransactionDiv_Entry_inp"]} ref={dateRef}></input>
                </div>

                <div className={styles["btnDiv"]}>
                    <button onClick={handleTransaction} disabled={loading} className="">
                        {loading ? <span className={styles.loadingText}>Adding...</span> : "Add Transaction"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Transaction;
