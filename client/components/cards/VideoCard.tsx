import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { VideoItem } from "@/entities/video";

export function VideoCard({ video }: { video: VideoItem }) {
  const params = video.start ? `?start=${video.start}` : "";
  return (
    <div className="border-b border-slate-200 pb-8 pt-6">
      <AspectRatio ratio={16 / 9} className="mb-6">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}${params}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </AspectRatio>

      <h3 className="text-2xl font-bold leading-tight text-[hsl(var(--primary))]">{video.title}</h3>
    </div>
  );
}
