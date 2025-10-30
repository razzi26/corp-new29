import { Fragment, type ReactNode } from "react";
import React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbEntry[];
  meta?: ReactNode;
  backgroundImage?: string;
  gradient?: string;
}

export function PageBanner({
  title,
  description,
  breadcrumbs,
  meta,
  backgroundImage,
  gradient ='linear-gradient(135deg, #020113 0%, #003BA3)',
}: PageBannerProps) {
  return (
    <>
      <section
        className="pt-24 pb-12 relative overflow-hidden text-white"
        data-header-anchor
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              gradient ||
              "linear-gradient(90deg, hsl(var(--brand-start)), hsl(var(--brand-end)))",
            opacity: 0.95,
          }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 pt-12 pb-10 md:pt-16 md:pb-14">
          {/* Breadcrumbs at the top */}
          <div className="mb-6 md:mb-8">
            <nav aria-label="breadcrumb">
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => {
                  const key = `${index}-${crumb.href ?? crumb.label}`;
                  const displayLabel =
                    crumb.href === "/resources" ? "Knowledge Hub" : crumb.label;
                  return (
                    <React.Fragment key={key}>
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink
                            asChild
                            className="transition-colors hover:text-white/70 text-white/80"
                          >
                            <Link to={crumb.href}>{displayLabel}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-white/80">{displayLabel}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="text-white/60" />
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </nav>
          </div>

          {/* Title and description */}
          <div className="w-full md:w-[70%]">
            <h1 className="break-words text-3xl font-semibold md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 break-words text-base text-white/85 md:text-lg">
                {description}
              </p>
            )}
            {meta && <div className="mt-3 text-sm text-white/85">{meta}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
