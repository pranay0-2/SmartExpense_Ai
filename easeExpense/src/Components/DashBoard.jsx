import { useNavigate } from "react-router-dom";
import style from "./DashBoard.module.css";
import { MdOutlinePsychology } from "react-icons/md";
import { useSelector } from "react-redux";
import TransactionChart from "./TransactionChart";
import { useEffect, useState } from "react";

const DashBoard = () => {
    const [listArr, setListArr] = useState([]);
    const [budget, setBudget] = useState({})
    const navigate = useNavigate();

    const fetchList = async () => {
        const resp = await fetch("http://localhost:3300/expenses");
        console.log(resp)
        const jsonresp = await resp.json();
        console.log(jsonresp)
        setListArr(jsonresp)
    }

    const fetchbudget = async () => {
        const resp = await fetch("http://localhost:3300/budgets");
        const jsonResp = await resp.json();
        console.log(jsonResp);
        setBudget(jsonResp[jsonResp.length - 1]);
    }

    useEffect(() => {

        try {
            fetchList();
            fetchbudget();
        } catch (error) {
            console.log(error)
        }
    }, [])

    console.log("Budget:", budget);
    console.log("Transactions:", listArr);




    return (
        <div className={style["dashboard"]}>
            {/* Top Section */}
            <div className={style["TopSection"]}>
                <div className={style["TopSection_Heading"]}>
                    <span className={style["TopSection_Heading_Text"]}>Financial Dashboard</span>
                    <span className={style["TopSection_Heading_Date"]}>March, 2025</span>
                </div>

                <div className={style["TopSection_btn"]}>
                    <button className={style["btn"]} onClick={() => { navigate("/Addtransaction") }}>Add Transaction</button>
                </div>
            </div>

            {/* Tabs */}
            <div className={style["tabs"]}>
                <div className={style["Innertab"]}>
                    <span className={style["Innertab_header"]}>Current Balance</span>
                    <span className={style["Innertab_value"]}>₹ {budget?.monthlyIncome - budget?.monthlyBudget || 0}</span>
                </div>
                <div className={style["Innertab"]}>
                    <span className={style["Innertab_header"]}>Monthly Income</span>
                    <span className={style["Innertab_value"]}>₹ {budget?.monthlyIncome || 0}</span>
                </div>
                <div className={style["Innertab"]}>
                    <span className={style["Innertab_header"]}>Monthly budget</span>
                    <span className={style["Innertab_value"]}>₹ {budget?.monthlyBudget || 0}</span>
                </div>
            </div>

            {/* AI Insights */}
            <div className={style["insightsDiv"]}>
                <div className={style["insightsInnerDiv1"]}>
                    <div className={style["insightsInnerDiv1_Icon"]}>
                        <MdOutlinePsychology />
                    </div>
                    <div className={style["insightsInnerDiv1_Head"]}>
                        <span className={style["insightsInnerDiv1_Head1"]}> AI Financial Insights</span>
                        <span className={style["insightsInnerDiv1_Head2"]}>Get Personalized AI Insights with your Past Expenses</span>
                    </div>
                </div>
                <div className={style["insightsInnerDiv1_btnDiv"]}>
                    <button>Financial Advice</button>
                    <button onClick={() => { navigate("/budgetAnalyzer") }}>Budget</button>
                </div>
            </div>

            {/* Chart */}
            {listArr?.length > 0 ? <TransactionChart transactions={listArr} /> : <p>No Transactions</p>}
        </div>
    );
}

export default DashBoard;
