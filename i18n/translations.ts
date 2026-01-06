export type Language = 'tr' | 'en';

export const translations = {
  tr: {
    // Header
    header: {
      title: 'Claude Code Skill Oluşturucu',
      subtitle: 'Modüler AI Yetenek Mimarı',
      nav: {
        documentation: 'Dokümantasyon',
        bestPractices: 'En İyi Uygulamalar',
        templates: 'Şablonlar'
      }
    },
    // Sidebar
    sidebar: {
      architecture: 'Mimari',
      metadata: 'Metadata',
      metadataDesc: 'YAML başlangıçta keşif için yüklenir.',
      instructions: 'Talimatlar',
      instructionsDesc: 'SKILL.md tetiklendiğinde context\'e yüklenir.',
      resources: 'Kaynaklar',
      resourcesDesc: 'Script/Şablonlar gerektiğinde bash ile yüklenir.',
      proTip: 'Pro İpucu',
      proTipText: 'Skill\'ler isteğe bağlı yüklenir. Bu \'kademeli açıklama\' yaklaşımı, Claude\'u uzmanlaştırırken token maliyetini minimize eder.'
    },
    // Main
    main: {
      title: 'Skill Mimarı',
      subtitle: 'Claude Code için profesyonel Agent Skill\'leri tasarlayın, doğrulayın ve oluşturun.',
      waitingTitle: 'Tasarım Bekleniyor',
      waitingText: 'Soldaki formu doldurup oluştur butonuna tıklayarak SKILL.md dosyanızı görün.',
      loadingTitle: 'Skill Oluşturuluyor',
      loadingText: 'Gemini talimatları düzenliyor ve skill metadata\'nızı biçimlendiriyor...'
    },
    // Form
    form: {
      selectTemplate: 'Şablon Seç',
      skillName: 'Skill Adı',
      skillNameTooltip: 'Sadece küçük harf, rakam ve tire kullanılabilir.',
      skillNamePlaceholder: 'örn: veri-isleme',
      description: 'Açıklama (Seviye 1: Metadata)',
      descriptionPlaceholder: 'Bu skill ne yapar ve Claude ne zaman tetiklemeli?',
      instructions: 'Talimatlar (Seviye 2: İçerik)',
      instructionsPlaceholder: 'Detaylı iş akışları ve adım adım rehberlik...',
      examples: 'Kullanım Örnekleri',
      examplesPlaceholder: 'Claude\'a bu skill\'i nasıl kullanacağını gösterin...',
      generateButton: 'Profesyonel SKILL.md Oluştur',
      errors: {
        nameRequired: 'Skill adı zorunludur.',
        nameInvalid: 'Ad sadece küçük harf, rakam ve tire içerebilir.',
        nameTooLong: 'Ad {max} karakterden kısa olmalıdır.',
        descriptionRequired: 'Açıklama zorunludur.',
        descriptionTooLong: 'Açıklama {max} karakterden kısa olmalıdır.'
      }
    },
    // Preview
    preview: {
      source: 'Kaynak',
      preview: 'Önizleme',
      copyToClipboard: 'Panoya kopyala',
      download: 'SKILL.md İndir'
    },
    // Guidelines
    guidelines: {
      security: {
        title: 'Güvenlik Öncelikli',
        text: 'Tüm scriptleri inceleyin. Kötü niyetli skill\'ler Claude\'un araçları kötüye kullanmasına veya hassas verileri sızdırmasına neden olabilir.'
      },
      workflow: {
        title: 'İş Akışı Oluşturun',
        text: 'Skill\'ler diğer dosyaları çağırabilir. SKILL.md\'yi odaklı ve verimli tutmak için FORMS.md veya REFERENCE.md kullanın.'
      },
      code: {
        title: 'Kod Mantığı',
        text: 'Karmaşık deterministik görevleri Python scriptlerine taşıyın. Claude bunları güvenilirlik için bash ile çalıştırır.'
      }
    },
    // Footer
    footer: {
      text: 'Claude Code için tasarlandı. Anthropic\'in Agent Skills mimarisinden ilham alındı.'
    },
    // Errors
    errors: {
      generateFailed: 'Skill oluşturulamadı. Lütfen API anahtarınızın aktif ve geçerli olduğundan emin olun.'
    },
    // Templates
    templates: {
      empty: 'Boş Şablon',
      skillCreator: 'Skill Oluşturucu',
      pdfEditor: 'PDF Düzenleyici',
      dataAnalyzer: 'Veri Analisti',
      gitWorkflow: 'Git İş Akışı',
      apiIntegrator: 'API Entegratörü',
      codeReviewer: 'Kod İnceleyici'
    }
  },
  en: {
    // Header
    header: {
      title: 'Claude Code Skill Generator',
      subtitle: 'Modular AI Capability Architect',
      nav: {
        documentation: 'Documentation',
        bestPractices: 'Best Practices',
        templates: 'Templates'
      }
    },
    // Sidebar
    sidebar: {
      architecture: 'Architecture',
      metadata: 'Metadata',
      metadataDesc: 'YAML loaded at startup for discovery.',
      instructions: 'Instructions',
      instructionsDesc: 'SKILL.md loaded into context when triggered.',
      resources: 'Resources',
      resourcesDesc: 'Scripts/Templates loaded via bash as needed.',
      proTip: 'Pro Tip',
      proTipText: 'Skills load on-demand. This \'progressive disclosure\' approach minimizes token costs while keeping Claude highly specialized.'
    },
    // Main
    main: {
      title: 'Skill Architect',
      subtitle: 'Design, validate, and generate professional Agent Skills for Claude Code.',
      waitingTitle: 'Waiting for Design',
      waitingText: 'Enter your skill details on the left and click generate to see your SKILL.md.',
      loadingTitle: 'Synthesizing Logic',
      loadingText: 'Gemini is refining instructions and formatting your skill metadata...'
    },
    // Form
    form: {
      selectTemplate: 'Select Template',
      skillName: 'Skill Name',
      skillNameTooltip: 'Lowercase letters, numbers, and hyphens only.',
      skillNamePlaceholder: 'e.g. data-processing',
      description: 'Description (Level 1: Metadata)',
      descriptionPlaceholder: 'What does this skill do and when should Claude trigger it?',
      instructions: 'Instructions (Level 2: Content)',
      instructionsPlaceholder: 'Detailed workflows and step-by-step guidance...',
      examples: 'Usage Examples',
      examplesPlaceholder: 'Show Claude how to use this skill...',
      generateButton: 'Generate Professional SKILL.md',
      errors: {
        nameRequired: 'Skill name is required.',
        nameInvalid: 'Name must only contain lowercase letters, numbers, and hyphens.',
        nameTooLong: 'Name must be under {max} characters.',
        descriptionRequired: 'Description is required.',
        descriptionTooLong: 'Description must be under {max} characters.'
      }
    },
    // Preview
    preview: {
      source: 'Source',
      preview: 'Preview',
      copyToClipboard: 'Copy to clipboard',
      download: 'Download SKILL.md'
    },
    // Guidelines
    guidelines: {
      security: {
        title: 'Security First',
        text: 'Review all scripts. Malicious skills can direct Claude to misuse tools or leak sensitive data.'
      },
      workflow: {
        title: 'Compose Workflow',
        text: 'Skills can call other files. Use FORMS.md or REFERENCE.md to keep SKILL.md focused and efficient.'
      },
      code: {
        title: 'Code Logic',
        text: 'Move complex deterministic tasks to Python scripts. Claude runs them via bash for reliability.'
      }
    },
    // Footer
    footer: {
      text: 'Designed for Claude Code. Inspired by Anthropic\'s Agent Skills Architecture.'
    },
    // Errors
    errors: {
      generateFailed: 'Failed to generate skill. Please ensure your API key is active and valid.'
    },
    // Templates
    templates: {
      empty: 'Empty Template',
      skillCreator: 'Skill Creator',
      pdfEditor: 'PDF Editor',
      dataAnalyzer: 'Data Analyzer',
      gitWorkflow: 'Git Workflow',
      apiIntegrator: 'API Integrator',
      codeReviewer: 'Code Reviewer'
    }
  }
};

export type Translations = typeof translations.tr;
