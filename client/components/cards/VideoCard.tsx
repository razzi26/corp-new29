import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { VideoItem } from "@/entities/video";

export function VideoCard({ video }: { video: VideoItem }) {
  const params = video.start ? `?start=${video.start}` : "";
  return (
    <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
      <AspectRatio ratio={16 / 9}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}${params}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </AspectRatio>

      <div className="p-6">
        <h3 className="text-lg font-bold text-[hsl(var(--primary))]">{video.title}</h3>
      </div>
    </div>
  );
}
