import { PageBanner } from "@/components/layout/PageBanner";
import { Seo } from "@/components/Seo";
import { Separator } from "@/components/ui/separator";
import { ShareButtons } from "@/components/ShareButtons";

export default function NewsArticleUltrasound() {
  const title = "How to choose an ultrasound scanner";
  const description =
    "Key factors for selecting an ultrasound system: clinical needs, probes, image quality, workflow, and service.";

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: title },
        ]}
      />

      <Seo
        title={title}
        description={description}
        url={typeof window !== "undefined" ? window.location.href : undefined}
        image="/placeholder.svg"
        type="article"
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <time dateTime="2025-02-10">February 10, 2025</time>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <ShareButtons
          title={title}
          description={description}
          className="mb-6"
        />

        <p className="text-lg leading-8 text-slate-700">
          Selecting an ultrasound scanner starts with your clinical scenarios:
          point-of-care, OB/GYN, cardiology, MSK, or general imaging. Match
          transducers to use cases, ensure adequate Doppler and image
          processing, and evaluate ergonomics and workflow.
        </p>

        <Separator className="my-8" />

        <section>
          <h2 className="mb-3 text-xl font-semibold">Checklist</h2>
          <ul className="list-disc pl-6 text-slate-700 space-y-1">
            <li>Clinical applications and presets</li>
            <li>Transducer portfolio and durability</li>
            <li>Image quality and penetration at target depths</li>
            <li>Workflow shortcuts and DICOM integration</li>
            <li>Service coverage, loaners, and total cost of ownership</li>
          </ul>
        </section>

        <Separator className="my-10" />
        <ShareButtons title={title} description={description} />
      </article>
    </div>
  );
}
