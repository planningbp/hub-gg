export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  category: string;
  tags: string[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  itemCount: number;
}

export interface ProcessLink {
  label: string;
  url: string;
  type: 'external' | 'download';
  icon?: string;
}

export interface Process {
  id: string;
  title: string;
  description: string;
  objective: string;
  whenToUse: string;
  whoCanRequest: string;
  deadline: string;
  steps: string[];
  formLink: string;
  documents: string[];
  responsible: string;
  category: string;
  tags: string[];
  links?: ProcessLink[];
}

export interface FormItem {
  id: string;
  title: string;
  description: string;
  audience: string;
  link: string;
  category: string;
  tags: string[];
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  link: string;
  updatedAt: string;
  tags: string[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  featured: boolean;
  status: 'active' | 'archived';
  tags: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  description: string;
  category: string;
  recurring: boolean;
  tags: string[];
}

export interface ExternalLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  tags: string[];
}

export interface LeaderResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  section: string;
  subsection: string;
  tags: string[];
}

export interface DevelopmentItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  category: string;
  tags: string[];
}

export interface PessoasGestaoItem {
  id: string;
  title: string;
  description: string;
  responsible: string;
  deadline: string;
  icon: string;
  href: string;
  documents: string[];
  formLink: string;
  tags: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  href: string;
  tags: string[];
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  badge: string;
  href: string;
  date: string;
}
