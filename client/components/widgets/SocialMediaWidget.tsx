import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { XLogo } from "@/components/icons/XLogo";
import { siteConfig } from "@/config/config";

export default function SocialMediaWidget() {
  return (
    <div className="mt-4">
      <div className="text-sm font-semibold mb-2">Follow us</div>
      <div className="flex gap-3">
        <a
          href={siteConfig.socialMedia.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href={siteConfig.socialMedia.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href={siteConfig.socialMedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
        >
          <XLogo className="h-5 w-5" />
        </a>
        <a
          href={siteConfig.socialMedia.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href={siteConfig.socialMedia.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition"
        >
          <Youtube className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
