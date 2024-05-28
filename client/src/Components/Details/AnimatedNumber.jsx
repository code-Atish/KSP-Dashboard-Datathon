import React, { useState, useEffect } from 'react';

const GetAnimatedNumber = ({ value, duration = 2000 }) => {
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    let start;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newValue = Math.min(value * (progress / duration), value);
      setDisplayedValue(newValue);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return Math.floor(displayedValue)
};

// Usage
const AnimatedNumber = ({value, duration}) => {
  return <GetAnimatedNumber value={value} duration={duration} />
};

export default AnimatedNumber;
