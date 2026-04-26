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
    <div className="w-full min-h-screen flex items-center relative bg-(--background) scrollbar-thin py-5 ">
      <div className="px-12 sm:px-12 md:px-16  flex flex-col justify-center items-center w-full h-full space-y-5 ">
        <div className="w-full h-full px-16 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactInfo.map((info) => {
            const Icon: IconType = info.icon;
            return (
              <div
                key={info.type}
                className="flex flex-col justify-center items-center w-full bg-(--sidebar) rounded-2xl sm:rounded-2xl  lg:rounded-none xl:rounded-none  shadow-(--shadow-footer)"
              >
                <div className="p-5">
                  <div className="w-16 h-16 rounded-full flex justify-center items-center p-5 ring-2 ring-(--border) shadow-(--shadow-footer)">
                    <Icon size={24} className="text-(--foreground)" />
                  </div>
                </div>
                <h3 className="text-2xl font-medium tracking-wider text-(--foreground) border-b-2 w-full text-center border-(--border) leading-12">
                  {info.label}
                </h3>
                <ul className="list-none flex justify-center items-center">
                  {info.values.map((value, index) => (
                    <li
                      key={index}
                      className="text-lg sm:text-sm md:text-lg font-normal text-(--foreground) flex justify-center text-center tracking-wide p-5 text-wrap md:whitespace-nowrap"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="w-full h-full flex justify-center items-center p-3 sm:p-3 md:p-16 ">
          {/* form block */}
          <div className="bg-(--sidebar) space-y-3 rounded-xl sm:rounded-xl md:rounded-none w-full h-full p-10 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
                Contact
              </h1>

              <h1 className="text-xl sm:text-xl md:text-4xl font-medium sm:font-medium md:font-bold tracking-wider leading-7 text-(--foreground)">
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
