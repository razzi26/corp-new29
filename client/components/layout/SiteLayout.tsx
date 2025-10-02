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

    let timer: number | undefined;
    const show = () => {
      document.body.classList.add("scrolling-mobile");
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => document.body.classList.remove("scrolling-mobile"), 800);
    };

    window.addEventListener("scroll", show, { passive: true });
    window.addEventListener("touchstart", show, { passive: true });
    window.addEventListener("pointerdown", show, { passive: true });

    // show briefly on mount
    show();

    return () => {
      window.removeEventListener("scroll", show);
      window.removeEventListener("touchstart", show);
      window.removeEventListener("pointerdown", show);
      if (timer) window.clearTimeout(timer);
      document.body.classList.remove("scrolling-mobile");
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
