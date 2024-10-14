
type Word = {
  word: string;
  memorized: boolean;
};

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

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.words) {
      // Get words from local storage (if they exist) and merge them with the new ones
      const storedWords: { word: string; memorized: boolean }[] = request.words || [];
      chrome.storage.local.set({ words: storedWords }, () => {
        console.log('Words saved:', storedWords);
      });
  
    sendResponse({ status: "Words received" });
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { action, text } = message;

  if (!action) {
    sendResponse({ error: 'Action is missing' });
    return true; // Indicate that the response will be sent asynchronously
  }

  let lowerCaseAction = action.toLowerCase();

  switch (lowerCaseAction) {
    case 'define': {
      sendResponse({ result: `Defining ${text}` });
      break; 
    }
    case 'translate': {
      sendResponse({ result: `Translation for ${text}` });
      break;
    }
    case 'pronounce': {
      sendResponse({ result: `Pronouncing ${text}` });
      break;
    }
    case 'save': {
      saveSentence(text)
        .then(() => {
          sendResponse({ result: `Text "${text}" saved successfully.` });
        })
        .catch((error) => {
          sendResponse({ error: `Failed to save text: ${error.message}` });
        });
      break;
    }
    default: {
      sendResponse({ error: `Unknown action: ${action}` });
      break;
    }
  }

  return true;
});
