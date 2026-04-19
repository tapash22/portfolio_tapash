import { useRef } from "react";
import gsap from "gsap";
interface ServiceCardProps {
  item: any;
}

export function ServiceCard({ item }: ServiceCardProps) {
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

  const Icon = item.icon;

  return (
    <div
      className="flex flex-col p-8 bg-(--sidebar) w-full space-y-3 opacity-85"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ICON + ORBIT */}
      <div
        className="relative w-24 h-24 rounded-full flex justify-center items-center 
                      ring-1 ring-(--muted)"
      >
        <Icon size={40} className="text-(--foreground) z-10" />

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
                            ring-2 ring-(--border) w-1/3 py-2 rounded-full uppercase z-40
                            hover:opacity-60 cursor-pointer"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
