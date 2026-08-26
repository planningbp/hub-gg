import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Icon } from '@/components/ui/Icon';
import { quickAccessItems, categories, highlights } from '@/data';

export function Home() {
  return (
    <div className="page-container">
      {/* Hero / Greeting */}
      <section className="text-center py-10 lg:py-14 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-planning-gray-900 mb-2">
          Olá! <span className="inline-block animate-bounce">&#128075;</span>
        </h1>
        <p className="text-planning-gray-500 text-lg mb-8">Como podemos ajudar?</p>
        <SearchBar large />
      </section>

      {/* Quick Access */}
      <section className="mb-12 animate-fade-in-up stagger-1">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title mb-0">Acesso Rápido</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {quickAccessItems.map((item, i) => (
            <Link
              key={item.id}
              to={item.href}
              className={`card-interactive p-4 flex flex-col items-center text-center gap-3 group animate-fade-in-up stagger-${i + 1}`}
            >
              <div className="w-11 h-11 rounded-xl bg-planning-green-50 flex items-center justify-center
                group-hover:bg-planning-green group-hover:scale-105 transition-all duration-200">
                <Icon name={item.icon} size={22} className="text-planning-green group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-sm font-medium text-planning-gray-800 group-hover:text-planning-gray-900">{item.title}</span>
                <p className="text-[11px] text-planning-gray-400 mt-0.5 line-clamp-2 hidden sm:block">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="mb-12 animate-fade-in-up stagger-3">
          <h2 className="section-title">Destaques</h2>
          <div className="space-y-3">
            {highlights.map(hl => (
              <Link
                key={hl.id}
                to={hl.href}
                className="card-interactive p-5 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0
                  group-hover:bg-amber-100 transition-colors">
                  <Sparkles size={20} className="text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge bg-amber-50 text-amber-700 text-[10px]">{hl.badge}</span>
                    <span className="text-[11px] text-planning-gray-400">{new Date(hl.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-planning-gray-800 mb-0.5">{hl.title}</h3>
                  <p className="text-xs text-planning-gray-500 line-clamp-2">{hl.description}</p>
                </div>
                <ArrowRight size={16} className="text-planning-gray-300 group-hover:text-planning-green mt-1 flex-shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mb-12 animate-fade-in-up stagger-4">
        <h2 className="section-title">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={cat.href}
              className="card-interactive p-5 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-planning-green-50 flex items-center justify-center
                  group-hover:bg-planning-green group-hover:scale-105 transition-all duration-200">
                  <Icon name={cat.icon} size={20} className="text-planning-green group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-planning-gray-800 truncate">{cat.title}</h3>
                  <span className="text-[11px] text-planning-gray-400">{cat.itemCount} itens</span>
                </div>
              </div>
              <p className="text-xs text-planning-gray-500 line-clamp-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Important Links */}
      <section className="mb-12 animate-fade-in-up stagger-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title mb-0">Links Importantes</h2>
          <Link to="/links-uteis" className="text-xs font-medium text-planning-green hover:text-planning-green-dark transition-colors flex items-center gap-1">
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {['Qulture.Rocks', 'Pandapé', 'Teams', 'OneDrive', 'CEFIS', 'TotalPass'].map(name => (
            <Link
              key={name}
              to="/links-uteis"
              className="card-interactive p-4 flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-planning-gray-50 flex items-center justify-center
                group-hover:bg-planning-green-50 transition-colors">
                <span className="text-lg font-bold text-planning-gray-300 group-hover:text-planning-green transition-colors">
                  {name.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-medium text-planning-gray-600 group-hover:text-planning-gray-800">{name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
