import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as initialConfig } from '../config/site';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

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
  imageUrl?: string;
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
  logout: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('is_admin') === 'true';
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site_config');
    const baseConfig = { ...initialConfig };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure arrays and strings exist to prevent crashes
        const merged = { ...baseConfig, ...parsed };
        merged.products = Array.isArray(merged.products) ? merged.products : baseConfig.products;
        merged.storeProducts = Array.isArray(merged.storeProducts) ? merged.storeProducts : baseConfig.storeProducts;
        merged.news = Array.isArray(merged.news) ? merged.news : baseConfig.news;
        merged.whatsapp = typeof merged.whatsapp === 'string' ? merged.whatsapp : baseConfig.whatsapp;
        return merged;
      } catch (e) {
        console.error('Error parsing saved config:', e);
        return baseConfig;
      }
    }
    return baseConfig;
  });

  // Test Firestore connection
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
        }
      }
    }
    testConnection();
  }, []);

  // Sync config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('site_config', JSON.stringify(config));
    } catch (e) {
      console.error('Error saving config to localStorage:', e);
    }
  }, [config]);

  // Listen for Firestore changes
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'main'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SiteConfig;
        setConfig(prev => ({ ...prev, ...data }));
      }
    }, (error) => {
      console.error('Firestore sync error:', error);
    });

    return () => unsub();
  }, []);

  // Sync admin state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('is_admin', isAdmin.toString());
    } catch (e) {
      console.error('Error saving admin state to localStorage:', e);
    }
  }, [isAdmin]);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    
    // If admin, also update Firestore
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'settings', 'main'), updatedConfig);
      } catch (error) {
        console.error('Error updating Firestore:', error);
      }
    }
  };

  const resetConfig = async () => {
    try {
      localStorage.removeItem('site_config');
      setConfig(initialConfig);
      if (isAdmin) {
        await setDoc(doc(db, 'settings', 'main'), initialConfig);
      }
    } catch (e) {
      console.error('Error resetting config:', e);
      setConfig(initialConfig);
    }
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('is_admin');
    } catch (e) {
      console.error('Error during logout:', e);
    }
  };

  return (
    <SettingsContext.Provider value={{ config, isAdmin, setIsAdmin, updateConfig, resetConfig, logout }}>
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
