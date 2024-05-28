import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { countElements, getRandomColor } from "../../../utils/utility";
// import FirStageSelect from './Select';
const options = {
  stroke: {
    width: 1, // Adjust the border width here
    colors: ["white"],
  },
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: getRandomColor(4),
  labels: [""],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 420,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

// Custom hook for data fetching with Axios
export function useFetchData(url, variables,config) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.post(url, variables,config);
        setData(response.data);
        // console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default function ChartOne({data,isLoading,error}) {
  // const [firStageKeys,setFirStageKeys]=useState([])
  // const [firStageValues,setFirStageValues]=useState([]);
  const [sample, setSample] = useState([]);
  // let firStageKeys;
  // let firStageValues;
  const [state, setState] = useState({
    series: [65, 34, 11, 57],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 56],
    }));
  };
  handleReset;
// Replace with your API endpoint

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }
  const firStageKeys = Object.keys(countElements(data));
  const firStageValues = Object.values(countElements(data));
  const firStageCount = firStageValues.length;
  // console.log(countElements(data))
  // console.log(firStageKeys)
  const totalCases= firStageValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const activeCases= firStageValues[0]+firStageValues[1]
  const closedCases =  totalCases- activeCases
  return (
      <div id="chartThree" className="">
        <div className="donut_one_header">
          <h3>Fir Stages</h3>
          {/* <FirStageSelect/> */}
        </div>
        <div className="">
          <ReactApexChart
            options={{
              ...options,
              labels: firStageKeys,
              colors: getRandomColor(firStageCount),
            }}
            series={firStageValues}
            type="donut"
          />
        </div>
      </div>
  );
}
