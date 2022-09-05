import Link from "next/link";
import { BsThermometerSun as Weather } from "react-icons/bs";
const Webapps = () => {
  return (
    <div
      className="bg-fixed bg-center bg-cover 
      bg-gradient-to-b 
        from-slate-800 to-stone-700 text-stone-300"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 className="mx-auto text-center text-2xl font-bold p-3">
        Bouchard Web Apps
      </h1>
      <Link href="/webapps/weathermap">
        <div
          className="mx-auto text-xl p-5 m-3 border rounded bg-indigo-900"
          style={{ display: "flex", inlineSize: "fit-content" }}
        >
          <span className="px-2" style={{ display: "inline" }}>
            Weather Map
          </span>
          <Weather />
        </div>
      </Link>
      <div className="mx-auto text-xl p-5 text-center">More to come!</div>
    </div>
  );
};

export default Webapps;
