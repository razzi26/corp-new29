import { Link } from "react-router-dom";
import { siteConfig } from "@/config/config";

interface LogoProps {
  variant?: "header" | "footer";
  hideName?: boolean;
}

export default function Logo({
  variant = "header",
  hideName = false,
}: LogoProps) {
  const isHeader = variant === "header";

  const logoContent = (
    <div className="flex select-none items-center gap-3">
      <img
        src="/logo_egi.png"
        alt={siteConfig.siteName}
        className={isHeader ? "h-11 w-11 object-contain" : "h-8 w-8 object-contain"}
      />
      {!hideName && (
        <span
          className={
            isHeader
              ? "font-bold tracking-wide transition-colors text-lg"
              : "font-semibold"
          }
        >
          {siteConfig.siteName}
        </span>
      )}
    </div>
  );

  return (
    <Link to="/" className="hover:opacity-80 transition-opacity">
      {logoContent}
    </Link>
  );
}
