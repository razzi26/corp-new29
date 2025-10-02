import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "#about", label: "О нас" },
  { href: "#benefits", label: "Преимущества" },
  { href: "#products", label: "Каталог" },
  { href: "#contact", label: "Контакты" },
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
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between rounded-b-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4">
          <a href="#top" className="flex items-center gap-2 select-none">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white font-bold">M</span>
            <span className="text-white font-semibold tracking-wide">MediTech Pro</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 inline-flex items-center rounded-full bg-white text-[hsl(var(--brand-end))] px-4 py-2 text-sm font-semibold shadow hover:shadow-md transition"
            >
              Оставить заявку
            </a>
          </nav>

          <button
            className="md:hidden text-white/90"
            aria-label="Открыть меню"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-3">
            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors text-sm py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-4 py-2 text-sm font-semibold shadow hover:shadow-md transition"
                onClick={() => setOpen(false)}
              >
                Оставить заявку
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
