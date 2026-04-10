import type { IconType } from "react-icons";

export interface SocialMediaItem {
  id: number | null;
  title: string;
  link: string;
  icon: IconType;
}

export type SocialMediaItems = SocialMediaItem[];

// export interface Step {
//   title: string;
//   content: string;
//   targetRef: RefObject<HTMLElement | null>;
// }
