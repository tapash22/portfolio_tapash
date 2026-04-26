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
      className="flex flex-col p-8 bg-(--sidebar) w-full space-y-3 opacity-85 rounded-xl sm:rounded-xl md:rounded-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ICON + ORBIT */}
      <div
        className="relative w-24 h-24 rounded-full flex justify-center items-center 
                      ring-1 ring-(--muted)"
      >
        <Icon size={40} className="text-(--foreground) " />

        <div
          ref={orbitRef}
          className="absolute w-full h-full flex justify-center items-center"
        >
          {/* DOT 1 */}
          <span className="absolute w-4 h-4 bg-(--muted) rounded-full -top-2"></span>

          {/* DOT 2 (OPPOSITE) */}
          <span className="absolute w-4 h-4 bg-(--muted) rounded-full -bottom-2"></span>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-xl font-bold tracking-wide text-(--muted)">
          {item.title}
        </h3>
        <p className="text-sm text-(--foreground) leading-6">
          {item.description}
        </p>
        <button
          className="bg-(--button-color) text-(--foreground) text-sm tracking-wider 
                            ring-2 ring-(--border) w-1/3 py-2 rounded-full uppercase z-10
                            hover:opacity-60 cursor-pointer"
          onClick={onClick}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
