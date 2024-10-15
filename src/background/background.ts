import { Word } from "../types/types";

const saveWord = (wordObj: Word) => {
  return new Promise<void>((resolve) => {
    chrome.storage.local.get(['savedWords'], (result) => {
      let savedWords = result.savedWords || [];
      // Check if the word already exists
      if (!savedWords.some((w: Word) => w.word === wordObj.word)) {
        // Add the new word if it doesn't exist
        savedWords.push(wordObj);
        chrome.storage.local.set({ savedWords }, () => {
          resolve();
        });
      } else {
        resolve(); // Word already exists, resolve immediately
      }
    });
  });
};


const saveSentence = (sentence: string) => {
  const wordsArray = sentence.split(/\s+/).map((word) => ({
    word,
    memorized: false
  }));

  return Promise.all(wordsArray.map(saveWord));
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.words) {
    const storedWords = request.words || [];
    chrome.storage.local.set({ words: storedWords }, () => {
      console.log('Words saved:', storedWords);
      sendResponse({ status: "Words received" });  // Send the response back
    });

    return true; // Indicate async response
  } else {
    sendResponse({ error: "No words in request" });
  }
  return true;  // Always indicate async response
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { action, text } = message;

  if (!action) {
    sendResponse({ error: 'Action is missing' });
    return true; 
  }

  const lowerCaseAction = action.toLowerCase();
  try {
    const result = await handleAction(lowerCaseAction, text);
    sendResponse({ result });
  } catch (error) {
    sendResponse({ error: error.message });
  }

  return true; // Indicate that the response will be sent asynchronously
});

const handleAction = async (action, text) => {
  switch (action) {
    case 'define':
      return defineText(text);
    case 'translate':
      return translateText(text);
    case 'pronounce':
      return pronounceText(text);
    case 'save':
      return saveSentence(text);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

const defineText = (text) => {
  return `Defining ${text}`;
};

const translateText = (text) => {
  return `Translation for ${text}`;
};

const pronounceText = (text) => {
  return `Pronouncing ${text}`;
};

