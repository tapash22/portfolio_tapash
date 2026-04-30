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
        y: 40,
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
      className="fixed inset-0 flex items-start md:items-center justify-center p-3 sm:p-4 pointer-events-none opacity-0 h-full"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="
          relative
          w-[95%] sm:w-[95%] md:w-2/3
          max-h-[80vh] md:max-h-[80vh]
          flex flex-col
          backdrop-blur-xl
          ring-2 ring-(--border)
          rounded-lg md:rounded-xl
          shadow-xl
          overflow-hidden
        "
      >
        {/* HEADER (SAFE TOP AREA FIX) */}
        <div
          className="
            w-full border-b border-(--border)
            pt-2.5 pb-3 sm:pt-4 sm:pb-4 md:p-5
            px-4 sm:px-5
            flex items-center justify-between
          "
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-(--foreground) tracking-wide">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>

          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:scale-110 transition"
          >
            <IoCloseCircleOutline
              size={24}
              className="sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 text-(--foreground)"
            />
          </button>
        </div>

        {/* BODY (SCROLL ONLY WHEN NEEDED) */}
        <div
          className="
            flex-1 min-h-0
            px-3 py-3 sm:px-4 sm:py-4 md:p-5
            overflow-y-auto scrollbar-thin
          "
        >
          {children}
        </div>

        {/* FOOTER */}
        {showFooter && (
          <div
            className="
              px-3 py-3 sm:px-4 sm:py-4 md:p-5
              border-t border-(--border)
              flex flex-col sm:flex-row
              justify-end gap-2 sm:gap-3
            "
          >
            {footerContent ?? (
              <>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-500 text-white">
                  Save
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
