import { useEffect, useRef } from "react";
import gsap from "gsap";
// import { fadeInUp } from "../animations/gsap";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/home.png";

export default function Home() {
  const boxRef = useRef<HTMLHeadingElement | null>(null);

  const navigate = useNavigate();

  const handleLink = () => {
    navigate("/contact");
  };

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 200, duration: 1, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      className="
        w-full min-h-screen
        flex flex-col md:flex-row
        items-center
        relative
        overflow-hidden overflow-x-hidden
        bg-(--background)
      "
    >
      {/* LEFT SECTION */}
      <div
        ref={boxRef}
        className="
          relative z-10
          w-full md:w-1/2
          flex flex-col
          space-y-5
          px-6 md:px-5
          pt-16 md:pt-0
        "
      >
        <h1 className="text-2xl font-medium text-(--foreground) tracking-wide">
          I am Tapash Paul
        </h1>

        <h1 className="text-4xl font-bold tracking-wider text-(--foreground)">
          Front End Developer
        </h1>

        <button
          onClick={handleLink}
          className="
            bg-(--button-color)
            text-(--foreground)
            font-normal tracking-wider
            ring-1 ring-(--border)
            w-fit
            px-6 py-2
            rounded-full uppercase
          "
        >
          Contact Me
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="
          absolute md:static
          left-0 top-0
          w-full md:w-1/2
          h-full
          flex justify-end items-center
          p-3 md:p-0
          z-0
          bg-gray-900
        "
      >
        <img
          src={image}
          className="
            w-full md:w-auto
            max-w-[90%] md:max-w-full
            object-cover
            opacity-90
          "
        />
      </div>
    </div>
  );
}
