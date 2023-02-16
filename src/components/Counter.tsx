import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

type CounterProps = {
  time: Timestamp
}
///////////COUNTS THE MINUTES ELAPSED SINCE AN ORDER HAS ARRIVED IN THE KITCHEN
const Counter = ({ time } : CounterProps) => {
  const date = new Date();
  const orderTimeMiliseconds = time.seconds * 1000
  const currentTime = date.getTime();
  const [timer, setTimer] = useState(true);
  const [minutesAgo, setMinutesAgo] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let secondsAgo = Math.floor((currentTime - orderTimeMiliseconds) / 1000);
      setMinutesAgo(Math.floor(secondsAgo / 60));
      setTimer((prev) => !prev);
    }, 1000);
  }, [timer]);

  return <div>{minutesAgo > 60 ? "+60" : minutesAgo}</div>;
};

export default Counter;
