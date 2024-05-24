import React from 'react'
import Sidebar from '../InspectorDash/Components/SideBar Section/Sidebar'
import Body from '../InspectorDash/Components/Body Section/Body'
import { Outlet } from 'react-router-dom'
const InspectorDash = () => {
  return (
    <div className='dashboard flex'>
      <div className="dashboardContainer flex">
        <Sidebar/>
        <div className="mainContent">
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}

export default InspectorDash
