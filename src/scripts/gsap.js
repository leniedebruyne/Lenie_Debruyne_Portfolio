import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const wiggleBadges = () => {
  if (prefersReducedMotion) {
    gsap.set(".badge", { rotate: 0 });
    return;
  }

  document.querySelectorAll(".badge").forEach((badge, index) => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 4,
      delay: index * 1,
    });

    tl.to(badge, {
      rotate: 1,
      duration: 0.2,
      ease: "sine.inOut",
    })
      .to(badge, {
        rotate: -2,
        duration: 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2,
      })
      .to(badge, {
        rotate: 0,
        duration: 0.2,
        ease: "sine.inOut",
      });
  });
};

export const slideInPhoto = () => {
  if (prefersReducedMotion) {
    gsap.set(".about img", { x: 0, opacity: 1 });
    return;
  }

  gsap.fromTo(
    ".about img",
    { x: -300, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    }
  );
};

export const typingTitle = () => {
  const title = document.querySelector(".welcome h3");
  if (!title) return;
  const fullText = title.textContent;
  title.textContent = "";

  if (prefersReducedMotion) {
    title.textContent = fullText; 
    return;
  }

  ScrollTrigger.create({
    trigger: ".welcome",
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(title, {
        duration: 2.5,
        text: fullText,
        ease: "none",
      });
    },
  });
};

export const pulse2025 = () => {
  if (prefersReducedMotion) {
    gsap.set(".project-box p", { scale: 1 });
    return;
  }

  gsap.to(".project-box p", {
    scale: 1.1,
    duration: 1,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  });
};

export const typingDesignPage = () => {
  const textEl = document.querySelector(".design--header-cat-bubble p");
  if (!textEl) return;
  const fullText = textEl.textContent;
  textEl.textContent = "";

  if (prefersReducedMotion) {
    textEl.textContent = fullText; 
    return;
  }

  ScrollTrigger.create({
    trigger: ".design--header-cat-wrapper",
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(textEl, {
        duration: 2,
        text: fullText,
        ease: "none",
      });
    },
  });
};