import { PageBanner } from "@/components/layout/PageBanner";

export default function Catalog() {
  const categories = [
    { title: "Ultrasound Scanners", tag: "In stock" },
    { title: "Laboratory Analyzers", tag: "Preorder" },
    { title: "Patient Monitors", tag: "Bestseller" },
    { title: "X-ray & CT", tag: "Special offer" },
    { title: "Endoscopy Equipment", tag: "New" },
    { title: "Sterilization Systems", tag: "In stock" },
  ];
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Products"
        description="Certified medical equipment for clinics, labs and private practices. Explore categories below or contact us for a tailored quote."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end">
          <a
            href="/contact"
            className="hidden md:inline-flex text-sm hover:underline"
          >
            Need help choosing?
          </a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-44 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />
                <span className="absolute top-3 left-3 text-xs rounded-full bg-white text-[hsl(var(--brand-end))] px-2 py-1 font-semibold">
                  {c.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Contact our team for pricing and availability.
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href="/contact"
                    className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] px-3 py-2 text-sm font-semibold text-white shadow"
                  >
                    Request Quote
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Consultation
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
