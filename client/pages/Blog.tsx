export default function Blog() {
  const posts = [
    { title: "How to choose an ultrasound scanner", date: "2025-02-10" },
    { title: "Lab analyzers: what to consider", date: "2025-01-28" },
    { title: "Patient monitoring best practices", date: "2025-01-12" },
  ];
  return (
    <div className="container mx-auto px-4 py-16 text-slate-900">
      <h1 className="text-3xl md:text-4xl font-semibold">Blog</h1>
      <p className="mt-3 text-slate-700 max-w-prose">
        Insights on medical technology, procurement and implementation to help
        your clinic operate at its best.
      </p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-xs text-slate-500">
              {new Date(p.date).toLocaleDateString()}
            </div>
            <h2 className="mt-2 font-semibold text-lg">{p.title}</h2>
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
  );
}
