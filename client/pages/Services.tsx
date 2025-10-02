import { PageBanner } from "@/components/layout/PageBanner";

export default function Services() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Services"
        description="Installation, commissioning, certification, and maintenance for biosafety equipment."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Seminars", href: "/seminars/seminars" },
          { label: "Services" },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <p className="text-base text-slate-700 max-w-prose">
          Field services including installation, commissioning, certification,
          and maintenance for biosafety equipment. Ensure compliance and reduce
          downtime with our qualified engineers.
        </p>
      </div>
    </div>
  );
}
