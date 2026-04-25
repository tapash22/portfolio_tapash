import { useEffect, useRef } from "react";
import gsap from "gsap";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Dialog({ open, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialogRef.current || !wrapperRef.current) return;

    if (open) {
      gsap.set(wrapperRef.current, { pointerEvents: "auto" });

      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );

      gsap.fromTo(
        dialogRef.current,
        { scale: 0.7, opacity: 0, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(dialogRef.current, {
        scale: 0.7,
        opacity: 0,
        y: 80,
        duration: 0.4,
        ease: "power3.in",
      });

      gsap.to(wrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(wrapperRef.current, { pointerEvents: "none" });
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none opacity-0"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-2/3 h-3/4 p-7 flex flex-col space-y-3 backdrop-blur-xl ring-2 ring-(--border) rounded-xl shadow-xl"
      >
        {children}
      </div>
    </div>
  );
}
