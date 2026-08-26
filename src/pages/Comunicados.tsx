import { useState } from 'react';
import { Megaphone, Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { announcements } from '@/data';

export function Comunicados() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filtered = filter === 'featured' ? announcements.filter(a => a.featured) : announcements;
  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="page-container">
      <PageHeader
        title="Comunicados"
        subtitle="Comunicados e novidades da área de Gente & Gestão."
        breadcrumbs={[{ label: 'Comunicados' }]}
      />

      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`badge cursor-pointer transition-colors ${filter === 'all' ? 'bg-planning-green text-white' : 'bg-planning-gray-100 text-planning-gray-600 hover:bg-planning-gray-200'}`}>
          Todos
        </button>
        <button onClick={() => setFilter('featured')} className={`badge cursor-pointer transition-colors ${filter === 'featured' ? 'bg-planning-green text-white' : 'bg-planning-gray-100 text-planning-gray-600 hover:bg-planning-gray-200'}`}>
          <Star size={10} /> Destaques
        </button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon="Megaphone" title="Nenhum comunicado" description="Novos comunicados aparecerão aqui." />
      ) : (
        <div className="space-y-3">
          {sorted.map((ann, i) => {
            const isExpanded = expanded === ann.id;
            return (
              <div key={ann.id} id={ann.id} className={`card-base overflow-hidden animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : ann.id)}
                  className="w-full flex items-start gap-4 p-5 text-left hover:bg-planning-gray-50/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ann.featured ? 'bg-amber-50' : 'bg-pink-50'}`}>
                    <Megaphone size={20} className={ann.featured ? 'text-amber-500' : 'text-pink-500'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {ann.featured && <span className="badge bg-amber-50 text-amber-700 text-[10px]">Destaque</span>}
                      <span className="badge-gray text-[10px]">{ann.category}</span>
                      <span className="flex items-center gap-1 text-[11px] text-planning-gray-400 ml-auto">
                        <Calendar size={10} />
                        {new Date(ann.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-planning-gray-800 mb-0.5">{ann.title}</h3>
                    <p className="text-xs text-planning-gray-500 line-clamp-2">{ann.summary}</p>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-planning-gray-400 mt-1" /> : <ChevronDown size={18} className="text-planning-gray-400 mt-1" />}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-planning-gray-100 animate-fade-in">
                    <div className="mt-4">
                      <p className="text-sm text-planning-gray-600 leading-relaxed">{ann.content}</p>
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
