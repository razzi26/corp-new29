import { Link } from "react-router-dom";

import { PageBanner } from "@/components/layout/PageBanner";

export default function About() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="About Us"
        description="Discover Esco Biosafety Institute and our mission to advance biosafety education and standards."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs md:text-sm border border-slate-200 text-slate-700">
              About Us
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
              Esco Biosafety Institute
            </h1>
            <p className="mt-4 text-slate-700 text-base md:text-lg max-w-prose">
              Esco is a global life sciences company that started in 1978 as a
              cleanroom technology specialist. It has since progressed into a
              key player that leverages its Singapore headquarters as a
              strategic hub to connect Eastern and Western markets. The company
              is a market leader in biological safety cabinets and maintains a
              significant worldwide presence.
            </p>
            <p className="mt-3 text-slate-700 text-base md:text-lg max-w-prose">
              A key initiative in fulfilling its vision was the creation of the
              Esco Biosafety Institute. The Institute was created to push
              forward Esco’s core mission of building a global life sciences
              ecosystem. Beyond being a manufacturing hardware, it purposes to
              be a foundational pillar for education and standards.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition"
              >
                Contact us
              </Link>
              <Link
                to="/news"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50 transition"
              >
                Explore resources
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-semibold">Our Journey</h3>
              <ul className="mt-4 space-y-3 text-slate-700 text-sm leading-relaxed">
                <li>
                  <span className="font-semibold">1978:</span> Founded as a
                  cleanroom technology specialist.
                </li>
                <li>
                  <span className="font-semibold">1980s–2000s:</span> Expanded
                  globally; became a market leader in biological safety
                  cabinets.
                </li>
                <li>
                  <span className="font-semibold">Today:</span> A global company
                  connecting East and West from Singapore HQ.
                </li>
                <li>
                  <span className="font-semibold">
                    Esco Biosafety Institute:
                  </span>{" "}
                  Established to advance education, standards, and
                  certification.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-3 gap-6">
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

      {/* Call to action */}
      <section className="container mx-auto px-4 mt-20 mb-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Partner with us</h3>
            <p className="mt-2 text-slate-700 max-w-prose">
              Looking to upskill your team, certify your lab, or align with
              global standards? Our experts can help tailor training and
              resources to your needs.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition"
            >
              Get in touch
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50 transition"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MissionCard({ title, descr }: { title: string; descr: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-700 text-sm leading-relaxed">{descr}</p>
    </div>
  );
}
