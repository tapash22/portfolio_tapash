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
      className="w-full h-full flex flex-col sm:flex-col md:flex-row 
         justify-start sm:justify-start md:justify-center items-start sm:items-start md:items-center 
         relative bg-(--background)  "
    >
      {/* left sectection */}
      <div
        className="w-full sm:w-full md:w-1/3 h-full p-1 sm:p-1 
                     flex justify-center items-center"
      >
        <img
          src={image}
          className="object-cover rounded-xl shadow-(--shadow) scale-75 "
        />
      </div>
      {/* left sectection end */}

      {/* right sectection */}
      <div
        className="
                  w-full sm:w-full md:w-2/3 h-auto sm:auto md:h-full px-10 sm:px-10 pb-5 sm:pb-5 md:pb-0 
                   md:p-14 flex flex-col justify-center items-center sm:items-center 
                  md:items-start sm:justify-center md:justify-center space-y-3 "
      >
        <div
          className="w-14 h-14 rounded-lg p-2 
                        flex justify-center items-center bg-(--box) "
        >
          <PiDesktop size={40} />
        </div>

        <div className="flex flex-col space-y-3 items-center md:items-start">
          <h1
            className="text-2xl sm:text-2xl md:text-3xl 
                       font-medium sm:font-medium md:font-bold tracking-wide 
                       text-(--foreground) text-wrap w-full sm:w-full md:w-2/3 
                       text-center sm:text-center md:text-start leading-8 "
          >
            Professional Frontend Developer & Creative UI Engineer
          </h1>
          <p
            className="text-lg font-light text-(--foreground) tracking-wider text-wrap 
                      text-center sm:text-center md:text-start leading-8  "
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
            className="w-fit text-xl font-medium tracking-wider text-(--foreground) text-center sm:text-center md:text-start
             border-b-2 border-(--border) pb-2 sm:pb-2 md:pb-3"
          >
            Frontend Developer at Anwar Technology
          </p>

          <button
            onClick={openDialog}
            className="bg-(--button-color) text-sm text-(--foreground) 
                    font-normal tracking-wider uppercase ring-1 ring-(--border) 
                    w-3/4 sm:w-3/4 md:w-1/4 p-2 my-2 rounded-full "
          >
            More About
          </button>
        </div>
      </div>
      {/* right sectection end */}
    </div>
  );
}
