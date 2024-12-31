export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  imageUrl: string;
  category: 'AI' | 'Crypto' | 'Investing';
  readTime: number;
}