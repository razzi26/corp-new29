import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { XLogo } from "@/components/icons/XLogo";
import { Button } from "@/components/Button";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[hsl(var(--brand-end))] text-white">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white font-bold">
              E
            </span>
            <span className="font-semibold">Esco Biosafety Institute</span>
          </div>
          <p className="text-sm leading-relaxed text-white/90">
            Your trusted hub for biosafety training, regulatory guidance and
            practical resources. Build expertise and confidence in laboratory
            safety.
          </p>
          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">Follow us</div>
            <div className="flex gap-3">
              <button
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                aria-label="X"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                <XLogo className="h-5 w-5" />
              </button>
              <button
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
              >
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-10">
          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link className="hover:text-brand-secondary transition" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-brand-secondary transition"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-brand-secondary transition"
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-brand-secondary transition"
                  to="/news"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-brand-secondary transition"
                  to="/resources/faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-brand-secondary transition"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contacts</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>+7 (495) 000-00-00</li>
              <li>info@meditech.pro</li>
              <li>Mon–Fri: 9:00–19:00</li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Subscribe</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              const email = fd.get("email");
              console.log({ email });
              alert("Thanks for subscribing!");
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="h-14 flex-1 bg-white text-slate-900 px-3 outline-none focus:ring-2 focus:ring-white"
            />
            <Button variant="primary" size="md" className="bg-white text-[hsl(var(--brand-end))] hover:bg-white/90 shadow hover:shadow-md">
              Subscribe
            </Button>
          </form>
          <p className="mt-2 text-xs text-white/80">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-start text-sm text-white/90 text-left">
          <p>© 2025 Esco Biosafety Institute. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
