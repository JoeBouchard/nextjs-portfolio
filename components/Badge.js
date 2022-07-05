const Badge = ({ children }) => (
  <div className="content-center m-2 p-2 rounded dark:bg-slate-200 bg-zinc-700 dark:text-zinc-800 text-slate-300 text-xl text-center font-bold border border-stone-500 border-2 shadow-lg">
    {children}
  </div>
);

export default Badge;
