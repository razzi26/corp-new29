import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

const nav: Array<
  { label: string; to?: string; children?: { to: string; label: string }[] }
> = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { to: "/seminars/trainings", label: "Trainings" },
      { to: "/seminars/seminars", label: "Seminars" },
      { to: "/seminars/services", label: "Services" },
      { to: "/seminars/brochures", label: "Brochures" },
    ],
  },
  { to: "/catalog", label: "Catalog" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSeminars, setOpenSeminars] = useState(false);
  const [desktopSeminarsOpen, setDesktopSeminarsOpen] = useState(false);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
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
                    <ChevronDown className={cn("h-4 w-4 transition-transform", desktopSeminarsOpen && "rotate-180")} />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full min-w-[14rem] rounded-md border bg-white text-slate-900 shadow-md py-1 transition-opacity",
                      desktopSeminarsOpen ? "visible opacity-100" : "invisible opacity-0",
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
              open ? "text-slate-900" : scrolled ? "text-slate-700" : "text-white",
            )}
            aria-label="Открыть меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <div className="md:hidden w-full">
          <div
            className={cn(
              "absolute left-0 right-0 top-full z-50 w-full border-t bg-white text-slate-900 overflow-hidden transition-all duration-300 ease-out",
              open ? "max-h-[80vh] opacity-100 translate-y-0" : "pointer-events-none max-h-0 opacity-0 -translate-y-2",
            )}
            aria-hidden={!open}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col gap-1.5 text-base">
                {nav.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        className="flex w-full items-center justify-between py-2"
                        onClick={() => setOpenSeminars((v) => !v)}
                        aria-expanded={openSeminars}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSeminars ? "rotate-180" : "rotate-0",
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden pl-3 border-l border-slate-200 transition-all",
                          openSeminars ? "max-h-96 py-1" : "max-h-0",
                        )}
                      >
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            className="block py-2 text-slate-700 hover:text-slate-900"
                            onClick={() => {
                              setOpen(false);
                              setOpenSeminars(false);
                            }}
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
                      className="py-2"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <Link
                  to="/contact"
                  className="mt-1 inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-4 py-2.5 text-base font-semibold shadow hover:shadow-md transition"
                  onClick={() => setOpen(false)}
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
