import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SideBar from './Components/SideBar.jsx'
import BudgetPage from './Components/BudgetPage.jsx'
import DashBoard from './Components/DashBoard.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Transaction from './Components/Transaction.jsx'
import DispTransaction from './Components/DispTransaction.jsx'
import Advice from './Components/Advice.jsx'
import BudgetAnalyzer from './Components/BudgetAnalyzer.jsx'

const router = createBrowserRouter([
  {
    path: "/", element: [<App />], children: [
      { path: "/", element: [<DashBoard />] },
      { path: "/budget", element: [<BudgetPage />] },
      { path: "/Addtransaction", element: [<Transaction />] },
      { path: "/disptransaction", element: [<DashBoard />, <DispTransaction />] },
      { path: "/aiInsights", element: [<Advice />] },
      { path: "/budgetAnalyzer", element: [<BudgetAnalyzer />] }
    ]
  },



])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
