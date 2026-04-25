import type { IconType } from "react-icons";

export interface SocialMediaItem {
  id: number | null;
  title: string;
  link: string;
  icon: IconType;
}

export type SocialMediaItems = SocialMediaItem[];

export interface ServiceType {
  id: number | null;
  title: string;
  icon?: IconType;
  description: string;
  brief?: string;
  link?: string;
  image?: string;
}

export type ServiceTypes = ServiceType[];

// id: "basic",
// title: "Basic",
// price: "$499",
// duration: "per project",
// description:
//   "Perfect for high-performance landing pages and personal portfolios.",
// features: [
//   "Responsive Single Page Design",
//   "Advanced CSS/Tailwind Styling",
//   "GSAP Entry-level Animations",
//   "SEO Optimization",
//   "3 Rounds of Revision",
// ],
// cta: "Start Project",
// highlight: false,

export interface PricingPlan {
  id: string;
  title: string;
  price: number | string;
  duration: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export type PricingPlans = PricingPlan[];
