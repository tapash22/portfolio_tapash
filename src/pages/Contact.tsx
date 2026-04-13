import type { IconType } from "react-icons";
import { ContactForm } from "../componants/form/ContactForm";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";

export default function Contact() {
  const contactInfo = [
    {
      type: "address",
      label: "Address",
      icon: FaLocationArrow,
      values: ["Middle-Basabo, Dhaka, Bangladesh"],
    },
    {
      type: "email",
      label: "Email Us",
      icon: FaMailBulk,
      values: ["portfar@gmail.com", "helloyou@gmail.com"],
    },
    {
      type: "phone",
      label: "Call Now",
      icon: FaPhone,
      values: ["+1 800 123 456 789", "+1 800 123 654 987"],
    },
  ];

  return (
    <div className="w-full h-screen flex items-center bg-(--sidebar)">
      <div className="p-0 flex flex-col justify-center items-center w-full h-full ">
        <div className="w-auto h-auto p-0 flex flex-row gap-8 justify-around items-center">
          {contactInfo.map((info) => {
            const Icon: IconType = info.icon;
            return (
              <div
                key={info.type}
                className="flex flex-col justify-center items-center py-5 px-12 bg-(--background) w-1/3 space-y-2"
              >
                <div className="w-16 h-16 rounded-full flex justify-center items-center p-5 bg-(--box)">
                  <Icon size={24} className="text-(--button-color)" />
                </div>
                <h3 className="text-2xl font-bold tracking-wide text-(--foreground)">
                  {info.label}
                </h3>
                <ul className="list-none">
                  {info.values.map((value, index) => (
                    <li
                      key={index}
                      className="text-(--muted) flex justify-center text-center"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="w-full h-auto flex flex-col justify-center items-center p-5 bg-(--sidebar) space-y-3">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
              Contact
            </h1>

            <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
              Have Any Question?
            </h1>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
