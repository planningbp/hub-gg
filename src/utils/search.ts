import { SearchResult } from '@/types';
import { quickAccessItems, processes, forms, documents, announcements, calendarEvents, externalLinks, leaderResources, developmentItems, pessoasGestaoItems } from '@/data';

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function matchScore(query: string, item: { title: string; description: string; tags: string[] }): number {
  const q = normalize(query);
  const terms = q.split(/\s+/).filter(Boolean);
  let score = 0;

  for (const term of terms) {
    const titleNorm = normalize(item.title);
    const descNorm = normalize(item.description);
    const tagsNorm = item.tags.map(normalize);

    if (titleNorm.includes(term)) score += 10;
    if (titleNorm.startsWith(term)) score += 5;
    if (descNorm.includes(term)) score += 3;
    if (tagsNorm.some(t => t.includes(term))) score += 7;
    if (tagsNorm.some(t => t === term)) score += 5;
  }

  return score;
}

export function globalSearch(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const results: SearchResult[] = [];

  for (const item of quickAccessItems) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Acesso Rápido', href: item.href, tags: item.tags, _score: score } as any);
  }

  for (const item of pessoasGestaoItems) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: 'Pessoas & Gestão', type: 'Processo', href: `/pessoas-gestao${item.href}`, tags: item.tags, _score: score } as any);
  }

  for (const item of processes) {
    const score = matchScore(query, { ...item, tags: [...item.tags, item.category] });
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Processo', href: `/processos#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of forms) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Formulário', href: `/formularios#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of documents) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Documento', href: `/documentos#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of announcements) {
    const score = matchScore(query, { title: item.title, description: item.summary, tags: item.tags });
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.summary, category: item.category, type: 'Comunicado', href: `/comunicados#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of calendarEvents) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Evento', href: `/calendario#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of externalLinks) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Link', href: `/links-uteis#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of leaderResources) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.section, type: 'Liderança', href: `/lideres#${item.id}`, tags: item.tags, _score: score } as any);
  }

  for (const item of developmentItems) {
    const score = matchScore(query, item);
    if (score > 0) results.push({ id: item.id, title: item.title, description: item.description, category: item.category, type: 'Desenvolvimento', href: `/desenvolvimento#${item.id}`, tags: item.tags, _score: score } as any);
  }

  // Deduplicate by title
  const seen = new Set<string>();
  const deduped = results.filter(r => {
    const key = normalize(r.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by score descending
  deduped.sort((a, b) => ((b as any)._score || 0) - ((a as any)._score || 0));

  return deduped.slice(0, 20);
}
