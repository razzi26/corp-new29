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
      {isHeader ? (
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(205_100%_20%)] font-bold text-white text-lg shadow-md">
          E
        </span>
      ) : (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white font-bold">
          E
        </span>
      )}
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
