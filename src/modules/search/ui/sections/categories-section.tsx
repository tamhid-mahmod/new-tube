"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FilterCarousel } from "@/components/filter-carousel";

import { trpc } from "@/trpc/client";

// ----------------------------------------------------------------------

type Props = {
  categoryId?: string;
};

export function CategoriesSection({ categoryId }: Props) {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function CategoriesSkeleton() {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
}

// ----------------------------------------------------------------------

type CategoriesSectionSuspenseProps = {
  categoryId?: string;
};

function CategoriesSectionSuspense({
  categoryId,
}: CategoriesSectionSuspenseProps) {
  const router = useRouter();

  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const categoriesData = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return (
    <FilterCarousel
      onSelect={onSelect}
      value={categoryId}
      data={categoriesData}
    />
  );
}
