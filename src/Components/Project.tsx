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
      title: "LinkUp",
      description: "A Social Media Platform",
      para: "LinkUp is a social media platform that connects people from around the world. It allows users to share their thoughts, photos, and videos with friends and followers. With a user-friendly interface and powerful features, LinkUp is the perfect place to stay connected and share your life with others.",
      lang: ["JavaScript"],
      libraries: ["React", "Tailwind CSS", "TypeScript", "Firebase"],
      link:"https://linkup-social-media-app-vmgh.vercel.app/"
    },
    {
      title: "ShopEase",
      description: "A fully functional e-commerce website",
      para: "ShopEase is a fully responsive e‑commerce platform built to deliver a smooth shopping experience, featuring product listings, secure checkout, user authentication, and an intuitive interface. The site integrates modern design with fast performance, ensuring customers can browse, add to cart, and purchase seamlessly across devices.",
      lang: ["JavaScript"],
      libraries: ["React", "Node.js", "Express", "MongoDB","REST API",],
      link:""
    },
    {
      title: "Brain Tumor Detection",
      description: "AI-powered brain tumor detection platform",
      para: "Brain Tumor Detection is an AI-powered medical imaging application that analyzes brain MRI scans using a Convolutional Neural Network (CNN) to detect the presence of tumors. Users can upload MRI images through a simple interface and receive quick, accurate predictions, helping support early diagnosis and improving the efficiency of medical image analysis.",
      lang: ["Python"],
      libraries: ["TensorFlow", "Keras", "OpenCV", "NumPy", "Pandas"],
      link:"https://brain-tumor-detection-theta-flame.vercel.app/"
    },
    {
      title: "Apple 3D Website Clone",
      description: "A modern 3D Apple website clone",
      para: "A modern 3D Apple website clone featuring interactive animations, immersive 3D visuals, and responsive design built with React, Three.js, React Three Fiber, and GSAP.",
      lang: ["JavaScript"],
      libraries: ["React", "Three.js", "React Three Fiber", "GSAP"],
      link:"https://apple-clone-website-kappa.vercel.app/"
    },
    {
      title: "Booked Confirmed Page",
      description: "A Junior level confirmation page",
      para: "A responsive hotel booking confirmation page showcasing reservation details, receipt, host note, and practical info (arrival, WiFi, breakfast). Designed with clean UI, smooth UX, and optional features like print receipt and add to calendar.",
      lang: ["JavaScript"],
      libraries: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      link:"https://booking-confirmation-page.vercel.app/"
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
