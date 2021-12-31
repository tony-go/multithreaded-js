const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const w = new Worker(__filename);

  w.on('message', msg => {
    console.log('message form a thread', msg);

    w.postMessage(`${msg} (modified by main thread)`);
  });
}
else {
  parentPort.on('message', msg => {
    console.log('message from main thread', msg);
  });

  const message = 'salut les loulou!';
  parentPort.postMessage(message);
}