import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Separator } from "@/components/ui/separator";
import { Seo } from "@/components/Seo";
import { ShareButtons } from "@/components/ShareButtons";
import { Calendar, Clock } from "lucide-react";

function Toc() {
  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">Contents</h2>
      <ol className="list-decimal space-y-2 pl-5 text-slate-700">
        <li>
          <a className="hover:underline" href="#intro">
            Introduction
          </a>
        </li>
        <li>
          <a className="hover:underline" href="#what-bsl">
            What are Biosafety Levels (BSL)?
          </a>
        </li>
        <li>
          <a className="hover:underline" href="#levels">
            BSL-1 to BSL-4 Overview
          </a>
        </li>
        <li>
          <a className="hover:underline" href="#risk">
            The Role of Risk Assessment
          </a>
        </li>
        <li>
          <a className="hover:underline" href="#relationship">
            How BSL and Risk Assessment Work Together
          </a>
        </li>
        <li>
          <a className="hover:underline" href="#conclusion">
            Conclusion
          </a>
        </li>
        <li>
          <a className="hover:underline" href="#resources">
            Resources
          </a>
        </li>
      </ol>
    </nav>
  );
}

export default function KnowledgeArticleBSL() {
  const title =
    "Understanding Biosafety Levels (BSL): The Cornerstone of Effective Risk Assessment";
  const description =
    "How BSL-1 to BSL-4 and dynamic risk assessment work together to protect staff, the environment, and the public.";

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Knowledge Hub", href: "/resources" },
          { label: "Articles", href: "/resources/articles" },
          { label: title },
        ]}
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime="2025-03-18">March 18, 2025</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>9 min read</span>
            </span>
          </div>
        }
      />

      <Seo
        title={title}
        description={description}
        url={typeof window !== "undefined" ? window.location.href : undefined}
        image="/placeholder.svg"
        type="article"
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <ShareButtons
          title={title}
          description={description}
          className="mb-6"
        />

        {/* Mobile TOC */}
        <div className="mb-8 lg:hidden">
          <Toc />
          <Separator className="my-6" />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main content */}
          <div className="lg:col-span-8">
            <section id="intro" className="scroll-mt-24">
              <p className="text-lg leading-8 text-slate-700">
                In the world of biological research and clinical diagnostics,
                safety is not a matter of chance—it is a matter of choice. This
                choice is guided by a systematic framework designed to protect
                laboratory personnel, the environment, and the community from
                accidental exposure to infectious agents. At the heart of this
                framework lie two interdependent concepts: Biosafety Levels
                (BSL) and Risk Assessment. This article explains how they work
                together to create a culture of safety in scientific workplaces.
              </p>
            </section>

            <Separator className="my-8" />

            <section id="what-bsl" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">
                What are Biosafety Levels (BSL)?
              </h2>
              <p className="text-slate-700">
                Biosafety Levels (BSL) are a series of biocontainment
                precautions—BSL-1 through BSL-4—designed to isolate dangerous
                biological agents. Each level corresponds to disease severity
                and exposure risk and is defined by three areas of control:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
                <li>
                  <span className="font-medium">
                    Laboratory Practices and Techniques
                  </span>
                  : SOPs that govern safe handling.
                </li>
                <li>
                  <span className="font-medium">Safety Equipment</span>: Primary
                  barriers such as Biosafety Cabinets (BSCs) and PPE.
                </li>
                <li>
                  <span className="font-medium">
                    Facility Design and Construction
                  </span>
                  : Secondary barriers including ventilation, airlocks, and
                  waste treatment.
                </li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section id="levels" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">
                BSL-1 to BSL-4 Overview
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-slate-700">
                <li>
                  <span className="font-medium">BSL-1</span>: Work with
                  well-characterized agents not known to consistently cause
                  disease in healthy humans (e.g., non-pathogenic E. coli).
                  Standard microbiological practices are sufficient.
                </li>
                <li>
                  <span className="font-medium">BSL-2</span>: Moderate-risk
                  agents that pose dangers via ingestion, inhalation, or
                  percutaneous exposure (e.g., Staphylococcus aureus, Hepatitis
                  B virus). Requires enhanced PPE, biohazard signage, and Class
                  I or II BSCs.
                </li>
                <li>
                  <span className="font-medium">BSL-3</span>: Indigenous or
                  exotic agents that may cause serious or potentially lethal
                  disease via respiratory transmission (e.g., Mycobacterium
                  tuberculosis, SARS-CoV-2). Requires negative pressure, access
                  control, separation from corridors, and non-recirculated
                  exhaust.
                </li>
                <li>
                  <span className="font-medium">BSL-4</span>: Dangerous and
                  exotic agents with high individual risk and no available
                  treatment or vaccine (e.g., Ebola, Marburg). Requires maximum
                  containment, dedicated air and vacuum lines, chemical shower,
                  and personnel in positive-pressure suits.
                </li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section id="risk" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">
                The Role of Risk Assessment: The Foundation of Safety
              </h2>
              <p className="text-slate-700">
                Selecting the appropriate BSL is the outcome of a thorough,
                dynamic risk assessment that evaluates hazards associated with
                both the agent and the procedure, then implements layered
                controls.
              </p>
              <p className="mt-3 text-slate-700">
                A comprehensive assessment considers:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
                <li>
                  <span className="font-medium">Agent Hazards</span>:
                  Pathogenicity, virulence, infectious dose, and availability of
                  treatment or vaccines.
                </li>
                <li>
                  <span className="font-medium">Procedure Hazards</span>:
                  Aerosol generation, volumes, and concentrations involved.
                </li>
                <li>
                  <span className="font-medium">Personnel Competence</span>:
                  Training, proficiency, and immunological status.
                </li>
                <li>
                  <span className="font-medium">Facility &amp; Equipment</span>:
                  Primary and secondary containment capabilities.
                </li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section id="relationship" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">
                How BSL and Risk Assessment Work Together
              </h2>
              <p className="text-slate-700">
                BSLs are the prescriptive framework—the standardized rules for
                handling hazards. Risk assessment is the decision-making engine
                that selects the level and specifies additional precautions. For
                example, a BSL-2 agent may require BSL-3 containment for
                aerosol-generating large-volume procedures.
              </p>
            </section>

            <Separator className="my-8" />

            <section id="conclusion" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">
                Conclusion: An Integrated Approach to Safety
              </h2>
              <p className="text-slate-700">
                A truly safe laboratory pairs the minimum containment
                requirements of BSL with continuous, proactive risk assessment.
                Every new experiment, agent, or procedure change should trigger
                a re-evaluation so controls remain effective and proportionate.
              </p>
            </section>

            <Separator className="my-8" />

            <section id="resources" className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-semibold">Resources</h2>
              <h3 className="font-semibold">Whitepapers</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.escolifesciences.com/pdf/9010018%20A%20Guide%20to%20Biosafety%20%26%20Biological%20Safety%20Cabinets_vE_130824.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Guide to Biosafety and Biological Safety Cabinets
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.escolifesciences.com/pdf/BSC%20%26%20LFC%20Maintence%20Tips%20and%20Procedures-V.B.-Mar2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BSC Maintenance Tips and Procedure
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.escolifesciences.com/products/class-ii-biological-safety-cabinet/streamline-e-series-g4-class-ii-biological-safety-cabinet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safe Work Practices in a Biosafety Cabinet
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.escolifesciences.com/pdf/Repair%20or%20Replace%20Your%20Old%20Biosafety%20Cabinet-intheloop_LR.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repair or Replace Your Old Biosafety Cabinet?
                  </a>
                </li>
              </ul>
              <h3 className="mt-5 font-semibold">Videos</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.youtube.com/watch?v=vss9HS5DQQ8&t=570s"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inside the Sciences Podcast Episode 1: Biosafety Cabinets |
                    Protecting Science, Protecting You
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.youtube.com/watch?v=uaydXcyUZhI&list=PLT9h-p38eRmubWGpKsNbKpJzBZXrbIvF8&index=21"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Biological Safety Cabinet | What You Need | Esco Scientific
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.youtube.com/watch?v=ZnUW1N-JJz8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Working Safely in your Biological Safety Cabinets: Dealing
                    with Spills | Esco Scientific
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.youtube.com/watch?v=IkO3ABNT_M8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Biological Safety Cabinets | What to Keep in Mind for Stable
                    Airflow
                  </a>
                </li>
                <li>
                  <a
                    className="text-[hsl(var(--brand-end))] hover:underline"
                    href="https://www.youtube.com/watch?v=voU9E2_vxQ0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Biosafety Cabinet | Tips to Maintain its Efficiency | Esco
                    Scientific
                  </a>
                </li>
              </ul>
            </section>

            <Separator className="my-10" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/resources/articles"
                className="text-[hsl(var(--brand-end))] hover:underline"
              >
                ← Back to Articles
              </Link>
              <div className="text-sm text-slate-600">
                Last updated: March 2025
              </div>
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
