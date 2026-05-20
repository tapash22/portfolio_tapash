import { forwardRef, type ForwardedRef } from "react";
import defaultImage from "/images/about.png";

interface ProfileImageProps {
  src?: string;
  alt?: string;
}

export const ProfileImage = forwardRef(
  (
    { src = defaultImage, alt = "Profile" }: ProfileImageProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div className="w-full max-w-95 md:w-1/2 z-20">
        <div className="relative p-1.5 ring-1 ring-(--border) rounded-2xl bg-(--background)/40 shadow-(--shadow)">
          <img
            src={src}
            alt={alt}
            className="object-cover rounded-xl w-full h-auto"
          />
          {/* Animated anchor point dot */}
          <div
            ref={ref}
            className="absolute left-1/2 -bottom-1.5 md:left-auto md:top-1/2 md:-right-1.5 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4] z-30"
          />
        </div>
      </div>
    );
  },
);
