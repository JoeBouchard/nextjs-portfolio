import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div
      className={`
      bg-fixed bg-center bg-cover 
      flex flex-col 
      bg-gradient-to-b 
        from-slate-300 to-stone-300
        dark:from-slate-800 dark:to-stone-700
        text-zinc-600 dark:text-slate-200`}
    >
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
