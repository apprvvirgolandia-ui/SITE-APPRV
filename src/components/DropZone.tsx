import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
  currentImageUrl?: string;
  label: string;
  accept?: string;
}

export default function DropZone({ onFileSelect, isUploading, currentImageUrl, label, accept = "image/*" }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest">{label}</label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative group cursor-pointer overflow-hidden
          border-2 border-dashed rounded-2xl transition-all duration-300
          flex flex-col items-center justify-center p-6 min-h-[180px]
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-100/50'}
          ${isUploading ? 'pointer-events-none opacity-80' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="text-primary animate-spin" size={24} />
              </div>
              <p className="text-sm font-bold text-primary animate-pulse">Enviando imagem...</p>
            </motion.div>
          ) : currentImageUrl ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentImageUrl}
                alt="Preview"
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all bg-white text-stone-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                  <Upload size={14} /> Alterar Imagem
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Upload size={24} />
              </div>
              <p className="text-sm font-bold text-stone-700 mb-1">Arraste ou clique para enviar</p>
              <p className="text-xs text-stone-400">PNG, JPG ou WEBP até 5MB</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Overlay */}
        <AnimatePresence>
          {!isUploading && currentImageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg"
            >
              <CheckCircle2 size={14} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
