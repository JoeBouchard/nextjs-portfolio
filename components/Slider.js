import {
  AiFillMinusCircle as Minus,
  AiFillPlusCircle as Plus,
} from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Slider = ({ min, max, val, setVal }) => {
  const small = useMediaQuery(768);
  return (
    <>
      <button
        class="text-indigo-900 hover:text-blue-700 bg-white font-bold"
        onClick={() => setVal(Math.max(min, val - 1))}
        disabled={val === min}
        style={{
          borderRadius: "100vh",
        }}
      >
        <IconContext.Provider value={small && { size: "7vw" }}>
          <Minus />
        </IconContext.Provider>
      </button>
      {!small && (
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => setVal(Math.max(min, Math.min(max, e.target.value)))}
          style={{ width: "60%" }}
        />
      )}
      <button
        class="text-indigo-900 hover:text-blue-700 bg-white font-bold"
        onClick={() => setVal(Math.min(val + 1, max))}
        disabled={val === max}
        style={{
          borderRadius: "100vh",
        }}
      >
        <IconContext.Provider value={small && { size: "7vw" }}>
          <Plus />
        </IconContext.Provider>
      </button>
    </>
  );
};

export default Slider;
