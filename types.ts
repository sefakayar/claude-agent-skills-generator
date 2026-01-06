
export interface SkillData {
  name: string;
  description: string;
  instructions: string;
  examples: string;
  resources?: string[];
}

export interface GeneratedSkill {
  markdown: string;
  yaml: string;
  fullContent: string;
}

export enum GeneratorStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
