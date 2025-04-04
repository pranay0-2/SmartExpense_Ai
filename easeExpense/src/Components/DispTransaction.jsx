import { useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./DispTransaction.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DispTransaction = () => {
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
    const navigate = useNavigate();
    console.log(listArr);

    return (
        <div className={styles["dtCont"]}>

            <div className={styles["dtCont_inn"]}>
                <div className={styles["dtCont_head"]}>Your Transactions
                    <div className={styles["close"]} onClick={() => { navigate("/") }}><IoIosCloseCircleOutline /></div></div>
                <div className={styles["dtCont_listCont"]}>
                    {listArr.map(item => <div className={styles["dtCont_listItem"]}>
                        <div className={styles["dtCont_list_date"]}>
                            <span><b>Category- </b> {item.category}</span>
                            <span><b>Date- </b> {new Date(item.date).toLocaleDateString('en-IN')}</span>
                            <span className={styles["dtCont_list_text"]}> {item.item}</span>
                        </div>
                        <div className={styles["dtCont_list_value"]}>

                            <span className={styles["dtCont_list_amount"]}>₹{item.amount}</span>
                        </div>
                    </div>)}


                </div>
            </div>

        </div>
    );
}

export default DispTransaction;