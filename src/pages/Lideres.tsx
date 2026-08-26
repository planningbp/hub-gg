import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { leaderResources } from '@/data';

const sections = [
  { key: 'Gestão de Pessoas', icon: 'Users', description: 'Ferramentas e práticas para gestão da sua equipe.' },
  { key: 'Recrutamento', icon: 'UserPlus', description: 'Processos de recrutamento, seleção e integração.' },
  { key: 'Desenvolvimento', icon: 'Rocket', description: 'Programas de desenvolvimento e materiais de apoio.' },
  { key: 'Indicadores', icon: 'BarChart3', description: 'Métricas e indicadores de gestão de pessoas.' },
];

export function Lideres() {
  return (
    <div className="page-container">
      <PageHeader
        title="Área do Líder"
        subtitle="Recursos exclusivos para gestores e líderes da Planning."
        breadcrumbs={[{ label: 'Líderes' }]}
      />

      <div className="space-y-10">
        {sections.map((section, si) => {
          const items = leaderResources.filter(r => r.section === section.key);
          return (
            <section key={section.key} id={section.key.toLowerCase().replace(/\s+/g, '-')} className={`animate-fade-in-up stagger-${si + 1}`}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-lg bg-planning-green-50 flex items-center justify-center">
                  <Icon name={section.icon} size={18} className="text-planning-green" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-planning-gray-800">{section.key}</h2>
                  <p className="text-xs text-planning-gray-400">{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                {items.map(item => (
                  <Link
                    key={item.id}
                    to={item.href}
                    id={item.id}
                    className="card-interactive p-4 flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-planning-gray-50 flex items-center justify-center flex-shrink-0
                      group-hover:bg-planning-green-50 transition-colors">
                      <Icon name={item.icon} size={18} className="text-planning-gray-400 group-hover:text-planning-green transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-planning-gray-800 mb-0.5">{item.title}</h3>
                      <p className="text-xs text-planning-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <ArrowRight size={14} className="text-planning-gray-300 group-hover:text-planning-green mt-0.5 flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
