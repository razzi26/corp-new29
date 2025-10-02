import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/catalog", label: "Catalog" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-slate-200 ${scrolled ? "shadow-sm" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white font-bold">
              E
            </span>
            <span className="text-slate-900 font-semibold tracking-wide">
              Esco Biosafety Institute
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-base">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 inline-flex items-center rounded-full bg-[hsl(var(--brand-end))] text-white px-5 py-2.5 text-base font-semibold shadow hover:shadow-md transition"
            >
              Get a quote
            </Link>
          </nav>

          <button
            className="md:hidden text-slate-700"
            aria-label="Открыть меню"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-xl bg-white border border-slate-200 p-3 shadow-sm">
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
