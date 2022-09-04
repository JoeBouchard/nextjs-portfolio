import dynamic from "next/dynamic";

const MapDisp = () => {
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
      <Map />
    </div>
  );
};

export default MapDisp;
