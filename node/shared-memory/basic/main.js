const { Worker } = require('worker_threads');

const w = new Worker(__dirname + '/worker.js');

const buffer = new SharedArrayBuffer(1024);
const view = new Uint8Array(buffer);

console.log('now', view[0]);

w.postMessage(buffer);

setTimeout(() => {
  console.log('later', view[0]);
  // should be undefined as the buffer object is cloned
  // Even if the memory location stay the same
  // The object it self is different
  console.log('prop', buffer.foo); 
  w.unref();
}, 1000);

