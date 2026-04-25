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
    // --- New Fields for Beginners ---
    prerequisites: ["Basic React (Hooks)", "npm/yarn installed"],
    installation: "npm install gsap @gsap/react",
    usage: `import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  gsap.to(".box", { x: 100, repeat: -1, yoyo: true });
}, { scope: container });`,
    // --------------------------------
    content: `
        GSAP (GreenSock Animation Platform) is one of the most powerful animation libraries.
        In this blog, we implemented:
        - Dialog animation
        - Scale + fade transitions
        - Smooth easing
        We used useRef and useEffect to control animations.
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
    // --- New Fields for Beginners ---
    prerequisites: ["React basics", "CSS for map dimensions"],
    installation: "npm install leaflet react-leaflet",
    usage: `<MapContainer center={[51.505, -0.09]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[51.505, -0.09]}>
    <Popup>A pretty CSS3 popup.</Popup>
  </Marker>
</MapContainer>`,
    // --------------------------------
    content: `
        Leaflet helps you render interactive maps easily.
        Features:
        - MapContainer setup
        - TileLayer (OpenStreetMap)
        - Marker and Popup
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
    // --- New Fields for Beginners ---
    prerequisites: ["Understanding of 3D coordinates", "React basics"],
    installation: "npm install three @types/three @react-three/fiber",
    usage: `<Canvas>
  <ambientLight intensity={0.5} />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" />
  </mesh>
</Canvas>`,
    // --------------------------------
    content: `
        Three.js allows rendering 3D graphics in browser.
        We implemented:
        - Rotating cube
        - Lighting
        React Three Fiber makes it easy to use Three.js in React.
    `,
  },
];
