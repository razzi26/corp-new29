import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { PodcastItem } from "@/entities/podcast";

export function PodcastCard({ podcast }: { podcast: PodcastItem }) {
  const params = podcast.start ? `?start=${podcast.start}` : "";
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
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
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900">
          {podcast.title}
        </h3>
      </div>
    </div>
  );
}
