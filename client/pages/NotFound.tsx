import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="404 — Page not found"
        description="Sorry, we couldn't find the page you're looking for. Try returning to the homepage or using the site navigation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "404" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">Page not found</h2>
          <p className="mt-4 text-lg text-slate-600">
            The requested URL <span className="font-mono text-sm text-slate-700">{location.pathname}</span> does not exist on this site.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-md bg-[hsl(var(--brand-end))] px-6 py-3 text-base font-semibold text-white shadow hover:shadow-md"
            >
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center rounded-md border border-slate-200 px-6 py-3 text-base font-medium text-slate-700 bg-white hover:bg-slate-50"
            >
              Contact Support
            </Link>
          </div>

          <div className="mt-10 text-sm text-slate-500">
            You can also try the navigation menu at the top to find what you're
            looking for.
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
