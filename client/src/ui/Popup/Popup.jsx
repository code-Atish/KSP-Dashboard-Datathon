import React, { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from "./popup.module.css";
export default function Popup() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef(null);

  const dropdown = useRef(null);

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

  return (
    <div className={styles.notif_wrapper}
    ref={trigger}
    onClick={() => {
      setNotifying(false);
      setDropdownOpen(!dropdownOpen);
    }}>
      <div className={styles.notif_btn}>
        <IoIosNotificationsOutline className="icon" />
      </div>
      <ul className={`${styles.notif_cont} ${ dropdownOpen === true ? styles.open : ''}`}
       ref={dropdown}
       onFocus={() => setDropdownOpen(true)}
       onBlur={() => setDropdownOpen(false)}>
          <li className={styles.notif_list_ele}>
            <div
              className={styles.notif_ele}
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  Edit your information in a swipe
                </span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </div>
          </li>
          <li className={styles.notif_list_ele}>
            <div
              className={styles.notif_ele}
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  It is a long established fact
                </span>{' '}
                that a reader will be distracted by the readable.
              </p>

              <p className="text-xs">24 Feb, 2025</p>
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

              <p className="text-xs">04 Jan, 2025</p>
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

              <p className="text-xs">01 Dec, 2024</p>
            </div>
          </li>
        </ul>
    </div>
  );
}
