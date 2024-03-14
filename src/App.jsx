import { useMemo, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import useThrottle from "./hooks/use-throttle";
import useCustomMemo from "./hooks/use-memo";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(100);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  const hanldeThrottleResize = useThrottle(handleResize, 500);

  useEffect(() => {
    window.addEventListener("resize", hanldeThrottleResize);

    return () => {
      window.removeEventListener("resize", hanldeThrottleResize);
    };
  });

  const squaredValue = () => {
    console.log("Expensive Calculation..");
    return count * count;
  };

  const memoized = useCustomMemo(squaredValue, [count]);

  return (
    <>
      <div>
        WINDOW SIZE : {windowSize.width} * {windowSize.height}
      </div>

      <div>
        Counter : {count} <br></br>
        SqCounter : {memoized}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      <div>
        Counter2 : {count2}
        <button onClick={() => setCount2(count2 - 1)}>Decrement</button>
      </div>
    </>
  );
}

export default App;
