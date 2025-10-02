import { PageBanner } from "@/components/layout/PageBanner";

export default function Podcasts() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Podcasts"
        description="Interviews and discussions with biosafety experts."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Podcasts" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-slate-700">Podcasts coming soon.</p>
      </section>
    </div>
  );
}
