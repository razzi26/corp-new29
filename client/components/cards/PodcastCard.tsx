import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { PodcastItem } from "@/entities/podcast";

export function PodcastCard({ podcast }: { podcast: PodcastItem }) {
  const params = podcast.start ? `?start=${podcast.start}` : "";
  return (
    <div className="border-b border-slate-200 pb-8 pt-6">
      <AspectRatio ratio={16 / 9} className="mb-6">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${podcast.id}${params}`}
          title={podcast.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </AspectRatio>
      <h3 className="text-2xl font-bold leading-tight text-[hsl(var(--primary))]">
        {podcast.title}
      </h3>
    </div>
  );
}
