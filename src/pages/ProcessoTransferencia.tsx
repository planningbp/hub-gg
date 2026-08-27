import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeaderGate } from '@/components/ui/LeaderGate';
import { Printer, Info } from 'lucide-react';

export function ProcessoTransferencia() {
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [departamentoAtual, setDepartamentoAtual] = useState('');
  const [equipeAtual, setEquipeAtual] = useState('');
  const [departamentoDestino, setDepartamentoDestino] = useState('');
  const [equipeDestino, setEquipeDestino] = useState('');
  const [motivo, setMotivo] = useState('');
  const [observacoes, setObservacoes] = useState('');

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
          title="Movimentação de Colaboradores"
          subtitle="Formulário para formalizar transferências entre equipes e departamentos."
          breadcrumbs={[
            { label: 'Área do Líder', href: '/area-lider' },
            { label: 'Movimentação de Colaboradores' },
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
            Este formulário tem como objetivo formalizar a movimentação de um colaborador entre equipes ou departamentos, garantindo o registro e alinhamento entre as áreas envolvidas.
          </p>
        </div>

        {/* Info */}
        <div className="card-base p-6 mb-6">
          <div className="flex items-start gap-3">
            <Info size={16} className="text-violet-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-planning-gray-700 mb-1">Antes de preencher</h4>
              <p className="text-xs text-planning-gray-500 leading-relaxed">
                Certifique-se de que a movimentação foi previamente alinhada entre os gestores de origem e destino, e que há concordância de ambas as partes. A BP será comunicada após o envio deste formulário.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="card-base p-6 mb-6">
          <h2 className="text-base font-bold text-planning-gray-800 mb-5">
            Dados da Movimentação
          </h2>

          <div className="space-y-5">
            {/* 1. Nome */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                1. Nome completo do colaborador <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={nomeColaborador}
                onChange={e => setNomeColaborador(e.target.value)}
                placeholder="Insira o nome completo"
                className="input-base w-full"
              />
            </div>

            {/* 2. Departamento atual */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                2. Departamento atual <span className="text-red-400">*</span>
              </label>
              <select
                value={departamentoAtual}
                onChange={e => setDepartamentoAtual(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar departamento</option>
                {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* 3. Equipe atual */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                3. Equipe atual <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={equipeAtual}
                onChange={e => setEquipeAtual(e.target.value)}
                placeholder="Ex: Equipe de Projetos Residenciais"
                className="input-base w-full"
              />
            </div>

            {/* 4. Departamento destino */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                4. Departamento de destino <span className="text-red-400">*</span>
              </label>
              <select
                value={departamentoDestino}
                onChange={e => setDepartamentoDestino(e.target.value)}
                className="input-base w-full"
              >
                <option value="">Selecionar departamento</option>
                {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* 5. Equipe destino */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                5. Equipe de destino <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={equipeDestino}
                onChange={e => setEquipeDestino(e.target.value)}
                placeholder="Ex: Equipe de Projetos Comerciais"
                className="input-base w-full"
              />
            </div>

            {/* 6. Motivo */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                6. Motivo da movimentação <span className="text-red-400">*</span>
              </label>
              <textarea
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                placeholder="Descreva o motivo da transferência..."
                rows={4}
                className="input-base w-full resize-y"
              />
            </div>

            {/* 7. Observações */}
            <div>
              <label className="block text-sm font-medium text-planning-gray-700 mb-1.5">
                7. Observações
              </label>
              <textarea
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                placeholder="Informações adicionais (opcional)"
                rows={3}
                className="input-base w-full resize-y"
              />
            </div>
          </div>
        </div>

        {/* Print footer */}
        <div className="hidden print:block text-center text-xs text-planning-gray-400 mt-8 pt-4 border-t border-planning-gray-200">
          Hub GG — Gente &amp; Gestão · Planning · Gerado em {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
    </LeaderGate>
  );
}
