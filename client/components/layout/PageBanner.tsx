import { Fragment, type ReactNode } from "react";
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
}

export function PageBanner({
  title,
  description,
  breadcrumbs,
  meta,
}: PageBannerProps) {
  return (
    <>
      <section
        className="relative -mt-16 overflow-hidden bg-[hsl(var(--brand-end))] text-white"
        data-header-anchor
      >
        <div
          className="absolute inset-0 bg-brand-gradient opacity-95"
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="w-full md:w-[70%]">
            <h1 className="break-words text-3xl font-semibold md:text-4xl">{title}</h1>
            {description && (
              <p className="mt-3 break-words text-base text-white/85 md:text-lg">
                {description}
              </p>
            )}
            {meta && (
              <div className="mt-3 text-sm text-white/85">{meta}</div>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumbs just below the banner */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <Fragment key={crumb.label}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink
                        asChild
                        className="transition-colors hover:text-foreground"
                      >
                        <Link to={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
}
