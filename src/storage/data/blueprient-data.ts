import type { BlueprintData, TimelineItems } from "../type/data-type";

export const blueprintData: BlueprintData = {
  title: "Professional Blueprint",

  profile: {
    name: "Tapash Paul",
    role: "Senior Frontend Engineer",
    experience: "5+ Years",
    location: "Dhaka, Bangladesh",
  },

  techStack: [
    {
      name: "Vue.js & Nuxt",
      subtitle: "(Vue 3 Composition API & Macros)",
      icon: "🟢",
      description: "Expertise since 2021 in scalable architectures.",
    },
    {
      name: "React 19",
      subtitle: "(TypeScript & RTK Query)",
      icon: "⚛️",
      description: "Building high-performance Fintech dashboards.",
    },
    {
      name: "GIS & 3D",
      subtitle: "(Leaflet & Three.js Fiber)",
      icon: "🗺️",
      description: "Specialized in spatial data and interactive elements.",
    },
    {
      name: "Optimization",
      subtitle: "(25% Performance Gains)",
      icon: "⚡",
      description: "Lazy loading, code-splitting, and asset delivery.",
    },
  ],

  projects: [
    {
      name: "Money Management Platform",
      tech: "React 19, TypeScript, Chart.js",
      highlight: "Real-time financial analytics dashboard.",
    },
    {
      name: "Real Estate GIS Platform",
      tech: "React.js, Leaflet, GIS Mapping",
      highlight: "Complex plot boundary rendering.",
    },
  ],

  workflow: [
    {
      id: 1,
      title: "Agile Planning",
      detail: "Managing sprints in Jira.",
    },
    {
      id: 2,
      title: "UI Architecture",
      detail: "Pixel-perfect Tailwind & Vuetify.",
    },
    {
      id: 3,
      title: "Performance Tuning",
      detail: "Optimizing Core Web Vitals.",
    },
    {
      id: 4,
      title: "Testing & Stability",
      detail: "Jest and Vue Test Utils.",
    },
  ],
};

export const timelineData: TimelineItems = [
  {
    year: "2024 - Present",
    title: "Frontend Developer",
    company: "Anwar Technologies",
    description:
      "Architecting scalable Vue 3 applications using Vue Macros and optimizing performance by 25%.", // [cite: 7, 28, 29]
  },
  {
    year: "2023 - 2024",
    title: "Frontend Developer",
    company: "Logic InfoTech Ltd",
    description:
      "Developed GIS-based mapping features with React and Leaflet, reducing load times by 15%.", // [cite: 35, 37, 38]
  },
  {
    year: "2021 - 2022",
    title: "Frontend Developer",
    company: "Ultrawave Digital",
    description:
      "Managed large-scale Vue/React apps and refactored legacy code into modular components.", // [cite: 41, 42, 44]
  },
];
