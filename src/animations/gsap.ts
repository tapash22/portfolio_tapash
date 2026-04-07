import gsap from "gsap";

export const fadeInUp = (el: HTMLElement | null) => {
  if (!el) return;

  gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
};
