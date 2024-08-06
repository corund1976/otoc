import { useState, useEffect } from 'react'

const useScrollDetection = (threshold = 0) => {
  const [scrollDir, setScrollDir] = useState("scrolling down");
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      setScrollAmount(scrollY)

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir, threshold]);

  return {
    isScrollDown: scrollDir === "scrolling down",
    isScrollUp: scrollDir === 'scrolling up',
    scrollY: scrollAmount,
  }
}

export default useScrollDetection