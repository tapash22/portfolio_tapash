import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import { type SocialMediaItems } from "../../storage/type/data-type";
import { resolveColor } from "../../utils/resolveColor";

interface SocialMediaListProps {
  socailMediaItems?: SocialMediaItems;
  listDirection?: string;
  backgroundColor?: string;
  iconSize?: number;
  iconColor?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
export function SocialMediaList({
  socailMediaItems,
  backgroundColor = "--sidebar",
  listDirection = "row",
  iconSize = 20,
  iconColor = "--foreground",
  onClick,
  children,
}: SocialMediaListProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (!itemsRef.current.length) return;

    // initial state
    gsap.set(itemsRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.8,
    });

    // stagger animation
    gsap.to(itemsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
    });
  }, [socailMediaItems]);

  const handleClickAnim = (el: HTMLElement) => {
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 },
    );
  };

  const resolvedBackground = resolveColor(backgroundColor ?? "background");
  const resolvedIconColor = resolveColor(iconColor);
  return (
    <div
      className="w-full p-0 md:p-2 flex justify-center items-center bg-(--sidebar)/50 backdrop-blur-lg shadow-(--footer-shadow)"
      style={{ background: resolvedBackground }}
    >
      {socailMediaItems && socailMediaItems?.length > 0 && (
        <ul
          ref={listRef}
          className={`flex ${
            listDirection === "col" ? "flex-col" : "flex-row"
          } w-auto h-full p-0 md:p-2 space-x-1`}
        >
          {socailMediaItems.map((item, index) => {
            //declear icon type
            const Icon: IconType = item.icon;

            return (
              <li
                key={index}
                onClick={(e) => {
                  onClick?.();
                  handleClickAnim(e.currentTarget);
                }}
                className="group relative w-auto h-auto p-3 flex justify-center items-center cursor-pointer"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Icon
                    size={iconSize}
                    style={{ color: resolvedIconColor }}
                    className=" group-hover:text-cyan-400 transition duration-300
                 group-hover:drop-shadow-[0_0_8px_#22d3ee]"
                  />
                </a>

                {/* SVG BORDER */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none "
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    className="stroke-(--neon) fill-transparent stroke-1
                  [stroke-dasharray:326]
                    [stroke-dashoffset:326]
                    transition-all duration-500
                    group-hover:[stroke-dashoffset:0]"
                  />
                </svg>
              </li>
            );
          })}
        </ul>
      )}

      {children && (
        <div
          className={`flex flex-${listDirection} w-full h-full p-2 space-y-2 space-x-2`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
