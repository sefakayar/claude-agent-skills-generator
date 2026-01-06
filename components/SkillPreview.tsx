import React, { useState } from 'react';
import { Copy, Download, Check, FileCode, Eye } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  content: string;
}

export const SkillPreview: React.FC<Props> = ({ content }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'code' | 'preview'>('code');

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SKILL.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
        <div className="flex bg-stone-200 p-0.5 rounded-lg">
          <button
            onClick={() => setView('code')}
            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              view === 'code' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            {t.preview.source}
          </button>
          <button
            onClick={() => setView('preview')}
            className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              view === 'preview' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {t.preview.preview}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-md transition-all"
            title={t.preview.copyToClipboard}
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-md transition-all"
            title={t.preview.download}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-6 bg-stone-50/30">
        {view === 'code' ? (
          <pre className="mono text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
            {content}
          </pre>
        ) : (
          <div className="prose prose-stone max-w-none prose-sm">
            <div className="whitespace-pre-wrap font-sans text-stone-800 leading-relaxed">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
