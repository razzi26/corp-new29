import { PageBanner } from "@/components/layout/PageBanner";

export default function CaseStudies() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Case Studies"
        description="Real-world implementations and learnings from Esco projects."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Case Studies" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-slate-700">Case studies coming soon.</p>
      </section>
    </div>
  );
}
