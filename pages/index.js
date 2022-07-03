import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaPython as Py,
  FaReact,
  FaJs as Js,
  FaLinux as Linux,
  FaTiktok as Tiktok,
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

const Home = () => {
  const [gitInfo, setGitInfo] = useState({});
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
        <h3 className="animate-fadeUp w-full mx-auto text-md text-center my-8">
          <a className="mr-3" href="https://github.com/JoeBouchard">
            <Git className="text-3xl mr-2 inline" />
            @JoeBouchard
          </a>
          <a
            className="mr-3"
            href="https://www.linkedin.com/in/joseph-bouchard-oklahoma/"
          >
            <Ln className="text-3xl mr-2 inline" />
            Joseph Bouchard
          </a>
          <a className="mr-3" href="mailto:joecbouchard@gmail.com">
            <Mail className="text-3xl mr-2 inline" />
            JoeCBouchard@gmail.com
          </a>

          <a className="mr-3" href="https://www.tiktok.com/@litelinguistics">
            <Tiktok className="text-3xl mr-2 inline" />
            @LiteLinguistics
          </a>
        </h3>
        <h3 className="animate-fadeUp text-2xl text-center mb-6 mt-6">
          Fullstack Developer for the Oklahoma Department of Public Safety
        </h3>
        <h3 className="w-48 mx-auto text-3xl text-center my-4 grid grid-cols-4 gap-4">
          <FaReact /> <Js /> <Py /> <Mysql /> <Bs /> <Tailwind />{" "}
          <Linux className="dark:bg-slate-300 text-zinc-900" /> <Nginx />
        </h3>
      </main>
    </div>
  );
};

export default Home;
