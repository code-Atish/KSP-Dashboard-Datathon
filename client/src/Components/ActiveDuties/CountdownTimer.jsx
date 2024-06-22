import React, { useState, useEffect } from 'react';

const CountdownTimer = ({deadline}) => {
  // Convert the given time to IST
  const targetUTC = new Date(deadline);
  // const targetIST = new Date(targetUTC.getTime() + (5.5 * 60 * 60 * 1000)); // Convert UTC to IST
  const targetIST = targetUTC;
  const [timeLeft, setTimeLeft] = useState(targetIST - new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetIST - new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [targetIST]);

  const formatTimeLeft = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (<>{formatTimeLeft(timeLeft)}</> );
};

export default CountdownTimer;
