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
    children: [
      { to: "/trainings", label: "Trainings" },
      { to: "/trainings/seminars", label: "Seminars" },
      { to: "/trainings/services", label: "Services" },
      { to: "/trainings/brochures", label: "Brochures" },
    ],
  },
  { to: "/products", label: "Products" },
  { to: "/news", label: "News" },
  {
    label: "Knowledge Hub",
    children: [
      { to: "/resources/videos", label: "Videos" },
      { to: "/resources/articles", label: "Articles" },
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
            ? "bg-white border-b border-white/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white"
            : "bg-transparent border-b border-transparent text-white",
        )}
      >
        <div className="container mx-auto px-4 relative">
          <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[auto_1fr_auto]">
            <Link to="/" className="flex select-none items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] font-bold text-white">
                E
              </span>
              <span
                className={cn(
                  "font-semibold tracking-wide transition-colors",
                  scrolled || open || isProductDetail
                    ? "text-slate-900"
                    : "text-white",
                )}
              >
                Esco Biosafety Institute
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-base md:flex md:justify-self-center">
              {nav.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpenKey(item.label)}
                    onMouseLeave={() => setDesktopOpenKey(null)}
                  >
                    <button
                      className={cn(
                        "inline-flex items-center gap-1 transition-colors",
                        scrolled || isProductDetail
                          ? "text-slate-700 hover:text-slate-900"
                          : "text-white/85 hover:text-white",
                      )}
                      aria-expanded={desktopOpenKey === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          desktopOpenKey === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute left-0 top-full min-w-[14rem] rounded-md border bg-white text-slate-900 shadow-md py-1 transition-opacity",
                        desktopOpenKey === item.label
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
                      scrolled || isProductDetail
                        ? "text-slate-700 hover:text-slate-900"
                        : "text-white/85 hover:text-white",
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
                  "inline-flex items-center rounded-full px-5 py-2.5 text-base font-semibold shadow transition hover:shadow-md",
                  scrolled || open || isProductDetail
                    ? "bg-[hsl(var(--brand-end))] text-white"
                    : "bg-white text-slate-900",
                )}
              >
                Contact Us
              </Link>
            </div>

            <button
              className={cn(
                "md:hidden transition-colors",
                open
                  ? "text-slate-900"
                  : scrolled || isProductDetail
                    ? "text-slate-700"
                    : "text-white",
              )}
              aria-label="О��крыт�� меню"
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
                        aria-expanded={openSubmenuKey === item.label}
                        onClick={() =>
                          setOpenSubmenuKey(
                            openSubmenuKey === item.label ? null : item.label,
                          )
                        }
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSubmenuKey === item.label && "rotate-180",
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all",
                          openSubmenuKey === item.label
                            ? "max-h-96"
                            : "max-h-0",
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
                    className={cn(
                      "block w-full rounded-full px-5 py-2.5 text-center text-base font-semibold shadow transition hover:shadow-md",
                      scrolled || open || isProductDetail
                        ? "bg-[hsl(var(--brand-end))] text-white"
                        : "bg-white text-slate-900",
                    )}
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
