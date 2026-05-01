import gsap from "gsap";

export const pageExit = (
  el: HTMLElement,
  callback: () => void,
  isForward: boolean,
) => {
  gsap.to(el, {
    opacity: 0,
    y: isForward ? -80 : 80, // 🔥 forward = up, back = down
    filter: "blur(10px)",
    duration: 0.45,
    ease: "power2.inOut",
    onComplete: () => {
      console.log("🔥 EXIT COMPLETE");
      callback();
    },
  });
};

export const pageEnter = (el: HTMLElement, isForward: boolean) => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      y: isForward ? 80 : -80, // 🔥 opposite of exit
      filter: "blur(10px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.55,
      ease: "power3.out",

      onStart: () => {
        el.style.pointerEvents = "none";
        el.style.willChange = "transform, opacity";
      },

      onComplete: () => {
        el.style.pointerEvents = "auto";
        el.style.willChange = "auto";
        console.log("✅ ENTER COMPLETE");
      },
    },
  );
};
