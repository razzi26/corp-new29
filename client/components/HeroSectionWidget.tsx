import { Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { siteConfig } from "@/config/config";

interface HeroFeature {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
}

interface HeroButton {
  text: string;
  href: string;
  variant: "primary" | "outline";
}

interface HeroSectionWidgetProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  features?: HeroFeature[];
  cta?: HeroButton[];
}

const defaultConfig: Required<HeroSectionWidgetProps> = {
  title: `Welcome to ${siteConfig.siteName}!`,
  description:
    `Biosafety in any laboratory is crucial. The ${siteConfig.siteName} was established to be your partner in achieving it. Our institute provides:`,
  backgroundImage:
    "https://images.pexels.com/photos/9574399/pexels-photo-9574399.jpeg",
  backgroundImageAlt:
    "Bright and sterile laboratory featuring high-tech research equipment and medical professionals at work",
  backgroundGradFrom: "#020113",
  backgroundGradTo: "#003BA3",
  features: [
    {
      label: "Training & seminars",
      icon: GraduationCap,
      bg: "bg-[hsl(var(--brand-start))]",
    },
    {
      label: "Regulatory guidance",
      icon: ShieldCheck,
      bg: "bg-[hsl(205_100%_35%)]",
    },
    {
      label: "Practical resources",
      icon: Microscope,
      bg: "bg-[hsl(var(--brand-start))]",
    },
    {
      label: "Certification support",
      icon: BadgeCheck,
      bg: "bg-[hsl(205_100%_35%)]",
    },
  ],
  cta: [
    {
      text: "Get certified",
      href: "/contact",
      variant: "primary",
    },
    {
      text: "Explore resources",
      href: "/resources",
      variant: "outline",
    },
  ],
};

export default function HeroSectionWidget(props: HeroSectionWidgetProps = {}) {
  const config = {
    ...defaultConfig,
    ...props,
  };

  return (
    <section
      className="relative text-white overflow-hidden min-h-screen md:h-screen lg:h-screen"
      data-header-anchor
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(2_1%_7%)] to-[hsl(205_100%_38%)]">
        <img
          src={config.backgroundImage}
          alt={config.backgroundImageAlt}
          className="h-full w-full object-cover opacity-50"
          loading="eager"
          decoding="async"
        />
        <div
          className="
            absolute inset-0 bg-gradient-to-r
            from-[var(--from)] to-[var(--to)]
            mix-blend-multiply
          "
          style={{
            "--from": `${config.backgroundGradFrom}`,
            "--to": `${config.backgroundGradTo}`,
          }}
        />
      </div>
      <div className="relative container mx-auto px-4 pt-32 pb-24 md:pt-40 md:h-screen lg:pt-52 lg:pb-40 flex items-center">
        <div className="hero-grid grid gap-6 items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            {config.title}
          </h1>
          <p className="mt-6 text-white text-lg md:text-xl leading-relaxed max-w-2xl">
            {config.description}
          </p>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {config.features.map(({ label, icon: Icon, bg }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-4 text-white rounded-lg px-4 py-4 backdrop-blur-sm bg-white/10 border border-white/20",
                  bg,
                )}
              >
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-base leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {config.cta.map((button) => (
              <Button
                key={button.text}
                asChild
                size="lg"
                variant={button.variant}
                className={
                  button.variant === "primary"
                    ? "bg-white text-[hsl(var(--primary))] hover:bg-white/90"
                    : "backdrop-blur-sm"
                }
              >
                <Link to={button.href}>{button.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
