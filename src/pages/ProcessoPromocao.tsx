import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { FileDown, Printer, Info, ExternalLink } from 'lucide-react';

interface ManifestDoc {
  nome: string;
  arquivo: string;
  processo?: string;
}

export function ProcessoPromocao() {
  const [popDocs, setPopDocs] = useState<ManifestDoc[]>([]);

  // Form state - Seção 1
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [liderImediato, setLiderImediato] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [cargoAtual, setCargoAtual] = useState('');
  const [tipoPromocao, setTipoPromocao] = useState('');
  const [cargoPromocao, setCargoPromocao] = useState('');
  const [mesAplicacao, setMesAplicacao] = useState('');

  // Form state - Seção 2 (Critérios)
  const [classificacaoDesempenho, setClassificacaoDesempenho] = useState('');
  const [reunioes1on1, setReunioes1on1] = useState('');
  const [pdiAndamento, setPdiAndamento] = useState('');
  const [justificativaPrincipal, setJustificativaPrincipal] = useState('');
  const [descricaoJustificativa, setDescricaoJustificativa] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    fetch('./docs-manifest.json')
      .then(r => r.json())
      .then(data => {
        const docs = (data.documentos || []).filter(
          (d: ManifestDoc) => d.processo === 'Promoção'
        );
        setPopDocs(docs);
      })
      .catch(() => setPopDocs([]));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const departamentos = [
    'Administrativo', 'Comercial', 'Compras', 'Comunicação', 'Contabilidade',
    'Controladoria', 'Design', 'Engenharia', 'Financeiro', 'Gente & Gestão',
    'Incorporação', 'Jurídico', 'Marketing', 'Obras', 'Operações',
    'Planejamento', 'Projetos', 'Suprimentos', 'TI', 'Vendas',
  ];

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const classificacoes = [
    'Muito abaixo do esperado',
    'Abaixo do esperado',
    'Dentro do esperado',
    'Acima do esperado',
    'Muito acima do esperado',
  ];

  const justificativas = [
    'Desempenho consistente e superação de metas',
    'Evolução profissional e aquisição de novas competências',
    'Aumento de responsabilidades e escopo de atuação',
    'Contribuição estratégica para os resultados da área/empresa',
    'Combinação de múltiplos fatores',
  ];

  return (
    <LeaderGate>
      <div className="page-container">
        <PageHeader
          title="Solicitação de Promoções e Progressões"
          subtitle="Formulário para formalizar solicitações de promoção horizontal ou vertical."
          breadcrumbs={[
            { label: 'Processos', href: '/processos' },
            { label: 'Promoção' },
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

        {/* Tipos de Promoção - Info */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-4 flex items-center gap-2">
            <Info size={16} className="text-violet-500" />
            Tipos de promoção/progressão
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Horizontal */}
            <div className="bg-emerald-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-emerald-700 mb-2">Horizontal</h3>
              <p className="text-xs text-planning-gray-600 mb-3">
                É o aumento do salário dentro da mesma faixa salarial do cargo atual do colaborador. A pessoa permanece na mesma posição, mas recebe um ajuste salarial como reconhecimento pelo desempenho, qualidade dos resultados e capacidade de assumir novos desafios.
              </p>
              <div className="bg-white/60 rounded-lg p-2.5 text-xs text-planning-gray-500">
                <strong className="text-planning-gray-700">Exemplo:</strong> Inicia como Analista I A e evolui para Analista I C, mantendo o mesmo cargo, mas com remuneração maior.
              </div>
            </div>

            {/* Vertical */}
            <div className="bg-violet-50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-violet-700 mb-2">Vertical</h3>
              <p className="text-xs text-planning-gray-600 mb-3">
                É a mudança para um cargo superior hierarquicamente. Ocorre quando há evidências claras de que o profissional aumentou suas responsabilidades, adquiriu mais experiência, domina suas atividades, tem alinhamento com a estratégia da empresa e demonstra autonomia na execução e tomada de decisões.
              </p>
              <div className="bg-white/60 rounded-lg p-2.5 text-xs text-planning-gray-500">
                <strong className="text-planning-gray-700">Exemplo:</strong> Analista I é promovido para Analista II, assumindo funções mais complexas e estratégicas.
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-planning-gray-500 bg-planning-gray-50 rounded-lg p-3">
            <ExternalLink size={12} className="text-violet-500 flex-shrink-0" />
            Os dados solicitados neste formulário podem ser consultados na{' '}
            <a href="https://app.qulture.rocks/" target="_blank" rel="noopener noreferrer" className="font-medium text-violet-600 underline">
              Qulture Rocks
            </a>
          </div>
        </div>

        {/* FORM - Seção 1 */}
        <div className="card-base p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-7 h-7 rounded-lg bg-planning-green flex items-center justify-center text-white text-xs font-bold">1</span>
            <h2 className="text-base font-bold text-planning-gray-800">Dados da Solicitação</h2>
          </div>

          <div className="space-y-5">
            {/* 1. Nome */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                1. Nome completo do colaborador que gostaria de promover <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={nomeColaborador}
                onChange={e => setNomeColaborador(e.target.value)}
                placeholder="Digite o nome completo"
                className="input-base w-full"
              />
            </div>

            {/* 2. Líder imediato */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                2. Líder imediato <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={liderImediato}
                onChange={e => setLiderImediato(e.target.value)}
                placeholder="Nome do líder imediato"
                className="input-base w-full"
              />
            </div>

            {/* 3. Departamento */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                3. Departamento <span className="text-red-400">*</span>
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

            {/* 4. Cargo atual */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                4. Cargo e salário atual <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={cargoAtual}
                onChange={e => setCargoAtual(e.target.value)}
                placeholder="Ex: Analista I A — R$ 3.500,00"
                className="input-base w-full"
              />
            </div>

            {/* 5. Tipo de Promoção */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                5. Tipo de Promoção <span className="text-red-400">*</span>
              </label>
              <select
                value={tipoPromocao}
                onChange={e => setTipoPromocao(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar tipo</option>
                <option value="Horizontal">Horizontal — ajuste salarial dentro do mesmo cargo</option>
                <option value="Vertical">Vertical — mudança para cargo superior</option>
              </select>
            </div>

            {/* 6. Cargo promoção */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                6. Cargo e salário da promoção <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={cargoPromocao}
                onChange={e => setCargoPromocao(e.target.value)}
                placeholder="Ex: Analista II A — R$ 4.500,00"
                className="input-base w-full"
              />
            </div>

            {/* 7. Mês de aplicação */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                7. Mês de aplicação da promoção <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-planning-gray-400 mb-2">
                Por exemplo, se a promoção for solicitada e aprovada durante o mês de agosto, o novo salário será contabilizado e pago na folha de setembro, considerando o trabalho realizado sob o novo cargo.
              </p>
              <select
                value={mesAplicacao}
                onChange={e => setMesAplicacao(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar mês</option>
                {meses.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* FORM - Seção 2: Critérios */}
        <div className="card-base p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-7 h-7 rounded-lg bg-planning-green flex items-center justify-center text-white text-xs font-bold">2</span>
            <h2 className="text-base font-bold text-planning-gray-800">Critérios para Promoção</h2>
          </div>

          <div className="space-y-5">
            {/* 8. Classificação avaliação */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                8. Classificação na última avaliação de Desempenho <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-planning-gray-400 mb-2">
                Se tiver dúvidas, entre em contato com a BP da área.
              </p>
              <select
                value={classificacaoDesempenho}
                onChange={e => setClassificacaoDesempenho(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar classificação</option>
                {classificacoes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* 9. Reuniões 1:1 */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                9. Foram registradas reuniões de 1:1 (one-on-one) com o colaborador nos últimos 30 dias? <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-planning-gray-400 mb-2">
                As reuniões de 1:1 garantem um acompanhamento direto e estruturado do desempenho e desenvolvimento do colaborador.
              </p>
              <select
                value={reunioes1on1}
                onChange={e => setReunioes1on1(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar resposta</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>

            {/* 10. PDI */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                10. Colaborador possui PDI em andamento? <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-planning-gray-400 mb-2">
                As promoções e progressões serão aprovadas somente para colaboradores que possuírem PDI em andamento.
              </p>
              <select
                value={pdiAndamento}
                onChange={e => setPdiAndamento(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar resposta</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>

            {/* 11. Justificativa principal */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                11. Justificativa principal para a promoção <span className="text-red-400">*</span>
              </label>
              <select
                value={justificativaPrincipal}
                onChange={e => setJustificativaPrincipal(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar justificativa</option>
                {justificativas.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>

            {/* 12. Descrição da justificativa */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                12. Descreva a justificativa para a promoção <span className="text-red-400">*</span>
              </label>
              <div className="bg-violet-50 rounded-lg p-3 mb-2 text-xs text-planning-gray-600 space-y-1.5">
                <p>Apresente, de forma detalhada e objetiva, as razões que comprovam a qualificação. Inclua evidências concretas:</p>
                <p><strong>1. Desempenho Consistente:</strong> Superação de expectativas, projetos bem-sucedidos, indicadores, feedbacks positivos.</p>
                <p><strong>2. Evolução Profissional:</strong> Habilidades técnicas/comportamentais, treinamentos, certificações.</p>
                <p><strong>3. Aumento de Responsabilidades:</strong> Funções mais complexas, contribuição para o crescimento da área.</p>
                <p><strong>4. Contribuição Estratégica:</strong> Alinhamento com objetivos organizacionais, autonomia, decisões estratégicas.</p>
              </div>
              <textarea
                value={descricaoJustificativa}
                onChange={e => setDescricaoJustificativa(e.target.value)}
                placeholder="Descreva a justificativa detalhada com evidências concretas..."
                rows={8}
                className="input-base w-full resize-y"
              />
            </div>

            {/* 13. Observações */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                13. Observações
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
              <p className="text-xs text-planning-gray-300 mt-1">Quando o GG adicionar o POP de Promoção, ele aparecerá aqui automaticamente.</p>
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
