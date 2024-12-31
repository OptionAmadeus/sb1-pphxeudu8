import React from 'react';
import { AIInput } from './AIInput';
import { AIResults } from './AIResults';
import { useAIDemo } from './hooks/useAIDemo';

export function AIDemo() {
  const { 
    input, 
    results, 
    isLoading, 
    error, 
    handleInputChange,
    handleClassify,
    handleGenerate 
  } = useAIDemo();

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