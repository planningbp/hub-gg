import { Heart, Target, Users, Lightbulb, Shield, MessageCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';

const values = [
  { icon: Heart, title: 'Proximidade', description: 'Estamos perto de cada colaborador, entendendo necessidades e apoiando o desenvolvimento.' },
  { icon: Target, title: 'Estratégia', description: 'Atuamos de forma estratégica para gerar valor e impacto nos resultados da organização.' },
  { icon: Users, title: 'Parceria', description: 'Somos parceiros das lideranças e das áreas, promovendo colaboração e alinhamento.' },
  { icon: Lightbulb, title: 'Inovação', description: 'Buscamos constantemente melhores práticas e soluções para gestão de pessoas.' },
  { icon: Shield, title: 'Confiança', description: 'Atuamos com ética, confidencialidade e transparência em todas as relações.' },
  { icon: MessageCircle, title: 'Comunicação', description: 'Promovemos uma comunicação clara, aberta e acessível em toda a organização.' },
];

export function Sobre() {
  return (
    <div className="page-container">
      <PageHeader
        title="Sobre o GG"
        subtitle="Conheça a área de Gente & Gestão da Planning."
        breadcrumbs={[{ label: 'Sobre o GG' }]}
      />

      {/* Mission */}
      <div className="card-base p-8 mb-8 animate-fade-in-up">
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-planning-gray-800 mb-3">Nossa Missão</h2>
          <p className="text-sm text-planning-gray-600 leading-relaxed">
            A área de Gente & Gestão da Planning existe para cuidar das pessoas, potencializar talentos e garantir
            que todos tenham as condições e o suporte necessário para se desenvolver e entregar o seu melhor.
            Atuamos como parceiros estratégicos das lideranças e de toda a organização.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="mb-8">
        <h2 className="section-title">Nossos Pilares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((val, i) => (
            <div key={val.title} className={`card-base p-6 animate-fade-in-up stagger-${i + 1}`}>
              <div className="w-10 h-10 rounded-xl bg-planning-green-50 flex items-center justify-center mb-4">
                <val.icon size={20} className="text-planning-green" />
              </div>
              <h3 className="text-sm font-semibold text-planning-gray-800 mb-2">{val.title}</h3>
              <p className="text-xs text-planning-gray-500 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hub Info */}
      <div className="card-base p-8 animate-fade-in-up stagger-7">
        <h2 className="text-lg font-semibold text-planning-gray-800 mb-3">Sobre o Hub GG</h2>
        <p className="text-sm text-planning-gray-600 leading-relaxed mb-4">
          O Hub GG é a plataforma central de Gente & Gestão da Planning.
          Aqui você encontra tudo o que precisa: processos, formulários, documentos,
          materiais de desenvolvimento, comunicados e muito mais.
        </p>
        <p className="text-sm text-planning-gray-600 leading-relaxed">
          O objetivo é facilitar o acesso às informações e promover uma experiência simples e
          organizada para colaboradores e líderes.
        </p>
        <div className="mt-6 pt-4 border-t border-planning-gray-100">
          <p className="text-xs text-planning-gray-400">
            Desenvolvido pela área de Gente & Gestão — Planning
          </p>
        </div>
      </div>
    </div>
  );
}
