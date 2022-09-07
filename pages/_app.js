import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "parallelowow/parallelowow.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { AiTwotoneHome as Home } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const MyApp = ({ Component, pageProps }) => {
  const { route } = useRouter();

  //Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/serviceworker.js").then(
          (registration) => {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          (err) => {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  useEffect(() => {
    let finished = false;
    if (CSS && CSS.paintWorklet && !finished) {
      try {
        console.log("Adding parallelowow", parallelowow);
        CSS.paintWorklet.addModule("/parallelowow.js");
        finished = true;
      } catch {
        console.log("Unable to add parallelowow");
      }
    } else {
      const i = setInterval(() => {
        if (CSS && CSS.paintWorklet && !finished) {
          try {
            console.log("Adding parallelowow", parallelowow);
            CSS.paintWorklet.addModule("/parallelowow.js");
            finished = true;
            clearInterval(i);
          } catch {
            console.log("Unable to add paralellowow");
          }
        }
      }, 500);
    }
  }, []);

  if (route.includes("webapps")) {
    return (
      <div
        className="bg-fixed bg-center bg-cover 
      bg-gradient-to-b 
        from-indigo-900 to-slate-700 text-stone-100"
        style={{
          width: "100vw",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#90cdf4" />
        </Head>
        <Component {...pageProps} />
        {route !== "/webapps" && (
          <Link href="/webapps">
            <a
              style={{
                position: "fixed",
                bottom: "5vh",
                right: "5px",
                zIndex: 10000,
              }}
              className="text-stone-300 bg-indigo-900 p-1 rounded border"
            >
              <IconContext.Provider value={{ size: 28 }}>
                <Home />
              </IconContext.Provider>
            </a>
          </Link>
        )}
      </div>
    );
  }
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap"
          rel="stylesheet"
        />
      </Head>
      <script src="https://unpkg.com/css-paint-polyfill"></script>
      <div
        style={{
          height: "100vh",
          width: "100%",
          zIndex: 1,
          position: "absolute",
          "--parallelowow-tile-width": 56,
          "--parallelowow-base-color": "#777",
          "--parallelowow-color-step": 0.1,
          "--parallelowow-probability": 0.6,
          "--parallelowow-stroke-weight": 1,
          backgroundImage: "paint(parallelowow)",
          top: 0,
          left: 0,
          opacity: 1,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div
        className="bg-fixed bg-center bg-cover 
      bg-gradient-to-b 
        from-slate-300 to-stone-300
        dark:from-slate-800 dark:to-stone-700"
        style={{
          height: "100vh",
          width: "100%",
          zIndex: 2,
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.75,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div
        className={`flex flex-col text-zinc-600 dark:text-slate-200`}
        style={{
          zIndex: 3,
          background: undefined,
          height: "100vh",
          width: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Header />
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
