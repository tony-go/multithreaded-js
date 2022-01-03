const { parentPort } = require('worker_threads');

parentPort.on('message', buff => {
  buff.foo = 42;
  
  const view = new Uint8Array(buff);
  view[0] = 99;
  console.log('updated in worker');
});
