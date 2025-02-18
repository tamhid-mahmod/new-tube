import Link from "next/link";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

import { UserAvatar } from "@/components/user-avatar";

import { UserInfo } from "@/modules/users/ui/components/user-info";

import type { VideoGetManyOutput } from "../../types";

import { VideoMenu } from "./video-menu";

// ----------------------------------------------------------------------

type VideoInfoProps = {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
};

export function VideoInfo({ data, onRemove }: VideoInfoProps) {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.viewCount);
  }, [data.viewCount]);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(data.createdAt, { addSuffix: true });
  }, [data.createdAt]);

  return (
    <div className="flex gap-3">
      <Link href={`/users/${data.user.id}`}>
        <UserAvatar imageUrl={data.user.imageUrl} name={data.user.name} />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/videos/${data.id}`}>
          <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data.title}
          </h3>
        </Link>

        <Link href={`/users/${data.user.id}`}>
          <UserInfo name={data.user.name} />
        </Link>

        <Link href={`/users/${data.user.id}`}>
          <p className="text-sm text-gray-600 line-clamp-1">
            {compactViews} views • {compactDate}
          </p>
        </Link>
      </div>

      <div className="flex-shrink-0">
        <VideoMenu videoId={data.id} onRemove={onRemove} />
      </div>
    </div>
  );
}
