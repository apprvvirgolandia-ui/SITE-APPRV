import { motion } from 'motion/react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function News() {
  const { config } = useSettings();
  const news = config.news || [];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Notícias e Eventos</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Fique por dentro das atividades, reuniões e conquistas da nossa associação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col"
            >
              <div className="h-48 bg-stone-200 relative">
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {item.category}
                </div>
                <img 
                  src={item.imageUrl || `https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600&sig=${idx}`} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-stone-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm mb-6 line-clamp-3">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-6">
                  <MapPin size={14} />
                  <span>{item.location}</span>
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Ler mais <ChevronRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
