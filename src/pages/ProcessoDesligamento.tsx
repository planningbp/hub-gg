import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { FileDown, Printer, AlertTriangle, Info, Mail } from 'lucide-react';

interface ManifestDoc {
  nome: string;
  arquivo: string;
  processo?: string;
}

export function ProcessoDesligamento() {
  const [leaderCpf, setLeaderCpf] = useState('');
  const [popDocs, setPopDocs] = useState<ManifestDoc[]>([]);

  // Form state
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [cargoNivel, setCargoNivel] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [custoRescisorio, setCustoRescisorio] = useState('');
  const [tipoDesligamento, setTipoDesligamento] = useState('');
  const [motivoDesligamento, setMotivoDesligamento] = useState('');
  const [descricaoMotivo, setDescricaoMotivo] = useState('');

  useEffect(() => {
    fetch('./docs-manifest.json')
      .then(r => r.json())
      .then(data => {
        const docs = (data.documentos || []).filter(
          (d: ManifestDoc) => d.processo === 'Desligamento'
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

  const tiposDesligamento = [
    'Demissão por iniciativa da empresa',
    'Distrato por parte da empresa (PJ)',
    'Encerramento do período de experiência (empresa)',
    'Encerramento do contrato de estagiário (empresa)',
    'Pedido de demissão pelo colaborador',
    'Distrato por parte do PJ',
    'Encerramento do período de experiência (colaborador)',
    'Encerramento do contrato de estagiário (colaborador)',
  ];

  const motivosDesligamento = [
    'Desempenho insatisfatório',
    'Questões comportamentais',
    'Reestruturação da área',
    'Redução de quadro',
    'Fim do contrato/projeto',
    'Motivos pessoais do colaborador',
    'Nova oportunidade (colaborador)',
    'Insatisfação com a empresa (colaborador)',
    'Mudança de cidade/estado (colaborador)',
    'Outro',
  ];

  return (
    <LeaderGate onAuthenticated={setLeaderCpf}>
      <div className="page-container">
        <PageHeader
          title="Solicitação de Desligamento"
          subtitle="Formulário para formalizar o processo de desligamento de um colaborador."
          breadcrumbs={[
            { label: 'Processos', href: '/processos' },
            { label: 'Desligamento' },
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
            Este formulário tem como objetivo formalizar o processo de desligamento de um colaborador, garantindo que todas as informações relevantes sejam registradas de forma clara e completa.
          </p>
        </div>

        {/* Tipos de Desligamento - Info */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-4 flex items-center gap-2">
            <Info size={16} className="text-violet-500" />
            Tipos de desligamento
          </h2>
          <p className="text-sm text-planning-gray-500 mb-5">
            Antes de preencher, leia atentamente as explicações sobre os tipos de desligamento.
          </p>

          {/* Involuntários */}
          <div className="bg-red-50 rounded-xl p-5 mb-4">
            <h3 className="text-sm font-bold text-red-700 mb-1">Involuntários</h3>
            <p className="text-xs text-red-600 mb-3">
              Desligamentos por iniciativa da empresa devem ser realizados até o dia 20 de cada mês e solicitados com, no mínimo, 24 horas de antecedência.
            </p>
            <ul className="space-y-2">
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Demissão por iniciativa da empresa:</strong> O gestor decide encerrar o contrato de trabalho CLT, seja por questões de desempenho, comportamento ou outras razões.
              </li>
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Distrato por parte da empresa:</strong> Rescisão contratual formalizada entre a empresa e um prestador de serviços contratado como pessoa jurídica.
              </li>
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Encerramento do período de experiência:</strong> A empresa opta por não efetivar o colaborador ao término do período de experiência.
              </li>
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Encerramento do contrato de estagiário:</strong> A empresa decide finalizar o contrato de estágio antes do término do prazo acordado.
              </li>
            </ul>
          </div>

          {/* Voluntários */}
          <div className="bg-blue-50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-blue-700 mb-1">Voluntários</h3>
            <p className="text-xs text-blue-600 mb-3">
              Desligamentos em que a iniciativa parte do colaborador ou prestador de serviços, a formalização deve ser feita pelo próprio colaborador por meio de e-mail (<a href="mailto:rh.planning@planning.com.br" className="underline">rh.planning@planning.com.br</a>), especificando a intenção e a data desejada para o término do vínculo.
            </p>
            <ul className="space-y-2">
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Pedido de demissão pelo colaborador:</strong> O colaborador CLT manifesta o desejo de encerrar seu vínculo com a empresa por motivos pessoais ou profissionais.
              </li>
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Distrato por parte do PJ:</strong> O prestador de serviços contratado como pessoa jurídica solicita o encerramento do contrato.
              </li>
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Encerramento do período de experiência:</strong> O colaborador decide não continuar após o término do período de experiência.
              </li>
              <li className="text-xs text-planning-gray-600">
                <strong className="text-planning-gray-800">Encerramento do contrato de estagiário:</strong> O estagiário opta por finalizar o contrato antes do término do prazo acordado.
              </li>
            </ul>
          </div>
        </div>

        {/* FORM - Dados do Colaborador */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-5">
            Dados do Colaborador / Prestador de Serviços
          </h2>

          <div className="space-y-5">
            {/* 1. Nome */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                1. Nome completo do colaborador/prestador de serviços <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={nomeColaborador}
                onChange={e => setNomeColaborador(e.target.value)}
                placeholder="Digite o nome completo"
                className="input-base w-full"
              />
            </div>

            {/* 2. Cargo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                2. Cargo e nível <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={cargoNivel}
                onChange={e => setCargoNivel(e.target.value)}
                placeholder="Ex: Analista I, Coordenador, Gerente..."
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
          </div>
        </div>

        {/* FORM - Sobre o desligamento */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-5">
            Sobre o Desligamento
          </h2>

          <div className="space-y-5">
            {/* 4. Custo rescisório */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                4. Custo rescisório
              </label>
              <div className="bg-amber-50 rounded-lg p-3 mb-2 flex items-start gap-2">
                <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-planning-gray-600">
                  <p className="mb-1">Solicite o cálculo por e-mail ao DP: <a href="mailto:dp.interno@planning.com.br" className="font-medium text-violet-600 underline">dp.interno@planning.com.br</a></p>
                  <p className="text-planning-gray-500 italic">
                    Modelo: "Solicito o cálculo do custo rescisório de [NOME COMPLETO], considerando como último dia trabalhado [dd/mm/aaaa], com aviso prévio [TRABALHADO | INDENIZADO]."
                  </p>
                </div>
              </div>
              <input
                type="text"
                value={custoRescisorio}
                onChange={e => setCustoRescisorio(e.target.value)}
                placeholder="Informe o valor ou cole a resposta do DP"
                className="input-base w-full"
              />
            </div>

            {/* 5. Tipo do Desligamento */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                5. Tipo do Desligamento <span className="text-red-400">*</span>
              </label>
              <select
                value={tipoDesligamento}
                onChange={e => setTipoDesligamento(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar tipo</option>
                <optgroup label="Involuntários (iniciativa da empresa)">
                  {tiposDesligamento.slice(0, 4).map(t => <option key={t} value={t}>{t}</option>)}
                </optgroup>
                <optgroup label="Voluntários (iniciativa do colaborador)">
                  {tiposDesligamento.slice(4).map(t => <option key={t} value={t}>{t}</option>)}
                </optgroup>
              </select>
            </div>

            {/* 6. Motivo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                6. Motivo do Desligamento <span className="text-red-400">*</span>
              </label>
              <select
                value={motivoDesligamento}
                onChange={e => setMotivoDesligamento(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar motivo</option>
                {motivosDesligamento.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* 7. Descrição */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                7. Descreva o motivo do desligamento com detalhes <span className="text-red-400">*</span>
              </label>
              <textarea
                value={descricaoMotivo}
                onChange={e => setDescricaoMotivo(e.target.value)}
                placeholder="Descreva detalhadamente o motivo do desligamento..."
                rows={5}
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
              <p className="text-xs text-planning-gray-300 mt-1">Quando o GG adicionar o POP de Desligamento, ele aparecerá aqui automaticamente.</p>
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
