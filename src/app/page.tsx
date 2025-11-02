'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/image-uploader';
import { ResultDisplay } from '@/components/result-display';
import type { IdentifyTreeSpeciesOutput } from '@/ai/flows/identify-tree-species';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Trees } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<IdentifyTreeSpeciesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1');

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-primary/10">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover z-[-1] opacity-20"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tighter">
            Identify Any Tree
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Upload a photo of a leaf, bark, or flower to instantly identify a tree species with the power of AI.
          </p>
        </div>
      </section>

      <section id="identifier" className="container mx-auto px-4 md:px-6 py-12 md:py-20 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold font-headline text-primary">AI-Powered Recognition</h2>
            <ImageUploader 
              onResult={setResult}
              onError={setError}
              onClear={handleClear}
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold font-headline text-primary">Identification Result</h2>
            <ResultDisplay result={result} error={error} />
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-lg bg-card p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-4 rounded-full">
                <Trees className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline text-primary">Explore the Tree Library</h3>
                <p className="text-foreground/80">Browse our extensive library of tree species.</p>
              </div>
            </div>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
              <Link href="/species">
                Start Exploring <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
