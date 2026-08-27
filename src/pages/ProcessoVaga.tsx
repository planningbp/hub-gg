import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { FileDown, Printer, Info, ExternalLink, AlertTriangle } from 'lucide-react';

interface ManifestDoc {
  nome: string;
  arquivo: string;
  processo?: string;
}

export function ProcessoVaga() {
  const [popDocs, setPopDocs] = useState<ManifestDoc[]>([]);

  // Form state
  const [motivoContratacao, setMotivoContratacao] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [cargo, setCargo] = useState('');
  const [nivelHierarquico, setNivelHierarquico] = useState('');
  const [regimeContratacao, setRegimeContratacao] = useState('');
  const [faixaSalarial, setFaixaSalarial] = useState('');
  const [formatoTrabalho, setFormatoTrabalho] = useState('');
  const [unidade, setUnidade] = useState('');
  const [liderEmail, setLiderEmail] = useState('');
  const [atividades, setAtividades] = useState('');
  const [requisitosTecnicos, setRequisitosTecnicos] = useState('');
  const [requisitosComportamentais, setRequisitosComportamentais] = useState('');
  const [espacoFisico, setEspacoFisico] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [colaboradorSubstituido, setColaboradorSubstituido] = useState('');

  useEffect(() => {
    fetch('./docs-manifest.json')
      .then(r => r.json())
      .then(data => {
        const docs = (data.documentos || []).filter(
          (d: ManifestDoc) => d.processo === 'Solicitação de Vaga'
        );
        setPopDocs(docs);
      })
      .catch(() => setPopDocs([]));
  }, []);

  const handlePrint = () => window.print();

  const departamentos = [
    'Administrativo', 'Comercial', 'Compras', 'Comunicação', 'Contabilidade',
    'Controladoria', 'Design', 'Engenharia', 'Financeiro', 'Gente & Gestão',
    'Incorporação', 'Jurídico', 'Marketing', 'Obras', 'Operações',
    'Planejamento', 'Projetos', 'Suprimentos', 'TI', 'Vendas',
  ];

  return (
    <LeaderGate>
      <div className="page-container">
        <PageHeader
          title="Solicitação de Vaga"
          subtitle="Formulário para abertura e aprovação de vagas (reposição ou aumento de quadro)."
          breadcrumbs={[
            { label: 'Área do Líder', href: '/area-lider' },
            { label: 'Solicitação de Vaga' },
          ]}
          action={
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-planning-gray-100 text-planning-gray-600 hover:bg-planning-gray-200 transition-colors print:hidden"
            >
              <Printer size={14} />
              Imprimir
            </button>
          }
        />

        {/* Intro */}
        <div className="card-base p-5 mb-6 border-l-4 border-l-violet-400">
          <p className="text-sm text-planning-gray-600 leading-relaxed">
            Este formulário tem como objetivo padronizar a abertura de vagas, garantindo que toda nova contratação siga um fluxo estruturado com os devidos alinhamentos e aprovações.
          </p>
        </div>

        {/* Info + Pandapé link */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-4 flex items-center gap-2">
            <Info size={16} className="text-violet-500" />
            Fluxo de aprovação
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-emerald-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-emerald-700 mb-2">Reposição (sem aumento de custo)</h3>
              <ol className="space-y-1.5 text-xs text-planning-gray-600">
                <li>1. Coordenador/Gerente abre vaga no Pandapé</li>
                <li>2. Head aprova</li>
                <li>3. GG valida dados e conformidade</li>
                <li>4. Recrutadora inicia processo seletivo</li>
              </ol>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-blue-700 mb-2">Aumento de quadro/custo</h3>
              <ol className="space-y-1.5 text-xs text-planning-gray-600">
                <li>1. Coordenador/Gerente abre vaga no Pandapé</li>
                <li>2. Head aprova</li>
                <li>3. Sócio aprova</li>
                <li>4. Dir. Financeiro/Controladoria aprova</li>
                <li>5. GG valida e recrutadora inicia</li>
              </ol>
            </div>
          </div>

          <a
            href="https://login.pandape.com/Account/Login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors bg-planning-green text-white hover:bg-planning-green-600 shadow-sm"
          >
            <ExternalLink size={14} />
            Acessar Pandapé
          </a>

          <div className="mt-4 bg-amber-50 rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-planning-gray-600">
              Não tem acesso ao Pandapé para abrir a vaga? Procure <strong>Barbara Franco</strong> para cadastro na plataforma.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-5">
            Dados da Vaga
          </h2>
          <p className="text-xs text-planning-gray-400 mb-5">
            Preencha os dados abaixo antes de abrir a vaga no Pandapé. Isso garante que todas as informações obrigatórias estejam prontas.
          </p>

          <div className="space-y-5">
            {/* 1. Motivo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                1. Motivo da contratação <span className="text-red-400">*</span>
              </label>
              <select
                value={motivoContratacao}
                onChange={e => setMotivoContratacao(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar motivo</option>
                <option value="Reposição">Reposição (substituição sem aumento de custo)</option>
                <option value="Aumento de quadro">Aumento de quadro/custo</option>
              </select>
            </div>

            {/* 2. Departamento */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                2. Departamento <span className="text-red-400">*</span>
              </label>
              <select
                value={departamento}
                onChange={e => setDepartamento(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar departamento</option>
                {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* 3. Cargo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                3. Cargo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={cargo}
                onChange={e => setCargo(e.target.value)}
                placeholder="Ex: Analista de Projetos"
                className="input-base w-full"
              />
            </div>

            {/* 4. Nível hierárquico */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                4. Nível hierárquico <span className="text-red-400">*</span>
              </label>
              <select
                value={nivelHierarquico}
                onChange={e => setNivelHierarquico(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar nível</option>
                <option value="Estagiário">Estagiário</option>
                <option value="Auxiliar">Auxiliar</option>
                <option value="Assistente">Assistente</option>
                <option value="Analista">Analista</option>
                <option value="Especialista">Especialista</option>
                <option value="Coordenador">Coordenador</option>
                <option value="Gerente">Gerente</option>
                <option value="Head">Head</option>
              </select>
            </div>

            {/* 5. Regime */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                5. Regime de contratação <span className="text-red-400">*</span>
              </label>
              <select
                value={regimeContratacao}
                onChange={e => setRegimeContratacao(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar regime</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
              </select>
            </div>

            {/* 6. Faixa salarial */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                6. Faixa salarial do cargo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={faixaSalarial}
                onChange={e => setFaixaSalarial(e.target.value)}
                placeholder="Ex: R$ 3.000,00 a R$ 4.500,00"
                className="input-base w-full"
              />
            </div>

            {/* 7. E-mail do líder */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                7. E-mail do líder direto <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={liderEmail}
                onChange={e => setLiderEmail(e.target.value)}
                placeholder="email@planning.com.br"
                className="input-base w-full"
              />
            </div>

            {/* 8. Formato */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                8. Formato de trabalho <span className="text-red-400">*</span>
              </label>
              <select
                value={formatoTrabalho}
                onChange={e => setFormatoTrabalho(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar formato</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Home Office">Home Office</option>
              </select>
            </div>

            {/* 9. Unidade */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                9. Unidade de atuação <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={unidade}
                onChange={e => setUnidade(e.target.value)}
                placeholder="Ex: Goiânia — Matriz"
                className="input-base w-full"
              />
            </div>

            {/* 10. Atividades */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                10. Principais atividades <span className="text-red-400">*</span>
              </label>
              <textarea
                value={atividades}
                onChange={e => setAtividades(e.target.value)}
                placeholder="Descreva as principais atividades da vaga..."
                rows={4}
                className="input-base w-full resize-y"
              />
            </div>

            {/* 11. Requisitos técnicos */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                11. Requisitos técnicos <span className="text-red-400">*</span>
              </label>
              <textarea
                value={requisitosTecnicos}
                onChange={e => setRequisitosTecnicos(e.target.value)}
                placeholder="Formação, experiência, ferramentas, certificações..."
                rows={3}
                className="input-base w-full resize-y"
              />
            </div>

            {/* 12. Requisitos comportamentais */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                12. Requisitos comportamentais <span className="text-red-400">*</span>
              </label>
              <textarea
                value={requisitosComportamentais}
                onChange={e => setRequisitosComportamentais(e.target.value)}
                placeholder="Competências comportamentais desejadas..."
                rows={3}
                className="input-base w-full resize-y"
              />
            </div>

            {/* 13. Espaço físico */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                13. Espaço físico confirmado na unidade? <span className="text-red-400">*</span>
              </label>
              <select
                value={espacoFisico}
                onChange={e => setEspacoFisico(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar resposta</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
                <option value="N/A">N/A — Home Office</option>
              </select>
            </div>

            {/* 14. Equipamento */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                14. Equipamento <span className="text-red-400">*</span>
              </label>
              <select
                value={equipamento}
                onChange={e => setEquipamento(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar resposta</option>
                <option value="Planning">Planning fornece</option>
                <option value="Próprio">Equipamento próprio</option>
              </select>
            </div>

            {/* 15. Justificativa */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                15. Justificativa da contratação <span className="text-red-400">*</span>
              </label>
              <textarea
                value={justificativa}
                onChange={e => setJustificativa(e.target.value)}
                placeholder="Justifique a necessidade da contratação com dados..."
                rows={4}
                className="input-base w-full resize-y"
              />
            </div>

            {/* 16. Se substituição */}
            {motivoContratacao === 'Reposição' && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  16. Colaborador substituído <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={colaboradorSubstituido}
                  onChange={e => setColaboradorSubstituido(e.target.value)}
                  placeholder="Nome do colaborador que está sendo substituído"
                  className="input-base w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* POP Documents Section */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-4 flex items-center gap-2">
            <FileDown size={16} className="text-violet-500" />
            POP — Procedimento Operacional Padrão
          </h2>
          {popDocs.length > 0 ? (
            <div className="space-y-2">
              {popDocs.map(doc => (
                <a
                  key={doc.arquivo}
                  href={`./${doc.arquivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 transition-colors"
                >
                  <FileDown size={16} />
                  <span className="text-sm font-medium">{doc.nome}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-planning-gray-50 rounded-xl">
              <p className="text-sm text-planning-gray-400">Nenhum POP disponível no momento.</p>
            </div>
          )}
        </div>

        {/* Print footer */}
        <div className="hidden print:block text-center text-xs text-planning-gray-400 mt-8 pt-4 border-t border-planning-gray-200">
          Hub GG — Gente &amp; Gestão · Planning · Gerado em {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
    </LeaderGate>
  );
}
