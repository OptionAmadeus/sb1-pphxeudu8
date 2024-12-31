import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { AIResult, SentimentResult, GenerationResult } from '@/types/ai';

interface ResultCardProps {
  result: AIResult;
}

function isSentimentResult(result: any): result is SentimentResult {
  return 'label' in result && 'score' in result;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-sm text-gray-500 mb-2">
        Input: {result.input}
        <span className="ml-2 text-gray-400">
          {new Date(result.timestamp).toLocaleTimeString()}
        </span>
      </div>
      
      {result.type === 'sentiment' && isSentimentResult(result.result) ? (
        <div className="flex items-center gap-2">
          {result.result.label === 'POSITIVE' ? (
            <ThumbsUp className="w-5 h-5 text-green-600" />
          ) : (
            <ThumbsDown className="w-5 h-5 text-red-600" />
          )}
          <span className="font-semibold">
            {result.result.label} ({(result.result.score * 100).toFixed(1)}%)
          </span>
        </div>
      ) : (
        <div className="prose max-w-none">
          <ReactMarkdown>
            {(result.result as GenerationResult).generated_text}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}