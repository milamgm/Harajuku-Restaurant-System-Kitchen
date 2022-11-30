import { useEffect, useState } from "react";

const Counter = ({ time }) => {
  const date = new Date();
  const currentTime = date.getTime();
  const [timer, setTimer] = useState(true);
  const [minutesAgo, setMinutesAgo] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let secondsAgo = Math.floor((currentTime - time) / 1000);
      setMinutesAgo(Math.floor(secondsAgo / 60));
      console.log(minutesAgo);
      setTimer((prev) => !prev);
    }, 1000);
  }, [timer]);

  return <div>{minutesAgo > 60 ? "+60" : minutesAgo}</div>;
};

export default Counter;
