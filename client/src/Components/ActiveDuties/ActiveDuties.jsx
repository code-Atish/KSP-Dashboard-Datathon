import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import "../Officers/Inspectors/inspect.css";
import axios from "axios";
import { useFetchData } from "../FirDetails/Firdetails";
import Loader from "../../ui/Dropdown/Loader";
import { refactorDuties } from "../../utils/utility";
import Duties from "./Duties";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
const progressStyle = {
    padding: "5px 10px",
    borderRadius: "15px",
    color: "hsl(14, 80%, 30%)",
    background: "hsl(43, 83%, 55%)",
  };
const completedStyle = {
    padding: "5px 10px",
    borderRadius: "15px",
    color: "hsl(129,46%,27%)",
    background: "hsl(132,100%,79%)",
  };
  
  
export default function ActiveDuties() {
  const [activeDuties, setActiveDuties] = useState(null);
  const [activeTasks, setActiveTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.post(`${apiUrl}/getactiveduties`,{}, {
        headers: {
          "jwt_token": localStorage.getItem("token"),
        },
      });
      setActiveDuties(res.data);
      const  {activeTasks,pendingTasks,completedTasks} = refactorDuties(res.data);
      setActiveTasks(activeTasks);
      setPendingTasks(pendingTasks);
      setCompletedTasks(completedTasks);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };
  
  const setCompleteDuty= async (task_id)=>{
    console.log({task_id});
    let toastId;
    try {
      toastId = toast.loading('Completing Duty...');
      const res = await axios.post(`${apiUrl}/completeduty`,{task_id});
      if(res.statusText == 'OK'){
        console.log(res)
        toast.remove(toastId);
        toast.success('Duty Completed')
        fetchData();
      }
    } catch (error) {
      console.log(error)
      toast.remove(toastId);
      toast.error('Failed updating duty status!!')
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const { data, isLoading, error } = useFetchData(`${apiUrl}/getactiveduties`,{},{
  //   headers:{
  //     "jwt_token" : localStorage.getItem('token')
  //   }
  //   });
  //   if (isLoading )return <Loader/>;
    
  //     if (error) {
  //       return <p>Error: {error.message}</p>;
  //     }
    
  //     if (!data) {
  //       return <Loader/>;
  //     }
  
  //     if (data.length==0){
  //       return <div>No Duty data found.</div>
  //     }
  //     const {activeTasks,pendingTasks,completedTasks} = refactorDuties(data)
      console.log({activeTasks})
      console.log({pendingTasks})
      console.log({completedTasks})
      if(!activeDuties) {
        return <Loader />
      }
      if(activeDuties.length==0){
        return <div>No Duty data found.</div>
      }
  return (
   <>
    { activeTasks.length > 0 && <Duties title="Active" dutyList={activeTasks} setCompleteDuty={setCompleteDuty} />}
    { pendingTasks.length > 0 && <Duties title="Pending" dutyList={pendingTasks} setCompleteDuty={setCompleteDuty} />}
    {completedTasks && completedTasks.length > 0 && <Duties title="Completed" dutyList={completedTasks} setCompleteDuty={setCompleteDuty}/>}
   </>
  );
}
