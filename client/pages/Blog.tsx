import { PageBanner } from "@/components/layout/PageBanner";

export default function Blog() {
  const posts = [
    { title: "How to choose an ultrasound scanner", date: "2025-02-10" },
    { title: "Lab analyzers: what to consider", date: "2025-01-28" },
    { title: "Patient monitoring best practices", date: "2025-01-12" },
  ];
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Blog"
        description="Insights on medical technology, procurement and implementation to help your clinic operate at its best."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-xs text-slate-500">
                {new Date(p.date).toLocaleDateString()}
              </div>
              <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-slate-600">
                Read our expert guidance on selection, setup and maintenance.
              </p>
              <a
                className="mt-4 inline-flex text-sm underline hover:opacity-90"
                href="#"
              >
                Read more
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
