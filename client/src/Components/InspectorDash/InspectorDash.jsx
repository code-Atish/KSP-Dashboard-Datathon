import React, { useState } from 'react'
import Sidebar from '../InspectorDash/Components/SideBar Section/Sidebar'
import Body from '../InspectorDash/Components/Body Section/Body'
import { Outlet } from 'react-router-dom'
import Top from './Components/Body Section/Top Section/Top'
const InspectorDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='dashboard flex'>
      <div className="dashboardContainer flex">
        <Sidebar
         sidebarOpen={sidebarOpen}
         setSidebarOpen={setSidebarOpen}
        />
        {/* <Body/> */}
        <div className='mainContent'>
          <Top
                    setSidebarOpen={setSidebarOpen}
           />  
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}

export default InspectorDash
