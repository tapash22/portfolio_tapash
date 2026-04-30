import { ContactForm } from "../componants/form/ContactForm";
import { contactInfo } from "../storage/data/contact-data";
import { ContactCard } from "../componants/card/ContactCard";

export default function Contact() {
  return (
    <div className="w-full min-h-full flex items-start relative bg-(--background)">
      {/* contact body */}

      <div className="p-5 sm:p-5 md:p-14 flex flex-col justify-center items-center w-full h-full space-y-3 ">
        {/* contact section */}

        <div className="w-full h-full p-3 sm:p-3 md:px-16 md:py-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactInfo.map((contact) => {
            return <ContactCard key={contact.type} contact={contact} />;
          })}
        </div>
        {/* contact section end*/}

        {/* contact form */}
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

        {/* contact form end*/}
      </div>

      {/* contact body */}
    </div>
  );
}
