import { Word } from "../types/types";
import { ActionType } from "../types/types";

const saveWord = (wordObj: Word): void => {
  try {
    chrome.storage.local.get(['savedWords'], (result) => {
      let savedWords = result.savedWords || [];
      
      // Check if the word already exists
      if (!savedWords.some((w: Word) => w.word === wordObj.word)) {
        // Add the new word first
        savedWords.push(wordObj);
        chrome.storage.local.set({ savedWords }, async () => {
          try {
            // Fetch the definition after saving
            const definition = await handleAction(ActionType.DEFINE, wordObj.word);
            // Update the word object with the fetched definition
            wordObj.definition = definition;

            // Update the savedWords in local storage with the new definition
            chrome.storage.local.set({ savedWords });
          } catch (definitionError) {
            console.error("Error updating definition:", definitionError);
          }
        });
      }
    });
  } catch (error) {
    console.error("Error saving word:", error);
    throw new Error("Failed to save word");
  }
};



const saveSentence = (sentence: string): void => {
  try {
    const wordsArray = sentence.split(/\s+/).map((word) => ({
      word,
      memorized: false,
      definition: '' // Add a default empty definition
    }));

    wordsArray.forEach(saveWord);
  } catch (error) {
    console.error("Error saving sentence:", error);
    throw new Error("Failed to save sentence");
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ActionType.SAVEEXTRACTEDWORDS) {
    const storedWords = request.words || [];
    try {
      chrome.storage.local.set({ words: storedWords }, () => {
        console.log('Words saved:', storedWords);
        sendResponse({ result: "Words received" });
      });
    } catch (error) {
      sendResponse({ error: error.message });
    }
  } else if (request.action && request.text) {
    const { action, text, language } = request;
    (async () => {
      try {
        const result = await handleAction(action, text, language);
        sendResponse({ result });
      } catch (error) {
        sendResponse({ error: error.message });
      }
    })();
  }
  return true; 
});

const handleAction =  async (action: ActionType, text: string, language?: string) => {

  if (action === ActionType.TRANSLATE && language) {
    console.log('Translating text:', text, 'to', language);
    return await processText(text, action, language); 
  }

  if (
    action === ActionType.DEFINE || 
    action === ActionType.SUMMARIZE || 
    action === ActionType.EXPLAIN 
  ) {
    console.log('Processing text:', text, action);
    return await processText(text, action);
  
  }  else if (action === ActionType.SAVE) {
    return saveSentence(text);
  }
  else {
    throw new Error(`Unknown action: ${action}`);
  }
  
};

const processText = async (text: string, action: ActionType, language?: string) => {
  try {
    // Validate the text and action inputs
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided');
    }

    if (!action || !Object.values(ActionType).includes(action)) {
      throw new Error('Invalid action provided');
    }

    const queryParams: Record<string, string> = { text, action };
    if (action === ActionType.TRANSLATE && language) {
      queryParams.language = language; // Add language to query if translating
    }

    // Encode text and action to include them safely in the URL
    const query = new URLSearchParams({ text, action, language }).toString();
    console.log('Query:', query);
    // Make a GET request with the text and action as query parameters
    const response = await fetch(`https://lexi-server-z4at.onrender.com/api/ai?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const aiResponse = await response.text();

    // Return the AI response
    return aiResponse;
  } catch (error) {
    console.error(error);
    return `Failed to process ${text}`;
  }
};
