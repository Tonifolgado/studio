import Link from 'next/link';
import Image from 'next/image';
import type { Tree } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function TreeCard({ tree }: { tree: Tree }) {
  const image = PlaceHolderImages.find(img => img.id === tree.images[0]);
  
  return (
    <Link href={`/species/${tree.slug}`} className="group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1">
        <div className="relative aspect-square">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-lg text-primary group-hover:text-accent">{tree.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
