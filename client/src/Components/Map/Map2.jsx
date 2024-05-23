import React, { useEffect, useState } from "react";
import SearchLocation from "./SearchLocation";
import MapComponent from "./MapComponent";

export default function Map2() {
  const [position, setPosition] = useState([28.7041, 77.1025]);
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]); // Default to central India
  const [isLocationFound, setIsLocationFound] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //   setPosition([latitude, longitude]);
          setUserLocation([latitude, longitude]);
          setIsLocationFound(true);
        },
        (error) => {
          console.error("Error getting user's location: ", error);
          setIsLocationFound(false);
        }
      );
    }
  }, []);
  return (
    <>
      <SearchLocation setPosition={setPosition} />
      <MapComponent
        position={position}
        setPosition={setPosition}
        isLocationFound={isLocationFound}
        userLocation={userLocation}
      />
    </>
  );
}
