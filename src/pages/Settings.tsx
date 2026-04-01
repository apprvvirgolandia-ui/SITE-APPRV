import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Save, RotateCcw, CheckCircle2, AlertCircle, Plus, Trash2, Edit2, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Settings() {
  const { config, updateConfig, resetConfig } = useSettings();
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [editingStoreProduct, setEditingStoreProduct] = useState<any>(null);
  
  const fileInputRefs = {
    logoUrl: useRef<HTMLInputElement>(null),
    pulpLogoUrl: useRef<HTMLInputElement>(null),
    pulpLogoSecondaryUrl: useRef<HTMLInputElement>(null),
    pulpLogoCircularUrl: useRef<HTMLInputElement>(null),
    partnerLogoUrl: useRef<HTMLInputElement>(null),
  };

  const handleFileUpload = (field: keyof typeof fileInputRefs) => {
    const file = fileInputRefs[field].current?.files?.[0];
    if (file) {
      // Check file size (localStorage limit is ~5MB total)
      if (file.size > 1024 * 1024) {
        setError('O arquivo é muito grande (máximo 1MB para armazenamento local). Para arquivos maiores, recomendo configurar o Firebase.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig({ [field]: reader.result as string });
        setIsSaved(true);
        setError(null);
        setTimeout(() => setIsSaved(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (field: string, value: string) => {
    updateConfig({ [field]: value });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newNews = [...(config.news || [])];
    const index = newNews.findIndex(n => n.id === editingNews.id);
    
    if (index >= 0) {
      newNews[index] = editingNews;
    } else {
      newNews.push({ ...editingNews, id: Date.now().toString() });
    }

    updateConfig({ news: newNews });
    setEditingNews(null);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteNews = (id: string) => {
    const newNews = config.news.filter(n => n.id !== id);
    updateConfig({ news: newNews });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveStoreProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProducts = [...(config.storeProducts || [])];
    const index = newProducts.findIndex(p => p.id === editingStoreProduct.id);
    
    if (index >= 0) {
      newProducts[index] = editingStoreProduct;
    } else {
      newProducts.push({ ...editingStoreProduct, id: 's' + Date.now().toString() });
    }

    updateConfig({ storeProducts: newProducts });
    setEditingStoreProduct(null);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteStoreProduct = (id: string) => {
    const newProducts = (config.storeProducts || []).filter(p => p.id !== id);
    updateConfig({ storeProducts: newProducts });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    resetConfig();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="py-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Configurações de Identidade Visual</h1>
          <p className="text-stone-600">Gerencie as logomarcas e imagens do site de forma simples.</p>
        </div>

        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-green-100 text-green-800 rounded-xl flex items-center gap-3 border border-green-200"
          >
            <CheckCircle2 size={20} />
            Configurações salvas com sucesso!
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-100 text-red-800 rounded-xl flex items-center gap-3 border border-red-200"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Logo Principal */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-primary rounded-full" />
              Logo Principal (APPRV)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-stone-100 p-6 rounded-2xl flex items-center justify-center min-h-[160px]">
                <img src={config.logoUrl} alt="Preview Logo" className="max-h-32 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Upload de Arquivo</label>
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      ref={fileInputRefs.logoUrl}
                      className="hidden" 
                      accept="image/*"
                      onChange={() => handleFileUpload('logoUrl')}
                    />
                    <button 
                      onClick={() => fileInputRefs.logoUrl.current?.click()}
                      className="flex-grow flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-colors"
                    >
                      <Upload size={18} />
                      Escolher Imagem
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Ou Link Externo (URL)</label>
                  <input 
                    type="text" 
                    value={config.logoUrl}
                    onChange={(e) => handleUrlChange('logoUrl', e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Logo Polpas 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              Logo de Polpas 1 (Virgo Fruit)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-stone-100 p-6 rounded-2xl flex items-center justify-center min-h-[160px]">
                <img src={config.pulpLogoUrl} alt="Preview Pulp Logo" className="max-h-32 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Upload de Arquivo</label>
                  <button 
                    onClick={() => fileInputRefs.pulpLogoUrl.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    <Upload size={18} />
                    Escolher Imagem
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRefs.pulpLogoUrl}
                    className="hidden" 
                    accept="image/*"
                    onChange={() => handleFileUpload('pulpLogoUrl')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Ou Link Externo (URL)</label>
                  <input 
                    type="text" 
                    value={config.pulpLogoUrl}
                    onChange={(e) => handleUrlChange('pulpLogoUrl', e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Logo Polpas 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Logo de Polpas 2 (Secundária)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-stone-100 p-6 rounded-2xl flex items-center justify-center min-h-[160px]">
                <img src={config.pulpLogoSecondaryUrl} alt="Preview Pulp Logo 2" className="max-h-32 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Upload de Arquivo</label>
                  <button 
                    onClick={() => fileInputRefs.pulpLogoSecondaryUrl.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    <Upload size={18} />
                    Escolher Imagem
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRefs.pulpLogoSecondaryUrl}
                    className="hidden" 
                    accept="image/*"
                    onChange={() => handleFileUpload('pulpLogoSecondaryUrl')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Ou Link Externo (URL)</label>
                  <input 
                    type="text" 
                    value={config.pulpLogoSecondaryUrl}
                    onChange={(e) => handleUrlChange('pulpLogoSecondaryUrl', e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Logo Circular */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-accent rounded-full" />
              Logo Circular (Selo de Qualidade)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-stone-100 p-6 rounded-2xl flex items-center justify-center min-h-[160px]">
                <img src={config.pulpLogoCircularUrl} alt="Preview Circular Logo" className="max-h-32 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Upload de Arquivo</label>
                  <button 
                    onClick={() => fileInputRefs.pulpLogoCircularUrl.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    <Upload size={18} />
                    Escolher Imagem
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRefs.pulpLogoCircularUrl}
                    className="hidden" 
                    accept="image/*"
                    onChange={() => handleFileUpload('pulpLogoCircularUrl')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Ou Link Externo (URL)</label>
                  <input 
                    type="text" 
                    value={config.pulpLogoCircularUrl}
                    onChange={(e) => handleUrlChange('pulpLogoCircularUrl', e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Logo Parceiro */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-stone-400 rounded-full" />
              Logo de Parceria (Cooperativa)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-stone-100 p-6 rounded-2xl flex items-center justify-center min-h-[160px]">
                <img src={config.partnerLogoUrl} alt="Preview Partner Logo" className="max-h-32 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Upload de Arquivo</label>
                  <button 
                    onClick={() => fileInputRefs.partnerLogoUrl.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    <Upload size={18} />
                    Escolher Imagem
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRefs.partnerLogoUrl}
                    className="hidden" 
                    accept="image/*"
                    onChange={() => handleFileUpload('partnerLogoUrl')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Ou Link Externo (URL)</label>
                  <input 
                    type="text" 
                    value={config.partnerLogoUrl}
                    onChange={(e) => handleUrlChange('partnerLogoUrl', e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato e Redes Sociais */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-blue-500 rounded-full" />
              Contato e Redes Sociais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Telefone de Contato</label>
                <input 
                  type="text" 
                  value={config.phone}
                  onChange={(e) => handleUrlChange('phone', e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="(33) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">E-mail</label>
                <input 
                  type="email" 
                  value={config.email}
                  onChange={(e) => handleUrlChange('email', e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="contato@exemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Facebook (URL)</label>
                <input 
                  type="text" 
                  value={config.facebook}
                  onChange={(e) => handleUrlChange('facebook', e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="https://facebook.com/suapagina"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Instagram (URL)</label>
                <input 
                  type="text" 
                  value={config.instagram}
                  onChange={(e) => handleUrlChange('instagram', e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="https://instagram.com/seuperfil"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">WhatsApp (Apenas números com DDD)</label>
                <div className="flex gap-2 items-center">
                  <div className="bg-stone-100 px-4 py-3 rounded-xl text-stone-500 font-mono">55</div>
                  <input 
                    type="text" 
                    value={config.whatsapp.replace(/^55/, '')}
                    onChange={(e) => handleUrlChange('whatsapp', '55' + e.target.value.replace(/\D/g, ''))}
                    className="flex-grow p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="33999275984"
                  />
                </div>
                <p className="mt-2 text-xs text-stone-500">Insira apenas os números, incluindo o DDD. O código do país (55) é adicionado automaticamente.</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wider">Google Maps Embed URL (Iframe src)</label>
                <input 
                  type="text" 
                  value={config.googleMapsUrl}
                  onChange={(e) => handleUrlChange('googleMapsUrl', e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
                <p className="mt-2 text-xs text-stone-500">Vá no Google Maps, clique em Compartilhar {'>'} Incorporar um mapa e copie apenas o link dentro do atributo 'src'.</p>
              </div>
            </div>
          </div>

          {/* Gestão de Notícias */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 bg-orange-500 rounded-full" />
                Notícias e Eventos
              </h2>
              <button 
                onClick={() => setEditingNews({ date: '', title: '', category: '', desc: '', location: '' })}
                className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-700 transition-colors"
              >
                <Plus size={16} /> Nova Notícia
              </button>
            </div>
            
            <div className="space-y-4">
              {config.news?.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div>
                    <h4 className="font-bold text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-500">{item.date} - {item.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingNews(item)}
                      className="p-2 text-stone-400 hover:text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteNews(item.id)}
                      className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gestão da Loja do Associado */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 bg-amber-600 rounded-full" />
                Loja do Associado
              </h2>
              <button 
                onClick={() => setEditingStoreProduct({ name: '', desc: '', fruitImageUrl: '' })}
                className="bg-amber-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-amber-800 transition-colors"
              >
                <Plus size={16} /> Novo Produto
              </button>
            </div>
            
            <div className="space-y-4">
              {config.storeProducts?.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div>
                    <h4 className="font-bold text-stone-900">{item.name}</h4>
                    <p className="text-xs text-stone-500 truncate max-w-xs">{item.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingStoreProduct(item)}
                      className="p-2 text-stone-400 hover:text-amber-700 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteStoreProduct(item.id)}
                      className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store Product Modal */}
          {editingStoreProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              >
                <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                  <h3 className="text-xl font-bold text-stone-900">
                    {editingStoreProduct.id ? 'Editar Produto da Loja' : 'Novo Produto da Loja'}
                  </h3>
                  <button onClick={() => setEditingStoreProduct(null)} className="text-stone-400 hover:text-stone-600">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSaveStoreProduct} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Nome do Produto</label>
                    <input 
                      type="text" 
                      required
                      value={editingStoreProduct.name}
                      onChange={e => setEditingStoreProduct({...editingStoreProduct, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ex: Mel Silvestre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">URL da Imagem</label>
                    <input 
                      type="text" 
                      required
                      value={editingStoreProduct.fruitImageUrl}
                      onChange={e => setEditingStoreProduct({...editingStoreProduct, fruitImageUrl: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Descrição</label>
                    <textarea 
                      required
                      value={editingStoreProduct.desc}
                      onChange={e => setEditingStoreProduct({...editingStoreProduct, desc: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-amber-500 h-24 resize-none"
                      placeholder="Resumo do produto..."
                    />
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setEditingStoreProduct(null)}
                      className="flex-1 px-6 py-3 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-amber-700 hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> Salvar
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* News Modal */}
          {editingNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              >
                <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                  <h3 className="text-xl font-bold text-stone-900">
                    {editingNews.id ? 'Editar Notícia' : 'Nova Notícia'}
                  </h3>
                  <button onClick={() => setEditingNews(null)} className="text-stone-400 hover:text-stone-600">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSaveNews} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">Data</label>
                      <input 
                        type="text" 
                        required
                        value={editingNews.date}
                        onChange={e => setEditingNews({...editingNews, date: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 15 Abr, 2026"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-1">Categoria</label>
                      <input 
                        type="text" 
                        required
                        value={editingNews.category}
                        onChange={e => setEditingNews({...editingNews, category: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: Reunião"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Título</label>
                    <input 
                      type="text" 
                      required
                      value={editingNews.title}
                      onChange={e => setEditingNews({...editingNews, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Título da notícia"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Local</label>
                    <input 
                      type="text" 
                      required
                      value={editingNews.location}
                      onChange={e => setEditingNews({...editingNews, location: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ex: Sede da Associação"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Descrição</label>
                    <textarea 
                      required
                      value={editingNews.desc}
                      onChange={e => setEditingNews({...editingNews, desc: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                      placeholder="Resumo da notícia..."
                    />
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setEditingNews(null)}
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

          {/* Reset Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-stone-200">
            <div className="text-stone-500 text-sm italic">
              * Os uploads são salvos temporariamente no seu navegador. Para uma solução permanente e profissional, recomendo configurar o Firebase.
            </div>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-stone-600 hover:text-red-600 transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <RotateCcw size={16} />
              Restaurar Padrões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
