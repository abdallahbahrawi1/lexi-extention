export interface Word {
  definition: string | void;
  word: string;
  saved?: boolean; 
  memorized?: boolean;
}

export enum ActionType {
  DEFINE = 'Define',
  TRANSLATE = 'Translate',
  SUMMARIZE = 'Summarize',
  EXPLAIN = 'Explain',
  SAVE = 'Save',
  COPY = 'Copy',
  SAVEEXTRACTEDWORDS = 'SaveExtractedWords'
}