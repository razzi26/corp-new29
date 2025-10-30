import { PageBanner } from "@/components/layout/PageBanner";

export default function Brochures() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Brochures"
        description="Download product brochures, checklists, and quick-start guides for laboratory safety."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Brochures" },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <p className="text-base text-slate-700 max-w-prose">
          Download product and standard brochures, checklists, and quick-start
          guides for equipment operation and laboratory safety procedures.
        </p>
      </div>
    </div>
  );
}
