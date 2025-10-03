import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function KnowledgeArticleBiosafetyBasics() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Biosafety Basics: How to Build a Safe Lab Culture"
        description="A practical guide to biosafety levels, risk assessment, PPE, and routine controls for modern labs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Knowledge Hub", href: "/resources/knowledge-hub" },
          { label: "Biosafety Basics" },
        ]}
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <time dateTime="2025-03-12">March 12, 2025</time>
          <span>•</span>
          <span>8 min read</span>
          <span>•</span>
          <div className="flex gap-2">
            <Badge variant="secondary">Biosafety</Badge>
            <Badge variant="secondary">Lab Practices</Badge>
          </div>
        </div>

        <p className="text-lg leading-8 text-slate-700">
          Biosafety is a system of practices and infrastructure designed to
          minimize exposure to biological hazards. Whether you operate a
          teaching lab or a high-containment facility, strong biosafety
          fundamentals protect staff, research integrity, and the public.
        </p>

        <Separator className="my-8" />

        <nav aria-label="Table of contents" className="mb-10">
          <h2 className="mb-3 text-base font-semibold text-slate-900">
            Contents
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-slate-700">
            <li><a className="hover:underline" href="#bsl">Biosafety Levels (BSL)</a></li>
            <li><a className="hover:underline" href="#risk">Risk Assessment</a></li>
            <li><a className="hover:underline" href="#ppe">Personal Protective Equipment</a></li>
            <li><a className="hover:underline" href="#controls">Engineering & Administrative Controls</a></li>
            <li><a className="hover:underline" href="#waste">Waste Management</a></li>
            <li><a className="hover:underline" href="#training">Training & Culture</a></li>
            <li><a className="hover:underline" href="#checklist">Daily Checklist</a></li>
          </ol>
        </nav>

        <section id="bsl" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Biosafety Levels (BSL)</h2>
          <p className="text-slate-700">
            Biosafety levels define a combination of laboratory practices,
            safety equipment, and facility design appropriate for the hazards
            involved. BSL-1 is suitable for well-characterized agents not
            known to cause disease in healthy adults; BSL-4 addresses dangerous
            and exotic agents with high individual risk.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>BSL-1: Basic teaching and research; standard microbiological practices.</li>
            <li>BSL-2: Agents of moderate hazard; access control and additional PPE.</li>
            <li>BSL-3: Indigenous or exotic agents with potential aerosol transmission; controlled access, directional airflow.</li>
            <li>BSL-4: Dangerous/exotic agents with high risk; maximum containment facilities and procedures.</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section id="risk" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Risk Assessment</h2>
          <p className="text-slate-700">
            A formal risk assessment evaluates the procedure, agents, volumes,
            routes of exposure, and personnel competencies. Update assessments
            when protocols change.
          </p>
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              Consider worst-case scenarios: spills, sharps injuries, and
              aerosol-generating steps. Build mitigations into SOPs.
            </AlertDescription>
          </Alert>
        </section>

        <Separator className="my-8" />

        <section id="ppe" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Personal Protective Equipment</h2>
          <p className="text-slate-700">
            PPE complements, but does not replace, engineering and administrative
            controls. Match PPE to the task and agent.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>Gloves: appropriate material and double-gloving for high-risk work.</li>
            <li>Coats/Gowns: fluid-resistant where splash risk exists.</li>
            <li>Eye/Face Protection: goggles or face shields during splash or aerosol risk.</li>
            <li>Respiratory Protection: follow fit-testing and medical clearance.</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section id="controls" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Engineering & Administrative Controls</h2>
          <p className="text-slate-700">
            Primary containment devices like biological safety cabinets (BSCs)
            and facility design features (directional airflow) minimize exposure.
            Administrative controls include SOPs, access control, and incident response.
          </p>
        </section>

        <Separator className="my-8" />

        <section id="waste" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Waste Management</h2>
          <p className="text-slate-700">
            Segregate, label, and treat waste per local regulations and your
            biosafety program. Validate decontamination (e.g., autoclave spore tests).
          </p>
        </section>

        <Separator className="my-8" />

        <section id="training" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Training & Culture</h2>
          <p className="text-slate-700">
            Competency-based training, drills, and an open-reporting culture
            reduce incidents. Supervisors must model safe behaviors consistently.
          </p>
        </section>

        <Separator className="my-8" />

        <section id="checklist" className="scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold">Daily Checklist</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
            <li>Verify PPE, disinfect work surfaces, check BSC airflow indicator.</li>
            <li>Confirm sharps containers are below fill lines and labeled.</li>
            <li>Document incidents and near-misses; restock spill kits.</li>
            <li>Secure agents and samples; log waste treatment.</li>
          </ul>
        </section>

        <Separator className="my-10" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/resources/knowledge-hub"
            className="text-[hsl(var(--brand-end))] hover:underline"
          >
            ← Back to Knowledge Hub
          </Link>
          <div className="text-sm text-slate-600">
            Last updated: March 2025
          </div>
        </div>
      </article>
    </div>
  );
}
