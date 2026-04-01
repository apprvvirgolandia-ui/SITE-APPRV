import { Link } from 'react-router-dom';
import { Menu, X, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { config, isAdmin } = useSettings();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Polpas', path: '/produtos' },
    { name: 'Loja do Associado', path: '/loja' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              {config.logoUrl && (
                <div className="bg-white p-1 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={config.logoUrl} 
                    alt="Logo APPRV" 
                    className="h-14 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-primary text-sm sm:text-base leading-tight uppercase">{config.shortName}</span>
                <span className="text-xs text-stone-500 font-medium italic">Virgolândia - MG</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-stone-600 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="p-2 text-stone-400 hover:text-primary transition-colors"
                title="Painel Admin"
              >
                <SettingsIcon size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-primary p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-stone-600 hover:bg-stone-50 hover:text-primary font-medium rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
