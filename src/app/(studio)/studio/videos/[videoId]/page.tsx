import { HydrateClient, trpc } from "@/trpc/server";

import { StudioVideoView } from "@/modules/studio/ui/views";

// ----------------------------------------------------------------------

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ videoId: string }>;
};

export default async function Page({ params }: Props) {
  const { videoId } = await params;

  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <StudioVideoView videoId={videoId} />
    </HydrateClient>
  );
}
