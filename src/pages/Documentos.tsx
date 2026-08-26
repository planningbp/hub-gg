import { useState } from 'react';
import { ExternalLink, FileText, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { documents } from '@/data';

const docTypeIcons: Record<string, string> = {
  'POP': 'bg-violet-50 text-violet-500',
  'Política': 'bg-blue-50 text-blue-500',
  'Manual': 'bg-emerald-50 text-emerald-500',
  'Guia': 'bg-amber-50 text-amber-500',
  'Template': 'bg-cyan-50 text-cyan-500',
  'Comunicado': 'bg-pink-50 text-pink-500',
};

export function Documentos() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const allCategories = [...new Set(documents.map(d => d.category))];

  const filtered = documents.filter(d => {
    const q = search.toLowerCase();
    const matchesSearch = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.tags.some(t => t.includes(q));
    const matchesCat = !filterCategory || d.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-container">
      <PageHeader
        title="Documentos"
        subtitle="POPs, políticas, manuais, guias e templates do GG."
        breadcrumbs={[{ label: 'Documentos' }]}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar documento..." className="input-base flex-1" />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input-base sm:w-48">
          <option value="">Todas as categorias</option>
          {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilterCategory('')} className={`badge cursor-pointer transition-colors ${!filterCategory ? 'bg-planning-green text-white' : 'bg-planning-gray-100 text-planning-gray-600 hover:bg-planning-gray-200'}`}>
          Todos
        </button>
        {allCategories.map(cat => (
          <button key={cat} onClick={() => setFilterCategory(cat === filterCategory ? '' : cat)} className={`badge cursor-pointer transition-colors ${filterCategory === cat ? 'bg-planning-green text-white' : 'bg-planning-gray-100 text-planning-gray-600 hover:bg-planning-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="FolderOpen" title="Nenhum documento encontrado" description="Tente buscar por outro termo ou remova os filtros." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => {
            const colorClass = docTypeIcons[doc.type] || 'bg-gray-50 text-gray-500';
            return (
              <div key={doc.id} id={doc.id} className={`card-base p-5 flex flex-col animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass.split(' ')[0]}`}>
                    <FileText size={20} className={colorClass.split(' ')[1]} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-planning-gray-800 mb-0.5">{doc.title}</h3>
                    <span className="badge-gray text-[10px]">{doc.type}</span>
                  </div>
                </div>
                <p className="text-xs text-planning-gray-500 mb-4 flex-1">{doc.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-planning-gray-100">
                  <div className="flex items-center gap-1.5 text-[11px] text-planning-gray-400">
                    <Calendar size={12} />
                    <span>{new Date(doc.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <a href={doc.link} className="inline-flex items-center gap-1.5 text-xs font-medium text-planning-green hover:text-planning-green-dark transition-colors">
                    Abrir <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
