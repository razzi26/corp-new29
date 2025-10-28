import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { VideoItem } from "@/entities/video";

export function VideoCard({ video }: { video: VideoItem }) {
  const params = video.start ? `?start=${video.start}` : "";
  return (
    <div className="pb-0 pt-0">
      <AspectRatio ratio={16 / 9} className="mb-4">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}${params}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </AspectRatio>

      <h3 className="text-2xl font-bold leading-tight text-[hsl(var(--primary))]">
        {video.title}
      </h3>
    </div>
  );
}
