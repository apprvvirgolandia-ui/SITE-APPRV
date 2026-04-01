import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2, Factory, Edit2, X, Save, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Products() {
  const { config, updateConfig } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProducts = [...(config.products || [])];
    const index = newProducts.findIndex(p => p.id === editingProduct.id);
    
    if (index >= 0) {
      newProducts[index] = editingProduct;
    } else {
      newProducts.push({ ...editingProduct, id: Date.now().toString() });
    }

    updateConfig({ products: newProducts });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const newProducts = (config.products || []).filter(p => p.id !== id);
    updateConfig({ products: newProducts });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Produtos e Serviços</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Conheça a excelência da produção dos nossos associados e a qualidade da nossa agroindústria.
          </p>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`mt-8 px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 mx-auto ${
              isEditing ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Edit2 size={18} />
            {isEditing ? 'Sair do Modo de Edição' : 'Gerenciar Produtos'}
          </button>
        </div>

        {/* Factory Highlight */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-white mb-20 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-6">
                <Factory size={32} className="text-accent" />
                <h2 className="text-3xl font-bold">Fábrica de Polpas Virgolândia</h2>
              </div>
              <p className="text-emerald-50 text-lg mb-8 leading-relaxed">
                Nossa fábrica é o coração da associação. Processamos frutas frescas de nossos associados seguindo os mais rigorosos padrões de higiene e qualidade, garantindo um produto 100% natural para sua mesa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Sem conservantes",
                  "100% fruta natural",
                  "Origem controlada",
                  "Apoio ao produtor local"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center">
                {(config.pulpLogoUrl || config.pulpLogoSecondaryUrl) && (
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {config.pulpLogoUrl && (
                      <img 
                        src={config.pulpLogoUrl} 
                        alt="Virgo Fruit Logo" 
                        className="w-32 h-32 object-contain drop-shadow-xl"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {config.pulpLogoSecondaryUrl && config.pulpLogoSecondaryUrl !== config.pulpLogoUrl && (
                      <img 
                        src={config.pulpLogoSecondaryUrl} 
                        alt="Virgo Fruit Logo 2" 
                        className="w-32 h-32 object-contain drop-shadow-xl"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                )}
                <h3 className="font-bold text-xl mb-2 text-center">Onde encontrar?</h3>
                <p className="text-sm text-emerald-100 mb-4 text-center">Nossas polpas estão disponíveis nos principais mercados de Virgolândia e região.</p>
                <button className="w-full bg-accent hover:bg-emerald-400 text-emerald-950 font-bold py-3 rounded-xl transition-colors">
                  Seja um Revendedor
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <Factory size={400} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <ShoppingBag className="text-primary" />
            Nossas Polpas de Frutas
          </h2>
          {isEditing && (
            <button 
              onClick={() => setEditingProduct({ name: '', desc: '', fruitImageUrl: '', pulpImageUrl: '' })}
              className="bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors"
            >
              <Plus size={18} /> Adicionar Produto
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {(config.products || []).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col group relative"
            >
              {isEditing && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-stone-700 hover:text-primary transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-stone-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {/* Image Gallery */}
              <div className="grid grid-cols-2 h-48 gap-1 p-2 bg-stone-50">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={product.fruitImageUrl} 
                    alt={`${product.name} - Fruta`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Fruta
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={product.pulpImageUrl} 
                    alt={`${product.name} - Polpa`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Polpa
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-stone-900 mb-3">{product.name}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.desc}
                </p>
              </div>
              
              <div className="p-6 pt-0 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                    <CheckCircle2 size={14} />
                    Produção Local
                  </div>
                  {config.pulpLogoCircularUrl && (
                    <img 
                      src={config.pulpLogoCircularUrl} 
                      alt="Virgo Fruit" 
                      className="h-12 w-12 object-contain opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                
                {config.whatsapp && (
                  <a 
                    href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de encomendar a ${product.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-50 text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-primary/20"
                  >
                    <MessageCircle size={18} />
                    Encomendar via WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              >
                <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                  <h3 className="text-xl font-bold text-stone-900">
                    {editingProduct.id ? 'Editar Produto' : 'Novo Produto'}
                  </h3>
                  <button onClick={() => setEditingProduct(null)} className="text-stone-400 hover:text-stone-600">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Nome do Produto</label>
                    <input 
                      type="text" 
                      required
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Ex: Polpa de Acerola"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Descrição</label>
                    <textarea 
                      required
                      value={editingProduct.desc}
                      onChange={e => setEditingProduct({...editingProduct, desc: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24 resize-none"
                      placeholder="Breve descrição do produto..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">URL Imagem Fruta</label>
                      <input 
                        type="url" 
                        required
                        value={editingProduct.fruitImageUrl}
                        onChange={e => setEditingProduct({...editingProduct, fruitImageUrl: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">URL Imagem Polpa</label>
                      <input 
                        type="url" 
                        required
                        value={editingProduct.pulpImageUrl}
                        onChange={e => setEditingProduct({...editingProduct, pulpImageUrl: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 px-6 py-3 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> Salvar
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Other Services */}
        <div className="mt-24 bg-stone-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Outros Serviços aos Associados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-accent mb-2">Assistência Técnica</h4>
              <p className="text-stone-400 text-sm">Acompanhamento profissional para melhorar o manejo da terra.</p>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-2">Compra Coletiva</h4>
              <p className="text-stone-400 text-sm">Insumos e ferramentas com preços reduzidos para o associado.</p>
            </div>
            <div>
              <h4 className="font-bold text-accent mb-2">Comercialização</h4>
              <p className="text-stone-400 text-sm">Acesso a feiras e mercados institucionais (PNAE/PAA).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
