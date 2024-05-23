// src/MapComponent.js
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import SearchLocation from "./SearchLocation";

const customIcon = new Icon({
  iconUrl: "client\public\Icons\location-pin.png",
  iconSize: [38, 38],
});
// Fix default icon issue with leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NavigationControl = ({ userLocation, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  // console.log("userlocation ", userLocation);
  // console.log("destination ", destination);
  // const points = [
  //   L.latLng(userLocation[0], userLocation[1]),
  //   L.latLng(destination[0], destination[1]),
  // ];
  useEffect(() => {
    if (destination && userLocation) {
      // Remove previous routes
      if (routingControlRef.current) {
        routingControlRef.current.setWaypoints([]);
      }

      // Add new route
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(destination[0], destination[1]),
        ],
        // routeWhileDragging: false,
        // geocoder: L.Control.Geocoder.nominatim(),
        draggableWaypoints: false,
      }).addTo(map);

      // Store the routing control reference
      routingControlRef.current = routingControl;

      routingControl.on("routesfound", (e) => {
        // console.log(e);
      });
    }
  }, [userLocation, destination, map]);

  return null;
};

const MapComponent = ({
  position,
  setPosition,
  isLocationFound,
  userLocation,
}) => {
  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={isLocationFound ? 13 : 5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={position}>
            <Popup>
              {isLocationFound ? "You are here" : "Central location of India"}
            </Popup>
          </Marker>
        )}
        {userLocation && position && (
          <NavigationControl
            userLocation={userLocation}
            destination={position}
          />
        )}
      </MapContainer>
    </>
  );
};

export default MapComponent;
