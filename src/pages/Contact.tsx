import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Contact() {
  const { config } = useSettings();

  const handleWhatsAppClick = () => {
    if (config.whatsapp) {
      window.open(`https://wa.me/${config.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Fale Conosco</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer se tornar um associado? Entre em contato conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <h2 className="text-2xl font-bold text-stone-900 mb-8">Informações de Contato</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Endereço</p>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 text-sm hover:text-primary transition-colors"
                    >
                      {config.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Telefone</p>
                    <p className="text-stone-600 text-sm">{config.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">E-mail</p>
                    <p className="text-stone-600 text-sm">{config.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Horário de Atendimento</p>
                    <p className="text-stone-600 text-sm">Segunda a Sexta: 08:00 às 17:00</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  {config.whatsapp && (
                    <button 
                      onClick={handleWhatsAppClick}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-200"
                    >
                      <MessageCircle size={24} fill="currentColor" />
                      Conversar no WhatsApp
                    </button>
                  )}

                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-stone-200"
                  >
                    <MapPin size={24} />
                    Ver Rota no Mapa
                  </a>
                </div>

                <div className="flex gap-4 pt-4">
                  {config.facebook && (
                    <a 
                      href={config.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 hover:bg-primary hover:text-white transition-all"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {config.instagram && (
                    <a 
                      href={config.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 hover:bg-primary hover:text-white transition-all"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-stone-200 h-80 rounded-3xl overflow-hidden relative shadow-sm border border-stone-100">
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100"
          >
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Envie uma Mensagem</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Nome Completo</label>
                  <input 
                    type="text" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">E-mail</label>
                  <input 
                    type="email" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Assunto</label>
                <select className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  <option>Informações sobre Associação</option>
                  <option>Dúvidas sobre Produtos</option>
                  <option>Parcerias</option>
                  <option>Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Mensagem</label>
                <textarea 
                  rows={5}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button className="w-full bg-primary hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                Enviar Mensagem <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
