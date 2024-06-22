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
      {/* <iframe
        src="https://app.vectorshift.ai/chatbots/embedded/66759e50b3baa63ecd056ebd?openChatbot=true"
        width="500px"
        height="500px"
        style={{ border: 'none', position: 'fixed', bottom: '0', right: '0', margin: '10px' }}
        allow="clipboard-read; clipboard-write"
      /> */}
    </div>
  )
}

export default InspectorDash
