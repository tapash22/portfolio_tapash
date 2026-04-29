import type { IconType } from "react-icons";
import { ContactForm } from "../componants/form/ContactForm";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";

export default function Contact() {
  const contactInfo = [
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

  return (
    <div className="w-full min-h-full flex items-start relative bg-(--background)">
      <div className="p-5 sm:p-5 md:p-14 flex flex-col justify-center items-center w-full h-full space-y-3 ">
        <div className="w-full h-full p-3 sm:p-3 md:px-16 md:py-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactInfo.map((info) => {
            const Icon: IconType = info.icon;
            return (
              <div
                key={info.type}
                className="w-full flex flex-col justify-center items-center 
                           bg-(--sidebar) rounded-lg sm:rounded-lg md:rounded-lg
                           ring-1 ring-(--border) 
                           shadow-(--shadow-footer) py-4 space-y-2"
              >
                <div className="w-16 h-16 rounded-full flex justify-center items-center ring-2 ring-(--border) shadow-(--shadow) opacity-80">
                  <Icon size={30} className="text-(--foreground)" />
                </div>
                <h3 className="text-lg sm:text-lg md:text-xl font-medium tracking-wider text-(--foreground) border-b-2 w-full text-center border-(--border) leading-8 md:leading-10">
                  {info.label}
                </h3>
                <ul className="list-none flex justify-center items-center">
                  {info.values.map((value, index) => (
                    <li
                      key={index}
                      className="text-sm sm:text-sm md:text-lg font-medium text-(--foreground) flex justify-center text-center tracking-wider p-1 md:p-2 text-wrap whitespace-nowrap"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="w-full h-full flex justify-center items-center 
                        p-1 sm:p-1 md:p-16 "
        >
          {/* form block */}
          <div
            className=" w-full h-full p-3 sm:p-3 md:p-10 flex flex-col 
                        justify-center items-center bg-(--sidebar) 
                        space-y-2 sm:space-y-2 md:space-y-5 
                        rounded-lg 
                        "
          >
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
                Contact
              </h1>

              <h1
                className="text-xl sm:text-xl md:text-4xl 
                             font-medium sm:font-medium md:font-bold 
                             tracking-wider leading-7 text-(--foreground)"
              >
                Have Any Question?
              </h1>
            </div>
            <ContactForm />
          </div>
          {/* form block end*/}
        </div>
      </div>
    </div>
  );
}
