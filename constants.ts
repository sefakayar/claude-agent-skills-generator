
export const INITIAL_SKILL_DATA = {
  name: 'my-new-skill',
  description: 'Explain what this skill does and when Claude should use it.',
  instructions: 'Provide clear, step-by-step guidance for Claude.',
  examples: 'Add usage examples here.',
  resources: []
};

export const NAME_REGEX = /^[a-z0-9-]+$/;
export const MAX_NAME_LENGTH = 64;
export const MAX_DESCRIPTION_LENGTH = 1024;
