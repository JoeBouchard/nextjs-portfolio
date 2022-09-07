import Link from "next/link";
import {
  BsThermometerSun as Weather,
  BsPencilSquare as Pen,
} from "react-icons/bs";

const Webapps = () => {
  const webapps = [
    {
      link: "weathermap",
      icon: <Weather />,
      description: "Weather Map",
    },
    {
      link: "text-categorizer",
      icon: <Pen />,
      description: "Text Categorizer",
    },
  ];

  return (
    <div
      className="bg-fixed bg-center bg-cover 
      bg-gradient-to-b 
        from-indigo-900 to-stone-700 text-stone-300"
      style={{
        width: "100vw",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <h1 className="mx-auto text-center text-3xl font-bold p-3 pt-5">
        Bouchard Web Apps
      </h1>
      {webapps.map((w, k) => (
        <Link href={`/webapps/${w.link}`} key={k} id={k}>
          <div
            className="animate-fadeUp text-center mx-auto text-xl font-bold p-5 m-3 border rounded bg-violet-900"
            style={{
              display: "flex",
              inlineSize: "fit-content",
              animationDelay: `${k / 5}s`,
              width: "75vw",
              cursor: "pointer",
            }}
          >
            <div
              className="px-2 text-centered"
              style={{ display: "inline", flexGrow: 1 }}
            >
              {w.description}
            </div>
            {w.icon}
          </div>
        </Link>
      ))}
      <div className="mx-auto text-xl p-5 text-center">More to come!</div>
    </div>
  );
};

export default Webapps;
