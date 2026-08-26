import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { PessoasGestao } from '@/pages/PessoasGestao';
import { Lideres } from '@/pages/Lideres';
import { Processos } from '@/pages/Processos';
import { ProcessoDesligamento } from '@/pages/ProcessoDesligamento';
import { ProcessoPromocao } from '@/pages/ProcessoPromocao';
import { AreaLider } from '@/pages/AreaLider';
import { Formularios } from '@/pages/Formularios';
import { Documentos } from '@/pages/Documentos';
import { Desenvolvimento } from '@/pages/Desenvolvimento';
import { Comunicados } from '@/pages/Comunicados';
import { Calendario } from '@/pages/Calendario';
import { LinksUteis } from '@/pages/LinksUteis';
import { Sobre } from '@/pages/Sobre';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pessoas-gestao" element={<PessoasGestao />} />
          <Route path="/lideres" element={<Lideres />} />
          <Route path="/processos" element={<Processos />} />
          <Route path="/processos/desligamento" element={<ProcessoDesligamento />} />
          <Route path="/processos/promocao" element={<ProcessoPromocao />} />
          <Route path="/area-lider" element={<AreaLider />} />
          <Route path="/formularios" element={<Formularios />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/desenvolvimento" element={<Desenvolvimento />} />
          <Route path="/comunicados" element={<Comunicados />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/links-uteis" element={<LinksUteis />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
