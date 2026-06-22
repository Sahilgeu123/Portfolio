import { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => setShowNav(!showNav);

  return (
    <div
      className={`fixed top-0 left-0 w-full backdrop-blur-2xl z-50 shadow-md transition-colors duration-500 `}
    >
      {/* Top Navbar */}
      <div className=" w-full flex justify-between items-center px-6 py-4 border-b-2">
        <Link
          to="home"
          smooth
          duration={500}
          className="text-3xl font-bold cursor-pointer"
        >
          Portfolio
        </Link>

        {/* Desktop links */}
        <div className="gap-10 text-xl hidden md:flex font-bold">
          <Link to="home" smooth duration={700} className="link cursor-pointer">
            Home
          </Link>
          <Link
            to="about"
            smooth
            duration={700}
            className="link cursor-pointer"
          >
            About
          </Link>
          <Link
            to="skills"
            smooth
            duration={700}
            className="link cursor-pointer"
          >
            Skills
          </Link>
          <Link
            to="project"
            smooth
            duration={700}
            className="link cursor-pointer"
          >
            Project
          </Link>
          <Link
            to="contact"
            smooth
            duration={700}
            className="link cursor-pointer"
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            type="button"
            className="cursor-pointer text-2xl font-bold toggle-btn"
            onClick={toggleNav}
          >
            {showNav ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {showNav && (
        <div
          className={` md:hidden backdrop-blur-md opacity-80 
            top-[80px] border-b-2 w-full text-white font-bold 
            text-xl flex flex-col gap-4 py-6 px-7
            transform transition-transform duration-500 ease-in-out
            ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
  `}
        >
          <Link
            to="home"
            smooth
            duration={700}
            className="link2 cursor-pointer"
            onClick={toggleNav}
          >
            Home
          </Link>
          <Link
            to="about"
            smooth
            duration={700}
            className="link2 cursor-pointer"
            onClick={toggleNav}
          >
            About
          </Link>
          <Link
            to="skills"
            smooth
            duration={700}
            className="link2 cursor-pointer"
            onClick={toggleNav}
          >
            Skills
          </Link>
          <Link
            to="project"
            smooth
            duration={700}
            className="link2 cursor-pointer"
            onClick={toggleNav}
          >
            Project
          </Link>
          <Link
            to="contact"
            smooth
            duration={700}
            className="link2 cursor-pointer"
            onClick={toggleNav}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
