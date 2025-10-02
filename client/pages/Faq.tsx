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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {items.map((it) => (
              <details
                key={it.q}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out open:border-[hsl(var(--brand-end))]/40 open:shadow-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-lg font-semibold text-slate-900">
                      {it.q}
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">
                      Q&A • Esco Biosafety Institute
                    </span>
                  </div>
                  <span className="relative grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--brand-end))]/40 bg-white text-lg font-semibold text-[hsl(var(--brand-end))] transition-colors duration-300 group-open:bg-[hsl(var(--brand-end))] group-open:text-white">
                    <span className="transition-opacity duration-200 group-open:opacity-0">
                      +
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-open:opacity-100">
                      −
                    </span>
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] overflow-hidden transition-all duration-300 ease-out group-open:grid-rows-[1fr]">
                  <div className="mt-4 overflow-hidden text-slate-700">
                    {it.a}
                  </div>
                </div>
              </details>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
              alt="Laboratory team collaborating"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-semibold">Support that scales with you</h3>
              <p className="mt-2 text-base text-white/85">
                Dedicated consultation, certified equipment and nationwide service teams to keep your lab running.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
