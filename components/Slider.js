import {
  AiFillMinusCircle as Minus,
  AiFillPlusCircle as Plus,
} from "react-icons/ai";

const Slider = ({ min, max, val, setVal }) => (
  <>
    <button
      class="text-blue-500 hover:text-blue-700 bg-white font-bold"
      onClick={() => setVal(Math.max(min, val - 1))}
      disabled={val === min}
      style={{
        borderRadius: "100vh",
      }}
    >
      <Minus />
    </button>
    <input
      type="range"
      min={min}
      max={max}
      value={val}
      onChange={(e) => setVal(Math.max(min, Math.min(max, e.target.value)))}
      class="slider"
    />
    <button
      class="text-blue-500 hover:text-blue-700 bg-white font-bold"
      onClick={() => setVal(Math.min(val + 1, max))}
      disabled={val === max}
      style={{
        borderRadius: "100vh",
      }}
    >
      <Plus />
    </button>
  </>
);

export default Slider;
