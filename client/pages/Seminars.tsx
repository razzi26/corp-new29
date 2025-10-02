import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PageBanner } from "@/components/layout/PageBanner";

export default function Seminars() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Seminars"
        description="Non-commercial, safety-focused seminars delivered worldwide by Esco biosafety specialists."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Seminars" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:gap-12 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">About our Seminars</h2>
            <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
              Esco champions biosafety in laboratory environments. We understand that constant
              exposure to biological hazards poses a serious threat to personnel, potentially
              leading to illness. Additionally, biosafety protocols are most often neglected, and
              a lack of correct knowledge, even in a controlled laboratory, cannot ensure that it
              is safe for people and the environment.
            </p>

            <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
              To answer this crucial need, Esco Biosafety Institute delivers non-commercial,
              safety-focused seminars worldwide. These sessions can be conveniently hosted on-site
              at your facility, based on scheduling availability. With our massive distribution
              network spanning over 100 countries, an Esco biosafety specialist is always within
              reach to provide expert guidance.
            </p>

            <h3 className="mt-6 text-lg font-semibold">Laboratory / Life Science Topics</h3>
            <ul className="mt-3 grid gap-2 md:grid-cols-1 list-none">
              <li className="inline-flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-start" />
                <span className="text-slate-700">Biosafety Awareness</span>
              </li>
              <li className="inline-flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-start" />
                <span className="text-slate-700">Chemical Safety Awareness</span>
              </li>
              <li className="inline-flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-start" />
                <span className="text-slate-700">Working Safely with Laboratory Products (cold storage, centrifuges, shakers, thermostatic products)</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold">Who can attend?</h3>
            <p className="mt-3 text-slate-700">Lab Personnel • Researchers • Teachers and Students</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--brand-end))] px-6 py-3 text-base font-semibold text-white shadow hover:shadow-md"
              >
                Request a Seminar
              </a>

              <a
                href="/seminars/trainings"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 px-6 py-3 text-base font-medium text-slate-700 bg-white hover:bg-slate-50"
              >
                See Trainings
              </a>
            </div>
          </div>

          <div>
            <AspectRatio ratio={16 / 9}>
              <iframe
                className="h-full w-full rounded-xl border border-slate-200 shadow-sm"
                src="https://www.youtube.com/embed/xR3D6CRra2k"
                title="Seminars Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </AspectRatio>

            <p className="mt-3 text-sm text-slate-500">
              Video introduction for seminars.{' '}
              <a
                href="https://www.youtube.com/watch?v=xR3D6CRra2k"
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:text-slate-700"
              >
                Watch on YouTube
              </a>
            </p>

            <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h4 className="font-semibold">Delivery & Scheduling</h4>
              <p className="mt-2 text-sm text-slate-700">
                Seminars are non-commercial and safety-focused. We offer on-site seminars
                subject to scheduling availability. For bookings, please contact your local
                Esco representative or use the Request a Seminar button.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
