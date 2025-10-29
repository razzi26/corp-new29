import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

const nav: Array<{
  label: string;
  to?: string;
  children?: { to: string; label: string }[];
}> = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  {
    label: "Trainings",
    to: "/trainings",
    children: [
      { to: "/trainings/about", label: "About Trainings" },
      { to: "/trainings/seminars", label: "Seminars" },
      { to: "/trainings/services", label: "Services" },
      { to: "/trainings/brochures", label: "Brochures" },
    ],
  },
  // { to: "/products", label: "Products" },
  { to: "/news", label: "News" },
  {
    label: "Knowledge Hub",
    to: "/resources",
    children: [
      { to: "/resources/videos", label: "Videos" },
      { to: "/resources/articles", label: "Articles" },
      { to: "/resources/quizzes", label: "Quizzes" },
      { to: "/resources/podcasts", label: "Podcasts" },
      { to: "/resources/case-studies", label: "Case Studies" },
      { to: "/resources/faq", label: "FAQ" },
    ],
  },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const isProductDetail =
    location.pathname.startsWith("/products/") &&
    location.pathname !== "/products";

  useEffect(() => {
    const anchor = document.querySelector<HTMLElement>("[data-header-anchor]");
    const headerHeight = 72;

    const update = () => {
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setScrolled(window.scrollY > 4 || rect.bottom <= headerHeight);
      } else {
        setScrolled(window.scrollY > 4);
      }
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      setOpenSubmenuKey(null);
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setOpenSubmenuKey(null);
    setDesktopOpenKey(null);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[9999] transition-colors duration-300",
          scrolled || open || isProductDetail
            ? "bg-white border-b-2 border-slate-200 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white"
            : "bg-[hsl(var(--primary))]/95 border-b-2 border-[hsl(var(--primary))]/20 text-white",
        )}
      >
        <div className="container mx-auto px-4 relative">
          <div className="flex h-20 items-center justify-between md:grid md:grid-cols-[auto_1fr_auto]">
            <Link to="/" className="flex select-none items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(205_100%_20%)] font-bold text-white text-lg shadow-md">
                E
              </span>
              <span
                className={cn(
                  "font-bold tracking-wide transition-colors text-lg",
                  scrolled || open || isProductDetail
                    ? "text-[hsl(var(--primary))]"
                    : "text-white",
                )}
              >
                Esco Biosafety
              </span>
            </Link>

            <nav className="hidden items-center gap-8 text-base md:flex md:justify-self-center font-semibold">
              {nav.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpenKey(item.label)}
                    onMouseLeave={() => setDesktopOpenKey(null)}
                  >
                    <Link
                      to={item.to ?? "/resources"}
                      className={cn(
                      "inline-flex items-center gap-2 transition-colors py-2 px-1",
                      scrolled || isProductDetail
                        ? "text-[hsl(var(--primary))] hover:text-brand-secondary"
                        : "text-white hover:text-brand-secondary",
                    )}
                      aria-expanded={desktopOpenKey === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          desktopOpenKey === item.label && "rotate-180",
                        )}
                      />
                    </Link>
                    <div
                      className={cn(
                        "absolute left-0 top-full min-w-[16rem] rounded-lg border-2 border-slate-200 bg-white text-[hsl(var(--primary))] shadow-xl py-2 transition-opacity",
                        desktopOpenKey === item.label
                          ? "visible opacity-100"
                          : "invisible opacity-0",
                      )}
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-4 py-3 hover:bg-[hsl(var(--primary))]/5 font-medium transition border-l-4 border-transparent hover:border-[hsl(var(--primary))]"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to!}
                    className={cn(
                      "transition-colors py-2 px-1",
                      scrolled || isProductDetail
                        ? "text-[hsl(var(--primary))] hover:text-[hsl(205_100%_35%)]"
                        : "text-white hover:text-white/80",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden md:flex justify-self-end">
              <Link
                to="/contact"
                className={cn(
                  "inline-flex items-center rounded-lg px-6 py-2.5 text-base font-bold transition",
                  scrolled || open || isProductDetail
                    ? "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(205_100%_20%)]"
                    : "bg-white text-[hsl(var(--primary))] hover:bg-slate-100",
                )}
              >
                Contact Us
              </Link>
            </div>

            <button
              className={cn(
                "md:hidden transition-colors p-2",
                open
                  ? "text-[hsl(var(--primary))]"
                  : scrolled || isProductDetail
                    ? "text-[hsl(var(--primary))]"
                    : "text-white",
              )}
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {open &&
        createPortal(
          <div className="fixed left-0 right-0 top-20 bottom-0 z-[60] md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-0 overflow-auto bg-white border-t-2 border-slate-200 shadow-2xl mobile-menu-scroll">
              <nav className="py-4">
                {nav.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <div className="flex w-full items-center justify-between px-6 py-4 text-left text-[hsl(var(--primary))] font-bold border-b border-slate-100">
                        <Link
                          to={item.to ?? "/resources"}
                          className="flex-1"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <button
                          aria-label="Toggle submenu"
                          aria-expanded={openSubmenuKey === item.label}
                          onClick={() =>
                            setOpenSubmenuKey(
                              openSubmenuKey === item.label ? null : item.label,
                            )
                          }
                          className="px-2 ml-2"
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              openSubmenuKey === item.label && "rotate-180",
                            )}
                          />
                        </button>
                      </div>
                      <div
                        className={cn(
                          "overflow-hidden transition-all bg-slate-50",
                          openSubmenuKey === item.label
                            ? "max-h-96"
                            : "max-h-0",
                        )}
                      >
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            className="block px-10 py-3 text-[hsl(var(--primary))] font-semibold hover:bg-slate-100 border-l-4 border-transparent hover:border-[hsl(var(--primary))]"
                            onClick={() => setOpen(false)}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to!}
                      className="block px-6 py-4 text-[hsl(var(--primary))] font-bold hover:bg-slate-50 border-b border-slate-100"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <div className="px-6 py-6 border-t-2 border-slate-200">
                  <Link
                    to="/contact"
                    className="block w-full rounded-lg px-6 py-3.5 text-center text-base font-bold shadow-lg transition hover:shadow-xl bg-[hsl(var(--primary))] text-white hover:bg-[hsl(205_100%_20%)]"
                    onClick={() => setOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
