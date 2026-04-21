import { type ServiceTypes } from "../type/data-type";
import { GrTestDesktop, GrSupport } from "react-icons/gr";
import { BsLaptop } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

export const services: ServiceTypes = [
  {
    id: 1,
    title: "Web Design",
    icon: GrTestDesktop,
    description:
      "Designing visually appealing and user-friendly interfaces with a focus on layout, color theory, and modern UI/UX principles.",
    brief: `
          Web design is more than just creating visually appealing layouts—it is about crafting meaningful user experiences that communicate your brand effectively. A well-designed website combines aesthetics with usability, ensuring visitors can navigate effortlessly while staying engaged. From typography and color schemes to spacing and visual hierarchy, every element plays a crucial role in shaping perception.
          Our approach to web design focuses on user-centered design principles. We analyze user behavior, understand target audiences, and design interfaces that are both intuitive and functional. Whether it’s a landing page or a full-scale platform, the goal is always clarity, accessibility, and impact.
          We also emphasize modern trends such as minimalism, dark mode compatibility, and interactive elements to keep your website fresh and competitive. By combining creativity with strategic thinking, we ensure your website not only looks great but also delivers measurable results.
          Ultimately, great web design builds trust, strengthens brand identity, and improves user engagement. It is the foundation of your digital presence and a key driver of success in today’s online world.
              `,
  },
  {
    id: 2,
    title: "Web Development",
    icon: BsLaptop,
    description:
      "Building fast, scalable, and maintainable web applications using modern technologies and best development practices.",
    brief: `
        Web development is the backbone of any successful digital product. It transforms design concepts into fully functional, high-performing applications. Our development process focuses on building scalable, secure, and efficient systems that meet both user expectations and business goals.
        We use modern frameworks and technologies to create fast-loading, responsive, and dynamic web applications. Clean code architecture and best practices ensure maintainability and long-term performance. Whether it’s a simple website or a complex web app, we prioritize reliability and speed.
        Performance optimization is a key part of our workflow. From minimizing load times to optimizing assets and ensuring smooth interactions, we focus on delivering seamless user experiences. Security is also a priority, with proper validation, authentication, and data protection strategies in place.
        By combining technical expertise with problem-solving skills, we deliver solutions that are robust, flexible, and future-ready. Our goal is to build digital products that not only work flawlessly but also grow with your business needs.
            `,
  },
  {
    id: 3,
    title: "Creative Design",
    icon: IoColorPaletteOutline,
    description:
      "Crafting unique and engaging designs that communicate ideas effectively through creativity, branding, and visual storytelling.",
    brief: `
        Creative design is about bringing ideas to life through originality and visual storytelling. It goes beyond standard layouts to create unique and memorable experiences that capture attention and communicate messages effectively.
        We focus on blending creativity with strategy. Every design decision is aligned with your brand identity and business objectives. From illustrations and graphics to motion elements, we create visuals that resonate with your audience and stand out in a crowded digital space.
        Consistency is a key factor in creative design. Maintaining a unified style across all platforms helps build recognition and trust. We ensure that every element—from icons to color palettes—works together harmoniously.
        Our goal is to create designs that are not only visually impressive but also meaningful. By combining artistic creativity with user-focused thinking, we deliver solutions that inspire, engage, and leave a lasting impression.
            `,
  },
  {
    id: 4,
    title: "Responsive Design",
    icon: HiOutlineDevicePhoneMobile,
    description:
      "Ensuring seamless user experience across all devices by creating layouts that adapt perfectly to different screen sizes.",
    brief: `
        Responsive design ensures that your website delivers a seamless experience across all devices, from desktops to smartphones. With users accessing content on various screen sizes, adaptability is no longer optional—it is essential.
        We design layouts that automatically adjust to different resolutions and orientations. This includes flexible grids, scalable images, and media queries that ensure consistent performance across devices. The result is a smooth and intuitive experience, regardless of how users access your site.
        Mobile-first design is a core part of our approach. By prioritizing smaller screens, we ensure faster loading times and better usability. This also improves search engine rankings, as responsiveness is a key factor in SEO.
        A responsive website enhances user satisfaction, reduces bounce rates, and increases engagement. It ensures your content is accessible to everyone, everywhere. By focusing on adaptability and performance, we help you create a future-proof digital presence.
    `,
  },
  {
    id: 5,
    title: "Branding Identity",
    icon: MdOutlineVerified,
    description:
      "Developing strong brand identities with consistent visuals, logos, and messaging to create a lasting impression.",
    brief: `
        Branding identity is the visual and emotional representation of your business. It defines how your audience perceives you and plays a crucial role in building trust and recognition.
        We create cohesive brand identities that reflect your values and vision. This includes logo design, typography, color systems, and visual guidelines that ensure consistency across all platforms. A strong brand identity makes your business memorable and sets you apart from competitors.
        Our process involves understanding your target audience and market positioning. We design with purpose, ensuring every element communicates your message clearly and effectively. Consistency across digital and physical touchpoints reinforces your brand presence.
        A well-crafted brand identity not only enhances credibility but also builds long-term relationships with your audience. It is the foundation of your marketing strategy and a key driver of business growth.
            `,
  },
  {
    id: 6,
    title: "24/Support",
    icon: GrSupport,
    description:
      "Providing reliable and continuous support to ensure smooth operation, quick issue resolution, and client satisfaction.",
    brief: `
          Reliable support is essential for maintaining a smooth and efficient digital experience. Our 24/7 support service ensures that your systems run without interruption and that any issues are resolved quickly.
          We provide continuous monitoring and assistance to address technical challenges, bugs, and performance issues. Our team is always ready to respond, minimizing downtime and ensuring your operations remain stable.
          Proactive maintenance is a key part of our support strategy. Regular updates, performance checks, and security monitoring help prevent problems before they occur. This ensures your website or application stays optimized and secure at all times.
          Our goal is to provide peace of mind. With dedicated support, you can focus on your business while we handle the technical side. Reliable assistance builds trust and ensures long-term success for your digital products.
              `,
  },
];
