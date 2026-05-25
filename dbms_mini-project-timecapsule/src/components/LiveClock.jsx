import { useEffect, useState } from "react";

function LiveClock() {

  const [time, setTime] = useState(
    new Date()
  );

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="bg-zinc-900/80 border border-zinc-800 px-5 py-3 rounded-2xl text-lg font-bold text-purple-400 backdrop-blur-xl">

      {time.toLocaleTimeString()}

    </div>
  );
}

export default LiveClock;