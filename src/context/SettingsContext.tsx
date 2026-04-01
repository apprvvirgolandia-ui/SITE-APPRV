import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as initialConfig } from '../config/site';

interface Product {
  id: string;
  name: string;
  desc: string;
  fruitImageUrl: string;
  pulpImageUrl: string;
}

interface NewsItem {
  id: string;
  date: string;
  title: string;
  category: string;
  desc: string;
  location: string;
}

interface SiteConfig {
  name: string;
  shortName: string;
  cnpj: string;
  foundationDate: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  googleMapsUrl: string;
  logoUrl: string;
  pulpLogoUrl: string;
  pulpLogoSecondaryUrl: string;
  pulpLogoCircularUrl: string;
  partnerLogoUrl: string;
  products: Product[];
  storeProducts: Product[];
  news: NewsItem[];
}

interface SettingsContextType {
  config: SiteConfig;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('is_admin') === 'true';
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge initialConfig with parsed to ensure new default fields are present
        return { ...initialConfig, ...parsed };
      } catch (e) {
        console.error('Error parsing saved config:', e);
        return initialConfig;
      }
    }
    return initialConfig;
  });

  useEffect(() => {
    localStorage.setItem('site_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('is_admin', isAdmin.toString());
  }, [isAdmin]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(initialConfig);
  };

  return (
    <SettingsContext.Provider value={{ config, isAdmin, setIsAdmin, updateConfig, resetConfig }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
