import { SearchBar } from '@/components/search-bar';
import { TreeCard } from '@/components/tree-card';
import { trees } from '@/lib/data';
import type { Tree } from '@/lib/data';
import { Suspense } from 'react';

export default function SpeciesLibraryPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const searchTerm = searchParams?.q || '';
  const filteredTrees = trees.filter((tree) =>
    tree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold font-headline text-primary">Tree Species Library</h1>
            <p className="text-lg text-muted-foreground">
              Search and explore our collection of tree species.
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <Suspense>
              <SearchBar placeholder="Search for a tree by name... (e.g., Oak)" />
            </Suspense>
          </div>
        </div>
        
        {filteredTrees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTrees.map((tree: Tree) => (
              <TreeCard key={tree.id} tree={tree} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No trees found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
