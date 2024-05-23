import React from 'react'
import Sidebar from '../SubInspectorDash/Components/SideBar Section/Sidebar'
import Body from '../SubInspectorDash/Components/Body Section/Body'
const SubinspectorDash = () => {
  return (
    <div className='dashboard flex'>
      <div className="dashboardContainer flex">
        <Sidebar/>
        <Body/>
      </div>
      
    </div>
  )
}

export default SubinspectorDash
