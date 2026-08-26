import { useState } from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';
import { forms } from '@/data';

export function Formularios() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const allCategories = [...new Set(forms.map(f => f.category))];

  const filtered = forms.filter(f => {
    const q = search.toLowerCase();
    const matchesSearch = !q || f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.tags.some(t => t.includes(q));
    const matchesCat = !filterCategory || f.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-container">
      <PageHeader
        title="Formulários"
        subtitle="Central de formulários da área de Gente & Gestão."
        breadcrumbs={[{ label: 'Formulários' }]}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar formulário..." className="input-base flex-1" />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input-base sm:w-48">
          <option value="">Todas as categorias</option>
          {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="ClipboardList" title="Nenhum formulário encontrado" description="Tente buscar por outro termo." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((form, i) => (
            <div key={form.id} id={form.id} className={`card-base p-5 flex flex-col animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <Icon name="ClipboardList" size={20} className="text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-planning-gray-800 mb-0.5">{form.title}</h3>
                  <span className="badge-gray text-[10px]">{form.category}</span>
                </div>
              </div>

              <p className="text-xs text-planning-gray-500 mb-4 flex-1">{form.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-planning-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-planning-gray-400">
                  <Users size={12} />
                  <span>{form.audience}</span>
                </div>
                <a
                  href={form.link}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-planning-green hover:text-planning-green-dark transition-colors"
                >
                  Acessar <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
