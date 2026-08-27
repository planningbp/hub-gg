import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { FileText, ChevronRight, UserMinus, TrendingUp, Briefcase, ArrowRightLeft, UserPlus } from 'lucide-react';

const leaderProcesses = [
  {
    id: 'vaga',
    title: 'Solicitação de Vaga',
    description: 'Abertura de vagas para reposição ou aumento de quadro (CLT, PJ, Estágio).',
    icon: Briefcase,
    color: 'bg-blue-50 text-blue-500',
    route: '/processos/vaga',
  },
  {
    id: 'promocao',
    title: 'Promoções e Progressões',
    description: 'Formulário para solicitação de promoções e progressões salariais.',
    icon: TrendingUp,
    color: 'bg-emerald-50 text-emerald-500',
    route: '/processos/promocao',
  },
  {
    id: 'movimentacao',
    title: 'Solicitação de Movimentação',
    description: 'Migração CLT → PJ e Efetivação de Estagiários.',
    icon: UserPlus,
    color: 'bg-violet-50 text-violet-500',
    route: '/processos/movimentacao',
  },
  {
    id: 'desligamento',
    title: 'Solicitação de Desligamento',
    description: 'Formulário para formalizar o processo de desligamento de um colaborador.',
    icon: UserMinus,
    color: 'bg-red-50 text-red-500',
    route: '/processos/desligamento',
  },
  {
    id: 'transferencia',
    title: 'Movimentação de Colaboradores',
    description: 'Transferências entre equipes e departamentos.',
    icon: ArrowRightLeft,
    color: 'bg-amber-50 text-amber-500',
    route: '/processos/transferencia',
  },
];

export function AreaLider() {
  const navigate = useNavigate();

  return (
    <LeaderGate>
      <div className="page-container">
        <PageHeader
          title="Área do Líder"
          subtitle="Formulários e processos exclusivos para gestores."
          breadcrumbs={[{ label: 'Área do Líder' }]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {leaderProcesses.map((proc, i) => {
            const Icon = proc.icon;
            return (
              <button
                key={proc.id}
                onClick={() => navigate(proc.route)}
                className={`card-base p-6 text-left hover:shadow-md transition-all group animate-fade-in-up stagger-${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${proc.color.split(' ')[0]}`}>
                    <Icon size={22} className={proc.color.split(' ')[1]} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-planning-gray-800">{proc.title}</h3>
                      <ChevronRight size={16} className="text-planning-gray-300 group-hover:text-planning-green transition-colors" />
                    </div>
                    <p className="text-xs text-planning-gray-500 leading-relaxed">{proc.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 card-base p-5 bg-planning-gray-50 border-dashed">
          <div className="flex items-start gap-3">
            <FileText size={16} className="text-planning-gray-400 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-planning-gray-600 mb-1">Dúvidas ou sugestões?</h4>
              <p className="text-xs text-planning-gray-400">Entre em contato com o time de Gente &amp; Gestão para esclarecer qualquer processo ou sugerir melhorias.</p>
            </div>
          </div>
        </div>
      </div>
    </LeaderGate>
  );
}
