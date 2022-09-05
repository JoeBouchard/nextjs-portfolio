const Toggler = ({ val, setVal }) => (
  <div className="grid grid-cols-2">
    <button
      className={`${
        (val === 100 && " bg-indigo-900 text-stone-200") ||
        " bg-stone-300 text-stone-900"
      } rounded mx-1`}
      onClick={() => setVal(100)}
    >
      ON
    </button>
    <button
      className={`${
        (val === 0 && " bg-indigo-900 text-stone-200") ||
        " bg-stone-300 text-stone-900"
      } rounded mx-1`}
      onClick={() => setVal(0)}
    >
      OFF
    </button>
  </div>
);

export default Toggler;
