import React, { useState } from "react";
import styles from  "./map.module.scss";

import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const SearchLocation = ({setPosition}) => {
    const [location , setLocation]=useState('')

    const getCoordinates = async (location) => {
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: location,
              format: 'json',
              addressdetails: 1,
              limit: 1
            }
          });
    
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setPosition([ lat, lon ]);
          } else {
            console.log('Location not found');
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        //   alert('An error occurred while fetching coordinates');
        }
      };

      const handleSearch = () => {
        if (location.trim()) {
          getCoordinates(location);
        } else {
          alert('Please enter a location');
        }
      };
    
  return (
        <div className={styles.topSection}>
        <div className={styles.headerSection}>
            <div className={styles.searchBar}>
            <input type="text" placeholder="Search Dashboard"  value={location} onChange={(e)=>setLocation(e.target.value)}/>
            <BiSearchAlt className={styles.icon} onClick={handleSearch} />
            </div>
        </div>
        </div>
  );
};

export default SearchLocation;
