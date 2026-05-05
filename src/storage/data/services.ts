import { type ServiceTypes } from "../type/data-type";
import { GrTestDesktop, GrSupport } from "react-icons/gr";
import { BsLaptop } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

export const serviceImages = {
  webDesign: ["/services/r1.png", "/services/r2.png", "/services/r3.png"],
  webDev: ["/services/m1.jpg", "/services/m2.png", "/services/m3.png"],
  creative: ["/services/c1.png", "/services/c2.png", "/services/c3.png"],
  responsive: ["/services/r1.png", "/services/r2.png", "/services/r3.png"],
  architecture: [
    "/services/service1.jpg",
    "/services/m2.png",
    "/services/r3.png",
  ],
  Support: [
    "/services/service2.jpg",
    "/services/service3.jpg",
    "/services/m4.png",
  ],
};

export const services: ServiceTypes = [
  {
    id: 1,
    title: "Web Design",
    icon: GrTestDesktop,
    image: serviceImages.webDesign,
    description:
      "Designing modern, user-focused interfaces with strong attention to usability, accessibility, and visual hierarchy.",
    brief: `
      I create clean and engaging user interfaces that balance aesthetics with usability. My design approach focuses on clarity, accessibility, and intuitive navigation to ensure users can interact effortlessly with your product.

      I pay close attention to typography, spacing, color systems, and layout structure to build visually consistent experiences. Every design decision is made to improve user engagement and communicate your brand effectively.

      Using modern UI/UX principles and tools, I design interfaces that are not only attractive but also functional and conversion-focused.
    `,
  },
  {
    id: 2,
    title: "Web Development",
    icon: BsLaptop,
    image: serviceImages.webDev,
    description:
      "Building fast, scalable, and maintainable frontend applications using modern frameworks and best practices.",
    brief: `
      I develop high-performance web applications using modern technologies like Angular, React, and TypeScript. My focus is on writing clean, reusable, and maintainable code that scales with your project.

      I follow best practices for performance optimization, including lazy loading, efficient state management, and optimized rendering. This ensures fast load times and smooth user interactions.

      From simple websites to complex applications, I deliver reliable and future-ready frontend solutions.
    `,
  },
  {
    id: 3,
    title: "Creative Design",
    icon: IoColorPaletteOutline,
    image: serviceImages.creative,
    description:
      "Crafting unique UI experiences through creative layouts, animations, and visual storytelling.",
    brief: `
      I bring ideas to life through creative and interactive design. By combining visual storytelling with modern UI patterns, I create experiences that capture attention and keep users engaged.

      I incorporate subtle animations, transitions, and micro-interactions to enhance usability and make interfaces feel dynamic and responsive.

      My goal is to deliver designs that are not only visually appealing but also meaningful and user-driven.
    `,
  },
  {
    id: 4,
    title: "Responsive Design",
    icon: HiOutlineDevicePhoneMobile,
    image: serviceImages.responsive,
    description:
      "Creating fully responsive layouts that work seamlessly across mobile, tablet, and desktop devices.",
    brief: `
      I build responsive interfaces that adapt perfectly to all screen sizes and devices. Using mobile-first design principles, I ensure optimal performance and usability across platforms.

      I use flexible layouts, modern CSS techniques, and responsive frameworks to create consistent experiences everywhere.

      A responsive design not only improves user experience but also boosts SEO and accessibility.
    `,
  },
  {
    id: 5,
    title: "Frontend Architecture",
    icon: MdOutlineVerified,
    image: serviceImages.architecture,
    description:
      "Structuring scalable frontend applications with reusable components and clean architecture.",
    brief: `
      I design frontend architectures that are scalable, maintainable, and easy to extend. Using component-based development, I build reusable UI elements that improve development speed and consistency.

      I work with state management, modular structure, and clean coding standards to ensure long-term project stability.

      This approach helps teams collaborate efficiently and keeps applications organized as they grow.
    `,
  },
  {
    id: 6,
    title: "Maintenance & Support",
    icon: GrSupport,
    image: serviceImages.Support,
    description:
      "Providing ongoing support, bug fixes, and performance improvements for web applications.",
    brief: `
      I provide continuous support to keep your application running smoothly. This includes bug fixing, performance optimization, and feature updates.

      I monitor and improve application performance to ensure a stable and fast user experience.

      With reliable maintenance, your product stays up-to-date, secure, and aligned with evolving user needs.
    `,
  },
];
