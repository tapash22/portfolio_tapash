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

export type BlogType = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  description: string;
  content: string;
  cover: string;
};

export type BlogTypes = BlogType[];
