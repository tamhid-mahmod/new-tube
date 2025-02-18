import Link from "next/link";

import type { VideoGetManyOutput } from "../../types";

import { VideoThumbnail } from "./video-thumbnail";
import { VideoInfo } from "./video-info";

// ----------------------------------------------------------------------

type VideoGridCardProps = {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
};

export function VideoGridCard({ data, onRemove }: VideoGridCardProps) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <Link href={`/videos/${data.id}`}>
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          duration={data.duration}
        />
      </Link>

      <VideoInfo data={data} onRemove={onRemove} />
    </div>
  );
}
