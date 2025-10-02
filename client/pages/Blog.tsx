export default function Blog() {
  const posts = [
    { title: "How to choose an ultrasound scanner", date: "2025-02-10" },
    { title: "Lab analyzers: what to consider", date: "2025-01-28" },
    { title: "Patient monitoring best practices", date: "2025-01-12" },
  ];
  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold">Blog</h1>
      <p className="mt-3 text-white/85 max-w-prose">Insights on medical technology, procurement and implementation to help your clinic operate at its best.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.title} className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur">
            <div className="text-xs text-white/70">{new Date(p.date).toLocaleDateString()}</div>
            <h2 className="mt-2 font-semibold text-lg">{p.title}</h2>
            <p className="mt-2 text-sm text-white/80">Read our expert guidance on selection, setup and maintenance.</p>
            <a className="mt-4 inline-flex text-sm underline hover:opacity-90" href="#">Read more</a>
          </article>
        ))}
      </div>
    </div>
  );
}
