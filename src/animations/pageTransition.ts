import gsap from "gsap";

export const pageExit = (el: HTMLElement, callback: () => void) => {
  gsap.to(el, {
    opacity: 0,
    y: -60,
    filter: "blur(12px)",
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      console.log("🔥 EXIT ANIMATION COMPLETE");
      callback();
    },
  });
};

export const pageEnter = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      y: 60,
      filter: "blur(12px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out",
      onStart: () => {
        console.log("🚀 ENTER START");
      },
      onComplete: () => {
        console.log("✅ ENTER COMPLETE");
      },
    },
  );
};
