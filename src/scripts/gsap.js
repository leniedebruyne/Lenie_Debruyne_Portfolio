import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);


export const wiggleBadges = () => {
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
      }
    }
  );
};

export const typingTitle = () => {
  const title = document.querySelector(".welcome h3");
  const fullText = title.textContent;
  title.textContent = "";

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
  const fullText = textEl.textContent;
  textEl.textContent = "";

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

