import React from 'react'
import './top.scss'

import { TbMessageCircle } from "react-icons/tb";
import DropdownMenu from '../../../../../ui/Dropdown/Dropdown';
import Popup from '../../../../../ui/Popup/Popup';
import { IoMdMenu } from "react-icons/io";

import { useLocation } from 'react-router-dom';
const Top = ({ setSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div className="topSection">
      <div className="headerSection">
        <div className="ham_menu_wrapper">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(prev => !prev);
            }}
            className="ham_menu_btn"
          >
            <IoMdMenu />
          </button>
        </div>
        {currentPath.includes("home") && (
          <div className="title">
            <h1>Welcome to KSP Dashboard</h1>
            <p>Be Organised and Efficient</p>
          </div>
        )}

        {/* <div className="searchBar">
          <input type="text" placeholder='Search Dashboard'/>
          <BiSearchAlt className="icon"/>
        </div> */}

        <div className="adminDiv flex">
          <button className="chat_btn">
            <TbMessageCircle className="icon" />
          </button>
          <Popup />

          {/* <div className="adminImage">
            <img src={img} alt="Admin Image"/>

          </div> */}
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
};

export default Top;
