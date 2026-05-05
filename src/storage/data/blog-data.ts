import type { BlogTypes } from "../type/data-type";
import gsap from "/blog/gsap.jpg";
import leaflet from "/blog/leaflet.jpg";
import threejs from "/blog/threejs.jpg";
import rtkq from "/blog/rtkq.jpg";
import chartjs from "/blog/chartjs.png";
import performance from "/blog/performance.jpg";

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
  {
    id: 4,
    title: "Mastering RTK Query for Fintech",
    subtitle: "Efficient data fetching for high-performance dashboards.",
    author: "Warner",
    date: "May 02, 2026",
    cover: rtkq,
    description:
      "Learn to manage real-time financial data with Redux Toolkit and RTK Query.",
    prerequisites: ["Redux basics", "Understanding of REST APIs"],
    installation: "npm install @reduxjs/toolkit react-redux",
    usage: `const { data, error, isLoading } = useGetBalanceQuery(userId);`,
    content: `
      Handling financial data requires precision and speed.
      In this blog, we cover:
      - Setting up a Redux store with RTK Query.
      - Managing server-side state without manual useEffects.
      - Auto-refetching data for real-time dashboards.
  `,
  },
  {
    id: 5,
    title: "Optimizing React Performance",
    subtitle: "Turning a sluggish app into a 60fps experience.",
    author: "Warner",
    date: "May 10, 2026",
    cover: performance,
    description:
      "Advanced techniques for reducing load times and optimizing rendering.",
    prerequisites: ["React Profiler basics", "Chrome DevTools"],
    installation: "Standard React environment",
    usage: `const HeavyComponent = React.lazy(() => import('./HeavyComponent'));`,
    content: `
      Performance is a feature. We explore:
      - Implementing React.lazy and Suspense for code-splitting.
      - Memoization strategies using useMemo and useCallback.
      - Reducing bundle size by optimizing third-party libraries.
  `,
  },
  {
    id: 6,
    title: "Interactive Charts with React 19",
    subtitle: "Visualizing complex data with ease.",
    author: "Warner",
    date: "May 15, 2026",
    cover: chartjs,
    description:
      "Build interactive, responsive charts using Chart.js and React-Chartjs-2.",
    prerequisites: ["React basics", "Data structure knowledge"],
    installation: "npm install chart.js react-chartjs-2",
    usage: `<Line data={chartData} options={options} />`,
    content: `
      Data is useless if it's not readable.
      We implemented:
      - Dynamic line charts for expense tracking.
      - Custom tooltips and legends.
      - Responsive layouts for mobile-first dashboards.
  `,
  },
];
