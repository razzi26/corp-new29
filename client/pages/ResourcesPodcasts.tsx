import { PageBanner } from "@/components/layout/PageBanner";
import { useEffect, useState } from "react";
import type { PodcastItem } from "@/entities/podcast";
import { PodcastCard } from "@/components/cards/PodcastCard";

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
        setItems(
          (json as any[]).filter(
            (i) => i && typeof i.id === "string" && typeof i.title === "string",
          ),
        );
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
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Podcasts" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {loading && (
          <div className="mt-6 text-slate-600">Loading podcasts...</div>
        )}
        {error && (
          <div className="mt-6 text-sm text-red-600">Error: {error}</div>
        )}

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(items ?? []).map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
