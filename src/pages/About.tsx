// import { useState } from "react";
import { PiDesktop } from "react-icons/pi";
// import image from "../assets/images/tapash.png";
import image from "../assets/images/about.png";

export default function About() {
  // const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    console.log("click");
  };
  return (
    <div
      className="w-full h-auto flex flex-col sm:flex-col md:flex-row 
         justify-start sm:justify-start md:justify-center items-start sm:items-start md:items-center 
         relative bg-(--background) p-5 sm:p-5 md:p-14 space-y-5 sm:space-y-5 md:space-y-0 "
    >
      {/* left sectection */}
      <div
        className="w-full sm:w-full md:w-1/3 h-auto 
        flex justify-start md:justify-center
        items-start md:items-center p-3
        "
      >
        <img
          src={image}
          className="object-cover rounded-xl shadow-(--shadow-footer) scale-100 max-w-auto max-h-auto ring-1 ring-(--border) p-1"
        />
      </div>
      {/* left sectection end */}

      {/* right sectection */}
      <div
        className="
                  w-full sm:w-full md:w-2/3 h-full sm:h-full md:h-full p-3
                  flex flex-col justify-center items-center sm:items-center 
                  md:items-start sm:justify-center md:justify-center space-y-5 "
      >
        <div
          className="w-14 h-14 rounded-xl md:rounded-sm  p-2 
                        flex justify-center items-center bg-transparent md:bg-(--box) shadow-(--shadow-footer) ring-1 ring-(--border) md:ring-0 opacity-80 md:opacity-50 "
        >
          <PiDesktop
            size={40}
            className="text-(--foreground) md:text-(--border)"
          />
        </div>

        <div className="flex flex-col space-y-3 md:space-y-5 items-center md:items-start">
          <h1
            className="text-xl sm:text-xl md:text-3xl 
                       font-medium sm:font-medium md:font-bold tracking-wide 
                       text-(--foreground) text-wrap w-full sm:w-full md:w-2/3 
                       text-center sm:text-center md:text-start leading-7 md:leading-10
                      border-b-2 border-t-2 md:border-b-0 md:border-t-0 border-(--border) py-3 md:py-0 "
          >
            Professional Frontend Developer & Creative UI Engineer
          </h1>
          <p
            className="text-sm md:text-lg font-light text-(--foreground) tracking-wider text-wrap 
                      text-justify sm:text-center md:text-start leading-6 md:leading-9 "
          >
            Discover top web design and development companies tailored to your
            business needs. Our carefully curated directory features highly
            reviewed firms specializing in modern, scalable, and user-focused
            solutions. From enterprise-level design to startup-friendly
            services, we connect you with experts in custom web solutions,
            eCommerce platforms, and mobile app development. Whether you need a
            stunning landing page or a full-scale application, these firms
            deliver high-quality results with a focus on performance, security,
            and user experience. Services include web design, landing page
            creation, mobile website design, and app development, all supported
            by secure systems and reliable customer support.
          </p>

          <p
            className="w-fit text-sm md:text-lg font-semibold tracking-wider text-(--foreground) text-center sm:text-center md:text-start whitespace-nowrap
             border-b-2 border-t-2 md:border-t-0 border-(--border) p-3 "
          >
            Frontend Developer at Anwar Technology
          </p>

          <button
            onClick={openDialog}
            className="bg-(--button-color) text-sm text-(--foreground) 
                    font-normal tracking-wider uppercase ring-1 ring-(--border) 
                    w-1/2 sm:w-1/2 md:w-1/4 p-2 my-2 rounded-full "
          >
            More About
          </button>
        </div>
      </div>
      {/* right sectection end */}
    </div>
  );
}
