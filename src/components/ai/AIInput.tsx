import React from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AIInputProps {
  value: string;
  onChange: (value: string) => void;
  onClassify: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function AIInput({ value, onChange, onClassify, onGenerate, isLoading }: AIInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <textarea
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text for analysis or generation..."
        disabled={isLoading}
      />
      <div className="flex gap-2 mt-4">
        <button
          onClick={onClassify}
          disabled={isLoading || !value.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <ThumbsUp className="w-4 h-4" />
              Analyze Sentiment
            </>
          )}
        </button>
        <button
          onClick={onGenerate}
          disabled={isLoading || !value.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              Generate Text
            </>
          )}
        </button>
      </div>
    </div>
  );
}