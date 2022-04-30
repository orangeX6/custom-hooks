import { useState, useEffect } from 'react';

const useCounter = (forwardCount = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        forwardCount ? prevCounter + 1 : prevCounter - 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [forwardCount]);

  return counter;
};

export default useCounter;
