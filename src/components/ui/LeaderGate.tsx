import { useState } from 'react';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LeaderGateProps {
  children: React.ReactNode;
  onAuthenticated?: (cpf: string) => void;
}

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;
  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== parseInt(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== parseInt(digits[10])) return false;
  return true;
}

// Check sessionStorage for existing auth
function getStoredCPF(): string | null {
  try {
    return sessionStorage.getItem('hub-gg-leader-cpf');
  } catch {
    return null;
  }
}

function storeCPF(cpf: string): void {
  try {
    sessionStorage.setItem('hub-gg-leader-cpf', cpf);
  } catch {
    // ignore
  }
}

export function LeaderGate({ children, onAuthenticated }: LeaderGateProps) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(() => !!getStoredCPF());
  const [cpfInput, setCpfInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = cpfInput.replace(/\D/g, '');
    if (!isValidCPF(digits)) {
      setError('CPF inválido. Verifique e tente novamente.');
      return;
    }
    storeCPF(digits);
    setAuthenticated(true);
    onAuthenticated?.(digits);
  };

  if (authenticated) {
    return <>{children}</>;
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
              Digite seu CPF para acessar.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={cpfInput}
                  onChange={e => {
                    setCpfInput(formatCPF(e.target.value));
                    setError('');
                  }}
                  placeholder="000.000.000-00"
                  className="input-base w-full text-center text-lg tracking-wider"
                  maxLength={14}
                  autoFocus
                />
                {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-planning-green text-white font-semibold text-sm hover:bg-planning-green-600 transition-colors shadow-sm"
              >
                <ShieldCheck size={16} />
                Acessar
              </button>
            </form>
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
