import type { BlogTypes } from "../type/data-type";
import gsap from "../../assets/images/blog/gsap.jpg";
import leaflet from "../../assets/images/blog/leaflet.jpg";
import threejs from "../../assets/images/blog/threejs.jpg";

export const blogs: BlogTypes = [
  {
    id: 1,
    title: "GSAP Animation in React",
    subtitle: "Everything is easy when you think it easy at all.",
    author: "Warner",
    date: "April 24, 2026",
    cover: gsap,
    description:
      "Learn how to create smooth and professional animations using GSAP in React.",
    content: `
        GSAP (GreenSock Animation Platform) is one of the most powerful animation libraries.
        In this blog, we implemented:
        - Dialog animation
        - Scale + fade transitions
        - Smooth easing
        We used useRef and useEffect to control animations.
        GSAP gives better performance compared to CSS animations.
    `,
  },
  {
    id: 2,
    title: "Leaflet Map Integration",
    subtitle: "Everything is easy when you think it easy at all.",
    author: "Warner",
    date: "April 03, 2026",
    cover: leaflet,
    description:
      "Integrate interactive maps into your React app using Leaflet.",
    content: `
        Leaflet helps you render interactive maps easily.
        Features:
        - MapContainer setup
        - TileLayer (OpenStreetMap)
        - Marker and Popup
        We also handled marker icon issues in React.
    `,
  },
  {
    id: 3,
    title: "Three.js 3D in React",
    subtitle: "Everything is easy when you think it easy at all.",
    author: "Warner",
    date: "April 18, 2026",
    cover: threejs,
    description:
      "Build stunning 3D experiences using Three.js and React Three Fiber.",
    content: `
        Three.js allows rendering 3D graphics in browser.

        We implemented:
        - Rotating cube
        - Lighting
        - OrbitControls

        React Three Fiber makes it easy to use Three.js in React.
    `,
  },
];
