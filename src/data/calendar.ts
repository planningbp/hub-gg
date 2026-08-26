import { CalendarEvent } from '@/types';

export const calendarEvents: CalendarEvent[] = [
  { id: 'ev-1', title: 'Termômetro Organizacional', date: '2026-09-15', endDate: '2026-09-30', description: 'Pesquisa de clima e engajamento — 2o semestre.', category: 'Pesquisa', recurring: true, tags: ['termômetro', 'pesquisa', 'clima'] },
  { id: 'ev-2', title: 'Planning 360', date: '2026-10-01', endDate: '2026-10-15', description: 'Ciclo de avaliação 360 graus.', category: 'Avaliação', recurring: true, tags: ['360', 'avaliação', 'desempenho'] },
  { id: 'ev-3', title: 'Newsletter GG — Agosto', date: '2026-08-28', description: 'Publicação da newsletter mensal do GG.', category: 'Comunicação', recurring: true, tags: ['newsletter', 'comunicação', 'mensal'] },
  { id: 'ev-4', title: 'Imersão nas Áreas', date: '2026-09-10', endDate: '2026-09-12', description: 'Imersão do GG nas áreas operacionais.', category: 'GG', recurring: false, tags: ['imersão', 'áreas', 'visita'] },
  { id: 'ev-5', title: 'Avaliação de Desempenho', date: '2026-11-01', endDate: '2026-11-30', description: 'Período de avaliação de desempenho anual.', category: 'Avaliação', recurring: true, tags: ['avaliação', 'desempenho', 'anual'] },
  { id: 'ev-6', title: 'Treinamento — Feedback Eficaz', date: '2026-09-05', description: 'Treinamento para líderes sobre técnicas de feedback.', category: 'Treinamento', recurring: false, tags: ['treinamento', 'feedback', 'liderança'] },
  { id: 'ev-7', title: 'Café com BP', date: '2026-09-20', description: 'Encontro mensal com a equipe de Business Partners.', category: 'Desenvolvimento', recurring: true, tags: ['café', 'bp', 'encontro', 'business partner'] },
  { id: 'ev-8', title: 'Prazo — Programação de Férias', date: '2026-09-30', description: 'Data limite para envio da programação de férias do 4o trimestre.', category: 'Prazo', recurring: false, tags: ['prazo', 'férias', 'programação'] },
  { id: 'ev-9', title: 'Lidera Planning — Módulo 3', date: '2026-10-20', description: 'Terceiro módulo do programa Lidera Planning.', category: 'Desenvolvimento', recurring: false, tags: ['lidera', 'planning', 'liderança', 'módulo'] },
  { id: 'ev-10', title: 'Newsletter GG — Setembro', date: '2026-09-28', description: 'Publicação da newsletter mensal do GG.', category: 'Comunicação', recurring: true, tags: ['newsletter', 'comunicação', 'mensal'] },
];
