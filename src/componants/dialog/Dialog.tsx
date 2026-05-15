import gsap from "gsap";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showFooter?: boolean;
  footerContent?: (() => React.ReactNode) | React.ReactNode;
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
    if (!open || !dialogRef.current || !wrapperRef.current) return;

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
    );

    gsap.fromTo(
      dialogRef.current,
      { scale: 0.9, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.25 },
    );
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={wrapperRef}
      className=" fixed inset-0 z-9
        flex items-center justify-center
        mt-10 md:mt-0 
        p-0 sm:p-6 md:p-10
        bg-(--background)/40 backdrop-blur-xs"
      onClick={onClose}
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          md:ml-[20%]
          w-[85%] sm:w-[85%] md:w-2/3
          max-h-[80vh] md:max-h-[85vh]
          flex flex-col
          backdrop-blur-xs
          ring-1 ring-(--border)
          rounded-xl
          shadow-(--shadow)
          overflow-hidden
          bg-(--background)/30

        "
      >
        {/* HEADER (SAFE TOP AREA FIX) */}
        <div
          className="
            w-full border-b-4 border-(--border)
            p-4 
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
            <IoCloseCircleOutline className="text-2xl sm:text-2xl md:text-4xl  text-(--foreground)" />
          </button>
        </div>

        {/* BODY (SCROLL ONLY WHEN NEEDED) */}
        <div
          className="
            flex-1 min-h-0
            px-3 sm:px-4 sm:py-4 md:p-5
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
              flex flex-row justify-center items-center
              md:justify-end gap-2 sm:gap-3
            "
          >
            {footerContent && (
              <div className="flex flex-row  gap-4">
                {typeof footerContent === "function"
                  ? footerContent()
                  : footerContent}
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
