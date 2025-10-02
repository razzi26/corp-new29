import { PageBanner } from "@/components/layout/PageBanner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Trainings() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Trainings"
        description="Expert-led programs delivered from our dedicated learning centers and through global offices."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Seminars", href: "/seminars/seminars" },
          { label: "Trainings" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Trainings</h2>
            <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
              Esco delivers expert-led training programs from our dedicated learning centers in Singapore and Indonesia. These state-of-the-art facilities are equipped with the necessary tools for comprehensive product demonstrations and in-depth service training. We also periodically offer both in-person and virtual courses through our global network of offices.
            </p>
            <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
              Our instruction is led by NSF 49-certified engineer-trainers who bring years of invaluable real-world experience in biosafety cabinet design, manufacturing, testing, and troubleshooting.
            </p>
          </div>

          <div>
            <AspectRatio ratio={16 / 9}>
              <iframe
                className="h-full w-full rounded-xl border border-slate-200 shadow-sm"
                src="https://www.youtube.com/embed/6r-jrWdu394"
                title="Training by Esco Highlights (May 2019)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </AspectRatio>
            <p className="mt-3 text-sm text-slate-500">
              Training by Esco Highlights (May 2019).{" "}
              <a
                href="https://www.youtube.com/watch?v=6r-jrWdu394"
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:text-slate-700"
              >
                Watch on YouTube
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
