'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { IdentifyTreeSpeciesOutput } from "@/ai/flows/identify-tree-species";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ResultDisplayProps {
  result: IdentifyTreeSpeciesOutput | null;
  error: string | null;
}

export function ResultDisplay({ result, error }: ResultDisplayProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Identification Failed</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (result) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600"/>
            Identification Success
          </CardTitle>
          <CardDescription>We've identified the following species:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-headline text-primary">{result.speciesName}</h3>
            <p className="text-xl text-muted-foreground">{result.speciesNameSpanish}</p>
            {result.additionalDetails && <p className="text-muted-foreground">{result.additionalDetails}</p>}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-muted-foreground">Confidence</span>
              <span className="text-sm font-bold text-primary">{Math.round(result.confidence * 100)}%</span>
            </div>
            <Progress value={result.confidence * 100} className="h-2 [&>div]:bg-green-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full min-h-[300px] flex items-center justify-center border-dashed bg-background">
      <CardContent className="text-center text-muted-foreground p-6">
        <p>Results will appear here once you identify an image.</p>
      </CardContent>
    </Card>
  );
}
