import { PageBanner } from "@/components/layout/PageBanner";

export default function KnowledgeHub() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Knowledge Hub"
        description="Guides, articles and whitepapers on biosafety and lab practices."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Knowledge Hub" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-slate-700">Knowledge Hub content coming soon.</p>
      </section>
    </div>
  );
}
