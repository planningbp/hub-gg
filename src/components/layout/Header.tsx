import { Menu } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-planning-gray-100">
      <div className="h-16 flex items-center gap-4 px-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-planning-gray-100 transition-colors lg:hidden text-planning-gray-600"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 max-w-xl">
          <SearchBar placeholder="Buscar..." />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-planning-green/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-planning-green">P</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
