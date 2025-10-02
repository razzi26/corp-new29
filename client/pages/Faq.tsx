export default function Faq() {
  const items = [
    {
      q: "Do you provide installation and training?",
      a: "Yes, we handle delivery, installation and staff training across the country.",
    },
    {
      q: "Are devices certified?",
      a: "We work only with certified manufacturers and provide official warranty.",
    },
    {
      q: "What are lead times?",
      a: "Popular models are in stock. Lead time for custom configurations varies from 2 to 6 weeks.",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-16 text-slate-900">
      <h1 className="text-3xl md:text-4xl font-semibold">FAQ</h1>
      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="cursor-pointer list-none font-semibold flex items-center justify-between">
              <span>{it.q}</span>
              <span className="ml-4 text-xs rounded-full px-2 py-0.5 bg-[hsl(var(--brand-end))]/10 text-[hsl(var(--brand-end))] border border-[hsl(var(--brand-end))]/20">
                Q&A
              </span>
            </summary>
            <p className="mt-2 text-slate-700">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
