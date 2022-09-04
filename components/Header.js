import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { BsMoon as Moon, BsSun as Sun } from "react-icons/bs";

const Header = () => {
  const [dark, toggle] = useReducer((d) => !d, true);

  useEffect(() => {
    localStorage.theme = dark ? "dark" : "light";
    console.log(dark, localStorage.theme);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header className="mb-5 sticky top-0 z-50">
      <div className="flex shadow-md py-2 bg-white dark:bg-black items-center w-full">
        <button
          className="nav-item p-3 text-lg"
          onClick={() => {
            toggle();
            console.log("clicked");
          }}
        >
          {dark ? <Sun className="text-white" /> : <Moon />}
        </button>
        <div className="p-3 text-lg" id="navbarSupportedContentY">
          <Link href="/">Home</Link>
        </div>
        <div className="p-3 text-lg" id="navbarSupportedContentY">
          <Link
            className="p-3 text-lg"
            id="navbarSupportedContentY"
            href="projects"
          >
            Projects
          </Link>
        </div>
        <div className="nav-item p-3 text-lg" id="navbarSupportedContentY">
          <Link
            className="nav-item p-3 text-lg"
            id="navbarSupportedContentY"
            href="education"
          >
            Education
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
