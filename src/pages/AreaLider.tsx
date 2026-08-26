import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { FileText, ChevronRight, UserMinus, TrendingUp } from 'lucide-react';

const leaderProcesses = [
  {
    id: 'desligamento',
    title: 'Solicitação de Desligamento',
    description: 'Formulário para formalizar o processo de desligamento de um colaborador.',
    icon: UserMinus,
    color: 'bg-red-50 text-red-500',
    route: '/processos/desligamento',
  },
  {
    id: 'promocao',
    title: 'Solicitação de Promoção',
    description: 'Formulário para solicitação de promoções e progressões salariais.',
    icon: TrendingUp,
    color: 'bg-emerald-50 text-emerald-500',
    route: '/processos/promocao',
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
              <h4 className="text-xs font-semibold text-planning-gray-600 mb-1">Novos formulários em breve</h4>
              <p className="text-xs text-planning-gray-400">Conforme o GG for estruturando os processos, novos formulários serão adicionados a esta área.</p>
            </div>
          </div>
        </div>
      </div>
    </LeaderGate>
  );
}
