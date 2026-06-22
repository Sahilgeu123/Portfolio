import type { ComponentType } from "react";
import ProjectCard from "./ProjectCard.tsx";
import useScrollAnimation from "./useScrollAnimation.tsx";

export type ProjectProps = {
  title: string;
  description: string;
  para: string;
  lang?: string[];
  libraries?: string[];
};

const ProjectCardComponent = ProjectCard as ComponentType<ProjectProps>;

function Project() {
  useScrollAnimation();

  const projects: ProjectProps[] = [
    {
      title: "LinkUp",
      description: "A Social Media Platform",
      para: "LinkUp is a social media platform that connects people from around the world. It allows users to share their thoughts, photos, and videos with friends and followers. With a user-friendly interface and powerful features, LinkUp is the perfect place to stay connected and share your life with others.",
      lang: ["JavaScript"],
      libraries: ["React", "Tailwind CSS"],
    },
    {
      title: "ShopEase",
      description: "A fully functional e-commerce website",
      para:"ShopEase is a fully responsive e‑commerce platform built to deliver a smooth shopping experience, featuring product listings, secure checkout, user authentication, and an intuitive interface. The site integrates modern design with fast performance, ensuring customers can browse, add to cart, and purchase seamlessly across devices.",
      lang: ["Python"],
      libraries: ["Django", "PostgreSQL"],
    },
    {
      title: "NeuroScan AI",
      description: "A multiple-model platform",
      para: "Our platform is a unified hub for AI‑powered medical image analysis, offering multiple specialized models under one interface. Users can upload scans or images and select from a range of diagnostic tools — such as brain tumor detection, skin cancer classification, and other predictive models — to receive fast, reliable insights.",
      lang: ["Java"],
      libraries: ["Spring Boot", "MySQL"],
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
