import { notFound } from 'next/navigation';
import Image from 'next/image';
import { trees } from '@/lib/data';
import { generateTreeDescription } from '@/ai/flows/generate-tree-description';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Leaf, Map, NotebookText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  return trees.map((tree) => ({
    slug: tree.slug,
  }));
}

export default async function TreeDetailPage({ params }: { params: { slug: string } }) {
  const tree = trees.find((t) => t.slug === params.slug);

  if (!tree) {
    notFound();
  }

  const { description } = await generateTreeDescription({ treeSpecies: tree.name });
  const rangeMapImage = PlaceHolderImages.find(img => img.id === tree.rangeMapImage);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">{tree.name}</h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground italic">{tree.scientificName}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          <div className="md:col-span-3 space-y-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Carousel>
                  <CarouselContent>
                    {tree.images.map((imageId) => {
                      const image = PlaceHolderImages.find(img => img.id === imageId);
                      return image ? (
                        <CarouselItem key={image.id}>
                          <div className="aspect-video relative">
                            <Image
                              src={image.imageUrl}
                              alt={image.description}
                              fill
                              className="object-cover"
                              data-ai-hint={image.imageHint}
                              sizes="(max-width: 768px) 100vw, 60vw"
                            />
                          </div>
                        </CarouselItem>
                      ) : null;
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Leaf />
                  About the {tree.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <NotebookText />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Family</span>
                  <Badge variant="secondary" className="font-sans">{tree.family}</Badge>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Characteristics</h4>
                  <p className="text-sm">{tree.characteristics}</p>
                </div>
                <Separator />
                 <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Interesting Facts</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {tree.facts.map((fact, i) => <li key={i}>{fact}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map />
                  Geographical Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rangeMapImage ? (
                  <div className="aspect-video relative overflow-hidden rounded-md border">
                    <Image
                      src={rangeMapImage.imageUrl}
                      alt={rangeMapImage.description}
                      fill
                      className="object-contain"
                      data-ai-hint={rangeMapImage.imageHint}
                       sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ) : <p className="text-muted-foreground">Range map not available.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
