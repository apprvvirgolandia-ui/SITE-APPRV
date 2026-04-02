import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2, Store as StoreIcon, Edit2, X, Save, Plus, Trash2, MessageCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Store() {
  const { config, updateConfig, isAdmin } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `store/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      callback(downloadURL);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Erro ao fazer upload da imagem.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProducts = [...(config.storeProducts || [])];
    const index = newProducts.findIndex(p => p.id === editingProduct.id);
    
    if (index >= 0) {
      newProducts[index] = editingProduct;
    } else {
      newProducts.push({ ...editingProduct, id: 's' + Date.now().toString() });
    }

    updateConfig({ storeProducts: newProducts });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const newProducts = (config.storeProducts || []).filter(p => p.id !== id);
    updateConfig({ storeProducts: newProducts });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Loja do Associado</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Produtos artesanais e frescos produzidos diretamente pelos nossos associados da APPRV.
          </p>
          {isAdmin && (
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`mt-8 px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 mx-auto ${
                isEditing ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Edit2 size={18} />
              {isEditing ? 'Sair do Modo de Edição' : 'Gerenciar Loja'}
            </button>
          )}
        </div>

        {/* Store Highlight */}
        <div className="bg-amber-900 rounded-3xl p-8 md:p-12 text-white mb-20 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-6">
                <StoreIcon size={32} className="text-amber-400" />
                <h2 className="text-3xl font-bold">Valorizando o Produtor Local</h2>
              </div>
              <p className="text-amber-50 text-lg mb-8 leading-relaxed">
                A Loja do Associado é um espaço dedicado para que nossos produtores possam expor e vender seus produtos artesanais. Aqui você encontra o melhor de Virgolândia, com a garantia de origem e qualidade da APPRV.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Direto do produtor",
                  "Processos artesanais",
                  "Frescor garantido",
                  "Fortalecimento local"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center">
                {config.logoUrl && (
                  <img 
                    src={config.logoUrl} 
                    alt="Logo APPRV" 
                    className="w-32 h-32 object-contain drop-shadow-xl mb-4"
                    referrerPolicy="no-referrer"
                  />
                )}
                <h3 className="font-bold text-xl mb-2 text-center">Apoie esta causa</h3>
                <p className="text-sm text-amber-100 mb-4 text-center">Ao comprar aqui, você ajuda diretamente uma família de produtores rurais.</p>
                <a 
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <StoreIcon size={400} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <ShoppingBag className="text-amber-700" />
            Produtos Disponíveis
          </h2>
          {isEditing && (
            <button 
              onClick={() => setEditingProduct({ name: '', desc: '', fruitImageUrl: '', pulpImageUrl: '' })}
              className="bg-amber-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-800 transition-colors"
            >
              <Plus size={18} /> Adicionar Produto
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {(config.storeProducts || []).map((product, idx) => (
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
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-stone-700 hover:text-amber-700 transition-colors"
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
              
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.fruitImageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white text-sm italic">Produção artesanal de Virgolândia</p>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
                <p className="text-stone-600 text-sm mb-6 flex-grow leading-relaxed">
                  {product.desc}
                </p>
                
                <a 
                  href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de encomendar ${product.name} da Loja do Associado.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-50 text-amber-700 font-bold py-3 rounded-xl border-2 border-amber-100 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Encomendar via WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Modal */}
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
                    <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Nome do Produto</label>
                    <input 
                      type="text" 
                      required
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ex: Mel Silvestre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Descrição</label>
                    <textarea 
                      required
                      value={editingProduct.desc}
                      onChange={e => setEditingProduct({...editingProduct, desc: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-amber-500 h-24 resize-none"
                      placeholder="Descreva o produto..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1 uppercase tracking-wider">Imagem do Produto</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={editingProduct.fruitImageUrl}
                        onChange={e => setEditingProduct({...editingProduct, fruitImageUrl: e.target.value})}
                        className="flex-grow px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="URL da imagem..."
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleImageUpload(file, (url) => setEditingProduct({...editingProduct, fruitImageUrl: url}));
                          };
                          input.click();
                        }}
                        disabled={isUploading}
                        className="p-3 bg-stone-100 rounded-xl text-stone-600 hover:bg-stone-200 transition-colors disabled:opacity-50"
                      >
                        {isUploading ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                      </button>
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
                      className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-amber-700 hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> Salvar Produto
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
