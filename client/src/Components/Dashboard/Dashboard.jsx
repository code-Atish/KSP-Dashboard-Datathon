import React from 'react'
import Sidebar from '../Dashboard/Components/SideBar Section/Sidebar'
import Body from '../Dashboard/Components/Body Section/Body'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='dashboard flex'>
      <div className="dashboardContainer flex">
        <Sidebar/>
        {/* <Body/> */}
        <div className="mainContent">
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
