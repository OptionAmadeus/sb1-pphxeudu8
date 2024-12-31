export interface AIResult {
  type: 'sentiment' | 'generation';
  input: string;
  result: SentimentResult | GenerationResult;
  timestamp: number;
}

export interface SentimentResult {
  label: 'POSITIVE' | 'NEGATIVE';
  score: number;
}

export interface GenerationResult {
  generated_text: string;
}

export interface AIError {
  message: string;
  code?: string;
}