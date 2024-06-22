import React, { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from "./popup.module.css";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export default function Popup() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [notifications, setNotifications] = useState([]);  
  const trigger = useRef(null);

  const dropdown = useRef(null);

  const setNotificationRead = async (id) => {
    console.log(id)
    try {
      const res = await axios.put(`${apiUrl}/setnotificationread`,{
        id
      },{
        headers: {
          "jwt_token": localStorage.getItem('token')
        }
      });
      console.log(res.data);
      fetchNotifications();
    } catch (error) {
      console.log('error while fetching : ', error)
    }
  }
  useEffect(() => {
    const clickHandler = ( {target} ) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode} ) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getnotifications`,{
        headers: {
          "jwt_token": localStorage.getItem('token')
        }
      });
      setNotifications(res.data);
    } catch (error) {
      console.log('error while fetching : ', error)
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className={styles.notif_wrapper}
    ref={trigger}
    onClick={() => {
      setNotifying(false);
      setDropdownOpen(!dropdownOpen);
    }}>
      <button className={styles.notif_btn}>
        <IoIosNotificationsOutline/>
      {notifications.length > 0 && <span className={styles.unread_wrapper}>
        <span className={styles.unread_background}></span>
        </span>}
      </button>
      <ul className={`${styles.notif_cont} ${ dropdownOpen === true ? styles.open : ''}`}
       ref={dropdown}
       onFocus={() => setDropdownOpen(true)}
       onBlur={() => setDropdownOpen(false)}>
        <li className={styles.notif_list_ele} style={{color : "rgb(138 153 175)"}}>
          {notifications.length > 0 ? 'Notifications' : 'No notifications'}
          </li>
          {notifications.length > 0 && notifications.map((notification,index) =><li className={styles.notif_list_ele}  key={index} >
            <div
              className={styles.notif_ele}
             
            >
                <span className={styles.notif_title}>
                {notification.title}
                </span>{' '}
              <p className="text-sm">
                 {notification.message}
              </p>

              <div className={styles.notif_date}>
                <span>
                  {(new Date(notification.notification_time)).toDateString()}
                </span>
                <button className="notif_section inspector-details" onClick={() => setNotificationRead(notification.id)}>
                    Mark as Read
                </button>  
              </div>
            </div>
          </li>)}
          {/* <li className={styles.notif_list_ele}>
            <div
              className={styles.notif_ele}
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                Submit incident reports
                </span>{' '}
                 for cases #1234 and #5678 by end of day tomorrow, compile and log evidence, and ensure accurate paperwork submission.
              </p>

              <p className="text-xs">12 May, 2024</p>
            </div>
          </li>
          <li className={styles.notif_list_ele}>
            <div
              className={styles.notif_ele}
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                Attend the neighborhood meeting
                </span>{' '}
                Thursday at 19:00, visit Greenfield Elementary Friday morning, and engage with residents during patrols, documenting interactions.
              </p>

              <p className="text-xs">24 Feb, 2024</p>
            </div>
          </li>
          <li className={styles.notif_list_ele}>
            <div
              className={styles.notif_ele}
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                Patrol Sector 5 from 08:00 to 16:00,
                </span>{' '}
                 monitor activities, ensure safety, and report incidents with a summary.
              </p>

              <p className="text-xs">04 Jan, 2024</p>
            </div>
          </li>
          <li className={styles.notif_list_ele}>
            <div
              className={styles.notif_ele}
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  There are many variations
                </span>{' '}
                of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs">01 May, 2024</p>
            </div>
          </li> */}
        </ul>
    </div>
  );
}
