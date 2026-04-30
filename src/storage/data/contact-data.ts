import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";
import type { ContactTypes } from "../type/data-type";

export const contactInfo: ContactTypes = [
  {
    type: "address",
    label: "Address",
    icon: FaLocationArrow,
    values: ["Middle-Basabo,Dhaka, Bangladesh"],
  },
  {
    type: "email",
    label: "Email Us",
    icon: FaMailBulk,
    values: ["tapasp263@gmail.com"],
  },
  {
    type: "phone",
    label: "Call Now",
    icon: FaPhone,
    values: ["+8801674345763"],
  },
];
