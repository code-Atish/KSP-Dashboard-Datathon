import React from 'react'
import './top.scss'

import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";


import img from '../../../Assets/admin.png'
import DropdownMenu from '../../../../../ui/Dropdown/Dropdown';
import Popup from '../../../../../ui/Popup/Popup';
const Top = () => {
  return (
    <div className='topSection'>
      <div className="headerSection">
        <div className="title">
          <h1>Welcome to KSP Dashboard</h1>
          <p>Be Organised and Efficient</p>
        </div>

        <div className="searchBar">
          <input type="text" placeholder='Search Dashboard'/>
          <BiSearchAlt className="icon"/>
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className="icon"/>
          <Popup/>

          {/* <div className="adminImage">
            <img src={img} alt="Admin Image"/>

          </div> */}
          <DropdownMenu/>
        </div>
      </div>
      
    </div>
  )
}

export default Top
