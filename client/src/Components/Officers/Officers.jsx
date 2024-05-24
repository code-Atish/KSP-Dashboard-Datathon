import React, { useEffect, useState } from 'react'
import Inspectors from './Inspectors/inspectors'
import SubInspectors from './subInspectors/SubInspector'
import axios from 'axios';
import {
  useLoaderData,
} from "react-router-dom";
import { useFetchData } from '../FirDetails/Firdetails';

const apiUrl = import.meta.env.VITE_API_URL;
export async function loader() {

  try {
    const response = await axios.post(`${apiUrl}/getofficers`,{}, {
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

export default function Officers() {  
  // const [ASI,setASI]= useState([]);
  // const [Inspectors,setInspectors]= useState([]);
  // console.log('id is : ',officers)
  // officers.forEach(officer => {
  //   officer.rank == "ASI" ? setASI([...ASI,officer]) : 
  //   setInspectors([...Inspectors,officer])
  // });
  //   console.log(Inspectors,ASI)
  // Initialize empty arrays for ASI and PI
const asiArray = [];
const piArray = [];
const hcArray = [];
const { data : officers, isLoading, error } = useFetchData(`${apiUrl}/getofficers`,{},{
  headers:{
    "jwt_token" : localStorage.getItem('token')
  }
  });
  if (isLoading) {
      return <p>Loading data...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    if (!officers) {
      return <p>No data available.</p>;
    }

    if (officers.length==0){
      return <div>No Offier data found.</div>
    }
// Separate entries based on the rank
officers.forEach(item => {
  if (item.rank === 'ASI'|| item.rank === 'PSI') {
    asiArray.push(item);
  } else if (item.rank === 'PI') {
    piArray.push(item);
  }
  else if (item.rank === 'HC') {
    hcArray.push(item);
  }
});

// Log the resulting arrays
// console.log('ASI:', asiArray);
// console.log('PI:', piArray);
  return (
    <div>
      {piArray.length > 0 &&  <Inspectors piArray={piArray} title={'Inspectors'}/>}
      {asiArray.length > 0 && <SubInspectors asiArray={asiArray}/>}
     { hcArray.length > 0 && <Inspectors piArray={hcArray} title={'Head Constables'}/>}
    </div>
  )
}
