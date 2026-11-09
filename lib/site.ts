/**
 * Centralized site configuration.
 * Update the placeholder values (marked "PLACEHOLDER") with your real links.
 */

export const profile = {
  name: "Md Sayem Bin Goni",
  shortName: "Sayem",
  role: "Frontend Developer",
  location: "Bangladesh",
  intro:
    "I am a passionate frontend developer who enjoys building modern, responsive, and user-friendly web applications.",
  about: [
    "What excites me most is the process of taking a real-world problem and shaping it into software that people can actually use — from the first sketch to the finished interface.",
    "My main focus is on frontend development and software engineering — building clean, accessible, and fully responsive web applications with modern tools like React and Next.js.",
    "I believe in continuous learning. I am always improving my development skills, exploring new technologies, and refining the way I design and build for the web.",
  ],
  resumeUrl: "/Resume.pdf",
  email: "mdsayembingoniamla@gmail.com", // PLACEHOLDER
} as const

// PLACEHOLDER URLs — replace with your actual profile links
export const socials = {
  github: "https://github.com/Md-Sayem-Bin-Goni",
  linkedin: "https://www.linkedin.com/in/YOUR_USERNAME",
  facebook: "https://www.facebook.com/mdsayembingoni/",
  whatsapp: "https://wa.me/8801758853890",
} as const

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "shadcn/ui",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "Programming Languages",
    skills: ["C", "C++", "Java"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub"],
  },
] as const

export type Project = {
  title: string
  description: string
  technologies: string[]
  links: { label: string; href: string; type: "github" | "live" }[]
  /** Screenshot path under /public (optional — falls back to a placeholder graphic) */
  image?: string
  visible: boolean
}

export const projects: Project[] = [
  {
    title: "Uddog",
    description:
      "A social development events platform where users can create, join, and manage community service events.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",
      "Express.js",
      "MongoDB",
    ],
    links: [
      // PLACEHOLDER URLs — replace with the real repository / demo links
      { label: "GitHub", href: "https://github.com/Md-Sayem-Bin-Goni/uddog-client", type: "github" },
      { label: "Live Demo", href: "https://uddog-client.vercel.app/", type: "live" },
    ],
    image: "/uddog.png",
    visible: true,
  },
  {
    title: "Bazar Dor",
    description:
      "Bazar Dor is a Bengali market price tracking platform that helps users explore daily prices of essential groceries across different categories and markets.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",

    ],
    links: [
      // PLACEHOLDER URLs — replace with the real repository / demo links
      { label: "GitHub", href: "https://github.com/Md-Sayem-Bin-Goni/Bazar-dor", type: "github" },
      { label: "Live Demo", href: "https://bazar-dor-mauve.vercel.app/", type: "live" },
    ],
    image: "/Bazar-dor.png",
    visible: true,
  },

]
