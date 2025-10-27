import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { PodcastItem } from "@/entities/podcast";

export function PodcastCard({ podcast }: { podcast: PodcastItem }) {
  const params = podcast.start ? `?start=${podcast.start}` : "";
  return (
    <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
      <AspectRatio ratio={16 / 9}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${podcast.id}${params}`}
          title={podcast.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </AspectRatio>
      <div className="p-6">
        <h3 className="text-lg font-bold text-[hsl(var(--primary))]">
          {podcast.title}
        </h3>
      </div>
    </div>
  );
}
