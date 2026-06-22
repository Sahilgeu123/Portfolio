import { useEffect } from "react";

export default function useScrollAnimation(selector = ".scroll-hidden") {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // stagger effect
            setTimeout(() => {
              entry.target.classList.add("scroll-show");
            }, index * 150);
          } else {
            entry.target.classList.remove("scroll-show"); // optional re-hide
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}