import { HydrateClient, trpc } from "@/trpc/server";

import { VideoView } from "@/modules/videos/ui/views";

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{
    videoId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { videoId } = await params;

  void trpc.videos.getOne.prefetch({ id: videoId });
  // TODO: don't forget to change to 'prefetchInfinite
  void trpc.comments.getMany.prefetch({ videoId });

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
}
