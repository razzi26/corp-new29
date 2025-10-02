import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
            <FaqItem key={it.q} question={it.q} answer={it.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useLayoutEffect(() => {
    if (open && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [open, answer]);

  useEffect(() => {
    if (!open || !contentRef.current) {
      return;
    }
    const element = contentRef.current;
    const updateHeight = () => {
      setMaxHeight(`${element.scrollHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [open]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 text-left"
      >
        <div>
          <span className="text-lg font-semibold text-slate-900">{question}</span>
          <span className="mt-1 block text-sm text-slate-600">
            Q&A • Esco Biosafety Institute
          </span>
        </div>
        <span className="relative mt-1 flex h-6 w-6 items-center justify-center">
          <span
            className={`h-5 w-0.5 rounded-full bg-[hsl(var(--brand-end))] transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span className="absolute h-0.5 w-5 rounded-full bg-[hsl(var(--brand-end))]" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight }}
      >
        <div
          ref={contentRef}
          className={`mt-4 text-slate-700 transition-all duration-500 ease-in-out ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}
