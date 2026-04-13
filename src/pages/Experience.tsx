import gsap from "gsap";
import type { IconType } from "react-icons";
import { GrTestDesktop, GrSupport } from "react-icons/gr";
import { BsLaptop } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
// import LeaderBoardCard from "../componants/card/LeaderBoardCard";
// import LeaderBoardScene from "../componants/card/LeaderBoardScene";
// import LeaderBoardScene from "../componants/card/LeaderBoardScene";
// import image from "../assets/images/yy.png";

export default function Experience() {
  const services = [
    {
      id: 1,
      title: "Web Design",
      icon: GrTestDesktop,
      description:
        "One way to categorize the activities is in terms of the professional’s area of expertise such as competitive analysis, corporate strategy.",
    },
    {
      id: 2,
      title: "Web Development",
      icon: BsLaptop,
      description:
        "One way to categorize the activities is in terms of the professional’s area of expertise such as competitive analysis, corporate strategy.",
    },
    {
      id: 3,
      title: "Creative Design",
      icon: IoColorPaletteOutline,
      description:
        "One way to categorize the activities is in terms of the professional’s area of expertise such as competitive analysis, corporate strategy.",
    },
    {
      id: 4,
      title: "Responsive Design",
      icon: HiOutlineDevicePhoneMobile,
      description:
        "One way to categorize the activities is in terms of the professional’s area of expertise such as competitive analysis, corporate strategy.",
    },
    {
      id: 5,
      title: "Branding Identity",
      icon: MdOutlineVerified,
      description:
        "One way to categorize the activities is in terms of the professional’s area of expertise such as competitive analysis, corporate strategy.",
    },
    {
      id: 6,
      title: "24/Support",
      icon: GrSupport,
      description:
        "One way to categorize the activities is in terms of the professional’s area of expertise such as competitive analysis, corporate strategy.",
    },
  ];
  return (
    <div className="w-full h-screen flex items-center relative overflow-hidden bg-(--background)">
      <div className="p-16 flex flex-col justify-center items-center w-full h-full space-y-5 ">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
            What I am Expert In
          </h1>

          <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
            My Service
          </h1>
        </div>
        <div className="w-full h-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {services.map((info) => {
            const Icon: IconType = info.icon;
            return (
              <div
                key={info.id}
                className="flex flex-col  p-6 bg-(--sidebar) w-full space-y-3 opacity-85 "
              >
                <div className="w-24 h-24 rounded-full flex justify-center items-center bg-(--box)">
                  <Icon size={40} className="text-(--button-color)" />
                </div>
                <h3 className="text-xl font-bold tracking-wide text-(--muted)">
                  {info.title}
                </h3>
                <p className="text-sm font-normal text-(--foreground) tracking-wide">
                  {info.description}
                </p>
                <button className="bg-(--button-color) text-(--foreground) text-sm font-normal tracking-wider ring-2 ring-(--border) w-1/3  py-2 rounded-full uppercase ">
                  Read More
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
