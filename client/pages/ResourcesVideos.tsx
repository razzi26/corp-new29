import { PageBanner } from "@/components/layout/PageBanner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  start?: number;
}

export default function Videos() {
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch("/data/videos.json", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load videos (${res.status})`);
        return (await res.json()) as unknown;
      })
      .then((json) => {
        if (!mounted) return;
        if (!Array.isArray(json)) throw new Error("Invalid videos data format");
        const valid = (json as any[]).filter(
          (v) => v && typeof v.id === "string" && typeof v.title === "string",
        );
        setVideos(valid as VideoItem[]);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? "Failed to load videos");
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
        title="Videos"
        description="Curated videos about biosafety and proper use of biological safety cabinets."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Videos" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {loading && (
          <div className="mt-6 text-slate-600">Loading videos...</div>
        )}
        {error && (
          <div className="mt-6 text-sm text-red-600">Error: {error}</div>
        )}

        <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(videos ?? []).map((v) => {
            const params = v.start ? `?start=${v.start}` : "";
            return (
              <div
                key={v.id}
                className="overflow-hidden rounded-lg border bg-white shadow-sm"
              >
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
                  <h3 className="text-sm font-semibold text-slate-900">
                    {v.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
