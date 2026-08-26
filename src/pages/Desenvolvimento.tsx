import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { developmentItems } from '@/data';

export function Desenvolvimento() {
  const groupedByCategory = developmentItems.reduce<Record<string, typeof developmentItems>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="page-container">
      <PageHeader
        title="Desenvolvimento"
        subtitle="Programas, treinamentos e materiais para o seu crescimento profissional."
        breadcrumbs={[{ label: 'Desenvolvimento' }]}
      />

      <div className="space-y-10">
        {Object.entries(groupedByCategory).map(([category, items], ci) => (
          <section key={category} className={`animate-fade-in-up stagger-${ci + 1}`}>
            <h2 className="section-title">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(item => (
                <Link
                  key={item.id}
                  to={item.href}
                  id={item.id}
                  className="card-interactive p-5 flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0
                    group-hover:bg-amber-100 transition-colors">
                    <Icon name={item.icon} size={20} className="text-amber-500" />
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
        ))}
      </div>
    </div>
  );
}
