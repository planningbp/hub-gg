import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { globalSearch } from '@/utils/search';
import { SearchResult } from '@/types';

interface SearchBarProps {
  large?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ large = false, placeholder = 'Busque por processos, documentos, formulários ou assuntos...', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = globalSearch(query);
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(result: SearchResult) {
    setQuery('');
    setIsOpen(false);
    navigate(result.href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  const typeColors: Record<string, string> = {
    'Processo': 'bg-violet-50 text-violet-700',
    'Formulário': 'bg-rose-50 text-rose-700',
    'Documento': 'bg-cyan-50 text-cyan-700',
    'Comunicado': 'bg-pink-50 text-pink-700',
    'Evento': 'bg-amber-50 text-amber-700',
    'Link': 'bg-blue-50 text-blue-700',
    'Liderança': 'bg-indigo-50 text-indigo-700',
    'Desenvolvimento': 'bg-orange-50 text-orange-700',
    'Acesso Rápido': 'bg-emerald-50 text-emerald-700',
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`relative ${large ? 'max-w-2xl mx-auto' : ''}`}>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-planning-gray-400" size={large ? 20 : 18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-white border border-planning-gray-200 text-planning-gray-900 placeholder-planning-gray-400
            focus:outline-none focus:ring-2 focus:ring-planning-green/20 focus:border-planning-green transition-all duration-150
            ${large ? 'pl-12 pr-10 py-3.5 text-base rounded-2xl shadow-card' : 'pl-10 pr-9 py-2.5 text-sm rounded-xl'}`}
        />
        {query && (
          <button onClick={() => { setQuery(''); setIsOpen(false); }} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-planning-gray-400 hover:text-planning-gray-600">
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className={`absolute z-50 mt-2 w-full bg-white rounded-xl border border-planning-gray-200 shadow-elevated overflow-hidden ${large ? 'max-w-2xl left-1/2 -translate-x-1/2' : ''}`}>
          <div className="px-4 py-2.5 border-b border-planning-gray-100">
            <span className="text-xs font-medium text-planning-gray-400">{results.length} resultado{results.length !== 1 ? 's' : ''}</span>
          </div>
          <ul className="max-h-80 overflow-y-auto py-1">
            {results.map((result, i) => (
              <li key={result.id}>
                <button
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                    ${i === selectedIndex ? 'bg-planning-green-50' : 'hover:bg-planning-gray-50'}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-planning-gray-900 truncate">{result.title}</span>
                      <span className={`badge text-[10px] ${typeColors[result.type] || 'bg-gray-100 text-gray-600'}`}>{result.type}</span>
                    </div>
                    <p className="text-xs text-planning-gray-500 truncate">{result.description}</p>
                  </div>
                  <ArrowRight size={14} className="text-planning-gray-300 flex-shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className={`absolute z-50 mt-2 w-full bg-white rounded-xl border border-planning-gray-200 shadow-elevated px-6 py-8 text-center ${large ? 'max-w-2xl left-1/2 -translate-x-1/2' : ''}`}>
          <Search size={24} className="mx-auto text-planning-gray-300 mb-2" />
          <p className="text-sm text-planning-gray-500">Nenhum resultado para "<span className="font-medium">{query}</span>"</p>
          <p className="text-xs text-planning-gray-400 mt-1">Tente buscar por outro termo</p>
        </div>
      )}
    </div>
  );
}
