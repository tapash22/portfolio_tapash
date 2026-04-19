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
    <div className="w-full h-screen flex items-center bg-(--sidebar)">
      {/* left sectection */}
      <div className="w-1/2 h-auto p-8 flex justify-center items-center   ">
        <img
          src={image}
          className="w-fit h-auto rounded-xl shadow-(--shadow) scale-75 "
        />
      </div>
      {/* left sectection end */}

      {/* right sectection */}
      <div className="w-1/2 h-auto p-5 flex flex-col justify-start space-y-5">
        <div className="w-14 h-14 rounded-lg p-2 flex justify-center items-center bg-(--box) ">
          <PiDesktop size={40} />
        </div>
        <h1 className="text-3xl font-bold tracking-wide text-(--foreground) text-wrap w-2/3 ">
          Professional Frontend Developer & Creative UI Engineer
        </h1>
        <p className="text-lg font-light text-(--muted) tracking-wide text-wrap ">
          Discover top web design and development companies tailored to your
          business needs. Our carefully curated directory features highly
          reviewed firms specializing in modern, scalable, and user-focused
          solutions. From enterprise-level design to startup-friendly services,
          we connect you with experts in custom web solutions, eCommerce
          platforms, and mobile app development. Whether you need a stunning
          landing page or a full-scale application, these firms deliver
          high-quality results with a focus on performance, security, and user
          experience. Services include web design, landing page creation, mobile
          website design, and app development, all supported by secure systems
          and reliable customer support.
        </p>

        <p className="text-xl font-light tracking-wider text-(--foreground) ">
          Frontend Developer of Anwar Technology
        </p>

        <button
          onClick={openDialog}
          className="bg-(--button-color) text-(--foreground) font-normal tracking-wider uppercase ring-1 ring-(--border) w-1/4 p-2 my-2 rounded-full "
        >
          More About
        </button>
      </div>
      {/* right sectection end */}
    </div>
  );
}
