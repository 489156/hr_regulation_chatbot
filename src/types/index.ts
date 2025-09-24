export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Regulation {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  effectiveDate: string;
  version: string;
  source: string;
  nextSteps: NextStep[];
  exceptions: string[];
}

export interface NextStep {
  title: string;
  type: 'form' | 'payment' | 'link';
  url: string;
}

export interface SearchResult {
  regulation: Regulation;
  score: number;
  matchType: 'keyword' | 'content' | 'title';
}