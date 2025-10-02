import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

export default function SiteLayout() {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  // Show overlay-like scrollbar on mobile only while user interacts
  useEffect(() => {
    if (!isMobile) {
      document.body.classList.remove("scrolling-mobile");
      return;
    }

    // Create indicator element
    let indicator = document.getElementById("mobile-scroll-indicator");
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.id = "mobile-scroll-indicator";
      document.body.appendChild(indicator);
    }

    const thumb = document.createElement("div");
    thumb.className = "mobile-scroll-thumb";
    indicator.appendChild(thumb);

    let timer: number | undefined;
    const show = () => {
      document.body.classList.add("scrolling-mobile");
      indicator!.classList.add("visible");
      update();
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        document.body.classList.remove("scrolling-mobile");
        indicator!.classList.remove("visible");
      }, 800);
    };

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.clientHeight;
      const scrollHeight = doc.scrollHeight;
      const ratio = Math.max(0, Math.min(1, height / scrollHeight));
      const thumbHeight = Math.max(24, Math.round(ratio * height));
      const maxTop = Math.max(0, height - thumbHeight);
      const top = Math.round((scrollTop / (scrollHeight - height)) * maxTop) || 0;
      thumb.style.height = thumbHeight + "px";
      thumb.style.transform = `translateY(${top}px)`;
    };

    window.addEventListener("scroll", show, { passive: true });
    window.addEventListener("touchstart", show, { passive: true });
    window.addEventListener("pointerdown", show, { passive: true });
    window.addEventListener("resize", update);

    // show briefly on mount
    show();

    return () => {
      window.removeEventListener("scroll", show);
      window.removeEventListener("touchstart", show);
      window.removeEventListener("pointerdown", show);
      window.removeEventListener("resize", update);
      if (timer) window.clearTimeout(timer);
      document.body.classList.remove("scrolling-mobile");
      if (indicator && indicator.parentElement) indicator.parentElement.removeChild(indicator);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
