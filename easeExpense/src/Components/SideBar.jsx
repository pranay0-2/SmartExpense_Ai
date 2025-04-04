import styles from "./SideBar.module.css";
import { MdDashboard } from "react-icons/md";
import { IoPieChart } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const handleClick = (dest) => {
        if (dest === "budget") {
            navigate("/budget")
        }
    }
    const listArr = ["Transaction", "Budget", "AI Insight"];
    return (
        <div className={styles["sideBarContainer"]}>

            {/* Name */}
            <div className={styles["name"]}>
                <span>SmartExpense AI</span>
            </div>

            {/* List */}

            <ul className={styles["list"]}>

                <li className={styles["listItem"]} onClick={() => { navigate("/") }}>
                    <MdDashboard />
                    <span>Dashboard</span>
                </li>

                <li className={styles["listItem"]} onClick={() => { handleClick("budget") }}>
                    <IoPieChart />
                    <span>Budget</span>
                </li>

                <li className={styles["listItem"]} onClick={() => { navigate("/disptransaction") }} >
                    <IoReceiptSharp />
                    <span>Transaction</span>
                </li>



                <li className={styles["listItem"]} onClick={() => { navigate("/aiInsights") }}>
                    <GiBrain />
                    <span>AI Insight</span>
                </li>


            </ul>




        </div>
    );
}

export default SideBar;