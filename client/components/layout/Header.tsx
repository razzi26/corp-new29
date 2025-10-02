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
  { to: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { to: "/services/trainings", label: "Trainings" },
      { to: "/services/seminars", label: "Seminars" },
      { to: "/services/services", label: "Services" },
      { to: "/services/brochures", label: "Brochures" }
    ],
  },
  { to: "/catalog", label: "Catalog" },
  { to: "/blog", label: "Blog" },
  {
    label: "Resources",
    children: [
      { to: "/resources/videos", label: "Videos" },
      { to: "/resources/knowledge-hub", label: "Knowledge Hub" },
      { to: "/resources/podcasts", label: "Podcasts" },
      { to: "/resources/case-studies", label: "Case Studies" },
      { to: "/resources/faq", label: "FAQ" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
          scrolled || open
            ? "bg-white border-b border-white/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white"
            : "bg-transparent border-b border-transparent text-white",
        )}
      >
        <div className="container mx-auto px-4 relative">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex select-none items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] font-bold text-white">
                E
              </span>
              <span
                className={cn(
                  "font-semibold tracking-wide transition-colors",
                  scrolled || open ? "text-slate-900" : "text-white",
                )}
              >
                Esco Biosafety Institute
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-base md:flex">
              {nav.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDesktopSeminarsOpen(true)}
                    onMouseLeave={() => setDesktopSeminarsOpen(false)}
                  >
                    <button
                      className={cn(
                        "inline-flex items-center gap-1 transition-colors",
                        scrolled
                          ? "text-slate-700 hover:text-slate-900"
                          : "text-white/85 hover:text-white",
                      )}
                      aria-expanded={desktopSeminarsOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          desktopSeminarsOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute left-0 top-full min-w-[14rem] rounded-md border bg-white text-slate-900 shadow-md py-1 transition-opacity",
                        desktopSeminarsOpen
                          ? "visible opacity-100"
                          : "invisible opacity-0",
                      )}
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-3 py-2 hover:bg-slate-50"
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
                      "transition-colors",
                      scrolled
                        ? "text-slate-700 hover:text-slate-900"
                        : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link
                to="/contact"
                className="ml-2 inline-flex items-center rounded-full bg-[hsl(var(--brand-end))] px-5 py-2.5 text-base font-semibold text-white shadow transition hover:shadow-md"
              >
                Get a quote
              </Link>
            </nav>

            <button
              className={cn(
                "md:hidden transition-colors",
                open
                  ? "text-slate-900"
                  : scrolled
                    ? "text-slate-700"
                    : "text-white",
              )}
              aria-label="Открыть меню"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {open &&
        createPortal(
          <div className="fixed left-0 right-0 top-16 bottom-0 z-[60] md:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-0 overflow-auto bg-white border-t shadow-lg mobile-menu-scroll">
              <nav className="py-2">
                {nav.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-slate-800"
                        aria-expanded={openSeminars}
                        onClick={() => setOpenSeminars((v) => !v)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSeminars && "rotate-180",
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all",
                          openSeminars ? "max-h-96" : "max-h-0",
                        )}
                      >
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            className="block px-8 py-2 text-slate-700 hover:bg-slate-50"
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
                      className="block px-4 py-3 text-slate-800 hover:bg-slate-50"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <div className="px-4 py-3">
                  <Link
                    to="/contact"
                    className="block w-full rounded-full bg-[hsl(var(--brand-end))] px-5 py-2.5 text-center text-base font-semibold text-white shadow transition hover:shadow-md"
                    onClick={() => setOpen(false)}
                  >
                    Get a quote
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
