import gsap from "gsap";

export const fadeInUp = (el: HTMLElement | null, delay = 0) => {
  if (!el) return;

  gsap.fromTo(
    el,
    { opacity: 0, y: -40 },
    { opacity: 1, y: 100, duration: 1, delay },
  );
};
