import { useEffect, useRef } from "react";
import gsap from "gsap";
// import { fadeInUp } from "../animations/gsap";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/yy.png";

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
      { opacity: 1, x: 100, duration: 1, ease: "power3.out" },
    );
  }, []);

  return (
    <div className="w-full h-screen flex items-center relative overflow-hidden bg-(--background)">
      <div
        ref={boxRef}
        className="relative z-10 w-1/2 flex flex-col space-y-5 px-5 "
      >
        <h1 className="text-2xl font-medium text-(--foreground) tracking-wide">
          I am Tapash Paul
        </h1>

        <h1 className="text-4xl font-bold tracking-wider text-(--foreground)">
          Front End Developer
        </h1>

        <button
          onClick={handleLink}
          className="bg-(--button-color) text-(--foreground) font-normal tracking-wider ring-1 ring-(--border) w-1/4 p-2 rounded-full uppercase "
        >
          Contact Me
        </button>
      </div>
      <div
        className="absolute left-0  w-full h-full flex justify-end items-cente p-3  z-0 
              bg-[linear-gradient(to_bottom,var(--background),var(--background))] opacity-50"
      >
        <img src={image} className="object-cover  backdrop-brightness-90  " />
      </div>
    </div>
  );
}
