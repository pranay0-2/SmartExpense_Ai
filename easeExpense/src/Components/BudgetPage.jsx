import { useDispatch, useSelector } from "react-redux";
import { budgetSliceActions } from "../store/budgetSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./BudgetPage.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const BudgetPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const inpRef1 = useRef();
    const inpRef2 = useRef();

    const budget = useSelector(store => store.budgetSlice);

    console.log(budget);
    const handleClick = () => {
        // console.log(inpRef.current.value);
        const val1 = inpRef1.current.value;
        const val2 = inpRef2.current.value
        dispatch(budgetSliceActions.setbudget({ budget: inpRef1.current.value }));

        dispatch(budgetSliceActions.setIncome({ income: inpRef2.current.value }));

        inpRef1.current.value = 0;
        inpRef2.current.value = 0;
        alert("Credentials added!");
        const addcred = async () => {
            const body = {
                monthlyIncome: parseFloat(val2),
                monthlyBudget: parseFloat(val1)
            }
            const resp = await fetch("http://localhost:3300/add-budget", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([body])

            })
        }

        try {
            addcred();
        } catch (error) {
            console.log(error)
        }



    }


    return (
        <div className={styles["budgetDiv"]}>

            <div className={styles["budgetDiv_Entry"]}>
                <div className={styles["dtCont_head"]}>Add Budget
                    <div className={styles["close"]} onClick={() => { navigate("/") }}><IoIosCloseCircleOutline /></div></div>
                <div className={styles["inps"]}>
                    <span>Add Your Budget</span>
                    <input type="number" step={0.01} className={styles["budgetDiv_Entry_inp"]} ref={inpRef1} ></input>
                </div>


                <div className={styles["inps"]}>
                    <span >Add Your Monthly Income</span>
                    <input type="number" step={0.01} className={styles["budgetDiv_Entry_inp"]} ref={inpRef2} ></input>
                </div>
                <button className={styles["budgetDiv_Entry_btn"]} onClick={() => { handleClick() }}> Set Credentials</button>

            </div>


        </div>
    );

}

export default BudgetPage;