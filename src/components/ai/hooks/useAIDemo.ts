import { useState, useCallback } from 'react';
import type { AIResult, AIError } from '@/types/ai';
import { classifyText, generateText } from '@/lib/pipeline';

export function useAIDemo() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<AIResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AIError | null>(null);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    setError(null);
  }, []);

  const handleClassify = useCallback(async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await classifyText(input);
      setResults(prev => [{
        type: 'sentiment',
        input,
        result,
        timestamp: Date.now()
      }, ...prev]);
    } catch (err) {
      setError(err as AIError);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateText(input);
      setResults(prev => [{
        type: 'generation',
        input,
        result,
        timestamp: Date.now()
      }, ...prev]);
    } catch (err) {
      setError(err as AIError);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return {
    input,
    results,
    isLoading,
    error,
    handleInputChange,
    handleClassify,
    handleGenerate
  };
}