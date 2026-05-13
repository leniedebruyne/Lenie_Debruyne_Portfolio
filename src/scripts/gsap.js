import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealFromTo = (targets, fromVars, toVars) => {
  const elements = gsap.utils.toArray(targets);
  if (!elements.length) return;

  if (prefersReducedMotion) {
    gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
    return;
  }

  gsap.fromTo(elements, fromVars, toVars);
};

const revealOnScroll = (targets, fromVars, toVars, trigger, start = "top 80%") => {
  const elements = gsap.utils.toArray(targets);
  if (!elements.length) return;

  if (prefersReducedMotion) {
    gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
    return;
  }

  gsap.fromTo(elements, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
};

const animateProjectPageTitle = () => {
  const titleLayers = document.querySelectorAll(".design--header-title span");
  if (!titleLayers.length) return;

  revealFromTo(
    titleLayers,
    { opacity: 0, y: 24, rotate: -2 },
    {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
    }
  );
};

const animateProjectPageText = () => {
  revealFromTo(
    ".design--header-text p",
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12,
      delay: 0.2,
    }
  );
};


const animateProjectPageSections = ({ textDuration = 0.7, mediaDuration = 0.9, stagger = 0.1, overlap = -0.35 } = {}) => {
  document.querySelectorAll(".moodboard-section").forEach((section) => {
    const sectionText = section.querySelectorAll(
      ".moodboard-texts > *, .moodboard-description > *, .moodboard-texts h3, .moodboard-texts .hashtag"
    );
    const sectionMedia = section.querySelectorAll(".moodboard-image img, .moodboard-image video");

    if (prefersReducedMotion) {
      gsap.set(sectionText, { opacity: 1, y: 0 });
      gsap.set(sectionMedia, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 76%",
        once: true,
      },
    });

    if (sectionText.length) {
      sectionTimeline.fromTo(
        sectionText,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: textDuration,
          ease: "power3.out",
          stagger,
        }
      );
    }

    if (sectionMedia.length) {
      sectionTimeline.fromTo(
        sectionMedia,
        { opacity: 0, y: 36, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: mediaDuration,
          ease: "power3.out",
        },
        sectionText.length ? `-=${Math.abs(overlap)}` : 0
      );
    }
  });
};

const animateProjectPageCallout = () => {
  document.querySelectorAll(".double_diamond--title, .umwelt--title").forEach((title) => {
    revealOnScroll(
      title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      title
    );
  });

  document.querySelectorAll(".dubble-diamond--text").forEach((textBlock) => {
    revealOnScroll(
      textBlock.querySelectorAll("p"),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.12,
      },
      textBlock
    );
  });
};

export const animateProjectPage = () => {
  animateProjectPageTitle();
  animateProjectPageText();
  animateProjectPageSections();
  animateProjectPageCallout();
};

export const animateDesignPage = () => {
  animateProjectPageTitle();
  animateProjectPageText();
  animateProjectPageSections({
    textDuration: 0.55,
    mediaDuration: 0.7,
    stagger: 0.08,
    overlap: -0.2,
  });
  animateProjectPageCallout();
};

export const animateMotionPage = () => {
  animateProjectPageTitle();
  animateProjectPageText();
  animateProjectPageSections({
    textDuration: 0.55,
    mediaDuration: 0.7,
    stagger: 0.08,
    overlap: -0.2,
  });
  animateProjectPageCallout();
  typingDesignPage();
};

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

