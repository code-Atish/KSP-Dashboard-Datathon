import React, { useEffect, useRef, useState } from 'react';
import './sidebar.scss';

// Imported images
import logo from '../../Assets/logo.png';

// Imported icons
import { IoMdSpeedometer } from "react-icons/io";
import { FaLocationCrosshairs, FaWpforms } from "react-icons/fa6";
import { BsTrophyFill } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";
import { PiTrendUp } from "react-icons/pi";
import { GrUserPolice } from "react-icons/gr";
import { IoBag } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    investigation: false,
    lawAndOrder: false,
    stationManagement: false,
    crimeAnalysis: false,
    courtInterface: false,
  });

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const handleToggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || !sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <div className={`sideBar grid ${sidebarOpen ? "open" : ""}`} ref={sidebar}>
      <div className="logoDiv flex">
        <img src={logo} alt="Image Name" />
        <h2>KSP</h2>
        <div className="menu_close_wrapper">
          <button
            className='menu_close_btn'
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(prev => !prev);
            }}
            ref={trigger}
          >
            <BiLeftArrowAlt />
          </button>
        </div>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <div className="menuLink flex" onClick={() => handleToggleDropdown('investigation')}>
              <IoMdSpeedometer className="icon" />
              <span className="smallText">Investigation</span>
            </div>
            {dropdownOpen.investigation && (
              <ul className="dropdownMenu">
                 <li>
                  <NavLink to={'/inspector/home'} className="menuLink flex">
                    <AiOutlinePieChart className="icon" />
                    <span className="smallText">Personalized Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/profile'} className="menuLink flex">
                    <IoMdSpeedometer className="icon" />
                    <span className="smallText">Personal Stats</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/addfir'} className="menuLink flex">
                    <FaLocationCrosshairs className="icon" />
                    <span className="smallText">FIR Register</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/firdetails'} className="menuLink flex">
                    <BsTrophyFill className="icon" />
                    <span className="smallText">FIR Details</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="listItem">
            <div className="menuLink flex" onClick={() => handleToggleDropdown('lawAndOrder')}>
              <FaLocationCrosshairs className="icon" />
              <span className="smallText">Law and Order</span>
            </div>
            {dropdownOpen.lawAndOrder && (
              <ul className="dropdownMenu">
                <li>
                  <NavLink to={'/inspector/beatlogs'} className="menuLink flex">
                    <IoMdSpeedometer className="icon" />
                    <span className="smallText">Beat Execution</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/beatdetails'} className="menuLink flex">
                    <FaLocationCrosshairs className="icon" />
                    <span className="smallText">Beat Details</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/beatdashboard'} className="menuLink flex">
                    <FaLocationCrosshairs className="icon" />
                    <span className="smallText">Beat Analytics</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="listItem">
            <div className="menuLink flex" onClick={() => handleToggleDropdown('stationManagement')}>
              <BsTrophyFill className="icon" />
              <span className="smallText">Station Management</span>
            </div>
            {dropdownOpen.stationManagement && (
              <ul className="dropdownMenu">
                <li>
                  <NavLink to={'/inspector/assigntasks'} className="menuLink flex">
                    <IoMdSpeedometer className="icon" />
                    <span className="smallText">Task Allocation</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/activeduties'} className="menuLink flex">
                    <IoMdSpeedometer className="icon" />
                    <span className="smallText">Active Duties</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/inspector/location'} className="menuLink flex">
                    <FaLocationCrosshairs className="icon" />
                    <span className="smallText">Map</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* <li className="listItem">
            <div className="menuLink flex" onClick={() => handleToggleDropdown('crimeAnalysis')}>
              <MdOutlineExplore className="icon" />
              <span className="smallText">Crime Analysis</span>
            </div>
            {dropdownOpen.crimeAnalysis && (
              <ul className="dropdownMenu">
                <li>
                  <NavLink to={'/inspector/personalized-dashboard'} className="menuLink flex">
                    <AiOutlinePieChart className="icon" />
                    <span className="smallText">Personalized Dashboard</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li> */}
          <li className="listItem">
            <div className="menuLink flex" onClick={() => handleToggleDropdown('courtInterface')}>
              <PiTrendUp className="icon" />
              <span className="smallText">Court Interface</span>
            </div>
            {dropdownOpen.courtInterface && (
              <ul className="dropdownMenu">
                {/* <li>
                  <NavLink to={'/inspector/case-resolvance'} className="menuLink flex">
                    <GrUserPolice className="icon" />
                    <span className="smallText">Case Resolvance</span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to={'/inspector/case-related-dashboards'} className="menuLink flex">
                    <IoBag className="icon" />
                    <span className="smallText">Case Related Dashboards</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* <li className="listItem">
                    <NavLink to={'assigntasks'} className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      } >
                    <FaWpforms className="icon" /> 
                    <span className="smallText">
                        Assign Tasks
                    </span>
                    </NavLink>
            </li>
                <li className="listItem">
                    <NavLink to={'activeduties'} className={({ isActive, isPending }) =>
                        isActive
                          ? "active menuLink flex"
                          : isPending
                          ? "menuLink flex"
                          : "menuLink flex"
                      } >
                    <FaWpforms className="icon" /> 
                    <span className="smallText">
                        Active Duties
                    </span>
                    </NavLink>
                </li> */}

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
  );
};

export default Sidebar;
