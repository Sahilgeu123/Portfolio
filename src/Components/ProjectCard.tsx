import type { ProjectProps } from "./Project.tsx";

const ProjectCard = ({ title, description, para, lang = [], libraries = [] }: ProjectProps) => {
  return (
    <div
      className="relative bg-[#1c142a] p-6 opacity-80 hover:opacity-85 transition-all rounded-xl 
     h-120 border-3 border-[#6b569e] shadow-lg
     hover:shadow-2xl duration-300
     "
    >
      <h3 className="text-3xl text-white font-bold mb-1">{title}</h3>
      <p className="text-[#fbebe8] font-bold text-lg">{description}</p>
      <p className="text-[#e2d5ff] font-semibold mt-2 ">{para}</p>
      <div className="mt-4 flex gap-2 absolute bottom-18">
        <p className=" bg-[#231b37] text-[#dcd3f1] border border-[#dcd3f1] font-bold text-[12px] px-4 py-2 rounded-full shadow-2xl ">{lang[0]}</p>
        <p className=" bg-[#231b37] text-[#dcd3f1] border border-[#dcd3f1] font-bold text-[12px]  px-4 py-2 rounded-full shadow-2xl ">{libraries[0]}</p>
        <p className=" bg-[#231b37] text-[#dcd3f1] border border-[#dcd3f1] font-bold text-[12px]  px-4 py-2 rounded-full shadow-2xl ">{libraries[1]}</p>
      </div>
  
      <a
        href="https://github.com/Sahilgeu123"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="flex items-center mt-4 gap-2 absolute bottom-5
       bg-[#ece6f9] px-3 py-1 rounded-xl
       hover:bg-[#d1c7e0] transition-colors duration-300
       cursor-pointer
       "
        >
          <p className="text-[#322949] font-bold">View in GitHub</p>
          <img
            className="w-4 "
            src="https://img.icons8.com/?size=100&id=o90MnZhnB2CM&format=png&color=000000"
            alt="GitHub"
          />
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
