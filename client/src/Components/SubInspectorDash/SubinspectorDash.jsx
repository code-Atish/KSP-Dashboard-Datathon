import React from 'react'
import Sidebar from '../SubInspectorDash/Components/SideBar Section/Sidebar'
import Body from '../SubInspectorDash/Components/Body Section/Body'
import { Outlet } from 'react-router-dom'
const SubinspectorDash = () => {
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

export default SubinspectorDash
