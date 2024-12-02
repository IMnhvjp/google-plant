'use client'
import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import SearchContent from './SearchContent';

// Wrapper component to handle Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

// Actual search content moved to a separate component
function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  return <SearchContent initialQuery={initialQuery} />;
}