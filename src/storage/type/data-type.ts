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
  image?: string[];
  brief?: string;
  link?: string;
}

export type ServiceTypes = ServiceType[];

export interface PortfolioType {
  id: number | null;
  title: string;
  link?: string;
  gitLink?: string;
  image?: string[];
  description: string;
  brief?: string;
}
export type PortfolioTypes = PortfolioType[];

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

export type BlogSectionType = "list" | "code" | "paragraph";

export interface BlogSection {
  title: string;
  type: BlogSectionType;
  content: string | string[];
}

export interface BlogType {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  cover: string;
  description: string;

  sections: BlogSection[];
}
export type BlogTypes = BlogType[];

export interface ContactType {
  type: string;
  label: string;
  icon: IconType;
  values: string[];
}

export type ContactTypes = ContactType[];

export interface Profile {
  name: string;
  role: string;
  experience: string;
  location: string;
}

export interface TechStackItem {
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  level?: number;
}

export interface ProjectItem {
  name: string;
  tech: string;
  highlight: string;
}

export interface WorkflowItem {
  id: number;
  title: string;
  detail: string;
}

export interface BlueprintData {
  title: string;
  profile: Profile;
  techStack: TechStackItem[];
  projects: ProjectItem[];
  workflow: WorkflowItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

export type TimelineItems = TimelineItem[];
