"use client";

import { useAuth } from "@clerk/nextjs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";

import { VideoPlayer } from "../components/video-player";
import { VideoBanner } from "../components/video-banner";
import { VideoTopRow } from "../components/video-top-row";

// ----------------------------------------------------------------------

type Props = {
  videoId: string;
};

export function VideoSection({ videoId }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function VideoSectionSuspense({ videoId }: Props) {
  const { isSignedIn } = useAuth();
  const utils = trpc.useUtils();

  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

  const createView = trpc.videoViews.create.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
    },
  });

  const handlePlay = () => {
    if (!isSignedIn) return;

    createView.mutate({ videoId });
  };

  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-xl overflow-hidden relative",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay
          onPlay={handlePlay}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>

      <VideoBanner status={video.muxStatus} />

      <VideoTopRow video={video} />
    </>
  );
}
