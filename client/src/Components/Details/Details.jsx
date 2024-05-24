import React from "react";
import userSix from "./Inspector.png";
import styles from "./index.module.css";
import ChartOne, { useFetchData } from "./ChartOne";
import { countElements,policeRanks } from "../../utils/utility";
import Loader from "../../ui/Dropdown/Loader";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Details() {
  const { data, isLoading, error } = useFetchData(
    `${apiUrl}/getdata`,
    {},
    {
      headers: {
        jwt_token: localStorage.getItem("token"),
      },
    }
  );
  const { data : officerData, isLoading :  isNameLoading, } = useFetchData(
    `${apiUrl}/getofficerinfo`,
    {},
    {
      headers: {
        jwt_token: localStorage.getItem("token"),
      },
    }
  ); // Replace with your API endpoint
  // console.log(officerData)
  if (isLoading & isNameLoading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }
  const firStageValues = Object.values(countElements(data));
  const totalCases = firStageValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const activeCases = firStageValues[0] + firStageValues[1];
  const closedCases = totalCases - activeCases;
  return (
    <div>
      <div className={styles.profile_wrapper}>
        <div className={styles.profile_img_wrapper}>
          <img src={userSix} className={styles.profile_img} alt="profile" />
          <label htmlFor="profile" className={styles.profile_label}></label>
        </div>
      </div>
      <div>
        <h3 className={styles.profile_name}>{officerData && officerData[0].ioname}</h3>
        <p
          style={{
            fontWeight: "500",
            textAlign: "center",
            color: "rgb(131, 144, 162)",
          }}
        >
          {officerData && policeRanks[officerData[0].rank]}
        </p>
      </div>
      <div className={styles.chart_wrapper}>
        <div className={styles.char_one}>
          <ChartOne data={data} isLoading={isLoading} error={error} />
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.card}>
            <h2>{totalCases}</h2>

            <h3>Total Cases</h3>
          </div>
          <div className={styles.card}>
            <h2>{activeCases ? activeCases :  'No' }</h2>
            <h3>Active Cases</h3>
          </div>
          <div className={styles.card}>
            <h2>{closedCases ? closedCases : 'No'}</h2>
            <h3>Closed Cases</h3>
          </div>
        </div>
      </div>
      {/* <ChartTwo /> */}
    </div>
  );
}
