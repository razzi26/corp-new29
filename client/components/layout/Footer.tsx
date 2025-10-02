import { Link } from "react-router-dom";

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
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-10">
          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link className="hover:text-white" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/catalog">
                  Catalog
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/contact">
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
        <div className="text-sm md:text-right flex md:block flex-col justify-between text-white/90">
          <p>© {new Date().getFullYear()} Esco Biosafety Institute</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
