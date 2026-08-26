import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, ClipboardList, User, Clock, Target, AlertCircle, ExternalLink, FileDown } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { processes } from '@/data';

export function Processos() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('');

  const allCategories = [...new Set(processes.map(p => p.category))];

  const filtered = processes.filter(p => {
    const q = search.toLowerCase();
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.includes(q));
    const matchesCat = !filterCategory || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-container">
      <PageHeader
        title="Processos"
        subtitle="Biblioteca completa de processos da área de Gente & Gestão."
        breadcrumbs={[{ label: 'Processos' }]}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar processo..."
          className="input-base flex-1"
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="input-base sm:w-48"
        >
          <option value="">Todas as categorias</option>
          {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="SearchX" title="Nenhum processo encontrado" description="Tente buscar por outro termo ou remova os filtros." />
      ) : (
        <div className="space-y-3">
          {filtered.map((proc, i) => {
            const isExpanded = expanded === proc.id;
            return (
              <div
                key={proc.id}
                id={proc.id}
                className={`card-base overflow-hidden animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : proc.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-planning-gray-50/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                    <Target size={20} className="text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-planning-gray-800">{proc.title}</h3>
                      <span className="badge-gray text-[10px]">{proc.category}</span>
                    </div>
                    <p className="text-xs text-planning-gray-500 line-clamp-1">{proc.description}</p>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-planning-gray-400" /> : <ChevronDown size={18} className="text-planning-gray-400" />}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-planning-gray-100 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-semibold text-planning-gray-600 uppercase tracking-wider mb-1.5">Objetivo</h4>
                          <p className="text-sm text-planning-gray-600">{proc.objective}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-planning-gray-600 uppercase tracking-wider mb-1.5">Quando utilizar</h4>
                          <p className="text-sm text-planning-gray-600">{proc.whenToUse}</p>
                        </div>
                        <div className="flex gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-planning-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1"><User size={12} /> Quem solicita</h4>
                            <p className="text-sm text-planning-gray-600">{proc.whoCanRequest}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-planning-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Clock size={12} /> Prazo</h4>
                            <p className="text-sm text-planning-gray-600">{proc.deadline}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-planning-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1"><AlertCircle size={12} /> Responsável</h4>
                          <p className="text-sm text-planning-gray-600">{proc.responsible}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-semibold text-planning-gray-600 uppercase tracking-wider mb-2">Passo a passo</h4>
                          <ol className="space-y-2">
                            {proc.steps.map((step, si) => (
                              <li key={si} className="flex items-start gap-2.5 text-sm text-planning-gray-600">
                                <span className="w-5 h-5 rounded-full bg-planning-green-50 text-planning-green text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{si + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Action Links (Pandapé, POP downloads, etc.) */}
                        {proc.links && proc.links.length > 0 && (
                          <div className="flex flex-col gap-2 pt-2">
                            {proc.links.map(link => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                                  link.type === 'external'
                                    ? 'bg-planning-green text-white hover:bg-planning-green-600 shadow-sm'
                                    : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200'
                                }`}
                              >
                                {link.icon === 'ExternalLink' && <ExternalLink size={14} />}
                                {link.icon === 'FileDown' && <FileDown size={14} />}
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          {proc.documents.map(doc => (
                            <span key={doc} className="inline-flex items-center gap-1 text-xs text-planning-gray-500 bg-planning-gray-50 px-2.5 py-1 rounded-lg">
                              <FileText size={10} /> {doc}
                            </span>
                          ))}
                          {proc.formLink && proc.formLink !== '#' && !proc.links?.some(l => l.type === 'external') && (
                            <a href={proc.formLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-planning-green bg-planning-green-50 px-2.5 py-1 rounded-lg hover:bg-planning-green-100 transition-colors">
                              <ClipboardList size={10} /> Formulário
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
