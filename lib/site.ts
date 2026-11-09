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
    "Outside of programming, I enjoy exploring new technology trends and design inspiration, watching football, and spending time with friends and family — activities that keep me curious, refreshed, and balanced.",
  ],
  resumeUrl: "/Resume.pdf",
  email: "mdsayembingoniamla@gmail.com", // PLACEHOLDER
  phone: "+880 1758-853890",
  phoneHref: "tel:+8801758853890",
} as const

// PLACEHOLDER URLs — replace with your actual profile links
export const socials = {
  github: "https://github.com/Md-Sayem-Bin-Goni",
  linkedin: "https://www.linkedin.com/in/md-sayem-bin-goni/",
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
  /** URL slug used for the detail page (/projects/<slug>) */
  slug: string
  title: string
  description: string
  technologies: string[]
  links: { label: string; href: string; type: "github" | "live" }[]
  /** Screenshot path under /public (optional — falls back to a placeholder graphic) */
  image?: string
  /** Difficulties faced while building the project (shown on the detail page) */
  challenges: string[]
  /** Potential improvements & future plans (shown on the detail page) */
  improvements: string[]
  visible: boolean
}

export const projects: Project[] = [
  {
    slug: "uddog",
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
    challenges: [
      "Implementing secure authentication and session handling with Better Auth, including protected routes for event creators.",
      "Keeping the Next.js frontend and the Express/MongoDB backend consistent when creating, updating, and cancelling events.",
      "Designing an event joining flow that prevents duplicate joins and handles capacity edge cases.",
      "Handling time zones and date formatting correctly so events display the scheduled time reliably.",
    ],
    improvements: [
      "Add email notifications and reminders when joining an event or when an event is about to start.",
      "Introduce an admin dashboard with statistics (participants, events, engagement) and moderation tools.",
      "Add image uploads and richer event pages with location maps.",
      "Move to realtime updates (WebSockets) so participants see changes instantly.",
    ],
    visible: true,
  },
  {
    slug: "bazar-dor",
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
    challenges: [
      "Structuring a flexible data model for grocery categories, items, and per-market daily prices.",
      "Making the Bengali-language interface fully responsive and readable on small screens.",
      "Keeping large, frequently-updated price lists fast and organised with clean filtering and navigation.",
      "Managing authentication state (Better Auth) alongside public browsing so pages stay accessible to guests.",
    ],
    improvements: [
      "Add price history charts so users can see trends over time, not just today's numbers.",
      "Allow users to set price alerts for items they track.",
      "Let users filter or compare prices by their nearest market/location.",
      "Ship a PWA version for offline price viewing and home-screen install.",
    ],
    visible: true,
  },
  {
    slug: "fitlog",
    title: "FitLog",
    description:
      "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
    technologies: [
      "Python",
      "Flask",
      "HTML/CSS",
      "JavaScript",
    ],
    links: [
      { label: "Live Demo", href: "https://fit-log-eosin.vercel.app/", type: "live" },
    ],
    image: "/fit_log.png",
    challenges: [
      "Designing a workout library data model that covers twelve lifts and lets users assign them to daily plans.",
      "Managing the plan-building state (add/remove lifts, per-day planning) server-side with clean Flask routes and forms.",
      "Aggregating the week's workouts — sets, duration, and calories — into meaningful weekly totals.",
      "Building a dense, dark UI that stays readable and usable even on small screens.",
    ],
    improvements: [
      "Add user accounts so plans and workout history are saved in the cloud and synced across devices.",
      "Visualise progress over time with weekly volume and strength charts.",
      "Introduce reusable workout templates and quick-fill for common sessions.",
      "Turn it into a PWA so it can be installed on a phone and used offline between sets.",
    ],
    visible: true,
  },
]
