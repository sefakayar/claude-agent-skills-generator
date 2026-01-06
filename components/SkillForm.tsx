import React, { useState, useMemo } from 'react';
import { SkillData } from '../types';
import { NAME_REGEX, MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { AlertCircle, Wand2, Info, LayoutTemplate } from 'lucide-react';

interface Props {
  onSubmit: (data: SkillData) => void;
  isLoading: boolean;
}

interface TemplateContent {
  description: { tr: string; en: string };
  instructions: { tr: string; en: string };
  examples: { tr: string; en: string };
}

const templateContents: Record<string, TemplateContent> = {
  'skill-creator': {
    description: {
      tr: 'Etkili skill\'ler oluşturmak için rehber. Bu skill, kullanıcılar Claude\'un yeteneklerini uzmanlaşmış bilgi, iş akışları veya araç entegrasyonlarıyla genişleten yeni bir skill oluşturmak istediğinde kullanılmalıdır.',
      en: 'Guide for creating effective skills. This skill should be used when users want to create a new skill that extends Claude\'s capabilities with specialized knowledge, workflows, or tool integrations.'
    },
    instructions: {
      tr: '1. Somut örneklerle skill\'i anlama\n2. Yeniden kullanılabilir skill içeriklerini planlama\n3. Skill\'i başlatma (init_skill.py scripti ile)\n4. SKILL.md ve kaynakları düzenleme\n5. Skill\'i paketleme ve dağıtma',
      en: '1. Understand the skill with concrete examples\n2. Plan reusable skill contents\n3. Initialize the skill (with init_skill.py script)\n4. Edit SKILL.md and resources\n5. Package and distribute the skill'
    },
    examples: {
      tr: 'Kullanıcı: "PDF düzenleyici skill\'i oluşturmama yardım et"\nClaude: [skill-creator kullanarak rehberlik sağlar]',
      en: 'User: "Help me create a PDF editor skill"\nClaude: [Uses skill-creator to provide guidance]'
    }
  },
  'pdf-editor': {
    description: {
      tr: 'PDF dosyalarını düzenlemek, döndürmek, birleştirmek ve bölmek için kullanılır. Bu skill, kullanıcılar PDF dosyaları üzerinde manipülasyon işlemleri yapmak istediğinde tetiklenmelidir.',
      en: 'Used to edit, rotate, merge, and split PDF files. This skill should be triggered when users want to perform manipulation operations on PDF files.'
    },
    instructions: {
      tr: '1. Kullanıcının PDF dosyasını al\n2. İstenen işlemi belirle (döndürme, birleştirme, bölme)\n3. scripts/rotate_pdf.py veya scripts/merge_pdf.py kullan\n4. İşlenmiş PDF\'i kullanıcıya sun',
      en: '1. Get the user\'s PDF file\n2. Determine the desired operation (rotate, merge, split)\n3. Use scripts/rotate_pdf.py or scripts/merge_pdf.py\n4. Present the processed PDF to the user'
    },
    examples: {
      tr: 'Kullanıcı: "Bu PDF\'i 90 derece döndür"\nClaude: [pdf-editor skill\'ini kullanarak döndürme yapar]',
      en: 'User: "Rotate this PDF 90 degrees"\nClaude: [Uses pdf-editor skill to rotate]'
    }
  },
  'data-analyzer': {
    description: {
      tr: 'CSV, JSON veya Excel veri setleri üzerinde istatistiksel analiz yapmak için kullanılır. Bu skill, kullanıcılar veri analizi veya rapor oluşturmak istediğinde tetiklenmelidir.',
      en: 'Used to perform statistical analysis on CSV, JSON, or Excel datasets. This skill should be triggered when users want data analysis or report generation.'
    },
    instructions: {
      tr: '1. Veri dosyasını pandas ile yükle\n2. Eksik değerleri ve aykırı değerleri tespit et\n3. Temel istatistikleri hesapla\n4. Görselleştirmeler oluştur\n5. Özet rapor sun',
      en: '1. Load data file with pandas\n2. Detect missing and outlier values\n3. Calculate basic statistics\n4. Create visualizations\n5. Present summary report'
    },
    examples: {
      tr: 'Kullanıcı: "Bu satış verilerini analiz et"\nClaude: [data-analyzer kullanarak analiz yapar]',
      en: 'User: "Analyze this sales data"\nClaude: [Uses data-analyzer to analyze]'
    }
  },
  'git-workflow': {
    description: {
      tr: 'Git versiyon kontrol işlemlerini yönetmek için kullanılır. Bu skill, commit, branch, merge işlemleri için tetiklenmelidir.',
      en: 'Used to manage Git version control operations. This skill should be triggered for commit, branch, merge operations.'
    },
    instructions: {
      tr: '1. Mevcut repo durumunu kontrol et\n2. Değişiklikleri incele\n3. Anlamlı commit mesajları oluştur\n4. Branch stratejisini uygula',
      en: '1. Check current repo status\n2. Review changes\n3. Create meaningful commit messages\n4. Apply branch strategy'
    },
    examples: {
      tr: 'Kullanıcı: "Bu değişiklikleri commit et"\nClaude: [git-workflow kullanarak commit oluşturur]',
      en: 'User: "Commit these changes"\nClaude: [Uses git-workflow to create commit]'
    }
  },
  'api-integrator': {
    description: {
      tr: 'REST API\'leri entegre etmek ve test etmek için kullanılır. Bu skill, harici API\'lerle çalışmak istediğinde tetiklenmelidir.',
      en: 'Used to integrate and test REST APIs. This skill should be triggered when working with external APIs.'
    },
    instructions: {
      tr: '1. API dokümantasyonunu incele\n2. Authentication yöntemini belirle\n3. Endpoint\'leri test et\n4. Hata yönetimi ekle',
      en: '1. Review API documentation\n2. Determine authentication method\n3. Test endpoints\n4. Add error handling'
    },
    examples: {
      tr: 'Kullanıcı: "Stripe API\'sini entegre et"\nClaude: [api-integrator kullanarak entegrasyon yapar]',
      en: 'User: "Integrate Stripe API"\nClaude: [Uses api-integrator for integration]'
    }
  },
  'code-reviewer': {
    description: {
      tr: 'Kod kalitesini incelemek ve iyileştirme önerileri sunmak için kullanılır. Kod review veya refactoring önerileri için tetiklenmelidir.',
      en: 'Used to review code quality and provide improvement suggestions. Should be triggered for code review or refactoring suggestions.'
    },
    instructions: {
      tr: '1. Kodu oku ve anla\n2. Güvenlik açıklarını kontrol et\n3. Performans sorunlarını tespit et\n4. İyileştirme önerileri sun',
      en: '1. Read and understand code\n2. Check for security vulnerabilities\n3. Detect performance issues\n4. Provide improvement suggestions'
    },
    examples: {
      tr: 'Kullanıcı: "Bu fonksiyonu review et"\nClaude: [code-reviewer kullanarak inceleme yapar]',
      en: 'User: "Review this function"\nClaude: [Uses code-reviewer to review]'
    }
  }
};

const getSkillTemplates = (t: any, language: Language) => [
  { id: 'empty', label: t.templates.empty, name: '', description: '', instructions: '', examples: '' },
  { id: 'skill-creator', label: t.templates.skillCreator, name: 'skill-creator', ...getContent('skill-creator', language) },
  { id: 'pdf-editor', label: t.templates.pdfEditor, name: 'pdf-editor', ...getContent('pdf-editor', language) },
  { id: 'data-analyzer', label: t.templates.dataAnalyzer, name: 'data-analyzer', ...getContent('data-analyzer', language) },
  { id: 'git-workflow', label: t.templates.gitWorkflow, name: 'git-workflow', ...getContent('git-workflow', language) },
  { id: 'api-integrator', label: t.templates.apiIntegrator, name: 'api-integrator', ...getContent('api-integrator', language) },
  { id: 'code-reviewer', label: t.templates.codeReviewer, name: 'code-reviewer', ...getContent('code-reviewer', language) }
];

const getContent = (id: string, language: Language) => {
  const content = templateContents[id];
  return {
    description: content.description[language],
    instructions: content.instructions[language],
    examples: content.examples[language]
  };
};

export const SkillForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const { t, language } = useLanguage();
  const skillTemplates = useMemo(() => getSkillTemplates(t, language), [t, language]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('empty');
  const [formData, setFormData] = useState<SkillData>({
    name: '',
    description: '',
    instructions: '',
    examples: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = skillTemplates.find(tmp => tmp.id === templateId);
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        instructions: template.instructions,
        examples: template.examples
      });
      setErrors({});
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = t.form.errors.nameRequired;
    } else if (!NAME_REGEX.test(formData.name)) {
      newErrors.name = t.form.errors.nameInvalid;
    }
    if (formData.name.length > MAX_NAME_LENGTH) {
      newErrors.name = t.form.errors.nameTooLong.replace('{max}', String(MAX_NAME_LENGTH));
    }
    if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.description = t.form.errors.descriptionTooLong.replace('{max}', String(MAX_DESCRIPTION_LENGTH));
    }
    if (!formData.description.trim()) {
      newErrors.description = t.form.errors.descriptionRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-stone-700 flex items-center gap-1.5">
          <LayoutTemplate className="w-4 h-4 text-amber-500" />
          {t.form.selectTemplate}
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none text-sm bg-white"
        >
          {skillTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-stone-100 pt-4 space-y-2">
        <label className="text-sm font-semibold text-stone-700 flex items-center gap-1.5">
          {t.form.skillName}
          <span className="text-stone-400 group relative">
            <Info className="w-4 h-4 cursor-help" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-stone-900 text-white text-[10px] rounded shadow-lg z-10">
              {t.form.skillNameTooltip}
            </span>
          </span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none mono text-sm transition-all ${
            errors.name ? 'border-red-500 bg-red-50' : 'border-stone-200'
          }`}
          placeholder={t.form.skillNamePlaceholder}
        />
        {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-stone-700">{t.form.description}</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none text-sm transition-all ${
            errors.description ? 'border-red-500 bg-red-50' : 'border-stone-200'
          }`}
          placeholder={t.form.descriptionPlaceholder}
        />
        <div className="flex justify-between items-center">
          {errors.description && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description}</p>}
          <span className={`text-[10px] ml-auto font-medium ${formData.description.length > MAX_DESCRIPTION_LENGTH ? 'text-red-500' : 'text-stone-400'}`}>
            {formData.description.length} / {MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-stone-700">{t.form.instructions}</label>
        <textarea
          rows={5}
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none text-sm"
          placeholder={t.form.instructionsPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-stone-700">{t.form.examples}</label>
        <textarea
          rows={3}
          value={formData.examples}
          onChange={(e) => setFormData({ ...formData, examples: e.target.value })}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none text-sm"
          placeholder={t.form.examplesPlaceholder}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-stone-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            {t.form.generateButton}
          </>
        )}
      </button>
    </form>
  );
};
