import { PageBanner } from "@/components/layout/PageBanner";

import { PageBanner } from "@/components/layout/PageBanner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";

interface PodcastItem {
  id: string;
  title: string;
  start?: number;
}

export default function Podcasts() {
  const [items, setItems] = useState<PodcastItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/data/podcasts.json", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load podcasts (${res.status})`);
        return (await res.json()) as unknown;
      })
      .then((json) => {
        if (!mounted) return;
        if (!Array.isArray(json)) throw new Error("Invalid podcasts format");
        setItems((json as any[]).filter((i) => i && typeof i.id === "string" && typeof i.title === "string"));
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load podcasts");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Podcasts"
        description="Interviews and discussions with biosafety experts."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Podcasts" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Podcast library</h2>
        <p className="mt-3 text-slate-700">Curated podcast episodes and interviews.</p>

        {loading && <div className="mt-6 text-slate-600">Loading podcasts...</div>}
        {error && <div className="mt-6 text-sm text-red-600">Error: {error}</div>}

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(items ?? []).map((p) => {
            const params = p.start ? `?start=${p.start}` : "";
            return (
              <div key={p.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${p.id}${params}`}
                    title={p.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </AspectRatio>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{p.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
