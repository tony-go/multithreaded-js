console.log("hello from main.js");

const worker = new Worker("worker.js");

worker.onmessage = function onMessage(message) {
  console.log("message received from worker.js", message.data);
}

worker.postMessage("Hi worker.js 👋🏼! (question)");

console.log("hello from end main.js");