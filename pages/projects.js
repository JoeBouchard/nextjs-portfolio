import { useState } from "react";
import Link from "next/link";

const Projects = () => {
  const [selected, setSelected] = useState();

  const BoxStyle = ({ children, name }) => {
    if (selected && selected !== name) {
      return <></>;
    }

    return (
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          transformOrigin: "0% 0%",
          cursor: "pointer",
          height: "85%",
        }}
        className={`${
          selected === name ? "animate-expand" : "four-line"
        } m-3 p-2 border rounded-lg grow border-zinc-700 dark:border-zinc-300 border-3 `}
        onClick={() => setSelected(selected === name ? undefined : name)}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl my-2">Projects</h2>
      <div className={`${!selected && "grid grid-cols-2 "} mt-10`}>
        <Link href="/projects/weathermap">
          <a
            style={{
              height: "100%",
            }}
          >
            <BoxStyle name="weathermap">
              <h2 className="text-2xl font-bold ">Weathermap</h2>
              <h4 className="p-2">A personal project</h4>
              <div className="text-lg font-bold m-2 rounded">Click to view</div>
            </BoxStyle>
          </a>
        </Link>
        <BoxStyle name="tascs">
          <h2 className="text-2xl font-bold ">
            Tickets And Service Center Systems (TASCS)
          </h2>
          <div>
            <span>
              A system designed to manage service requests for the Oklahoma
              Department of Public Safety.
            </span>
            <h4 className="text-lg text-bold mt-2">Primary functions:</h4>
            <ul>
              <li>
                Receive requests from a Sharepoint form and notify technicians
              </li>
              <li>Allow technicians to view and interact with request data</li>
              <li>
                Allow technicians to contact requestors and set up appointments
              </li>
              <li>
                Alert technicians of upcoming appontments, walk in requests, and
                tasks to work on
              </li>
            </ul>
            <h4 className="text-lg text-bold mt-2">More details:</h4>
            <p>
              Users submit a request using a SharePoint form, which then sends
              the request to a backend MySql database via a Python Flask API. A
              website written in ReactJS uses the Python API to allow
              technicians to claim and work on tickets, schedule appointments,
              and view all data regarding the ticket. Actions taken on the
              ticket, from creation to completion, are emailed to the relevant
              parties. In addition, there is a kiosk running on a Chromebox that
              allows users to register for a walk in appointment or check in for
              a scheduled appointment. Finally, there is a technician kiosk that
              shows the status of all open tickets and upcoming meetings and
              alerts technicians of a new ticket or a check in with flashing
              lights and sound.
            </p>
          </div>
        </BoxStyle>
        <BoxStyle name="magic">
          <h2 className="text-2xl font-bold ">
            Multi Application Geographic Information Center (MAGIC)
          </h2>
          <div>
            <span>
              A system designed to monitor the status of various DPS and ODOT
              owned services across the state.
            </span>
            <h4 className="text-lg text-bold mt-2">Primary functions:</h4>
            <ul>
              <li>
                Display live status of 50+ radio towers across the state on a
                map and send emails when one has an issue
              </li>
              <li>
                Show vital signs (% functionality, fuel levels, hardware status)
                for these towers
              </li>
              <li>
                Show radio network connections between towers, color coded for
                connection type
              </li>
              <li>
                Indicate which radio towers are due for routine maintenance
              </li>
              <li>
                Show real-time position, speed, and heading for civilian and
                trooper vehicles
              </li>
              <li>
                Display live connection status of access control hardware
                statewide
              </li>
              <li>
                Display up-to-date weather and temperature across the state
              </li>
              <li>Show all active wildfires across the state</li>
            </ul>
            <h4 className="text-lg text-bold mt-2">More details:</h4>
            <span>
              Interfaces with the OKWIN and PatrolNet radio networks, our
              AMAG/Symmetry access control database, the IRWIN fire data API,
              the Oklahoma Mesonet, the Rainviewer API, OpenStreetMaps, and our
              in-house MySql server to display up to date conditions on the
              state of the State's assets. Using Leaflet in ReactJS, all data is
              shown on a map of the state, with each data layer being toggleable
              and customizable to show only the relevant information the user
              desires.
            </span>
          </div>
        </BoxStyle>
      </div>
    </div>
  );
};

export default Projects;
