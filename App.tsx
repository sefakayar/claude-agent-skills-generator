import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { SkillForm } from './components/SkillForm';
import { SkillPreview } from './components/SkillPreview';
import { SkillData, GeneratorStatus } from './types';
import { generateSkillContent } from './services/geminiService';
import { useLanguage } from './i18n/LanguageContext';
import { Zap, BookOpen, Layers, Lightbulb, ShieldCheck, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<GeneratorStatus>(GeneratorStatus.IDLE);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: SkillData) => {
    setStatus(GeneratorStatus.LOADING);
    setError(null);
    try {
      const result = await generateSkillContent(data, language);
      setGeneratedContent(result);
      setStatus(GeneratorStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError(t.errors.generateFailed);
      setStatus(GeneratorStatus.ERROR);
    }
  };

  return (
    <Layout>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Info - Hidden on mobile */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block">
          <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> {t.sidebar.architecture}
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <p className="text-xs font-bold text-stone-800">{t.sidebar.metadata}</p>
                  <p className="text-[10px] text-stone-500">{t.sidebar.metadataDesc}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <p className="text-xs font-bold text-stone-800">{t.sidebar.instructions}</p>
                  <p className="text-[10px] text-stone-500">{t.sidebar.instructionsDesc}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <p className="text-xs font-bold text-stone-800">{t.sidebar.resources}</p>
                  <p className="text-[10px] text-stone-500">{t.sidebar.resourcesDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> {t.sidebar.proTip}
            </h3>
            <p className="text-[11px] text-stone-600 leading-relaxed italic">
              "{t.sidebar.proTipText}"
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="lg:col-span-9 space-y-8">
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-stone-900">{t.main.title}</h2>
              <p className="text-stone-500 mt-1">{t.main.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SkillForm onSubmit={handleGenerate} isLoading={status === GeneratorStatus.LOADING} />
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                  </div>
                )}
              </div>

              <div className="h-[600px] flex flex-col">
                {status === GeneratorStatus.IDLE && (
                  <div className="flex-grow border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-stone-50/50">
                    <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-stone-400" />
                    </div>
                    <h3 className="font-bold text-stone-800">{t.main.waitingTitle}</h3>
                    <p className="text-stone-500 text-sm mt-2 max-w-[240px]">
                      {t.main.waitingText}
                    </p>
                  </div>
                )}

                {status === GeneratorStatus.LOADING && (
                  <div className="flex-grow border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center animate-pulse">
                    <div className="w-16 h-16 bg-stone-900/10 rounded-full flex items-center justify-center mb-4">
                      <Layers className="w-8 h-8 text-stone-400" />
                    </div>
                    <h3 className="font-bold text-stone-800">{t.main.loadingTitle}</h3>
                    <p className="text-stone-500 text-sm mt-2">
                      {t.main.loadingText}
                    </p>
                  </div>
                )}

                {(status === GeneratorStatus.SUCCESS || status === GeneratorStatus.ERROR) && generatedContent && (
                  <SkillPreview content={generatedContent} />
                )}
              </div>
            </div>
          </section>

          {/* Guidelines Section */}
          <section className="grid md:grid-cols-3 gap-6 pt-12 border-t border-stone-200">
            <div className="p-5 bg-white rounded-xl border border-stone-100 shadow-sm">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-2">{t.guidelines.security.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t.guidelines.security.text}
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-stone-100 shadow-sm">
              <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-2">{t.guidelines.workflow.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t.guidelines.workflow.text}
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-stone-100 shadow-sm">
              <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-2">{t.guidelines.code.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t.guidelines.code.text}
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default App;
