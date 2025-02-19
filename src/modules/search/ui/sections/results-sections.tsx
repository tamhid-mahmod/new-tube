"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useIsMobile } from "@/hooks/use-mobile";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

import { InfiniteScroll } from "@/components/infinite-scroll";

import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "@/modules/videos/ui/components/video-grid-card";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "@/modules/videos/ui/components/video-row-card";

// ----------------------------------------------------------------------

type Props = {
  query: string | undefined;
  categoryId: string | undefined;
};

export function ResultsSection({ query, categoryId }: Props) {
  return (
    <Suspense
      key={`${query}-${categoryId}`}
      fallback={<ResultsSectionSkeleton />}
    >
      <ErrorBoundary fallback={<p>Error...</p>}>
        <ResultsSectionSuspense query={query} categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

export function ResultsSectionSkeleton() {
  return (
    <>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 5 }).map((_, idx) => (
          <VideoRowCardSkeleton key={idx} />
        ))}
      </div>

      <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
        {Array.from({ length: 5 }).map((_, idx) => (
          <VideoGridCardSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

function ResultsSectionSuspense({ query, categoryId }: Props) {
  const isMobile = useIsMobile();

  const [results, resultsQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
    {
      query,
      categoryId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoGridCard key={video.id} data={video} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoRowCard key={video.id} data={video} />
            ))}
        </div>
      )}

      <InfiniteScroll
        hasNextPage={resultsQuery.hasNextPage}
        isFetchingNextPage={resultsQuery.isFetchingNextPage}
        fetchNextPage={resultsQuery.fetchNextPage}
      />
    </>
  );
}
