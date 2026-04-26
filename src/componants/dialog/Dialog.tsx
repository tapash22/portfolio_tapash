import { useEffect, useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import gsap from "gsap";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
};

export function Dialog({
  open,
  onClose,
  children,
  title = "Dialog Title",
  showFooter = false,
  footerContent,
}: DialogProps) {
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
        className="relative w-2/3 h-3/4 flex flex-col space-y-3 backdrop-blur-xl ring-2 ring-(--border) rounded-xl shadow-xl"
      >
        {/*  HEADER */}
        <div className="w-full border-b border-(--border) p-5 flex items-center justify-between">
          {/* dialog title */}
          <h2 className="text-2xl font-bold text-(--foreground) tracking-wide">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>
          {/* dialog title end*/}

          {/* dialog close icon */}
          <button onClick={onClose} className="cursor-pointer">
            <IoCloseCircleOutline size={30} className="text-white" />
          </button>
          {/* dialog close icon end*/}
        </div>
        {/*  HEADER end*/}

        {/* 🔹 BODY */}
        <div className="flex-1 p-5 overflow-y-auto scrollbar-thin">
          {children}
        </div>
        {/* BODY end */}

        {/*  FOOTER (isHave) */}
        {showFooter && (
          <div className="p-5 border-t border-(--border) flex justify-end gap-3">
            {footerContent ?? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                  Save
                </button>
              </>
            )}
          </div>
        )}
        {/*  FOOTER end*/}
      </div>
    </div>
  );
}
