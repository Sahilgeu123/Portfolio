import type { ComponentType } from "react";
import ProjectCard from "./ProjectCard.tsx";
import useScrollAnimation from "./useScrollAnimation.tsx";

export type ProjectProps = {
  title: string;
  description: string;
  para: string;
  lang?: string[];
  libraries?: string[];
  link?: string;
};

const ProjectCardComponent = ProjectCard as ComponentType<ProjectProps>;

function Project() {
  useScrollAnimation();

  const projects: ProjectProps[] = [
    {
      title: "Libas - Ecommerce Website",
      description: "A fully functional e-commerce website",
      para: "A responsive e-commerce platform with product listings, secure checkout, user authentication, and an intuitive shopping experience across devices.",
      lang: ["JavaScript"],
      libraries: ["React", "Node.js", "Express", "MongoDB", "REST API"],
      link: "https://libas-ecommerce-website-nine.vercel.app/",
    },
    {
      title: "Apple 3D Website Clone",
      description: "A modern 3D Apple website clone",
      para: "An interactive Apple-inspired experience featuring 3D visuals and responsive animations, built with React, Three.js, React Three Fiber, and GSAP.",
      lang: ["JavaScript"],
      libraries: ["React", "Three.js", "React Three Fiber", "GSAP"],
      link: "https://apple-clone-website-kappa.vercel.app/",

    },
    {
      title: "Eye Clinic Landing Page",
      description: "A modern website for advanced eye care",
      para: "EyeLife Clinic is a clean, responsive website showcasing advanced eye care and surgical services. Built with HTML5 and CSS3, it focuses on simplicity, accessibility, and a professional presentation.",
      lang: ["JavaScript"],
      libraries: ["React", "Tailwind CSS", "TypeScript", "Firebase"],
      link: "https://eye-life-clinic-landing-page.vercel.app/",
    },
  ];

  return (
    <section
      id="project"
      className=" min-h-screen flex justify-center scroll-hidden"
    >
      <div className="w-full ">
        <div className="mt-35">
          <h2 className="text-4xl font-bold text-center ml-3 md:ml-2">
            Featured Projects
          </h2>
          <div className="w-50 h-1 bg-[#3f3457] rounded-full mx-auto mt-4"></div>
          <p className="mt-2 text-center text-2xl text-[#dcd3f1] font-semibold">
            A selection of my recent projects i've built{" "}
          </p>
        </div>
        <div className="mt-1 p-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {projects.map((project, index) => (
            <ProjectCardComponent
              key={index}
              title={project.title}
              description={project.description}
              para={project.para}
              lang={project.lang}
              libraries={project.libraries}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
