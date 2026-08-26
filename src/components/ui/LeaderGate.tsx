import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Leader {
  nome: string;
  email: string;
  senha: string;
}

interface LeaderGateProps {
  children: React.ReactNode;
}

// Session storage for leader auth
function getStoredLeader(): { nome: string; email: string } | null {
  try {
    const raw = sessionStorage.getItem('hub-gg-leader');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeLeader(nome: string, email: string): void {
  try {
    sessionStorage.setItem('hub-gg-leader', JSON.stringify({ nome, email }));
  } catch {
    // ignore
  }
}

export function clearLeaderSession(): void {
  try {
    sessionStorage.removeItem('hub-gg-leader');
  } catch {
    // ignore
  }
}

export function isLeaderLoggedIn(): boolean {
  return !!getStoredLeader();
}

export function getLeaderName(): string | null {
  return getStoredLeader()?.nome ?? null;
}

export function LeaderGate({ children }: LeaderGateProps) {
  const navigate = useNavigate();
  const [leader, setLeader] = useState<{ nome: string; email: string } | null>(getStoredLeader);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./docs/lideres.json')
      .then(r => r.json())
      .then(data => {
        setLeaders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLeaders([]);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.trim().toLowerCase();
    const senha = senhaInput.trim();

    const found = leaders.find(
      l => l.email.toLowerCase() === email && l.senha === senha
    );

    if (found) {
      storeLeader(found.nome, found.email);
      setLeader({ nome: found.nome, email: found.email });
      setError('');
    } else {
      setError('E-mail ou senha incorretos. Verifique e tente novamente.');
    }
  };

  const handleLogout = () => {
    clearLeaderSession();
    setLeader(null);
    setEmailInput('');
    setSenhaInput('');
  };

  if (leader) {
    return (
      <>
        {/* Leader info bar */}
        <div className="bg-violet-50 border-b border-violet-200 px-4 py-2 flex items-center justify-between print:hidden">
          <span className="text-xs text-violet-600 flex items-center gap-1.5">
            <ShieldCheck size={12} />
            Área do Líder — {leader.nome}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-violet-400 hover:text-violet-600 transition-colors flex items-center gap-1"
          >
            <LogOut size={10} />
            Sair
          </button>
        </div>
        {children}
      </>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <div className="card-base p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-5">
              <Lock size={28} className="text-violet-500" />
            </div>
            <h2 className="text-lg font-bold text-planning-gray-800 mb-1">Área do Líder</h2>
            <p className="text-sm text-planning-gray-500 mb-6">
              Este conteúdo é exclusivo para líderes.<br />
              Faça login com seu e-mail e senha cadastrados.
            </p>

            {loading ? (
              <div className="py-4 text-sm text-planning-gray-400">Carregando...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-medium text-planning-gray-600 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => { setEmailInput(e.target.value); setError(''); }}
                    placeholder="seu.email@planning.com.br"
                    className="input-base w-full"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-planning-gray-600 mb-1">Senha</label>
                  <input
                    type="password"
                    value={senhaInput}
                    onChange={e => { setSenhaInput(e.target.value); setError(''); }}
                    placeholder="Digite sua senha"
                    className="input-base w-full"
                  />
                </div>
                {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-planning-green text-white font-semibold text-sm hover:bg-planning-green-600 transition-colors shadow-sm"
                >
                  <ShieldCheck size={16} />
                  Entrar
                </button>
              </form>
            )}

            <button
              onClick={() => navigate('/processos')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-planning-gray-400 hover:text-planning-gray-600 transition-colors"
            >
              <ArrowLeft size={12} />
              Voltar para Processos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
