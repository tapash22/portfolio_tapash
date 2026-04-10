import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import type { SocialMediaItems } from "../type/data-type";

export const socialMediaLinkList: SocialMediaItems = [
  {
    id: 1,
    title: "Facebook",
    link: "https://facebook.com/your-profile",
    icon: FaFacebook,
  },
  {
    id: 2,
    title: "Twitter",
    link: "https://twitter.com/your-profile",
    icon: FaTwitter,
  },
  {
    id: 3,
    title: "GitHub",
    link: "https://github.com/your-username",
    icon: FaGithub,
  },
  {
    id: 4,
    title: "LinkedIn",
    link: "https://linkedin.com/in/your-profile",
    icon: FaLinkedin,
  },
];
