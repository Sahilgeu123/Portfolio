export interface ProjectCardProps {
  title: string;
  description: string;
  para?: string;
  lang?: string[];
  libraries?: string[];
  link?: string;
}

export const ProjectCard = ({
  title,
  description,
  para = "",
  lang = [],
  libraries = [],
  link = "#",
}: ProjectCardProps) => {
  return (
    <div className="relative rounded-3xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:shadow-xl">
      <h3 className="font-display text-2xl text-neutral-900 mb-1">{title}</h3>
      <p className="font-grotesk text-xs uppercase tracking-wider text-neutral-500">{description}</p>
      {para && <p className="mt-3 text-sm text-neutral-700">{para}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {lang.map((l) => (
          <span key={l} className="rounded-full bg-neutral-100 px-3 py-1 font-grotesk text-xs text-neutral-700">
            {l}
          </span>
        ))}
        {libraries.map((lib) => (
          <span key={lib} className="rounded-full bg-neutral-100 px-3 py-1 font-grotesk text-xs text-neutral-700">
            {lib}
          </span>
        ))}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-neutral-900 px-5 py-2 font-grotesk text-xs uppercase text-white hover:bg-neutral-800"
      >
        View Project
      </a>
    </div>
  );
};

export default ProjectCard;
