"use client";

import SearchResult from "@/src/components/ui/SearchResult";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("query");

  return (
    <div className="flex-1 p-4">
      <div className="max-w-6xl">
        {q && (
          <div className="mb-6">
            <h1 className="text-xl font-medium mb-4">
              Search results for `{q}`
            </h1>
          </div>
        )}

        <Suspense fallback={<div>Loading search results...</div>}>
          <SearchResult query={q ?? ""} />
        </Suspense>
      </div>
    </div>
  );
}
