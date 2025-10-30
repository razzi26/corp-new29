import { PageBanner } from "@/components/layout/PageBanner";
import { useEffect, useState } from "react";
import type { VideoItem } from "@/entities/video";
import { VideoCard } from "@/components/cards/VideoCard";

export default function Videos() {
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const url = new URL("/data/videos.json", typeof window !== 'undefined' ? window.location.origin : '/');
    fetch(url.toString(), { cache: "no-store" })
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
          {(videos ?? []).map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>
    </div>
  );
}
