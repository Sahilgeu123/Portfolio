
import "./home.css";
import "./global.css"
import { scroller } from "react-scroll";
import useScrollAnimation from "./useScrollAnimation.tsx";

const Home = () => {

  useScrollAnimation();

  const scrollToProjects = () => {
    scroller.scrollTo("project", {
      duration: 900,
      delay: 0.1,
      smooth: "easeInOutQuart",
    });
  };

  const scrollTOContact = () => {
    scroller.scrollTo("contact", {
      duration: 900,
      delay: 0.1,
      smooth: "easeInOutQuart",
    });
  };

  const handleImageClick = () => {
    scroller.scrollTo("about", {
      duration: 900,
      delay: 0.1,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <section
      id="home"
      className="scroll-hidden flex flex-col items-center justify-center text-center  "
    >
      <p className="name text-7xl mb-5 mt-35 font-semibold text-[#ece6f9]">Hi, I'm Sahil Alam</p>

      <p className="p2 text-2xl ani4 font-bold text-[#dacef8]">Web Developer</p>
      <p className="ani4 quote text-2xl mt-10 italic text-[#ece6f9] font-semibold">
        "Building modern, responsive, and user-friendly web applications and exploring the future of AI."
      </p>

      <div className=" flex justify-center gap-10 mt-10">
        <button onClick={scrollToProjects} className="opa">View Projects</button>
        <button onClick={scrollTOContact} className="opa">Contact Me</button>
      </div>

      <div className=" flex flex-row justify-center items-center gap-10 mt-16">
        <a href="https://www.linkedin.com/in/sahil-alam-456816294/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="opa rounded-full w-10"
            src="https://i.pinimg.com/736x/ae/e6/d4/aee6d4bd48fd5449e0fb71ae59297ebc.jpg"
            alt="LinkedIn"
          />
        </a>

        <a
          href="https://github.com/Sahilgeu123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="opa w-9 rounded-full"
            src="https://i.pinimg.com/736x/64/88/0b/64880b9b0fe5b53bbe3f7280d262b33f.jpg"
            alt="GitHub"
          />
        </a>

        <a
          href="https://x.com/alamsahilnope"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="opa w-10 rounded-full"
            src="https://i.pinimg.com/736x/b3/ea/ac/b3eaacd7a29063b62d6c3b242032b7fd.jpg"
            alt="Twitter"
          />
        </a>
      </div>
      <div className="size-8 mt-15 rounded-full ">
        <img
          className="rounded-full opa cursor-pointer hover:shadow-white hover:shadow-xl transition-shadow duration-300"
          src="https://i.pinimg.com/736x/f2/46/62/f24662a4358cb7a18235bc162d27301a.jpg"
          alt="profile"
          onClick={handleImageClick}
        ></img>
      </div>
    </section>
  );
};

export default Home;
