import React, { useState } from 'react';
import { AIInput } from './ai/AIInput';
import { AIResults } from './ai/AIResults';
import type { AIResult, AIError } from '../types/ai';

export function AIDemo() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<AIResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AIError | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    setError(null);
  };

  const handleClassify = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Mock classification for demo
      const result: AIResult = {
        recommendation: 'Positive sentiment detected',
        reasoning: 'Text contains positive language and tone',
        confidence: 0.85
      };
      setResults(prev => [result, ...prev]);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Classification failed',
        code: 'CLASSIFY_ERROR'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Mock generation for demo
      const result: AIResult = {
        recommendation: 'Generated response',
        reasoning: 'Based on input patterns',
        confidence: 0.75
      };
      setResults(prev => [result, ...prev]);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Generation failed',
        code: 'GENERATE_ERROR'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AIInput
        value={input}
        onChange={handleInputChange}
        onClassify={handleClassify}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
      {results.length > 0 && (
        <AIResults results={results} error={error} />
      )}
    </div>
  );
}