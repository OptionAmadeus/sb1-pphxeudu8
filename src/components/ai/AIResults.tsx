import React from 'react';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { AIResult, AIError } from '@/types/ai';

interface AIResultsProps {
  results: AIResult[];
  error: AIError | null;
}

export function AIResults({ results, error }: AIResultsProps) {
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <p className="font-medium">{result.recommendation}</p>
          <p className="text-gray-600 mt-2">{result.reasoning}</p>
          <div className="mt-2 text-sm text-gray-500">
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
}