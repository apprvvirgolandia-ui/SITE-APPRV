import { motion } from 'motion/react';
import { BookOpen, Target, ShieldCheck, Calendar } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { config } = useSettings();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Sobre Nós</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Conheça a história, os valores e os objetivos que movem a nossa associação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa História</h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                A <strong>{config.name}</strong> nasceu em <strong>{config.foundationDate}</strong> da necessidade de união entre as famílias agricultoras da nossa região. Diante dos desafios do mercado e da produção, percebemos que juntos seríamos mais fortes.
              </p>
              <p>
                Desde a nossa fundação, temos trabalhado incansavelmente para oferecer suporte técnico, facilitar o acesso a créditos e, principalmente, criar canais de comercialização justos para os produtos da nossa terra.
              </p>
              <p>
                Hoje, somos uma referência em cooperativismo na região, com projetos consolidados como a nossa fábrica de polpas, que é o orgulho de todos os associados.
              </p>
            </div>
          </motion.div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1595033538458-35606748684c?auto=format&fit=crop&q=80&w=1000" 
              alt="Produtores trabalhando" 
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-8 rounded-2xl hidden md:block">
              <p className="text-3xl font-bold">+10 Anos</p>
              <p className="text-sm opacity-80">De dedicação ao campo</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Estatuto</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Regulamentada sob o CNPJ {config.cnpj}, nossa associação opera com total transparência e segue rigorosamente seu estatuto social, garantindo os direitos de todos os associados.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Objetivos</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Melhorar a produtividade, reduzir custos através de compras coletivas e buscar constantemente novas tecnologias que facilitem o dia a dia do produtor rural.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Valores</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Ética, solidariedade, sustentabilidade ambiental e compromisso com a qualidade de tudo o que produzimos em nossas terras.
            </p>
          </div>
        </div>

        {/* Brands Section */}
        <div className="bg-stone-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">Nossas Marcas e Parcerias</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            {config.logoUrl && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src={config.logoUrl} 
                    alt="Logo APPRV" 
                    className="h-32 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold text-stone-700 uppercase tracking-widest text-sm">Associação (APPRV)</span>
              </div>
            )}
            {(config.pulpLogoUrl || config.pulpLogoSecondaryUrl) && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow flex gap-4">
                  {config.pulpLogoUrl && (
                    <img 
                      src={config.pulpLogoUrl} 
                      alt="Logo Virgo Fruit" 
                      className="h-32 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {config.pulpLogoSecondaryUrl && config.pulpLogoSecondaryUrl !== config.pulpLogoUrl && (
                    <img 
                      src={config.pulpLogoSecondaryUrl} 
                      alt="Logo Virgo Fruit 2" 
                      className="h-32 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <span className="font-bold text-stone-700 uppercase tracking-widest text-sm">Linha Industrial (Virgo Fruit)</span>
              </div>
            )}
            {config.partnerLogoUrl && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src={config.partnerLogoUrl} 
                    alt="Logo Cooperativa Parceira" 
                    className="h-32 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold text-stone-700 uppercase tracking-widest text-sm">Cooperativa Parceira</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
