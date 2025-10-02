import { Fragment } from "react";
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
}

export function PageBanner({ title, description, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--brand-end))] text-white">
      <div className="absolute inset-0 bg-brand-gradient opacity-95" aria-hidden="true" />
      <div className="relative container mx-auto px-4 py-12">
        <Breadcrumb>
          <BreadcrumbList className="text-white/80">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={crumb.label}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink
                      asChild
                      className="text-white/80 transition-colors hover:text-white"
                    >
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-white">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="text-white/60" />
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-6 text-3xl font-semibold md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
