import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/catalog", label: "Catalog" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const anchor = document.querySelector<HTMLElement>("[data-header-anchor]");
    const headerHeight = 72;

    const update = () => {
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setScrolled(rect.bottom <= headerHeight);
      } else {
        setScrolled(window.scrollY > headerHeight);
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
        scrolled
          ? "bg-white/95 border-b border-white/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85"
          : "bg-transparent border-b border-transparent text-white",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex select-none items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] font-bold text-white">
              E
            </span>
            <span
              className={cn(
                "font-semibold tracking-wide transition-colors",
                scrolled ? "text-slate-900" : "text-white",
              )}
            >
              Esco Biosafety Institute
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-base md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "transition-colors",
                  scrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
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
              scrolled ? "text-slate-700" : "text-white",
            )}
            aria-label="Открыть меню"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:hidden">
            <div className="flex flex-col gap-2 text-base">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-slate-700 hover:text-slate-900 transition-colors py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-4 py-2.5 text-base font-semibold shadow hover:shadow-md transition"
                onClick={() => setOpen(false)}
              >
                Get a quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
