import Card from './Card';
import useCounter from '../hooks/use-counter';
import { useEffect, useState } from 'react';

const BackwardCounter = () => {
  const [c, setC] = useState(true);
  let counter = useCounter(c);

  useEffect(() => {
    const timer = setTimeout(() => {
      setC(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
