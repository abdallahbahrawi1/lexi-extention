


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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, text } = message;

  if (!action) {
    sendResponse({ error: 'Action is missing' });
    return true; // Indicate that the response will be sent asynchronously
  }

  let lowerCaseAction = action.toLowerCase();

  switch (lowerCaseAction) {
    case 'define':
      console.log('Define action');
      // Handle the define action
      // main(text)
      // .then(definition => {
      //   sendResponse({ result: definition });
      // })
      // .catch(error => {
      //   sendResponse({ error: `Failed to get definition: ${error.message}` });
      // });
      break;
    case 'translate':
      // Handle the translate action
      sendResponse({ result: `Translation for ${text}` });
      break;
    case 'pronounce':
      // Handle the pronounce action
      sendResponse({ result: `Pronouncing ${text}` });
      break;
    case 'save':
      saveSentence(text)
      .then(() => {
        sendResponse({ result: `Text "${text}" saved successfully.` });
      })
      .catch((error) => {
        sendResponse({ error: `Failed to save text: ${error.message}` });
      });
      break;
    default:
      sendResponse({ error: `Unknown action: ${action}` });
      break;
  }

  return true;
});

import Groq from 'groq-sdk';
const GROQ_API_KEY = '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';

const groq = new Groq({ apiKey: GROQ_API_KEY });

// async function main(text) {
//   const chatCompletion = await groq.chat.completions.create({
//     "messages": [
//       {
//         "role": "user",
//         "content": `Define the word ${text}. Only provide the definition, nothing else.`
//       }
//     ],
//     "model": "llama3-groq-70b-8192-tool-use-preview",
//     "temperature": 0.5,
//     "max_tokens": 1024,
//     "top_p": 0.65,
//     "stream": true,
//     "stop": null
//   });

//   let result = '';
//   for await (const chunk of chatCompletion) {
//     result += chunk.choices[0]?.delta?.content || '';
//   }

//   return result.trim(); // Return the processed output
// }

// main('apple').then((text)=>console.log(text)).catch(console.error);