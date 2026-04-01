import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Products from './pages/Products';
import Store from './pages/Store';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/loja" element={<Store />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/admin" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </SettingsProvider>
  );
}
