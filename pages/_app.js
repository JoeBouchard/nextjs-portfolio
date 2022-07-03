import "../styles/globals.css";
import { BsMoon as Moon, BsSun as Sun } from "react-icons/bs";
import { TbBrandNextjs as Next } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss as Tailwind, SiVercel as Vercel } from "react-icons/si";
import React, { useEffect, useReducer } from "react";
import Link from "next/link";

const MyApp = ({ Component, pageProps }) => {
  const [dark, toggle] = useReducer((d) => !d, true);

  useEffect(() => {
    localStorage.theme = dark ? "dark" : "light";
    console.log(dark, localStorage.theme);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div
      className={`bg-zinc-100 h-full dark:bg-zinc-900 text-zinc-700 dark:text-slate-300`}
    >
      <header className="mb-5">
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white dark:bg-black items-center w-full justify-between">
          <button
            className="nav-item p-3 text-lg"
            onClick={() => {
              toggle();
              console.log("clicked");
            }}
          >
            {dark ? <Sun className="text-white" /> : <Moon />}
          </button>
          <Link
            class="nav-item p-3 text-lg"
            id="navbarSupportedContentY"
            href="/"
          >
            Home
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />
      <footer>
        <nav className="text-md bg-white dark:bg-black p-1 shadow-md w-full bottom-0 text-center mt-0">
          <h3 className="text-center">
            Built with:{"  "}
            <FaReact className="inline" /> React, <Next className="inline" />{" "}
            NextJS, <Tailwind className="inline" /> Tailwind, and{" "}
            <Vercel className="inline" /> Vercel
          </h3>
          <h3 className="my-1">
            &copy; Joseph Bouchard, {new Date().getFullYear()}
          </h3>
        </nav>
      </footer>
    </div>
  );
};

export default MyApp;
