import { TbBrandNextjs as Next } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss as Tailwind, SiVercel as Vercel } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="flex flex-grow text-zinc-600 dark:text-gray-400 mt-5 h-fill">
      <nav className="text-md bg-white dark:bg-black p-1 shadow-md w-full bottom-0 text-center mt-0">
        <h3 className="text-center ">
          Built with:{"  "}
          <FaReact className="inline" /> React, <Next className="inline" />{" "}
          NextJS, and <Tailwind className="inline" /> Tailwind
        </h3>
        <h3 className="my-1">
          &copy; Joseph Bouchard, {new Date().getFullYear()}
        </h3>
      </nav>
    </footer>
  );
};

export default Footer;
