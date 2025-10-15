import { PageBanner } from "@/components/layout/PageBanner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VIDEOS = [
  {
    id: "vss9HS5DQQ8",
    title: "Inside the Sciences Podcast Episode 1: Biosafety Cabinets | Protecting Science, Protecting You",
    start: 570,
  },
  {
    id: "uaydXcyUZhI",
    title: "Biological Safety Cabinet | What You Need | Esco Scientific",
  },
  {
    id: "ZnUW1N-JJz8",
    title: "Working Safely in your Biological Safety Cabinets: Dealing with Spills | Esco Scientific",
  },
  {
    id: "IkO3ABNT_M8",
    title: "Biological Safety Cabinets | What to Keep in Mind for Stable Airflow",
  },
  {
    id: "voU9E2_vxQ0",
    title: "Biosafety Cabinet | Tips to Maintain its Efficiency | Esco Scientific",
  },
];

export default function Videos() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Videos"
        description="Recorded seminars, introductions and short explainers."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Videos" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Video library</h2>
        <p className="mt-3 text-slate-700">Curated videos about biosafety and proper use of biological safety cabinets.</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => {
            const params = v.start ? `?start=${v.start}` : "";
            return (
              <div key={v.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}${params}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </AspectRatio>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{v.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
