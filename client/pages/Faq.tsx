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
        <div className="max-w-3xl space-y-4">
          {items.map((it) => (
            <details
              key={it.q}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <div>
                  <span className="text-lg font-semibold text-slate-900">
                    {it.q}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    Q&A • Esco Biosafety Institute
                  </span>
                </div>
                <span className="relative mt-1 flex h-8 w-8 items-center justify-center">
                  <span className="h-6 w-0.5 rounded-full bg-[hsl(var(--brand-end))] transition-opacity duration-200 group-open:opacity-0" />
                  <span className="absolute h-0.5 w-6 rounded-full bg-[hsl(var(--brand-end))]" />
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-400 ease-out group-open:grid-rows-[1fr]">
                <div className="mt-4 overflow-hidden text-slate-700">
                  {it.a}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
