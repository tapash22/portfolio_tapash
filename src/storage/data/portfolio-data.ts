import type { PricingPlans, ServiceTypes } from "../type/data-type";
import money_management from "../../assets/images/portfolio/money_management_1.png";
import car_rent from "../../assets/images/portfolio/car_rent.png";
// import car_rent_slider from "../../assets/images/portfolio/car_rent_slider.png";
import map from "../../assets/images/portfolio/map.png";

export const protFolioDeatils: ServiceTypes = [
  {
    id: 1,
    title: "Money Management",
    link: "https://moneymanagement22-demo-seven.vercel.app/dashboard/home",
    image: money_management,
    description:
      "At the top, the dashboard highlights four primary financial metrics for quick assessment.The center of the project focuses on visual storytelling through different chart types.",
    brief: `This project appears to be a Financial Management Dashboard designed for tracking personal or small business finances. It utilizes a modern "Dark Mode" aesthetic with a high-contrast UI, focusing on data visualization and real-time monitoring.This project is likely designed as a SaaS (Software as a Service) platform for freelancers or small teams who need to visualize their cash flow, manage investments, and track collaborative spending in one centralized, aesthetically pleasing location.`,
  },
  {
    id: 2,
    title: "Location Allocate",
    link: "https://mapprojection.netlify.app/",
    image: map,
    description:
      "The interface is built using Leaflet.js (as indicated by the attribution in the bottom right corner). It provides an interactive environment where users can zoom, pan, and interact with data layers",
    brief: `
This project is a GIS (Geographic Information System) Web Application designed for urban mapping, boundary management, or real-estate tracking. It uses a modern web-based mapping library to overlay custom vector data onto a standard map tile service.As a web project, this likely integrates a JavaScript/TypeScript frontend with a backend database (such as PostgreSQL with PostGIS) to serve the coordinate data for the polygons and markers dynamically. The use of clear color-coding for different zones indicates a focus on data visualization and user-friendly spatial analysis.`,
  },
  {
    id: 3,
    title: "Rent Service",
    link: "https://rentcarview.netlify.app/",
    image: car_rent,
    description:
      "The centerpiece of the UI is the dynamic filtering system. It allows users to narrow down their search through a multi-step selection process",
    brief: `This project is an Automotive E-commerce or Vehicle Rental Landing Page. It serves as the primary entry point for a platform focused on vehicle parts, sales, or rentals, with a heavy emphasis on user-driven filtering and search.From a development perspective, this layout is highly compatible with responsive design, where the horizontal search bar would likely stack vertically on mobile devices to maintain usability.  1.Core Functionality: The "Vehicle Selector"  2.Navigation & User Experience (UX)  3.Visual Identity & Design  4.Technical Use Case`,
  },
];

export const pricingPlans: PricingPlans = [
  {
    id: "basic",
    title: "Basic",
    price: "$499",
    duration: "per project",
    description:
      "Perfect for high-performance landing pages and personal portfolios.",
    features: [
      "Responsive Single Page Design",
      "Advanced CSS/Tailwind Styling",
      "GSAP Entry-level Animations",
      "SEO Optimization",
      "3 Rounds of Revision",
    ],
    cta: "Start Project",
    highlight: false,
  },
  {
    id: "standard",
    title: "Standard",

    price: "$1,299",
    duration: "per project",
    description:
      "Ideal for complex web apps requiring data viz and custom interactivity.",
    features: [
      "Multi-page React/Vue Application",
      "Interactive Dashboards & Charts",
      "Three.js 3D Component Integration",
      "API & CMS Integration",
      "Priority Support",
    ],
    cta: "Most Popular",
    highlight: true, // Use this to apply a "Featured" or "Scale" effect in your UI
  },
  {
    id: "premium",
    title: "Premium",
    price: "$2,499",
    duration: "per project",
    description:
      "Enterprise-grade solutions with custom GIS and 3D environments.",
    features: [
      "Custom GIS/Leaflet Map Integration",
      "Full 3D WebGL Environments",
      "Complex State Management",
      "Performance Auditing & Optimization",
      "1 Month Post-Launch Support",
    ],
    cta: "Contact for Custom",
    highlight: false,
  },
];
