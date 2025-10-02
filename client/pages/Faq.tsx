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
    <div className="container mx-auto px-4 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold">FAQ</h1>
      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur"
          >
            <summary className="cursor-pointer list-none font-semibold">
              {it.q}
            </summary>
            <p className="mt-2 text-white/85">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
