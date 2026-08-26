import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { externalLinks } from '@/data';

export function LinksUteis() {
  const grouped = externalLinks.reduce<Record<string, typeof externalLinks>>((acc, link) => {
    (acc[link.category] ??= []).push(link);
    return acc;
  }, {});

  return (
    <div className="page-container">
      <PageHeader
        title="Links Úteis"
        subtitle="Sistemas e ferramentas utilizados pela Planning e pelo GG."
        breadcrumbs={[{ label: 'Links Úteis' }]}
      />

      <div className="space-y-8">
        {Object.entries(grouped).map(([category, links], ci) => (
          <section key={category} className={`animate-fade-in-up stagger-${ci + 1}`}>
            <h2 className="section-title">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {links.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  id={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-interactive p-5 flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-planning-gray-50 flex items-center justify-center flex-shrink-0
                    group-hover:bg-planning-green-50 transition-colors">
                    <Icon name={link.icon} size={22} className="text-planning-gray-400 group-hover:text-planning-green transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-planning-gray-800">{link.title}</h3>
                    <p className="text-xs text-planning-gray-500 truncate">{link.description}</p>
                  </div>
                  <ExternalLink size={14} className="text-planning-gray-300 group-hover:text-planning-green flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
