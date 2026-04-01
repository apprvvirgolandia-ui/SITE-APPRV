import { motion } from 'motion/react';
import { ArrowRight, Sprout, Users, Factory, MapPin, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Home() {
  const { config } = useSettings();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Campo de agricultura" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {config.logoUrl && (
              <div className="bg-white p-4 rounded-2xl inline-block mb-8 shadow-2xl">
                <img 
                  src={config.logoUrl} 
                  alt="Logo APPRV" 
                  className="h-24 md:h-32 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Fortalecendo o Campo, Cultivando o Futuro.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-stone-200">
              Unindo pequenos produtores rurais de Virgolândia para promover o desenvolvimento sustentável e a valorização da agricultura familiar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/sobre" className="bg-primary hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2">
                Conheça Nossa História <ArrowRight size={20} />
              </Link>
              <Link to="/produtos" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full font-bold transition-all">
                Nossos Produtos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 italic serif">Nossa Missão</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-stone-600">
              Promover a união e o desenvolvimento socioeconômico dos pequenos produtores rurais, garantindo acesso a tecnologias, mercados e melhores condições de vida no campo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sprout className="text-primary" size={40} />,
                title: "Produção Sustentável",
                desc: "Incentivamos práticas agrícolas que respeitam o meio ambiente e garantem a saúde da terra."
              },
              {
                icon: <Users className="text-primary" size={40} />,
                title: "Cooperativismo",
                desc: "Acreditamos que a união faz a força. Trabalhamos juntos para superar desafios comuns."
              },
              {
                icon: <Factory className="text-primary" size={40} />,
                title: "Agroindústria",
                desc: "Agregamos valor à produção através da nossa fábrica de polpas e outros empreendimentos."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-stone-50 p-8 rounded-2xl border border-stone-100 text-center"
              >
                <div className="mb-6 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-stone-900">{item.title}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1615485240384-552e4c4f93d4?auto=format&fit=crop&q=80&w=1000" 
                alt="Fábrica de polpas" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Destaque</span>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Fábrica de Polpas de Frutas</h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Nosso principal empreendimento industrial que transforma a produção local em polpas de alta qualidade, gerando renda para dezenas de famílias e levando o sabor de Virgolândia para toda a região.
              </p>
              <Link to="/produtos" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Saiba mais sobre nossas polpas <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Associate Store Promotion */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=1000" 
                alt="Loja do Associado" 
                className="rounded-3xl shadow-2xl border-8 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2">
              <span className="text-amber-700 font-bold tracking-widest uppercase text-sm mb-4 block">Novidade</span>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Loja do Associado</h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Descubra a riqueza da nossa terra! Mel, queijos, café e muito mais, produzidos artesanalmente pelos associados da APPRV. Produtos frescos e com sabor de verdade.
              </p>
              <Link to="/loja" className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-bold transition-all inline-flex items-center gap-2 shadow-lg">
                Visitar a Loja <ShoppingBag size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4 italic serif">Onde Estamos</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-stone-600">{config.address}</p>
          </div>
          
          <div className="bg-stone-200 h-[400px] rounded-3xl overflow-hidden relative shadow-inner border border-stone-100">
            {config.googleMapsUrl ? (
              <iframe 
                src={config.googleMapsUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-stone-500 flex-col gap-2">
                <MapPin size={40} />
                <p className="font-medium">Mapa de Virgolândia - MG</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-center">
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 hover:bg-stone-800 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center gap-3 shadow-xl"
            >
              <MapPin size={20} />
              Traçar Rota para a Fábrica
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
