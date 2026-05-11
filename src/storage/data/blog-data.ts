import type { BlogTypes } from "../type/data-type";
import chartjs from "/blog/chartjs.png";
import gsap from "/blog/gsap.jpg";
import leaflet from "/blog/leaflet.jpg";
import performance from "/blog/performance.jpg";
import rtkq from "/blog/rtkq.jpg";
import threejs from "/blog/threejs.jpg";

export const blogs: BlogTypes = [
  {
    id: 1,
    title: "GSAP Animation in React",
    subtitle: "Everything is easy when you think it easy at all.",
    author: "Tapash Paul",
    date: "April 24, 2026",
    cover: gsap,

    description:
      "Learn how to create smooth and professional animations using GSAP in React.",

    sections: [
      {
        title: "Prerequisites",
        type: "list",
        content: [
          "Basic React knowledge",
          "Understanding of React Hooks",
          "npm or yarn installed",
        ],
      },

      {
        title: "Installation",
        type: "code",
        content: `npm install gsap @gsap/react`,
      },

      {
        title: "Usage Example",
        type: "code",
        content: `import { gsap } from "gsap";
                  import { useGSAP } from "@gsap/react";

                  useGSAP(() => {
                    gsap.to(".box", {
                      x: 100,
                      repeat: -1,
                      yoyo: true,
                    });
                  }, { scope: container });`,
      },

      {
        title: "What We Built",
        type: "list",
        content: [
          "Dialog open/close animation",
          "Scale and fade transitions",
          "Smooth easing effects",
          "Backdrop blur animation",
          "Staggered content animation",
          "Button hover interactions",
          "Timeline-based sequencing",
          "Responsive animation handling",
          "Reusable animation logic with hooks",
          "Performance optimized transitions",
        ],
      },

      {
        title: "React Integration",
        type: "list",
        content: [
          "useRef to target DOM elements",
          "useEffect for animation lifecycle",
          "gsap.timeline() for sequence control",
          "fromTo() animations for smooth transitions",
          "cleanup functions to prevent memory leaks",
        ],
      },

      {
        title: "Why GSAP?",
        type: "list",
        content: [
          "Better performance than complex CSS animations",
          "Precise timing and motion control",
          "Smooth hardware-accelerated rendering",
          "Easy React integration",
          "Advanced scroll and timeline animations",
        ],
      },

      {
        title: "Final Thoughts",
        type: "paragraph",
        content:
          "This implementation creates a modern and interactive user experience while keeping the component structure clean, scalable, and maintainable.",
      },
    ],
  },
  {
    id: 2,
    title: "Leaflet Map Integration",
    subtitle: "Everything is easy when you think it easy at all.",
    author: "Tapash Paul",
    date: "April 03, 2026",
    cover: leaflet,

    description:
      "Learn how to integrate interactive and responsive maps into your React application using React Leaflet and OpenStreetMap.",

    sections: [
      {
        title: "Prerequisites",
        type: "list",
        content: [
          "Basic React knowledge",
          "Understanding of JSX",
          "Basic CSS for map sizing",
          "npm or yarn installed",
        ],
      },

      {
        title: "Installation",
        type: "code",
        content: `npm install leaflet react-leaflet`,
      },

      {
        title: "Important CSS Setup",
        type: "code",
        content: `import "leaflet/dist/leaflet.css";`,
      },

      {
        title: "Usage Example",
        type: "code",
        content: `import {
                  MapContainer,
                  TileLayer,
                  Marker,
                  Popup,
                } from "react-leaflet";

                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup.
                    </Popup>
                  </Marker>
                </MapContainer>`,
      },

      {
        title: "Map Features",
        type: "list",
        content: [
          "Interactive map rendering",
          "OpenStreetMap tile integration",
          "Custom markers and popups",
          "Zoom and drag support",
          "Responsive map container",
          "Lightweight and open-source solution",
        ],
      },

      {
        title: "Why Use Leaflet?",
        type: "list",
        content: [
          "Easy React integration",
          "Fast and lightweight",
          "Works well with OpenStreetMap",
          "Supports custom layers and controls",
          "Perfect for location-based applications",
        ],
      },

      {
        title: "Common Beginner Mistakes",
        type: "list",
        content: [
          "Forgetting to import leaflet.css",
          "Not setting map container height",
          "Using incorrect coordinate formats",
          "Missing marker icon configuration",
        ],
      },

      {
        title: "Final Thoughts",
        type: "paragraph",
        content:
          "React Leaflet makes map integration simple, scalable, and highly customizable. It is an excellent choice for building modern applications that require geolocation, navigation, or interactive map experiences.",
      },
    ],
  },
  {
    id: 3,
    title: "Three.js 3D in React",
    subtitle: "Everything is easy when you think it easy at all.",
    author: "Tapash Paul",
    date: "April 18, 2026",
    cover: threejs,

    description:
      "Learn how to build immersive 3D web experiences using Three.js and React Three Fiber.",

    sections: [
      {
        title: "Prerequisites",
        type: "list",
        content: [
          "Basic React knowledge",
          "Understanding of JSX",
          "Basic idea of 3D coordinates (X, Y, Z)",
          "npm or yarn installed",
        ],
      },

      {
        title: "Installation",
        type: "code",
        content: `npm install three @types/three @react-three/fiber`,
      },

      {
        title: "Usage Example",
        type: "code",
        content: `import { Canvas } from "@react-three/fiber";

                  <Canvas>
                    <ambientLight intensity={0.5} />

                    <mesh>
                      <boxGeometry />
                      <meshStandardMaterial color="orange" />
                    </mesh>
                  </Canvas>`,
      },

      {
        title: "What We Built",
        type: "list",
        content: [
          "Rotating 3D cube",
          "Basic lighting setup",
          "3D scene rendering in browser",
          "Interactive WebGL canvas",
          "React-based 3D structure",
        ],
      },

      {
        title: "Why React Three Fiber?",
        type: "list",
        content: [
          "Simplifies Three.js usage in React",
          "Declarative 3D scene management",
          "Better component structure",
          "Easy state integration",
          "Reusable 3D components",
        ],
      },

      {
        title: "Key Concepts",
        type: "list",
        content: [
          "Scene, Camera, Renderer abstraction",
          "Meshes and geometries",
          "Lighting and shadows",
          "WebGL rendering pipeline",
          "React-based 3D composition",
        ],
      },

      {
        title: "Final Thoughts",
        type: "paragraph",
        content:
          "Three.js combined with React Three Fiber unlocks powerful possibilities for building interactive 3D web experiences, from simple objects to full immersive applications.",
      },
    ],
  },
  {
    id: 4,
    title: "Mastering RTK Query ",
    subtitle: "Efficient data fetching for high-performance dashboards.",
    author: "Tapash Paul",
    date: "May 02, 2026",
    cover: rtkq,

    description:
      "Learn how to efficiently manage real-time financial data using Redux Toolkit and RTK Query for scalable fintech dashboards.",

    sections: [
      {
        title: "Prerequisites",
        type: "list",
        content: [
          "Basic understanding of Redux",
          "Familiarity with REST APIs",
          "React fundamentals",
          "npm or yarn installed",
        ],
      },

      {
        title: "Installation",
        type: "code",
        content: `npm install @reduxjs/toolkit react-redux`,
      },

      {
        title: "Usage Example",
        type: "code",
        content: `const { data, error, isLoading } = useGetBalanceQuery(userId);`,
      },

      {
        title: "What We Built",
        type: "list",
        content: [
          "Redux store setup with RTK Query",
          "Efficient server-state management",
          "Real-time financial dashboard updates",
          "Auto caching and background refetching",
          "Reduced manual API handling",
        ],
      },

      {
        title: "Key Benefits",
        type: "list",
        content: [
          "Eliminates manual useEffect data fetching",
          "Built-in caching and invalidation",
          "Optimized performance for dashboards",
          "Automatic refetching strategies",
          "Cleaner and scalable Redux architecture",
        ],
      },

      {
        title: "Why RTK Query for Fintech?",
        type: "list",
        content: [
          "Real-time data synchronization",
          "Reduced boilerplate code",
          "Better API state management",
          "Improved scalability for large apps",
          "Ideal for financial dashboards",
        ],
      },

      {
        title: "Final Thoughts",
        type: "paragraph",
        content:
          "RTK Query is a powerful tool for managing server state in modern fintech applications. It simplifies API handling while ensuring high performance, reliability, and real-time updates.",
      },
    ],
  },
  {
    id: 5,
    title: "Optimizing React Performance",
    subtitle: "Turning a sluggish app into a 60fps experience.",
    author: "Tapash Paul",
    date: "May 10, 2026",
    cover: performance,

    description:
      "Learn advanced React performance optimization techniques to improve rendering speed, reduce bundle size, and deliver a smooth 60fps user experience.",

    sections: [
      {
        title: "Prerequisites",
        type: "list",
        content: [
          "Basic understanding of React rendering",
          "Familiarity with React Profiler",
          "Knowledge of Chrome DevTools",
          "React functional components",
        ],
      },

      {
        title: "Installation",
        type: "code",
        content: `Standard React environment (no extra installation required)`,
      },

      {
        title: "Usage Example",
        type: "code",
        content: `const HeavyComponent = React.lazy(() => import('./HeavyComponent'));`,
      },

      {
        title: "What We Optimized",
        type: "list",
        content: [
          "Lazy loading with React.lazy and Suspense",
          "Memoization using useMemo and useCallback",
          "Reduced unnecessary re-renders",
          "Optimized component tree structure",
          "Improved load performance",
        ],
      },

      {
        title: "Performance Techniques",
        type: "list",
        content: [
          "Code splitting for faster initial load",
          "Avoiding unnecessary state updates",
          "Using React Profiler for bottleneck detection",
          "Optimizing large lists with virtualization",
          "Reducing third-party library overhead",
        ],
      },

      {
        title: "Why Performance Matters",
        type: "list",
        content: [
          "Improves user experience",
          "Reduces bounce rate",
          "Enhances SEO performance",
          "Ensures smooth UI interactions",
          "Critical for production-scale apps",
        ],
      },

      {
        title: "Final Thoughts",
        type: "paragraph",
        content:
          "Performance optimization in React is not optional—it is essential. With the right strategies, even large applications can achieve smooth, responsive, and efficient user experiences.",
      },
    ],
  },
  {
    id: 6,
    title: "Interactive Charts with React 19",
    subtitle: "Visualizing complex data with ease.",
    author: "Tapash Paul",
    date: "May 15, 2026",
    cover: chartjs,

    description:
      "Learn how to build interactive, responsive, and real-time data visualizations using Chart.js with React 19.",

    sections: [
      {
        title: "Prerequisites",
        type: "list",
        content: [
          "Basic React knowledge",
          "Understanding of data structures",
          "Familiarity with JSON data",
          "npm or yarn installed",
        ],
      },

      {
        title: "Installation",
        type: "code",
        content: `npm install chart.js react-chartjs-2`,
      },

      {
        title: "Usage Example",
        type: "code",
        content: `<Line data={chartData} options={options} />`,
      },

      {
        title: "What We Built",
        type: "list",
        content: [
          "Dynamic line charts for tracking data",
          "Interactive tooltips and legends",
          "Responsive dashboard layouts",
          "Real-time data visualization",
          "Mobile-friendly chart rendering",
        ],
      },

      {
        title: "Key Features",
        type: "list",
        content: [
          "Customizable chart components",
          "Smooth animations and transitions",
          "Multiple chart types support",
          "Dynamic dataset updates",
          "High performance rendering",
        ],
      },

      {
        title: "Why Charts Matter",
        type: "list",
        content: [
          "Simplifies complex data understanding",
          "Improves decision making",
          "Enhances dashboard UX",
          "Provides real-time insights",
          "Essential for analytics apps",
        ],
      },

      {
        title: "Final Thoughts",
        type: "paragraph",
        content:
          "Data visualization is a critical part of modern applications. With Chart.js and React 19, building interactive and responsive dashboards becomes both powerful and developer-friendly.",
      },
    ],
  },
];
