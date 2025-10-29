import { Link } from "react-router-dom";

import { PageBanner } from "@/components/layout/PageBanner";

export default function About() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="About Us"
        description="Discover Esco Biosafety Institute and our mission to advance biosafety education and standards."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        backgroundImage="https://images.pexels.com/photos/5726809/pexels-photo-5726809.jpeg"
      />
      {/* Hero */}
      <section className="relative container mx-auto px-4 py-16 md:py-24">
        <div
          className="pointer-events-none absolute left-[12%] top-16 hidden h-56 w-56 rounded-full bg-[#0096d6]/12 blur-3xl md:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[8%] top-32 hidden h-72 w-72 rounded-full bg-[#003a68]/12 blur-3xl lg:block"
          aria-hidden
        />
        <div className="relative grid items-center gap-12 md:grid-cols-2">
          <div className="relative space-y-8">
            <div>
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h1 className="text-3xl font-bold leading-tight text-[hsl(205_100%_12%)] md:text-5xl">
                Esco Biosafety Institute
              </h1>
            </div>
            <p className="max-w-prose text-base text-slate-700 md:text-lg leading-relaxed">
              Esco is a global life sciences company that started in 1978 as a
              cleanroom technology specialist. It has since progressed into a
              key player that leverages its Singapore headquarters as a
              strategic hub to connect Eastern and Western markets. The company
              is a market leader in biological safety cabinets and maintains a
              significant worldwide presence.
            </p>
            <p className="max-w-prose text-base text-slate-700 md:text-lg leading-relaxed">
              A key initiative in fulfilling its vision was the creation of the
              Esco Biosafety Institute. The Institute was created to push
              forward Esco's core mission of building a global life sciences
              ecosystem. Beyond being a manufacturing hardware, it purposes to
              be a foundational pillar for education and standards.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[hsl(var(--brand-end))] px-5 py-3 font-semibold text-white transition hover:bg-brand-secondary"
              >
                Contact us
              </Link>
              <Link
                to="/news"
                className="inline-flex items-center justify-center border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50"
              >
                Explore resources
              </Link>
            </div>
          </div>

          {/* Our Journey - Timeline */}
          <div className="mt-12 pt-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[hsl(205_100%_12%)]">
                Our Journey
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-bold text-sm">
                    1
                  </div>
                  <div className="mt-2 h-12 w-0.5 bg-slate-300"></div>
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-[hsl(205_100%_12%)]">1978</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    Founded as a cleanroom technology specialist.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-bold text-sm">
                    2
                  </div>
                  <div className="mt-2 h-12 w-0.5 bg-slate-300"></div>
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-[hsl(205_100%_12%)]">
                    1980s–2000s
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    Expanded globally; became a market leader in biological
                    safety cabinets.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-bold text-sm">
                    3
                  </div>
                  <div className="mt-2 h-12 w-0.5 bg-slate-300"></div>
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-[hsl(205_100%_12%)]">
                    Today
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    A global company connecting East and West from Singapore HQ.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-bold text-sm">
                    4
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[hsl(205_100%_12%)]">
                    Esco Biosafety Institute
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    Established to advance education, standards, and
                    certification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative container mx-auto mt-20 px-4 py-8">
        <div
          className="pointer-events-none absolute inset-x-6 -top-10 hidden h-32 rounded-full bg-[#0096d6]/10 blur-3xl md:block"
          aria-hidden
        />
        <div className="relative grid gap-6 md:grid-cols-3">
          <MissionCard
            title="Cultivate a Global Culture of Biosafety"
            descr="Educate and certify professionals worldwide, ensuring the highest standards of safety, quality, and compliance in laboratories."
          />
          <MissionCard
            title="Bridge the Knowledge Gap"
            descr="Serve as a central hub for best practices, regulatory updates, and practical skills, leveraging 40+ years of industry experience."
          />
          <MissionCard
            title="Empower the Scientific Community"
            descr="Protect researchers, patients, and the environment by enabling effective use of safety equipment and responsible handling of biological materials."
          />
        </div>
      </section>
    </div>
  );
}

function MissionCard({ title, descr }: { title: string; descr: string }) {
  return (
    <div className="bg-white p-6">
      <h3 className="text-lg font-semibold text-[hsl(205_100%_12%)] mb-4">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-700">{descr}</p>
    </div>
  );
}
