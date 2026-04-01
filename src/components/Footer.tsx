import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, FileText, MessageCircle, Facebook, Instagram, Lock, Unlock } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import LoginModal from './LoginModal';

export default function Footer() {
  const { config, isAdmin, setIsAdmin } = useSettings();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const whatsappUrl = config.whatsapp ? `https://wa.me/${config.whatsapp}` : null;
  
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              {config.logoUrl && (
                <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                  <img 
                    src={config.logoUrl} 
                    alt="Logo APPRV" 
                    className="h-16 md:h-20 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              {config.pulpLogoUrl && (
                <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                  <img 
                    src={config.pulpLogoUrl} 
                    alt="Logo Virgo Fruit" 
                    className="h-16 md:h-20 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              {config.pulpLogoSecondaryUrl && config.pulpLogoSecondaryUrl !== config.pulpLogoUrl && (
                <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                  <img 
                    src={config.pulpLogoSecondaryUrl} 
                    alt="Logo Virgo Fruit Secundária" 
                    className="h-16 md:h-20 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              {config.partnerLogoUrl && (
                <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                  <img 
                    src={config.partnerLogoUrl} 
                    alt="Logo Parceiro" 
                    className="h-16 md:h-20 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
            <h3 className="text-white font-bold text-lg">{config.name}</h3>
            <p className="text-sm leading-relaxed">
              Trabalhando juntos pelo fortalecimento da agricultura familiar e o desenvolvimento sustentável da nossa região.
            </p>
            <div className="flex gap-4 mt-4">
              {config.facebook && (
                <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {config.instagram && (
                <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Informações Oficiais</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0" size={18} />
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {config.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={18} />
                <span>{config.phone}</span>
              </li>
              {whatsappUrl && (
                <li className="flex items-center gap-3">
                  <MessageCircle className="text-[#25D366] shrink-0" size={18} fill="currentColor" />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    WhatsApp
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <FileText className="text-accent shrink-0" size={18} />
                <span>CNPJ: {config.cnpj}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Acesso Rápido</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="hover:text-accent transition-colors">Sobre Nós</Link></li>
              <li><Link to="/noticias" className="hover:text-accent transition-colors">Notícias e Eventos</Link></li>
              <li><Link to="/produtos" className="hover:text-accent transition-colors">Polpas Virgo Fruit</Link></li>
              <li><Link to="/loja" className="hover:text-accent transition-colors">Loja do Associado</Link></li>
              <li><Link to="/contato" className="hover:text-accent transition-colors">Fale Conosco</Link></li>
              <li><Link to="/admin" className="text-stone-700 hover:text-stone-500 transition-colors">Área do Administrador</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Associação de Pequenos Produtores Rurais de Virgolândia. Todos os direitos reservados.</p>
          <button 
            onClick={() => isAdmin ? setIsAdmin(false) : setIsLoginOpen(true)}
            className="text-stone-500 hover:text-amber-500 transition-all p-2 flex items-center gap-2 group"
            title={isAdmin ? 'Sair do Modo Admin' : 'Área Restrita'}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Painel Administrativo</span>
            {isAdmin ? <Unlock size={16} className="text-amber-500" /> : <Lock size={16} />}
          </button>
        </div>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
        />
      </div>
    </footer>
  );
}
