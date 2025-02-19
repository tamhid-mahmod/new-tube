"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

import { InfiniteScroll } from "@/components/infinite-scroll";

import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "../components/video-row-card";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "../components/video-grid-card";

// ----------------------------------------------------------------------

type Props = {
  videoId: string;
  isManual?: boolean;
};

export function SuggestionsSection({ videoId, isManual }: Props) {
  return (
    <Suspense fallback={<SuggestionsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <SuggestionsSectionSuspense videoId={videoId} isManual={isManual} />
      </ErrorBoundary>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function SuggestionsSectionSkeleton() {
  return (
    <>
      <div className="hidden md:block space-y-3">
        {Array.from({ length: 8 }).map((_, idx) => (
          <VideoRowCardSkeleton key={idx} size="compact" />
        ))}
      </div>

      <div className="block md:hidden space-y-10">
        {Array.from({ length: 8 }).map((_, idx) => (
          <VideoGridCardSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

function SuggestionsSectionSuspense({ videoId, isManual }: Props) {
  const [suggestions, query] =
    trpc.suggestions.getMany.useSuspenseInfiniteQuery(
      {
        videoId,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  return (
    <>
      <div className="hidden md:block space-y-3">
        {suggestions.pages.flatMap((page) =>
          page.items.map((video) => (
            <VideoRowCard key={video.id} data={video} size="compact" />
          ))
        )}
      </div>

      <div className="block md:hidden space-y-10">
        {suggestions.pages.flatMap((page) =>
          page.items.map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))
        )}
      </div>

      <InfiniteScroll
        isManual={isManual}
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </>
  );
}
