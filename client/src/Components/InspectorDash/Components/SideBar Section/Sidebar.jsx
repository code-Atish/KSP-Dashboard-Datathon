import React from 'react'
import './sidebar.scss'

//imported images
import logo from '../../Assets/logo.png'

//imported icons
import { IoMdSpeedometer } from "react-icons/io";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { BsTrophyFill } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";
import { PiTrendUp } from "react-icons/pi";
import { GrUserPolice } from "react-icons/gr";
import { IoBag } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import {   NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='sideBar grid'>

        <div className="logoDiv flex">
            <img src={logo} alt="Image Name" />
            <h2>KSP</h2>
        </div>

        <div className="menuDiv">
            <h3 className="divTitle">
                QUICK MENU
            </h3>
            <ul className="menuLists grid">

                <li className="listItem">
                    <NavLink to={'/inspector'} 
                        className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      }    
                    >
                    <IoMdSpeedometer className="icon" /> 
                    <span className="smallText">
                        Dashboard
                    </span>
                    </NavLink>
                </li>

                <li className="listItem">
                    <NavLink to={'inspectors'} 
                    className={({ isActive, isPending }) =>
                    isActive
                      ? "active menuLink flex"
                      : isPending
                      ? ""
                      : "menuLink flex"
                  }    
                    >
                    <GrUserPolice className="icon" /> 
                    <span className="smallText">
                    Officers
                    </span>
                    </NavLink>
                </li>

                <li className="listItem">
                    <NavLink to={'profile'} className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      } >
                    <FaLocationCrosshairs className="icon" /> 
                    <span className="smallText">
                        Location
                    </span>
                    </NavLink>
                </li>

                <li className="listItem">
                    <NavLink to={'details'} className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      } >
                    <AiOutlinePieChart className="icon" /> 
                    <span className="smallText">
                        Charts
                    </span>
                    </NavLink>
                </li>
                
                
                <li className="listItem">
                    <NavLink to={'about'} className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      } >
                    <PiTrendUp  className="icon" /> 
                    <span className="smallText">
                        Alert Levels
                    </span>
                    </NavLink>
                </li>
                <li className="listItem">
                    <NavLink to={'about'} className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      } >
                    <BsTrophyFill className="icon" /> 
                    <span className="smallText">
                        Explore
                    </span>
                    </NavLink>
                </li>


               
            </ul>
        </div>

        <div className="sideBarCard">
            <BsQuestionCircle className="icon" />
            <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>

                <h3>Help Center</h3>
                <p>Having trouble? Contact us</p>
                <button className='btn'>Go to help center</button>
            </div>

        </div>
      
    </div>
  )
}

export default Sidebar
