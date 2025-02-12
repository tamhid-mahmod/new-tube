import { HomeView } from "@/modules/home/ui/views";
import { HydrateClient, trpc } from "@/trpc/server";

// ----------------------------------------------------------------------

export const dynamic = "force-dynamic";

// ----------------------------------------------------------------------

type Props = {
  searchParams: Promise<{
    categoryId?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
}
