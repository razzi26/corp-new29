import { Link } from "react-router-dom";
import ContactsDetailsWidget from "@/components/widgets/ContactsDetailsWidget";
import SocialMediaWidget from "@/components/widgets/SocialMediaWidget";
import { siteConfig } from "@/config/config";

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--brand-end))] text-white">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white font-bold">
              E
            </span>
            <span className="font-semibold">{siteConfig.siteName}</span>
          </div>
          <p className="text-sm leading-relaxed text-white/90">
            {siteConfig.description}
          </p>
          <SocialMediaWidget />
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
            <div className="text-white/90">
              <ContactsDetailsWidget />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-start text-sm text-white/90 text-left">
          <p>© 2025 {siteConfig.siteName}. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
