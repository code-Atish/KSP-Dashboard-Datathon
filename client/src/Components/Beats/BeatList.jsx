import React, { useEffect, useState } from "react";
import "../Officers/Inspectors/inspect.css";
// import person from "./Person.png";
// import inspector from "./Inspector.png";
// import Top from './Top Section/Top'
// import Listing from './Listing Section/Listing'
// import Activity from './Activity Section/Activity'
import { Link } from "react-router-dom";
// import { formatString } from "../../utils/utility";
import Loader from "../../ui/Dropdown/Loader";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const BeatList = () => {
    const [beatList, setBeatList] = useState(null);
    const fetchBeatData= async () =>{
        try {
            const response = await axios.post(`${apiUrl}/getbeatlogs`,{},{
                headers: {
                    "jwt_token" : localStorage.getItem('token')
                },
            });
            setBeatList(response.data);
        } catch (error) {
           console.log('error is ',error)
        }
    }
    useEffect(()=>{
            fetchBeatData();
        console.log('beat list : ',beatList)
    },[])
    if(!beatList){
        return <Loader/>
    }
    if(beatList.length==0){
        return <h2 className="text-center">No Beat Logs Found</h2>
    }
  return (
    <>
      <h2 className="inspector-title">Beat Logs</h2>
      <div className="table-wrapper">
        <div className="table-heading-wrapper">
          <div className="beat_list table-heading">
            <div className="table-heading-col-wrapper">
              <h5 className=" text-center table-heading-header-cont">Beat Name</h5>
            </div>
            {/* <div className="text-center table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Visitors</h5>
            </div> */}
            <div className="text-center table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Date</h5>
            </div>
            {/* <div className="hidden text-center table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Sales</h5>
            </div> */}
            <div className="hidden text-center  table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Start Time</h5>
            </div>
            <div className="hidden text-center  table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">End Time</h5>
            </div>
          </div>

          {beatList && beatList.map((beat, key) => (
            <div
              className={`beat_list table-list-content ${
                key === beatList.length - 1 ? "" : "bottom-border"
              }`}
              key={key}
            >

              {/* <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{brand.visitors}K</p>
              </div> */}

              <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{beat.beat_name}</p>
              </div>
              <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{new Date(beat.date).toDateString()}</p>
              </div>
              <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{beat.patrol_start}</p>
              </div>
              <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{beat.patrol_end}</p>
              </div>

              {/* <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{brand.sales}</p>
              </div> */}

              {/* <div className="brand-visitor-revenue">
                <Link to={`officerdetails/${pi.id}`} className="inspector-details">View Details</Link>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BeatList;
