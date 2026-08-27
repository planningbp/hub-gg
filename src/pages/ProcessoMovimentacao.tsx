import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { FileDown, Printer, Info, AlertTriangle, Mail } from 'lucide-react';

interface ManifestDoc {
  nome: string;
  arquivo: string;
  processo?: string;
}

export function ProcessoMovimentacao() {
  const [popDocs, setPopDocs] = useState<ManifestDoc[]>([]);

  // Form state
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [cargoAtual, setCargoAtual] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [tipoMovimentacao, setTipoMovimentacao] = useState('');

  // CLT → PJ fields
  const [bancoHoras, setBancoHoras] = useState('');
  const [feriasPendentes, setFeriasPendentes] = useState('');
  const [dataEncerramentoCLT, setDataEncerramentoCLT] = useState('');
  const [custoRescisorio, setCustoRescisorio] = useState('');
  const [cargoPJ, setCargoPJ] = useState('');
  const [consideracoesRemuneracao, setConsideracoesRemuneracao] = useState('');

  // Efetivação Estagiário fields
  const [registros1on1, setRegistros1on1] = useState('');
  const [pdiConcluidos, setPdiConcluidos] = useState('');
  const [horasExtras, setHorasExtras] = useState('');
  const [vagaPandape, setVagaPandape] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    fetch('./docs-manifest.json')
      .then(r => r.json())
      .then(data => {
        const docs = (data.documentos || []).filter(
          (d: ManifestDoc) => d.processo === 'Movimentação'
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

  const cargosPJ = [
    'Especialista',
    'Coordenador',
    'Gerente',
    'Head',
  ];

  return (
    <LeaderGate>
      <div className="page-container">
        <PageHeader
          title="Solicitação de Movimentação"
          subtitle="Formulário para efetivação de estagiários e migração de CLT para PJ."
          breadcrumbs={[
            { label: 'Área do Líder', href: '/area-lider' },
            { label: 'Movimentação' },
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
            Este formulário tem como objetivo formalizar a movimentação de regime contratual de colaboradores, seja para efetivação de estagiário (Estágio → CLT) ou migração de CLT para PJ.
          </p>
        </div>

        {/* Tipos de Movimentação - Info */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-4 flex items-center gap-2">
            <Info size={16} className="text-violet-500" />
            Tipos de movimentação
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Efetivação */}
            <div className="bg-emerald-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-emerald-700 mb-2">Efetivação de Estagiário</h3>
              <p className="text-xs text-planning-gray-600 mb-3">
                Encerramento do contrato de estágio e admissão em regime CLT no cargo de <strong>Auxiliar (R$ 1.900,00)</strong>. A efetivação exige vaga aprovada no Pandapé, 1:1 mensais e PDI concluídos.
              </p>
              <div className="bg-white/60 rounded-lg p-2.5 text-xs text-planning-gray-500">
                <strong className="text-planning-gray-700">Pré-requisitos:</strong> Mín. 3 meses de estágio, 1:1 mensal, 3 PDIs concluídos, sem horas extras, vaga no Pandapé.
              </div>
            </div>

            {/* CLT → PJ */}
            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-blue-700 mb-2">Migração de CLT para PJ</h3>
              <p className="text-xs text-planning-gray-600 mb-3">
                Transição de regime contratual associada à promoção para cargos PJ (Especialista ou Coordenador em diante). Antes de qualquer alinhamento com o colaborador, contate o GG para validar viabilidade.
              </p>
              <div className="bg-white/60 rounded-lg p-2.5 text-xs text-planning-gray-500">
                <strong className="text-planning-gray-700">Pré-requisitos:</strong> Banco de horas zerado, férias inexistentes, CNPJ ativo, solicitação até dia 10.
              </div>
            </div>
          </div>
        </div>

        {/* FORM - Dados do Colaborador */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-5">
            Obrigatória
          </h2>

          <div className="space-y-5">
            {/* 1. Nome */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                1. Esta solicitação é referente a(o) colaborador(a) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={nomeColaborador}
                onChange={e => setNomeColaborador(e.target.value)}
                placeholder="Insira o nome completo do colaborador"
                className="input-base w-full"
              />
            </div>

            {/* 2. Cargo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                2. Cargo e nível atual <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={cargoAtual}
                onChange={e => setCargoAtual(e.target.value)}
                placeholder="Ex: Estagiário, Analista I A..."
                className="input-base w-full"
              />
            </div>

            {/* 3. Departamento */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                3. Departamento atual <span className="text-red-400">*</span>
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

            {/* 4. Tipo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                4. Esta solicitação é referente a: <span className="text-red-400">*</span>
              </label>
              <select
                value={tipoMovimentacao}
                onChange={e => setTipoMovimentacao(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar tipo de movimentação</option>
                <option value="efetivacao">Efetivação de estagiário</option>
                <option value="clt-pj">Migração de CLT para PJ</option>
              </select>
            </div>
          </div>
        </div>

        {/* CLT → PJ Specific Fields */}
        {tipoMovimentacao === 'clt-pj' && (
          <div className="card-base p-6 mb-6 animate-fade-in">
            <h2 className="text-base font-bold text-planning-gray-800 mb-2">
              Migração de CLT para PJ
            </h2>
            <p className="text-xs text-planning-gray-500 mb-5">
              Refere-se à transição do regime de contratação de um colaborador de CLT para PJ. Antes de qualquer alinhamento com o colaborador, contate o time de Gente e Gestão para validar a viabilidade, o cronograma e os impactos, evitando desalinhamentos e frustrações de expectativa.
            </p>

            {/* Medidas para minimizar impacto */}
            <div className="bg-amber-50 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle size={13} />
                Medidas para minimizar impacto financeiro
              </h4>
              <ul className="space-y-1.5 text-xs text-planning-gray-600">
                <li>• Programar a compensação do saldo de horas positivas.</li>
                <li>• Planejar férias antes da migração para evitar férias indenizadas.</li>
                <li>• Definir que o aviso prévio será trabalhado, reduzindo custos de indenização.</li>
                <li>• Sincronizar data de corte: desligamento CLT no fim do mês e início da PJ no início do mês seguinte.</li>
              </ul>
            </div>

            <div className="space-y-5">
              {/* 5. Banco de horas */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  5. Colaborador possui banco de horas acumulado? <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  Antes da migração, é indispensável verificar se o colaborador possui banco de horas acumulado. Se houver, o total de horas precisa ser compensado antes da migração.
                </p>
                <select
                  value={bancoHoras}
                  onChange={e => setBancoHoras(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar resposta</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {/* 6. Férias pendentes */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  6. Colaborador possui férias pendentes? <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  Antes da migração, é indispensável verificar se o colaborador possui férias pendentes. Se houver, o colaborador precisa usufruí-las antes da migração.
                </p>
                <select
                  value={feriasPendentes}
                  onChange={e => setFeriasPendentes(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar resposta</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {/* 7. Data de encerramento CLT */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  7. Data de encerramento do contrato CLT <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={dataEncerramentoCLT}
                  onChange={e => setDataEncerramentoCLT(e.target.value)}
                  className="input-base w-full"
                />
              </div>

              {/* 8. Custo rescisório */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  8. Custo rescisório <span className="text-red-400">*</span>
                </label>
                <div className="bg-amber-50 rounded-lg p-3 mb-2 flex items-start gap-2">
                  <Mail size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-planning-gray-600">
                    Solicite o cálculo por e-mail ao DP: <a href="mailto:dp.interno@planning.com.br" className="font-medium text-violet-600 underline">dp.interno@planning.com.br</a>
                  </p>
                </div>
                <input
                  type="text"
                  value={custoRescisorio}
                  onChange={e => setCustoRescisorio(e.target.value)}
                  placeholder="Informe o valor ou cole a resposta do DP"
                  className="input-base w-full"
                />
              </div>

              {/* 9. Cargo PJ */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  9. Cargo que o colaborador passará a atuar como PJ <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  Como premissa, definimos que os cargos em regime PJ serão aplicados apenas a partir do nível de Especialista.
                </p>
                <select
                  value={cargoPJ}
                  onChange={e => setCargoPJ(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar cargo</option>
                  {cargosPJ.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* 10. Considerações sobre remuneração */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  10. Considerações sobre a remuneração
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  A definição da remuneração para colaboradores que migrarem para o regime PJ deve ser realizada em conjunto com o departamento de Gente e Gestão. Outras considerações sobre a solicitação.
                </p>
                <textarea
                  value={consideracoesRemuneracao}
                  onChange={e => setConsideracoesRemuneracao(e.target.value)}
                  placeholder="Considerações adicionais sobre remuneração e a solicitação..."
                  rows={4}
                  className="input-base w-full resize-y"
                />
              </div>
            </div>
          </div>
        )}

        {/* Efetivação Estagiário Specific Fields */}
        {tipoMovimentacao === 'efetivacao' && (
          <div className="card-base p-6 mb-6 animate-fade-in">
            <h2 className="text-base font-bold text-planning-gray-800 mb-2">
              Efetivação de Estagiário
            </h2>
            <p className="text-xs text-planning-gray-500 mb-5">
              O cargo de destino será <strong>Auxiliar</strong> com remuneração de <strong>R$ 1.900,00</strong>. Movimentações para cargos superiores seguem o POP-GG-003 (Progressões e Promoções) após a efetivação.
            </p>

            <div className="bg-red-50 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle size={13} />
                Atenção
              </h4>
              <ul className="space-y-1.5 text-xs text-planning-gray-600">
                <li>• É expressamente <strong>proibido</strong> que estagiários realizem horas extras.</li>
                <li>• O contrato de estágio tem prazo máximo de <strong>2 anos</strong> (Lei 11.788/2008).</li>
                <li>• A vaga deve ser aberta e aprovada no Pandapé <strong>antes</strong> deste formulário.</li>
              </ul>
            </div>

            <div className="space-y-5">
              {/* 5. 1:1 */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  5. Foram registradas reuniões de 1:1 mensais ao longo do estágio? <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  É necessário pelo menos 1 registro de 1:1 por mês, de forma contínua.
                </p>
                <select
                  value={registros1on1}
                  onChange={e => setRegistros1on1(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar resposta</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {/* 6. PDI */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  6. O estagiário possui pelo menos 3 planos de ação concluídos no PDI? <span className="text-red-400">*</span>
                </label>
                <select
                  value={pdiConcluidos}
                  onChange={e => setPdiConcluidos(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar resposta</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {/* 7. Horas extras */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  7. O estagiário possui horas extras registradas? <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  Se houver horas extras registradas, regularize junto ao DP antes de prosseguir.
                </p>
                <select
                  value={horasExtras}
                  onChange={e => setHorasExtras(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar resposta</option>
                  <option value="Sim">Sim — há HE registradas</option>
                  <option value="Não">Não — sem HE registradas</option>
                </select>
              </div>

              {/* 8. Vaga Pandapé */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  8. A vaga de aumento de custo já foi aberta e aprovada no Pandapé? <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-planning-gray-400 mb-2">
                  A vaga deve ser Auxiliar, R$ 1.900,00, tipo aumento de custo. Solicitações sem vaga aprovada não serão processadas.
                </p>
                <select
                  value={vagaPandape}
                  onChange={e => setVagaPandape(e.target.value)}
                  className="input-base w-full"
                >
                  <option value="">Selecionar resposta</option>
                  <option value="Sim">Sim — vaga aprovada</option>
                  <option value="Não">Não — vaga pendente</option>
                </select>
              </div>

              {/* 9. Observações */}
              <div>
                <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                  9. Observações
                </label>
                <textarea
                  value={observacoes}
                  onChange={e => setObservacoes(e.target.value)}
                  placeholder="Observações adicionais (opcional)"
                  rows={3}
                  className="input-base w-full resize-y"
                />
              </div>
            </div>
          </div>
        )}

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
