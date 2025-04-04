import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './Components/SideBar'
import DashBoard from './Components/DashBoard'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='AppContainer'>
      {/* SideBar */}
      <SideBar />
      {/* Main Content */}
      <Outlet />
    </div>
  )
}

export default App
