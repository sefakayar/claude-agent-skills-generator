import React from 'react';
import { Cpu, BookOpen, ShieldCheck, Terminal } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-200 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-stone-900 p-2 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">{t.header.title}</h1>
              <p className="text-xs text-stone-500 font-medium">{t.header.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">{t.header.nav.documentation}</a>
              <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">{t.header.nav.bestPractices}</a>
              <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">{t.header.nav.templates}</a>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-stone-50 border-t border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4 text-stone-400">
            <BookOpen className="w-5 h-5 cursor-help hover:text-stone-600" />
            <ShieldCheck className="w-5 h-5 cursor-help hover:text-stone-600" />
            <Terminal className="w-5 h-5 cursor-help hover:text-stone-600" />
          </div>
          <p className="text-sm text-stone-500">
            {t.footer.text}
          </p>
        </div>
      </footer>
    </div>
  );
};
