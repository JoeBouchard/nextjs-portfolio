import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div
      className={`flex flex-col bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-slate-300`}
    >
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
