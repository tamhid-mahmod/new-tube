import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

import { SearchView } from "@/modules/search/ui/views";

// ----------------------------------------------------------------------

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    query: string | undefined;
    categoryId: string | undefined;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { query, categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();
  void trpc.search.getMany.prefetchInfinite({
    query,
    categoryId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SearchView query={query} categoryId={categoryId} />
    </HydrateClient>
  );
}
