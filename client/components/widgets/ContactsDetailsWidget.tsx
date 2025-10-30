import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/config";

export default function ContactsDetailsWidget() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <MapPin className="h-5 w-5 flex-shrink-0 text-inherit mt-0.5" />
        <div className="text-sm leading-relaxed">{siteConfig.address}</div>
      </div>

      <div className="flex gap-3">
        <Phone className="h-5 w-5 flex-shrink-0 text-inherit mt-0.5" />
        <a
          href={`tel:${siteConfig.phone}`}
          className="text-sm hover:underline"
        >
          {siteConfig.phone}
        </a>
      </div>

      <div className="flex gap-3">
        <Mail className="h-5 w-5 flex-shrink-0 text-inherit mt-0.5" />
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm hover:underline"
        >
          {siteConfig.email}
        </a>
      </div>
    </div>
  );
}
