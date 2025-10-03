import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

function Toc() {
  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">Contents</h2>
      <ol className="list-decimal space-y-2 pl-5 text-slate-700">
        <li><a className="hover:underline" href="#history">Historical Development of Biosafety</a></li>
        <li><a className="hover:underline" href="#bsc">Biosafety Equipment and Containment Practices</a></li>
        <li><a className="hover:underline" href="#ppe">Personal Protective Equipment</a></li>
        <li><a className="hover:underline" href="#decon">Decontamination and Waste Management</a></li>
      </ol>
    </nav>
  );
}

export default function KnowledgeArticleBiosafetyBasics() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="What is Biosafety?"
        description="Policies, protocols, and practices to minimize exposure to harmful biological agents and protect people and the environment."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Knowledge Hub", href: "/resources/knowledge-hub" },
          { label: "What is Biosafety?" },
        ]}
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <time dateTime="2025-03-12">March 12, 2025</time>
          <span>•</span>
          <span>7 min read</span>
          <span>•</span>
          <div className="flex gap-2">
            <Badge variant="secondary">Biosafety</Badge>
            <Badge variant="secondary">Lab Practices</Badge>
          </div>
        </div>

        {/* Mobile TOC */}
        <div className="mb-8 lg:hidden">
          <Toc />
          <Separator className="my-6" />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main content */}
          <div className="lg:col-span-8">
            <p className="text-lg leading-8 text-slate-700">
              Biosafety includes the policies, protocols, and practices established to
              minimize accidental exposure to harmful biological agents. It ensures the
              protection of laboratory personnel, the public, and the environment.
              Maintaining biosafety standards is fundamental to ensuring that biological
              research is safely and effectively executed.
            </p>

            <Separator className="my-8" />

            <section id="history" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">Historical Development of Biosafety</h2>
              <p className="text-slate-700">
                Biosafety is shaped by scientific progress and emerging risks. The scientific
                breakthroughs of Louis Pasteur and Robert Koch in the 1890s revealed the dangers of
                biological hazards, laying the foundation for biosafety. The increasing number of
                laboratory-acquired infections (LAIs) in the mid-20th century emphasized the need for
                stricter laboratory safety protocols. The 1970s marked a turning point when biosafety emerged
                as a distinct discipline, spurred by international classification systems and pivotal
                discussions. From the 1980s onward, global conventions and standards were established to
                regulate biological research and laboratory safety. The scope of biosafety expanded in the
                1990s, moving beyond laboratories to address risks in agriculture, environmental protection,
                and food safety. In response to modern challenges, biosafety regulations have continued to
                evolve. In 2020, the WHO updated its Laboratory Biosafety Manual to cover all “biological
                agents,” not just pathogens and toxins.
              </p>
            </section>

            <Separator className="my-8" />

            <section id="bsc" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">Biosafety Equipment and Containment Practices</h2>
              <h3 className="mt-2 font-semibold">Biosafety Cabinets (BSCs)</h3>
              <p className="mt-2 text-slate-700">
                Biosafety cabinets are essential for handling hazardous biological materials. They are
                classified into three main types:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
                <li><span className="font-medium">Class I BSCs</span>: protect the user and the environment but do not safeguard samples.</li>
                <li><span className="font-medium">Class II BSCs</span>: most common; provide personnel, product, and environmental protection (subdivided into types A2, B1, and B2).</li>
                <li><span className="font-medium">Class III BSCs</span>: maximum containment; fully enclosed, gas-tight systems used for high-risk pathogens such as Ebola and smallpox.</li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section id="ppe" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">Personal Protective Equipment</h2>
              <p className="text-slate-700">
                Proper PPE—including gloves, lab coats, face shields, and respirators—acts as a critical
                barrier against exposure. The choice of PPE depends on the biosafety level (BSL) of the work
                being conducted.
              </p>
            </section>

            <Separator className="my-8" />

            <section id="decon" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">Decontamination and Waste Management</h2>
              <p className="text-slate-700">
                Autoclaving is the gold standard for deactivating biohazardous waste. For surface
                decontamination, chemical disinfectants such as bleach and hydrogen peroxide vapor are used.
              </p>
            </section>

            <Separator className="my-10" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link to="/resources/knowledge-hub" className="text-[hsl(var(--brand-end))] hover:underline">
                ← Back to Knowledge Hub
              </Link>
              <div className="text-sm text-slate-600">Last updated: March 2025</div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-lg border bg-white p-5 shadow-sm">
              <Toc />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
