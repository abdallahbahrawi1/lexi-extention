/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var groq_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! groq-sdk */ "./node_modules/groq-sdk/index.mjs");
const saveWord = (wordObj) => {
    return new Promise((resolve) => {
        chrome.storage.local.get(['savedWords'], (result) => {
            let savedWords = result.savedWords || [];
            // Check if the word already exists
            if (!savedWords.some((w) => w.word === wordObj.word)) {
                // Add the new word if it doesn't exist
                savedWords.push(wordObj);
                chrome.storage.local.set({ savedWords }, () => {
                    resolve();
                });
            }
            else {
                resolve(); // Word already exists, resolve immediately
            }
        });
    });
};
const saveSentence = (sentence) => {
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
        const storedWords = request.words || [];
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

const GROQ_API_KEY = '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';
const groq = new groq_sdk__WEBPACK_IMPORTED_MODULE_0__["default"]({ apiKey: GROQ_API_KEY });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"background": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklexilearn"] = self["webpackChunklexilearn"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_groq-sdk_index_mjs"], () => (__webpack_require__("./src/background/background.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=background.js.map