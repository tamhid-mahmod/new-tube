import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient, trpc } from "@/trpc/server";

// ----------------------------------------------------------------------

export default async function Page() {
  void trpc.hello.prefetch({ text: "Tamhid" });

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>asd</ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
