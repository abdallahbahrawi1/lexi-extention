import { removeStopwords } from 'stopword';

export const extractWordsFromPage = (): { word: string; memorized: boolean }[] => {
  let article: HTMLElement | string | null = document.querySelector('article');
  article = article ? article.innerText : document.body.innerText;

  let words: string[] = article
    .replace(/[^a-zA-Z ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  words = removeStopwords(words); 

  return words.map((word) => ({
    word: word.toLowerCase(),
    memorized: false,
  }));
};
