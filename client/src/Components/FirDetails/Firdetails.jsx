import React, { useEffect, useState } from "react";
import styles from "./firdetails.module.css";
import inspector from "../Officers/subInspectors/subInspector.png";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import axios from "axios";
import Loader from "../../ui/Dropdown/Loader";
const apiUrl = import.meta.env.VITE_API_URL;
// import Top from './Top Section/Top'
// import Listing from './Listing Section/Listing'
// import Activity from './Activity Section/Activity'
const CancelToken = axios.CancelToken;
let cancel;

export async function loader() {

    try {
      const response = await axios.post(`${apiUrl}/getfirdetails`,{}, {
        headers:{
          "jwt_token" : localStorage.getItem('token')
        }
        });
        // return { response };
        return response.data
    } catch (error) {
     console.log(error)
    }
    return []
  }

const subInspectorData = [
  {
    logo: inspector,
    name: "ABC",
    visitors: 3.5,
    rank: "PSI",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: inspector,
    name: "PQR",
    visitors: 2.2,
    rank: "PSI",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: inspector,
    name: "MNO",
    visitors: 2.1,
    rank: "PSI",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: inspector,
    name: "XYZ",
    visitors: 1.5,
    rank: "PSI",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: inspector,
    name: "STR",
    visitors: 3.5,
    rank: "PSI",
    sales: 390,
    conversion: 4.2,
  },
];


export function useFetchData(url,variables,config) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(url,variables,config);
          setData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
    };
    fetchData();
    }, [url,variables.year]);
  
    return { data, isLoading, error };
  }
const FirTable = () => {
    const [fir,setFir]=useState([])
    const [selectedValue, setSelectedValue] = useState(2016);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // const navigation = useNavigation();
    const { data, isLoading, error } = useFetchData(`${apiUrl}/getfirdetails`,{ limit : 30, year: selectedValue  },{
        headers:{
          "jwt_token" : localStorage.getItem('token')
        }
        });
        // if (isLoading) {
        //     return <p>Loading data...</p>;
        //   }
        
          if (error) {
            return <p>Error: {error.message}</p>;
          }
        
          if (!data) {
            return <Loader/>;
          }
          // console.log(data)
          const colHeader=data.length>0 ? Object.keys(data[0]) : []


  return (
    <>
    <div >
      <h2 className={styles.inspector_title}>Fir Details</h2>
    </div>
    <div className={styles.year_selector}>
        Select Year
        <select value={selectedValue} onChange={handleChange}>
            <option value = "2016">2016</option>
            <option value = "2017">2017</option>
            <option value = "2018">2018</option>
            <option value = "2019">2019</option>
            <option value = "2021">2021</option>
            <option value = "2022">2022</option>
            <option value = "2023">2023</option>
            <option value = "2024">2024</option>
        </select>
    </div>
      <div className={styles.table_wrapper}>
        <div className={styles.table_heading_wrapper}>
          <div className={styles.table_heading}>
            {/* <div className="table_heading_col_wrapper">
              <h5 className="table_heading_header_cont">Name</h5>
            </div> */}
            {/* <div className="text_center table_heading_col_wrapper">
              <h5 className="table_heading_header_cont">Visitors</h5>
            </div> */}
            {(!isLoading ||data.length > 0) && colHeader.map((col,index)=> (<div className={`${styles.text_center} ${styles.table_heading_col_wrapper}`}>
                    <h5 className={styles.table_heading_header_cont}>{col}</h5>
                </div>)
            )}

            {
                data.length==0 && <div style={{
                    textAlign:'center',
                    gridColumn:' 1 / -1',
                    padding:'20px'
                }}>No fir details found</div>
            }
            {/* <div className="hidden text_center table_heading_col_wrapper">
              <h5 className="table_heading_header_cont">Sales</h5>
            </div> */}
            {/* <div className="hidden text_center  table_heading_col_wrapper">
              <h5 className="table_heading_header_cont">Details</h5>
            </div> */}
          </div>

          { data.length>0 && data.map((fir, key) => (
            <div
              className={`${styles.table_list_content} ${
                key === data.length - 1 ? "" : styles.bottom_border
              }`}
              key={key}
            >
              {/* <div className="brand_logo_wrapper">
                <div style={{ flexShrink: "0" }}>
                  <img src={inspector} alt="Brand" />
                </div>
                <p className="brand_name">{asi.ioname}</p>
              </div> */}

              <div className={styles.brand_visitor_revenue}>
                <p style={{ color: "#000000" }}>{fir.FirNo}</p>
              </div>

              <div className={styles.brand_visitor_revenue}>
                <p style={{ color: "#000000" }}>{fir.UnitName}</p>
              </div>

              <div className={styles.brand_visitor_revenue}>
                <p style={{ color: "#000000" }}>{fir.year}</p>
              </div>

              <div className={styles.brand_visitor_revenue}>
                <p style={{ color: "#000000" }}>{fir.Complaint_Mode}</p>
              </div>

              <div className={styles.brand_visitor_revenue}>
                <p style={{ color: "#000000" }}>{fir.fir_stage}</p>
              </div>

              <div className={styles.brand_visitor_revenue}>
                {/* <button className={styles.inspector_details} >View Details</button> */}
                <Link to={`${fir.FirNo}`} className={styles.inspector_details}>View Details</Link>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default FirTable;
