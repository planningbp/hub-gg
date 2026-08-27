import { Link } from 'react-router-dom';
import { ArrowRight, FileText, FileDown, ClipboardList } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { pessoasGestaoItems } from '@/data';

export function PessoasGestao() {
  return (
    <div className="page-container">
      <PageHeader
        title="Pessoas & Gestão"
        subtitle="Processos e informações relacionados à gestão de pessoas na Planning."
        breadcrumbs={[{ label: 'Pessoas & Gestão' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pessoasGestaoItems.map((item, i) => (
          <div
            key={item.id}
            id={item.href.replace('#', '')}
            className={`card-base p-6 animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-planning-green-50 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={22} className="text-planning-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-planning-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-planning-gray-500 mb-4">{item.description}</p>

                <div className="space-y-2 text-xs text-planning-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-planning-gray-600 w-24 flex-shrink-0">Responsável</span>
                    <span>{item.responsible}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-planning-gray-600 w-24 flex-shrink-0">Prazo</span>
                    <span>{item.deadline}</span>
                  </div>
                </div>

                {/* Documents & Form */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-planning-gray-100">
                  {item.documents.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-planning-gray-400">
                      <FileText size={12} />
                      <span>{item.documents.length} documento{item.documents.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {item.formLink && item.formLink !== '#' && (
                    <div className="flex items-center gap-1.5 text-xs text-planning-gray-400">
                      <ClipboardList size={12} />
                      <span>Formulário</span>
                    </div>
                  )}
                  {item.formLink && item.formLink !== '#' ? (
                    <Link
                      to={item.formLink}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-planning-green hover:text-planning-green-dark transition-colors"
                    >
                      Acessar <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <span className="ml-auto text-xs text-planning-gray-300">Em breve</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
