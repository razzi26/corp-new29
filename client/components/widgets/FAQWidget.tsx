import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQWidget({ items }: { items?: FAQItem[] }) {
  const [data, setData] = useState<FAQItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items) return;
    let mounted = true;
    setLoading(true);
    fetch("/data/faqs.json")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load FAQs (${res.status})`);
        const json = await res.json();
        return json;
      })
      .then((json) => {
        if (!mounted) return;
        if (Array.isArray(json)) setData(json);
        else setError("Invalid FAQ data format");
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load FAQs");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [items]);

  const list = items ?? data ?? [];

  if (!items && loading) {
    return <div className="mx-auto max-w-3xl">Loading FAQs...</div>;
  }

  if (!items && error) {
    return (
      <div className="mx-auto max-w-3xl text-sm text-red-600">Error loading FAQs: {error}</div>
    );
  }

  return (
    <Accordion type="multiple" className="mx-auto max-w-3xl space-y-4">
      {list.map((it) => (
        <AccordionItem
          key={it.q}
          value={it.q}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <AccordionTrigger className="group flex w-full items-start justify-between gap-6 px-6 py-6 text-left font-semibold text-slate-900 hover:no-underline [&>svg]:hidden">
            <div>
              <span className="text-lg font-semibold text-slate-900">{it.q}</span>
              {/* <span className="mt-1 block text-sm font-normal text-slate-600">Q&A • Esco Biosafety Institute</span>*/}
            </div>
            <span className="relative mt-1 flex h-6 w-6 items-center justify-center">
              <span className="h-5 w-0.5 rounded-full bg-[hsl(var(--brand-end))] transition-opacity duration-200 group-data-[state=open]:opacity-0" />
              <span className="absolute h-0.5 w-5 rounded-full bg-[hsl(var(--brand-end))]" />
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-slate-700">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
