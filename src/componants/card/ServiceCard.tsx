import { useRef } from "react";
import gsap from "gsap";
import type { ServiceType } from "../../storage/type/data-type";
import type { IconType } from "react-icons";
interface ServiceCardProps {
  item: ServiceType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ServiceCard({ item, onClick }: ServiceCardProps) {
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  const handleEnter = () => {
    if (!orbitRef.current) return;

    if (!animation.current) {
      animation.current = gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 2,
        ease: "linear",
        repeat: -1,
        transformOrigin: "center",
        paused: true,
      });
    }

    animation.current.play();
  };

  const handleLeave = () => {
    animation.current?.pause();
  };

  const Icon = item?.icon as IconType;

  return (
    <div
      className="flex flex-col p-5 sm:p-5 md:p-8 bg-(--sidebar) w-full space-y-3 opacity-85 rounded-xl sm:rounded-xl md:rounded-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ICON + ORBIT */}
      <div
        className="relative w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex justify-center items-center 
                      ring-1 ring-(--muted)"
      >
        <Icon className="text-(--foreground) text-4xl sm:text-4xl md:text-4xl " />

        <div
          ref={orbitRef}
          className="absolute w-full h-full flex justify-center items-center"
        >
          {/* DOT 1 */}
          <span className="absolute w-2 h-2 md:w-4 md:h-4 bg-(--muted) rounded-full -top-1 sm:-top-1 md:-top-2"></span>

          {/* DOT 2 (OPPOSITE) */}
          <span className="absolute w-2 h-2 md:w-4 md:h-4 bg-(--muted) rounded-full -bottom-1 sm:-bottom-1 md:-bottom-2"></span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-wide text-(--muted)">
          {item.title}
        </h3>
        <p className="text-sm text-(--foreground) leading-6">
          {item.description}
        </p>
        <button
          className="bg-(--button-color) text-(--foreground) text-sm tracking-wider 
                            ring-2 ring-(--border) w-full sm:w-full md:w-1/3 py-1 sm:py-1 md:py-2 rounded-full uppercase z-10
                            hover:opacity-60 cursor-pointer"
          onClick={onClick}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
