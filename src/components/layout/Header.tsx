import { Menu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/ui/SearchBar';
import { isLeaderLoggedIn, getLeaderName } from '@/components/ui/LeaderGate';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const loggedIn = isLeaderLoggedIn();
  const leaderName = getLeaderName();

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
          {/* Sou Líder button */}
          <button
            onClick={() => navigate('/area-lider')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              loggedIn
                ? 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                : 'bg-planning-gray-100 text-planning-gray-500 hover:bg-planning-gray-200'
            }`}
          >
            <ShieldCheck size={13} />
            {loggedIn ? leaderName || 'Líder' : 'Sou Líder'}
          </button>

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
