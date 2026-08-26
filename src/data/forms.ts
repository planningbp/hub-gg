import { FormItem } from '@/types';

export const forms: FormItem[] = [
  { id: 'form-1', title: 'Solicitação de Vaga', description: 'Formulário para abertura de nova vaga ou reposição.', audience: 'Gestores e diretores', link: '#', category: 'Recrutamento', tags: ['vaga', 'solicitação', 'contratação', 'recrutamento'] },
  { id: 'form-2', title: 'Solicitação de Férias', description: 'Formulário para solicitação e programação de férias.', audience: 'Todos os colaboradores', link: '#', category: 'Pessoas & Gestão', tags: ['férias', 'solicitação', 'programação'] },
  { id: 'form-3', title: 'Solicitação de Promoção', description: 'Formulário para solicitação de promoção de colaborador.', audience: 'Gestores', link: '#', category: 'Pessoas & Gestão', tags: ['promoção', 'solicitação', 'movimentação'] },
  { id: 'form-4', title: 'Solicitação de Desligamento', description: 'Formulário para formalização de desligamento.', audience: 'Gestores e GG', link: '#', category: 'Pessoas & Gestão', tags: ['desligamento', 'solicitação', 'rescisão'] },
  { id: 'form-5', title: 'Efetivação', description: 'Formulário de avaliação e efetivação pós-experiência.', audience: 'Gestores', link: '#', category: 'Pessoas & Gestão', tags: ['efetivação', 'experiência', 'avaliação'] },
  { id: 'form-6', title: 'Transferência', description: 'Formulário para solicitação de transferência interna.', audience: 'Gestores', link: '#', category: 'Pessoas & Gestão', tags: ['transferência', 'movimentação', 'mudança'] },
  { id: 'form-7', title: 'Movimentação', description: 'Formulário para movimentações laterais ou de cargo.', audience: 'Gestores', link: '#', category: 'Pessoas & Gestão', tags: ['movimentação', 'cargo', 'lateral'] },
  { id: 'form-8', title: 'Alteração Contratual', description: 'Formulário para alterações em contratos vigentes.', audience: 'Gestores e GG', link: '#', category: 'Pessoas & Gestão', tags: ['alteração', 'contrato', 'aditivo'] },
];
