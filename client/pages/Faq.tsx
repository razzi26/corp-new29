import { PageBanner } from "@/components/layout/PageBanner";

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
    <div className="bg-white text-slate-900">
      <PageBanner
        title="FAQ"
        description="Answers to the most common questions about delivery, installation and certifications."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-3">
          {items.map((it) => (
            <details
              key={it.q}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                <span>{it.q}</span>
                <span className="ml-4 rounded-full border border-[hsl(var(--brand-end))]/20 bg-[hsl(var(--brand-end))]/10 px-2 py-0.5 text-xs text-[hsl(var(--brand-end))]">
                  Q&A
                </span>
              </summary>
              <p className="mt-2 text-slate-700">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
