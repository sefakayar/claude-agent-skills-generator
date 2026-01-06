# Claude Code Skill Generator

Claude Code için SKILL.md dosyaları oluşturan web uygulaması.

## Ne İşe Yarıyor?

Claude Code'a özel yetenekler (skill) eklemek için gereken SKILL.md dosyalarını otomatik oluşturur. Form doldur, Gemini API ile profesyonel bir skill dosyası al.

## Özellikler

- Türkçe / İngilizce arayüz
- 6 hazır skill şablonu (PDF Editor, Data Analyzer, Git Workflow, vb.)
- Gemini API ile otomatik SKILL.md oluşturma
- Kopyala / İndir butonları

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyasına API key ekle
API_KEY=senin_gemini_api_keyin

# Çalıştır
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine git.

## Gemini API Key Alma

1. https://aistudio.google.com/apikey adresine git
2. "Create API Key" tıkla
3. Key'i `.env.local` dosyasına yapıştır

## Teknolojiler

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Gemini API

## Skill Nedir?

Claude Code'da skill'ler, Claude'un belirli görevlerde uzmanlaşmasını sağlayan modüler paketlerdir. Her skill bir SKILL.md dosyası içerir:

```
skill-name/
├── SKILL.md          # Ana talimat dosyası
├── scripts/          # Python/Bash scriptleri
├── references/       # Referans dökümanlar
└── assets/           # Şablonlar, görseller
```

## Lisans

MIT
