import React from 'react'
import './top.scss'

import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";


import img from '../../../Assets/admin.png'
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
          <IoIosNotificationsOutline className="icon"/>

          <div className="adminImage">
            <img src={img} alt="Admin Image"/>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Top
