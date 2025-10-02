import { PageBanner } from "@/components/layout/PageBanner";

export default function Videos() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Videos"
        description="Recorded seminars, introductions and short explainers."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Videos" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-slate-700">Video library coming soon. Meanwhile, watch our latest seminars on YouTube.</p>
      </section>
    </div>
  );
}
