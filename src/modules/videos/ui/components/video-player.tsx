"use client";

import MuxPlayer from "@mux/mux-player-react";

import { THUMBNAIL_FALLBACK } from "../../constants";

// ----------------------------------------------------------------------

type Props = {
  playbackId: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
};

export function VideoPlayer({
  playbackId,
  thumbnailUrl,
  autoPlay,
  onPlay,
}: Props) {
  return (
    <MuxPlayer
      playbackId={playbackId || ""}
      poster={thumbnailUrl || THUMBNAIL_FALLBACK}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#0ea5e9"
      onPlay={onPlay}
    />
  );
}

// ----------------------------------------------------------------------

export function VideoPlayerSkeleton() {
  return <div className="aspect-video bg-black rounded-xl" />;
}
