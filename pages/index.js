import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaPython as Py,
  FaReact,
  FaJs as Js,
  FaLinux as Linux,
} from "react-icons/fa";
import { GoMail as Mail } from "react-icons/go";
import {
  BsFillBootstrapFill as Bs,
  BsLinkedin as Ln,
  BsGithub as Git,
} from "react-icons/bs";
import {
  SiTailwindcss as Tailwind,
  SiNginx as Nginx,
  SiMysql as Mysql,
} from "react-icons/si";
import Badge from "../components/Badge";

const Home = () => {
  const [gitInfo, setGitInfo] = useState({
    avatar_url: "https://avatars.githubusercontent.com/u/32207808?v=4",
  });
  useEffect(() => {
    (async () => {
      const resp = await fetch("https://api.github.com/users/JoeBouchard");
      const data = await resp.json();
      setGitInfo(data);
    })();
  }, []);

  return (
    <div className={`container`}>
      <Head>
        <title>Joe Bouchard's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img
          src={gitInfo.avatar_url}
          alt="Profile picture"
          width="20%"
          className="h-36 w-36 mx-auto rounded-full border border-zinc-700 dark:border-zinc-400 border-4"
        />
        <h1 className="animate-fadeUp text-6xl font-bold text-center my-4">
          Joseph Bouchard
        </h1>
        <h3 className="animate-fadeUp w-full mx-auto text-md text-center my-8 flex flex-wrap items-center">
          <a className="flex-auto" href="https://github.com/JoeBouchard">
            <Badge>
              <Git className="text-3xl mr-2 inline text-black" />
              @JoeBouchard
            </Badge>
          </a>
          <a className="flex-auto" href="mailto:joecbouchard@gmail.com">
            <Badge>
              <Mail className="text-3xl mr-2 inline" />
              JoeCBouchard@gmail.com
            </Badge>
          </a>
          <a
            className="flex-auto"
            href="https://www.linkedin.com/in/joseph-bouchard-oklahoma/"
          >
            <Badge>
              <Ln className="text-3xl mr-2 inline text-blue-900 bg-zinc-100 border border-zinc-100 rounded" />
              Joseph Bouchard
            </Badge>
          </a>
        </h3>
        <h3 className="animate-fadeUp text-2xl text-center mx-6">
          Fullstack Developer for the Oklahoma Department of Public Safety
        </h3>
        <h3 className="text-2xl text-center mt-6">Proficiencies:</h3>
        <h3 className="mx-auto text-3xl mb-4 grid sm:grid-cols-4 grid-cols-2 px-5">
          <Badge>
            <FaReact className="inline" /> React
          </Badge>
          <Badge>
            <Js className="inline" /> Javascript
          </Badge>
          <Badge>
            <Py className="inline" /> Python
          </Badge>
          <Badge>
            <Mysql className="inline" /> MySQL
          </Badge>
          <Badge>
            <Bs className="inline" /> Bootstrap
          </Badge>
          <Badge>
            <Tailwind className="inline" /> Tailwind
          </Badge>
          <Badge>
            <Linux className="dark:bg-slate-300 text-zinc-900 inline" /> Linux
          </Badge>
          <Badge>
            <Nginx className="inline" /> Nginx
          </Badge>
        </h3>
        <div className="grid grid-cols-2 my-10 ">
          <Link href="education">
            <div className="cursor-pointer p-5 border rounded-lg grow border-zinc-700 dark:border-zinc-300 border-3 hover:animate-grow mx-5">
              <h3 className="text-2xl mr-3">Education:</h3> Computer Science
              {" & "}
              Linguistics from OU, 3.9 GPA <p className="mt-2">More...</p>
            </div>
          </Link>
          <Link href="projects">
            <div className="cursor-pointer p-5 border rounded-lg grow border-zinc-700 dark:border-zinc-300  hover:animate-grow border-3 mx-5">
              <h3 className="text-2xl mr-3">Projects:</h3> Click to see my
              projects
            </div>
          </Link>{" "}
        </div>
      </main>
    </div>
  );
};

export default Home;
