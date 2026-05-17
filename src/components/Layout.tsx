import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PhoneCall, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#F5F2ED] font-sans text-[#1A2A1E] pb-20 sm:pb-0 sm:p-4 md:p-8 flex items-start justify-center">
      <div className="w-full max-w-6xl mx-auto bg-white min-h-screen sm:min-h-[85vh] sm:h-auto sm:rounded-3xl sm:shadow-2xl sm:overflow-hidden relative flex flex-col sm:border sm:border-[#E0Dcd0]">
        
        {/* Header */}
        <header className="px-5 py-6 border-b border-[#E0Dcd0] flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40">
          <div className="flex items-center gap-3">
            {!isHome && (
              <button 
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full hover:bg-[#F5F2ED] transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-[#1A2A1E]" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <img 
                src="https://lh3.googleusercontent.com/d/199qhSLID1uGmeEHeyXCPGNm8RcaOgttP" 
                alt="AlignCare Logo"
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-fallback" className="w-10 h-10 bg-[#1A2A1E] rounded-full hidden items-center justify-center">
                <div className="w-5 h-5 border-2 border-white rounded-full"></div>
              </div>
              <div className="mt-1">
                <h1 className="text-2xl font-serif tracking-tight text-[#1A2A1E] leading-none mb-1">
                  AlignCare
                </h1>
                {isHome && (
                  <p className="text-[0.6rem] font-bold text-[#636E72] uppercase tracking-[0.2em]">Kolkata Home Physiotherapy</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-4 py-2 rounded-full border border-[#E0Dcd0] text-xs font-bold tracking-widest text-[#1A2A1E] hover:bg-[#F5F2ED] transition-colors shadow-sm uppercase"
            >
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>
        </header>

        {/* Emergency Float (visible on all screens) */}
        <a 
          href="tel:+9109051700147"
          className="fixed sm:absolute bottom-6 right-6 w-14 h-14 rounded-full bg-[#1A2A1E] text-[#F5F2ED] shadow-xl hover:bg-[#2A3C31] transition-colors z-50 flex items-center justify-center"
        >
          <PhoneCall className="w-6 h-6" />
        </a>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
