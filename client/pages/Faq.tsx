import { PageBanner } from "@/components/layout/PageBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <Accordion
          type="multiple"
          className="mx-auto max-w-3xl space-y-4"
          collapsible
        >
          {items.map((it) => (
            <AccordionItem
              key={it.q}
              value={it.q}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <AccordionTrigger className="group flex w-full items-start justify-between gap-6 px-6 py-6 text-left font-semibold text-slate-900 hover:no-underline [&>svg]:hidden">
                <div>
                  <span className="text-lg font-semibold text-slate-900">
                    {it.q}
                  </span>
                  <span className="mt-1 block text-sm font-normal text-slate-600">
                    Q&A • Esco Biosafety Institute
                  </span>
                </div>
                <span className="relative mt-1 flex h-6 w-6 items-center justify-center">
                  <span className="h-5 w-0.5 rounded-full bg-[hsl(var(--brand-end))] transition-opacity duration-200 group-data-[state=open]:opacity-0" />
                  <span className="absolute h-0.5 w-5 rounded-full bg-[hsl(var(--brand-end))]" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-slate-700">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
