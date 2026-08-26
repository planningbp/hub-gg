import { LeaderResource } from '@/types';

export const leaderResources: LeaderResource[] = [
  // Gestão de Pessoas
  { id: 'lr-1', title: '1:1 (One-on-One)', description: 'Guia para condução de reuniões individuais com seus liderados.', icon: 'MessageCircle', href: '#', section: 'Gestão de Pessoas', subsection: 'gestao-pessoas', tags: ['1:1', 'one on one', 'reunião individual', 'acompanhamento'] },
  { id: 'lr-2', title: 'Feedback', description: 'Técnicas e boas práticas para dar e receber feedback.', icon: 'MessageSquare', href: '#', section: 'Gestão de Pessoas', subsection: 'gestao-pessoas', tags: ['feedback', 'retorno', 'avaliação', 'conversa'] },
  { id: 'lr-3', title: 'PDI', description: 'Plano de Desenvolvimento Individual — como construir e acompanhar.', icon: 'Target', href: '#', section: 'Gestão de Pessoas', subsection: 'gestao-pessoas', tags: ['pdi', 'plano de desenvolvimento', 'desenvolvimento individual', 'carreira'] },
  { id: 'lr-4', title: 'Gestão de Desempenho', description: 'Ferramentas e processos para gestão de desempenho da equipe.', icon: 'BarChart3', href: '#', section: 'Gestão de Pessoas', subsection: 'gestao-pessoas', tags: ['desempenho', 'performance', 'avaliação', 'metas'] },
  { id: 'lr-5', title: 'Gestão de Conflitos', description: 'Orientações para mediação e resolução de conflitos na equipe.', icon: 'Shield', href: '#', section: 'Gestão de Pessoas', subsection: 'gestao-pessoas', tags: ['conflito', 'mediação', 'resolução', 'clima'] },
  { id: 'lr-6', title: 'Acompanhamento de Colaboradores', description: 'Como acompanhar o desenvolvimento e bem-estar dos liderados.', icon: 'HeartHandshake', href: '#', section: 'Gestão de Pessoas', subsection: 'gestao-pessoas', tags: ['acompanhamento', 'colaborador', 'bem-estar', 'desenvolvimento'] },
  // Recrutamento
  { id: 'lr-7', title: 'Solicitação de Vaga', description: 'Como solicitar abertura de uma nova vaga para sua equipe.', icon: 'UserPlus', href: '/formularios#solicitacao-vaga', section: 'Recrutamento', subsection: 'recrutamento', tags: ['vaga', 'solicitação', 'contratação', 'nova vaga'] },
  { id: 'lr-8', title: 'Processo Seletivo', description: 'Etapas e orientações sobre o processo seletivo.', icon: 'SearchCheck', href: '#', section: 'Recrutamento', subsection: 'recrutamento', tags: ['processo seletivo', 'seleção', 'recrutamento', 'candidato'] },
  { id: 'lr-9', title: 'Entrevistas', description: 'Guia de condução de entrevistas para gestores.', icon: 'Video', href: '#', section: 'Recrutamento', subsection: 'recrutamento', tags: ['entrevista', 'candidato', 'seleção', 'conversa'] },
  { id: 'lr-10', title: 'Integração de Novos', description: 'Seu papel na integração e onboarding de novos membros.', icon: 'Handshake', href: '/pessoas-gestao#integracao', section: 'Recrutamento', subsection: 'recrutamento', tags: ['integração', 'onboarding', 'novo colaborador', 'acolhimento'] },
  // Desenvolvimento
  { id: 'lr-11', title: 'Lidera Planning', description: 'Programa de desenvolvimento de liderança da Planning.', icon: 'Crown', href: '/desenvolvimento#lidera-planning', section: 'Desenvolvimento', subsection: 'desenvolvimento', tags: ['lidera planning', 'liderança', 'programa', 'desenvolvimento'] },
  { id: 'lr-12', title: 'Treinamentos', description: 'Agenda e catálogo de treinamentos disponíveis.', icon: 'BookOpen', href: '/desenvolvimento#treinamentos', section: 'Desenvolvimento', subsection: 'desenvolvimento', tags: ['treinamento', 'capacitação', 'curso', 'aprendizado'] },
  { id: 'lr-13', title: 'Materiais e Guias', description: 'Materiais de apoio e guias práticos para líderes.', icon: 'Library', href: '/documentos#materiais-lideranca', section: 'Desenvolvimento', subsection: 'desenvolvimento', tags: ['material', 'guia', 'apoio', 'liderança'] },
  // Indicadores
  { id: 'lr-14', title: 'eNPS', description: 'Employee Net Promoter Score — acompanhe a satisfação da equipe.', icon: 'ThumbsUp', href: '#', section: 'Indicadores', subsection: 'indicadores', tags: ['enps', 'satisfação', 'engajamento', 'pesquisa'] },
  { id: 'lr-15', title: 'LNPS', description: 'Leadership Net Promoter Score — índice de liderança.', icon: 'Star', href: '#', section: 'Indicadores', subsection: 'indicadores', tags: ['lnps', 'liderança', 'avaliação', 'índice'] },
  { id: 'lr-16', title: 'Termômetro Organizacional', description: 'Pesquisa de clima e engajamento organizacional.', icon: 'Thermometer', href: '#', section: 'Indicadores', subsection: 'indicadores', tags: ['termômetro', 'clima', 'organizacional', 'pesquisa', 'engajamento'] },
  { id: 'lr-17', title: 'Indicadores de Pessoas', description: 'Dashboard de indicadores de gestão de pessoas.', icon: 'PieChart', href: '#', section: 'Indicadores', subsection: 'indicadores', tags: ['indicadores', 'pessoas', 'dashboard', 'métricas', 'turnover'] },
];
