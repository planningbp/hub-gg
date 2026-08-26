import { Announcement } from '@/types';

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Novo processo de solicitação de vagas disponível',
    date: '2026-08-20',
    category: 'Processos',
    summary: 'Atualizamos o processo de solicitação de vagas com um novo formulário e fluxo simplificado.',
    content: 'Conteúdo completo a ser atualizado pelo GG. Este comunicado detalha as mudanças no processo de solicitação de vagas, incluindo novo formulário, prazos e responsabilidades.',
    featured: true,
    status: 'active',
    tags: ['vaga', 'processo', 'novo', 'solicitação'],
  },
  {
    id: 'ann-2',
    title: 'Pesquisa Termômetro Organizacional — 2o Semestre',
    date: '2026-08-15',
    category: 'Pesquisas',
    summary: 'A pesquisa Termômetro Organizacional do 2o semestre será aplicada a partir de setembro.',
    content: 'Conteúdo completo a ser atualizado pelo GG. Detalhes sobre datas, metodologia e importância da participação de todos.',
    featured: true,
    status: 'active',
    tags: ['termômetro', 'pesquisa', 'clima', 'organizacional'],
  },
  {
    id: 'ann-3',
    title: 'Calendário de treinamentos atualizado',
    date: '2026-08-01',
    category: 'Desenvolvimento',
    summary: 'O calendário de treinamentos do segundo semestre foi publicado. Confira as novidades!',
    content: 'Conteúdo completo a ser atualizado pelo GG. Calendário detalhado com temas, datas e público-alvo de cada treinamento.',
    featured: false,
    status: 'active',
    tags: ['treinamento', 'calendário', 'desenvolvimento', 'capacitação'],
  },
];
