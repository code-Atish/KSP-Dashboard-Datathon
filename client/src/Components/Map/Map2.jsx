import React, { useEffect, useState } from "react";
import SearchLocation from "./SearchLocation";
import MapComponent from "./MapComponent";
import axios from "axios";
import { useFetchData } from "../Details/ChartOne";
import { config, getCrimeHotspots } from "../../utils/utility";
import Loader from "../../ui/Dropdown/Loader";
import {
  useLoaderData,
  useNavigation,
} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


// src/geocode.j
// export async function loader() {

//   try {
//     const response = await axios.post(`${apiUrl}/getcrimehotspot`,{}, {
//       headers : {
//         "jwt_token" : localStorage.getItem('token')
//       }
//     });
//       // return { response };
//       return response.data
//   } catch (error) {
//    console.log(error)
//   }
//   return []
// }

const getCoordinates = async (place) => {
  const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: place,
      format: 'json',
      addressdetails: 1,
      limit: 1
    },
  });

  if (response.data.length > 0) {
    const { lat : Latitude, lon : Longitude } = response.data[0];
    return { Latitude, Longitude };
  } else {
    throw new Error('Location not found');
  }
};

export default function Map2() {
  const navigation = useNavigation();
  const [position, setPosition] = useState([28.7041, 77.1025]);
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]); // Default to central India
  const [isLocationFound, setIsLocationFound] = useState(false);
  // const beatData = useLoaderData();
  const [beatData,setBeatData] = useState(null);
  const [hotspots, setHotspots] = useState([]);
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

  useEffect(()=>{
    if(!beatData)
      return;
    console.log(beatData)
    const fetchCoordinates = async (data) => {
      let count = 0;
      const results = [];
      for (const place of Object.values(data)) {
        if (place.Latitude !=0.0 && place.Longitude !=0.0) {
          results.push(place);
          setHotspots(prevData=>{
            return [...prevData,place]
          })
          // continue;
        }else {
        count +=1
        if (count > 5) {
          results.push(null);
          continue;
        }
        // console.log('searched for location while count is:', place.location, count, place.Latitude, place.Longitude);
        try {
          const coords = await getCoordinates(place.location);
          count += 1;
          results.push({ ...place, ...coords });
          setHotspots(prevData=>{
            return [...prevData,{ ...place, ...coords }]
          })
        } catch (error) {
          console.log(`Error fetching coordinates for ${place.name}:`, error);
          count += 1;
          results.push(null);
        }
        // setHotspots(results.filter(result => result !== null));
      }
    
    }
    };
    
    fetchCoordinates(beatData);
    
  },[beatData])

  useEffect(()=>{
    const getPlaces = async () => {
      try {
        const res = await axios.post(`${apiUrl}/getcrimehotspot`,{},{
          headers: {
            "jwt_token" : localStorage.getItem('token')    
          }
        })
        
        setBeatData(getCrimeHotspots(res.data))
      } catch (error) {
        console.log('error while fetching places data : ',error)
      }
    }
    getPlaces()
  },[])
  // const {data, isLoading , error }= useFetchData(`${apiUrl}/getcrimehotspot`,{},{
  //   headers : {
  //     "jwt_token" : localStorage.getItem('token')
  //   }
  // })
  // if (isLoading) {
  //   return <Loader/>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // if (!data) {
  //   return <p>No data available.</p>;
  // }
  // if(data){
  //   setBeatData(data)
  //   // console.log(data)
  // }
  if(navigation.state === "loading")
     return <Loader/>

  return (
    <>
      <SearchLocation setPosition={setPosition} />
      <MapComponent
        position={position}
        setPosition={setPosition}
        isLocationFound={isLocationFound}
        userLocation={userLocation}
        hotspots={hotspots}
      />
    </>
  );
}

// import React, { useEffect, useState } from "react";
// export default function Map2() {
  
//   const [data, setData] = useState(null)
//   useEffect(() => {
//     setTimeout(() => {
//       console.log("timeout function executed ")
//       setData( {
//         "beat 1 ": {
//           beat_name: "beat 1",
//           village_area_name: "panvel",
//           location: "tmkc",
//         },
//       });
//       // console.log(data)
//     }, 10000);
//   }, []);
//   useEffect(() => {
//     if (!data) return;
//     const getdata=  async () => {
//       try {
//         console.log('data is ',data)
//       } catch (error) {
//         console.log("error is : ", error);
//       }
//     };
//     getdata()
//   }, [data]);
//   return <div>HI there buddy</div>;
// }
