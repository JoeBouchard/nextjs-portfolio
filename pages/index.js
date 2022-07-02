import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaPython as Py,
  FaReact,
  FaJs as Js,
  FaJenkins as Jenkins,
  FaLinux as Linux,
} from "react-icons/fa";
import { BsFillBootstrapFill as Bs } from "react-icons/bs";
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
        <h3 className="animate-fadeUp text-2xl text-center my-4">
          Fullstack Developer for the Oklahoma Department of Public Safety
        </h3>
        <h3 className="w-96 mx-auto">
          <div className="text-3xl text-center my-4 grid grid-cols-8 gap-4">
            <FaReact /> <Js /> <Py /> <Mysql /> <Bs /> <Tailwind /> <Linux />{" "}
            <Nginx />
          </div>
        </h3>
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <div className="card">
            <h3>Projects &rarr;</h3>{" "}
            <p>
              <Link href="/projects/rims">Learn about Joe's projects!</Link>
            </p>
          </div>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
