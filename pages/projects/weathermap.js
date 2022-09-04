import dynamic from "next/dynamic";

const MapDisp = ({ mesonet, rainPath }) => {
  const Map = dynamic(() => import("../../components/WeatherMap"), {
    ssr: false,
  });
  return (
    <div
      className="mx-auto"
      style={{
        width: "fit-content",
      }}
    >
      <Map mesonet={mesonet} rainPath={rainPath} />
    </div>
  );
};

export default MapDisp;
