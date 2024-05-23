import React from 'react'
import Sidebar from '../InspectorDash/Components/SideBar Section/Sidebar'
import Body from '../InspectorDash/Components/Body Section/Body'
const InspectorDash = () => {
  return (
    <div className='dashboard flex'>
      <div className="dashboardContainer flex">
        <Sidebar/>
        <Body/>
      </div>
      
    </div>
  )
}

export default InspectorDash
