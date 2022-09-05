import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "parallelowow/parallelowow.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const { route } = useRouter();
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
    return <Component {...pageProps} />;
  }
  return (
    <>
      <script src="https://unpkg.com/css-paint-polyfill"></script>
      <div
        style={{
          height: "100vh",
          width: "100vw",
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
          width: "100vw",
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
          overflow: "scroll",
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
