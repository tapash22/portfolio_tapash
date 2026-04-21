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
  icon: IconType;
  description: string;
  brief: string;
}

export type ServiceTypes = ServiceType[];
