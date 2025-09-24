import { Regulation, SearchResult } from '../types';
import regulationsData from '../data/regulations.json';

class RegulationService {
  private regulations: Regulation[] = [];

  constructor() {
    this.loadRegulations();
  }

  private loadRegulations() {
    // Load from localStorage first, fallback to default data
    const stored = localStorage.getItem('hr_regulations');
    if (stored) {
      this.regulations = JSON.parse(stored);
    } else {
      this.regulations = regulationsData as Regulation[];
      this.saveRegulations();
    }
  }

  private saveRegulations() {
    localStorage.setItem('hr_regulations', JSON.stringify(this.regulations));
  }

  // Hybrid search implementation
  search(query: string): SearchResult[] {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/);

    this.regulations.forEach(regulation => {
      let score = 0;
      let matchType: 'keyword' | 'content' | 'title' = 'content';

      // Title matching (highest weight)
      if (regulation.title.toLowerCase().includes(queryLower)) {
        score += 10;
        matchType = 'title';
      }

      // Keyword matching (high weight)
      const keywordMatches = regulation.keywords.filter(keyword => 
        keyword.toLowerCase().includes(queryLower) ||
        queryTerms.some(term => keyword.toLowerCase().includes(term))
      );
      if (keywordMatches.length > 0) {
        score += keywordMatches.length * 8;
        matchType = 'keyword';
      }

      // Content matching (medium weight)
      const contentLower = regulation.content.toLowerCase();
      queryTerms.forEach(term => {
        const matches = (contentLower.match(new RegExp(term, 'g')) || []).length;
        score += matches * 2;
      });

      // Category matching (low weight)
      if (regulation.category.toLowerCase().includes(queryLower)) {
        score += 3;
      }

      // Source matching (low weight)
      if (regulation.source.toLowerCase().includes(queryLower)) {
        score += 2;
      }

      if (score > 0) {
        results.push({
          regulation,
          score,
          matchType
        });
      }
    });

    // Sort by score (descending) and return top results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  getAllRegulations(): Regulation[] {
    return this.regulations;
  }

  getRegulationById(id: string): Regulation | null {
    return this.regulations.find(reg => reg.id === id) || null;
  }

  addRegulation(regulation: Omit<Regulation, 'id'>): string {
    const newRegulation: Regulation = {
      ...regulation,
      id: `reg_${Date.now()}`
    };
    
    this.regulations.push(newRegulation);
    this.saveRegulations();
    return newRegulation.id;
  }

  updateRegulation(id: string, updates: Partial<Regulation>): boolean {
    const index = this.regulations.findIndex(reg => reg.id === id);
    if (index === -1) return false;

    this.regulations[index] = { ...this.regulations[index], ...updates };
    this.saveRegulations();
    return true;
  }

  deleteRegulation(id: string): boolean {
    const index = this.regulations.findIndex(reg => reg.id === id);
    if (index === -1) return false;

    this.regulations.splice(index, 1);
    this.saveRegulations();
    return true;
  }

  getCategories(): string[] {
    const categories = new Set(this.regulations.map(reg => reg.category));
    return Array.from(categories).sort();
  }

  getRegulationsByCategory(category: string): Regulation[] {
    return this.regulations.filter(reg => reg.category === category);
  }

  // Vector-like similarity search (simplified)
  findSimilar(regulationId: string, limit: number = 3): Regulation[] {
    const target = this.getRegulationById(regulationId);
    if (!target) return [];

    const similarities = this.regulations
      .filter(reg => reg.id !== regulationId)
      .map(reg => ({
        regulation: reg,
        similarity: this.calculateSimilarity(target, reg)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return similarities.map(item => item.regulation);
  }

  private calculateSimilarity(reg1: Regulation, reg2: Regulation): number {
    let score = 0;

    // Category similarity
    if (reg1.category === reg2.category) {
      score += 5;
    }

    // Keyword overlap
    const keywords1 = new Set(reg1.keywords.map(k => k.toLowerCase()));
    const keywords2 = new Set(reg2.keywords.map(k => k.toLowerCase()));
    const intersection = new Set([...keywords1].filter(k => keywords2.has(k)));
    score += intersection.size * 3;

    // Content similarity (simplified - count common words)
    const words1 = new Set(reg1.content.toLowerCase().split(/\s+/));
    const words2 = new Set(reg2.content.toLowerCase().split(/\s+/));
    const commonWords = new Set([...words1].filter(w => words2.has(w) && w.length > 2));
    score += commonWords.size * 0.1;

    return score;
  }
}

export const regulationService = new RegulationService();