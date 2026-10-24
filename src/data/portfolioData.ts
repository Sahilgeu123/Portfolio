export interface ProjectItem {
  id: string;
  title: string;
  category: "AI Apps" | "E-Commerce" | "3D & Web";
  year: string;
  summary: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
}

export interface SkillCategory {
  number: string;
  title: string;
  subtitle: string;
  skills: string[];
}

export interface JourneyItem {
  period: string;
  role: string;
  organization: string;
  kind: "Education" | "Development" | "AI Research" | "Freelance";
  highlights: string[];
  summary: string;
}

export const portfolioData = {
  profile: {
    name: "Sahil Alam",

    role: "Agentic AI Full Stack Developer",

    shortRole: "AI Full Stack Developer",

    tagline:
      "Building intelligent web experiences with AI and modern development tools.",

    pitch:
      "I build AI-powered web applications using React, Next.js, TypeScript, and Tailwind CSS, integrating LLMs, APIs, and AI agents to create intelligent, user-friendly experiences.",

    detailedBio:
      "Focused on building AI-powered web applications using React, Next.js, TypeScript, and Node.js. Skilled in developing responsive UIs, building scalable APIs, managing databases, and integrating AI agents to automate workflows and solve real-world problems.",

    location: "Dehradun, India",
    university: "Graphic Era Deemed To Be University",
    degree: "Bachelor of Computer Applications",
    email: "alamsahil3d@gmail.com",
    phone: "+91 7452939232",
    experienceYears: "Fresher",
    projectsCount: "3+",
    satisfaction: "100%",
    available: true,
    statusText: "Available for New Projects",
    resumeUrl: "/Resume.pdf",
    photoUrl: "/face2.png",
    socials: [
      {
        label: "GitHub",
        url: "https://github.com/Sahilgeu123",
        handle: "Sahilgeu123",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/sahil-alam-456816294/",
        handle: "sahil-alam",
      },
      {
        label: "Portfolio",
        url: "https://sahil-alam-portfolio.vercel.app/",
        handle: "Portfolio",
      },
      {
        label: "Email",
        url: "mailto:alamsahil3d@gmail.com",
        handle: "alamsahil3d@gmail.com",
      },
    ],
  },

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],

  projects: [
    {
      id: "libas-ecommerce",
      title: "LIBAS — FULL-STACK E-COMMERCE PLATFORM",
      category: "E-Commerce",
      year: "2025",
      summary:
        "Developed a full-stack e-commerce platform with product browsing, authentication, cart management, and responsive UI.",
      description:
        "Built and integrated REST APIs for products, users, and cart operations with MongoDB. Designed responsive and reusable interfaces using React.js and Tailwind CSS.",
      tags: [
        "React.js",
        "Node.js",
        "MongoDB",
        "REST API",
        "Tailwind CSS",
        "Authentication",
      ],
      liveUrl: "https://libas-ecommerce-website-nine.vercel.app/",
      githubUrl: "https://github.com/Sahilgeu123",
      image:
        "/libas.png",
      featured: true,
    },
    {
      id: "apple-3d-clone",
      title: "APPLE WEBSITE CLONE — INTERACTIVE 3D EXPERIENCE",
      category: "3D & Web",
      year: "2025",
      summary:
        "Built an interactive Apple-inspired product website using React.js, Three.js, and React Three Fiber.",
      description:
        "Implemented GSAP animations and scroll-based interactions to create an immersive 3D experience. Optimized responsive layouts and interactive elements for different screen sizes.",
      tags: [
        "React.js",
        "Three.js",
        "React Three Fiber",
        "GSAP",
        "3D Experience",
        "Responsive UI",
      ],
      liveUrl: "https://apple-clone-website-kappa.vercel.app/",
      githubUrl: "https://github.com/Sahilgeu123",
      image:
        "/apple.png",
      featured: true,
    },
    {
      id: "eyelife-clinic",
      title: "EYELIFE CLINIC LANDING PAGE",
      category: "3D & Web",
      year: "2025",
      summary:
        "Developed a responsive landing page using HTML5, CSS3, and JavaScript.",
      description:
        "Built structured sections for hero content, clinic information, and consultation scheduling. Implemented a clean, modern, and user-focused UI optimized for desktop, tablet, and mobile devices.",
      tags: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Design",
        "Landing Page",
        "UI Design",
      ],
      liveUrl: "https://eye-life-clinic-landing-page.vercel.app/",
      githubUrl: "https://github.com/Sahilgeu123",
      image:
        "/eyeClinic.png",
      featured: true,
    },
  ] as ProjectItem[],

  services: [
    {
      number: "01",
      title: "Frontend Development",
      description:
        "Building responsive, accessible, and high-performance interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
      accentColor: "#111111",
    },
    {
      number: "02",
      title: "Backend & APIs",
      description:
        "Building secure and scalable backends with APIs, authentication, databases, caching, and business logic.",
      tags: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Redis", "Auth"],
      accentColor: "#5d487f",
    },
    {
      number: "03",
      title: "AI Applications",
      description:
        "Integrating LLMs and AI capabilities into real-world applications using modern AI APIs and workflows.",
      tags: ["LLMs", "AI APIs", "Embeddings", "Structured Output", "Prompting"],
      accentColor: "#222222",
    },
    {
      number: "04",
      title: "RAG & AI Search",
      description:
        "Building knowledge-aware AI systems that retrieve and generate relevant information from your data.",
      tags: ["RAG", "Vector DB", "Embeddings", "Semantic Search", "Retrieval"],
      accentColor: "#3a2d54",
    },
    {
      number: "05",
      title: "AI Agents & Automation",
      description:
        "Creating AI agents that use tools, access data, and automate multi-step tasks with controlled execution.",
      tags: [
        "AI Agents",
        "Tool Calling",
        "MCP",
        "Automation",
        "Agent Workflows",
      ],
      accentColor: "#5d487f",
    },
    {
      number: "06",
      title: "AI-Native Development",
      description:
        "Using AI across planning, coding, testing, debugging, code review, and deployment to accelerate development.",
      tags: [
        "AI Coding",
        "AI Testing",
        "Code Review",
        "Automation",
        "Dev Tools",
      ],
      accentColor: "#111111",
    },
  ] as ServiceItem[],

  skillCategories: [
    {
      number: "01",
      title: "Frontend",
      subtitle:
        "Responsive and interactive user interfaces built with modern frontend tools",
      skills: [
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "GSAP",
        "Redux Toolkit",
        "Zustand",
      ],
    },
    {
      number: "02",
      title: "State Management",
      subtitle:
        "Managing app state effectively for seamless user flows and UI behavior",
      skills: [
        "Redux Toolkit",
        "Zustand",
        "Context API",
        "State Handling",
        "UI State",
        "Component State",
      ],
    },
    {
      number: "03",
      title: "Backend & APIs",
      subtitle:
        "Connecting frontends to scalable backend services and data sources",
      skills: [
        "MongoDB",
        "Firebase",
        "REST APIs",
        "Axios",
        "API Integration",
        "Authentication",
        "Database Basics",
      ],
    },
    {
      number: "04",
      title: "Tools",
      subtitle:
        "Development and workflow tools used to build and ship clean projects",
      skills: [
        "Git",
        "GitHub",
        "Vite",
        "VS Code",
        "Postman",
        "Figma",
        "Responsive Testing",
      ],
    },
  ] as SkillCategory[],

  tickerSkills: [
    "React.js",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Redux Toolkit",
    "Zustand",
    "MongoDB",
    "Firebase",
    "REST APIs",
    "GSAP",
    "Three.js",
    "HTML5",
    "CSS3",
    "Git",
    "GitHub",
    "Vite",
  ],

  journey: [
    {
      period: "2026",
      role: "Frontend Developer Intern",
      organization: "INCODEVISION",
      kind: "Development",
      highlights: [
        "Developed responsive landing page using React and CSS",
        "Built responsive UI components for desktop, tablet, and mobile",
        "Implemented clean user-focused interface",
      ],
      summary:
        "Worked as a frontend developer intern creating a responsive landing page and user-friendly interface for a web product using React and CSS.",
    },
    {
      period: "2025",
      role: "Bachelor of Computer Applications",
      organization: "Graphic Era Deemed To Be University",
      kind: "Education",
      highlights: [
        "Focused on software development fundamentals",
        "Practical web development learning",
        "Academic foundation in computer applications",
      ],
      summary:
        "Completed undergraduate education in computer applications with a strong foundation in programming, software development, and problem solving.",
    },
    {
      period: "2018 — 2020",
      role: "Higher Secondary Education",
      organization: "DAV Public School",
      kind: "Education",
      highlights: ["Senior Secondary (12th) — CBSE", "Secondary (10th) — CBSE"],
      summary:
        "Completed senior and secondary school education with a solid academic background in science and mathematics.",
    },
  ] as JourneyItem[],
};
