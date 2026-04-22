import type { ServiceTypes } from "../type/data-type";
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
    description: "7 Green Lake Street Crawfordsville, IN 47933",
  },
  {
    id: 2,
    title: "Location Allocate",
    link: "https://mapprojection.netlify.app/",
    image: map,
    description: "portfar@gmail.com",
  },
  {
    id: 3,
    title: "Rent Service",
    link: "https://rentcarview.netlify.app/",
    image: car_rent,
    description: "helloyou@gmail.com",
  },
  {
    id: 4,
    title: "Phone",
    link: "#",
    image: money_management,
    description: "+1 800 123 456 789",
  },
  {
    id: 5,
    title: "Phone",
    link: "#",
    image: map,
    description: "+1 800 123 654 987",
  },
  {
    id: 6,
    title: "Phone",
    link: "#",
    image: car_rent,
    description: "+1 800 123 654 987",
  },
];
