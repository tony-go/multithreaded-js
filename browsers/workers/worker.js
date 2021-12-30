console.log("hello from worker.js");

self.onmessage = function onMessage(message) {
  console.log("message from main.js", message.data);

  postMessage("Hey main.js, what's up ? (answer)");
}