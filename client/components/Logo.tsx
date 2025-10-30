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
        src={siteConfig.logoPath}
        alt={siteConfig.siteName}
        className={isHeader ? "h-14 w-14 object-contain" : "h-20 w-20 object-contain"}
      />
      {!hideName && (
        <div
          className={
            isHeader
              ? "font-semibold tracking-wide transition-colors text-lg leading-tight"
              : "font-semibold text-sm leading-tight"
          }
        >
          <div>Esco Biosafety</div>
          <div>Institute</div>
        </div>
      )}
    </div>
  );

  return (
    <Link to="/" className="hover:opacity-80 transition-opacity">
      {logoContent}
    </Link>
  );
}
