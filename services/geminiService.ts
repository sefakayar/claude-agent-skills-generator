import { GoogleGenAI } from "@google/genai";
import { SkillData } from "../types";
import { Language } from "../i18n/translations";

const getPrompt = (data: SkillData, language: Language): string => {
  if (language === 'tr') {
    return `
    Claude Code için Agent Skill oluşturan kıdemli bir AI Mühendisi olarak davran.
    Aşağıdaki kullanıcı girdisine dayanarak profesyonel bir SKILL.md içeriği oluştur ve geliştir.

    Skill Adı: ${data.name}
    Açıklama: ${data.description}
    Talimatlar: ${data.instructions}
    Örnekler: ${data.examples}

    Kesin Gereksinimler:
    1. En üste YAML frontmatter ekle, tam olarak şu formatta:
       ---
       name: ${data.name}
       description: [Açıklamanın geliştirilmiş profesyonel versiyonu - Türkçe]
       ---
    2. Açıklama 1024 karakterden kısa olmalı ve XML etiketi içermemeli.
    3. İçerik standart Agent Skills yapısını takip etmeli: # Başlık, ## Hızlı Başlangıç, ## Talimatlar, ## Örnekler.
    4. Profesyonel ve teknik bir ton kullan.
    5. Bu skill için faydalı olacak Seviye 3 kaynakları öner (scripts/, references/, assets/ klasörlerindeki placeholder dosyalar).
    6. Markdown temiz olmalı ve kademeli açıklama (progressive disclosure) prensiplerini takip etmeli.
    7. Tüm çıktı TÜRKÇE olmalı.

    SADECE SKILL.md dosyasının son içeriğini çıktı olarak ver.
  `;
  }

  return `
    Act as a senior AI Engineer specializing in Claude Code Agent Skills.
    Refine and generate a professional SKILL.md content based on the following user input.

    Skill Name: ${data.name}
    Initial Description: ${data.description}
    Instructions: ${data.instructions}
    Examples: ${data.examples}

    Strict Requirements:
    1. Include the YAML frontmatter at the top exactly as:
       ---
       name: ${data.name}
       description: [Refined professional version of the description]
       ---
    2. The description must be under 1024 characters and no XML tags.
    3. The body must follow standard Agent Skills structure: # Title, ## Quick Start, ## Instructions, ## Examples.
    4. Use professional technical tone.
    5. Suggest Level 3 resources (placeholder scripts or reference files in scripts/, references/, assets/) that would be useful for this specific skill.
    6. Ensure the Markdown is clean and follows progressive disclosure principles.
    7. All output must be in ENGLISH.

    Output ONLY the final content of the SKILL.md file.
  `;
};

export const generateSkillContent = async (data: SkillData, language: Language = 'en'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = getPrompt(data, language);

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      temperature: 0.7,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  return response.text || "";
};
