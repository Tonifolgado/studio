'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, UploadCloud, Trash2, Leaf } from 'lucide-react';
import { handleImageIdentification } from '@/app/actions';
import type { IdentifyTreeSpeciesOutput } from '@/ai/flows/identify-tree-species';

interface ImageUploaderProps {
  onResult: (result: IdentifyTreeSpeciesOutput) => void;
  onError: (error: string) => void;
  onClear: () => void;
}

export function ImageUploader({ onResult, onError, onClear }: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          toast({ variant: 'destructive', title: 'File too large', description: 'Please upload an image smaller than 4MB.' });
          return;
      }
      onClear();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!imagePreview) return;
    setIsLoading(true);
    onClear();

    try {
      const response = await handleImageIdentification(imagePreview);
      if (response.success) {
        onResult(response.data);
      } else {
        onError(response.error);
        toast({ variant: 'destructive', title: 'Identification Failed', description: response.error });
      }
    } catch (e) {
      const errorMsg = 'An unexpected error occurred. Please try again.';
      onError(errorMsg);
      toast({ variant: 'destructive', title: 'Error', description: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <label
          htmlFor="tree-image-upload"
          className="w-full aspect-video border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-background"
        >
          {imagePreview ? (
            <div className="relative w-full h-full">
              <Image src={imagePreview} alt="Tree preview" fill className="object-contain rounded-md" />
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <UploadCloud className="mx-auto h-12 w-12" />
              <p className="mt-2 font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm">PNG, JPG, or WEBP (max 4MB)</p>
            </div>
          )}
        </label>
        <input
          id="tree-image-upload"
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex gap-2 justify-end">
          {imagePreview && (
            <>
              <Button variant="outline" onClick={handleClear} disabled={isLoading}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear
              </Button>
              <Button onClick={handleIdentify} disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Leaf className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Identifying...' : 'Identify Tree'}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
