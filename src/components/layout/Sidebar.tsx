import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, Users, Award, GitBranch, Rocket, FolderOpen, ClipboardList,
  Megaphone, CalendarDays, Link2, Info, ChevronLeft, Menu
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/pessoas-gestao', label: 'Pessoas & Gestão', icon: Users },
  { to: '/lideres', label: 'Líderes', icon: Award },
  { to: '/processos', label: 'Processos', icon: GitBranch },
  { to: '/desenvolvimento', label: 'Desenvolvimento', icon: Rocket },
  { to: '/documentos', label: 'Documentos', icon: FolderOpen },
  { to: '/formularios', label: 'Formulários', icon: ClipboardList },
  { to: '/comunicados', label: 'Comunicados', icon: Megaphone },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays },
  { to: '/links-uteis', label: 'Links Úteis', icon: Link2 },
  { to: '/sobre', label: 'Sobre o GG', icon: Info },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-planning-gray-200 z-50
          transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-[72px] lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-planning-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-planning-green rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">GG</span>
            </div>
            <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'} whitespace-nowrap`}>
              <span className="font-semibold text-sm text-planning-gray-900">Hub GG</span>
              <span className="text-[10px] text-planning-gray-400 block -mt-0.5">Planning</span>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`p-1.5 rounded-lg hover:bg-planning-gray-100 transition-colors text-planning-gray-400
              ${isOpen ? '' : 'hidden lg:block'}`}
          >
            {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="space-y-0.5">
            {navItems.map(item => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                      ${isActive
                        ? 'bg-planning-green-50 text-planning-green'
                        : 'text-planning-gray-600 hover:bg-planning-gray-50 hover:text-planning-gray-900'
                      }`}
                    title={!isOpen ? item.label : undefined}
                  >
                    <item.icon
                      size={20}
                      className={`flex-shrink-0 transition-colors ${isActive ? 'text-planning-green' : 'text-planning-gray-400 group-hover:text-planning-gray-600'}`}
                    />
                    <span className={`transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0 w-0 overflow-hidden'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-planning-green flex-shrink-0" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-planning-gray-100 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
          <p className="text-[10px] text-planning-gray-400 text-center">Gente & Gestão — Planning</p>
        </div>
      </aside>
    </>
  );
}
