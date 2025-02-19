import { CategoriesSection } from "../sections/categories-section";
import { ResultsSection } from "../sections/results-sections";

// ----------------------------------------------------------------------

type Props = {
  query: string | undefined;
  categoryId: string | undefined;
};

export function SearchView({ query, categoryId }: Props) {
  return (
    <div className="max-w-[1300px] mx-auto mb-10 flex flex-col gap-y-6 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />

      <ResultsSection query={query} categoryId={categoryId} />
    </div>
  );
}
