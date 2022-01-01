const { Worker, isMainThread, parentPort } = require('worker_threads');
const { performance, PerformanceObserver } = require('perf_hooks')

const { random64, isHappyCoin } = require('./helpers');

const observer = new PerformanceObserver(list => list.getEntries().forEach(entry => console.info(entry.duration / 1000)));
observer.observe({buffered: true, entryTypes: ['measure']});

const THREAD_COUNT = 4;

performance.mark('start');

if (isMainThread) {
  let inFlightThread = THREAD_COUNT;
  let count = 0;

  for (let i = 0; i < THREAD_COUNT; i++) {
    const worker = new Worker(__filename);

    worker.on('message', msg => {
      if (typeof msg === 'bigint') {
        process.stdout.write(msg.toString() + ' ');
        count++;
      }
      else if (msg === 'done') {
        if (--inFlightThread === 0) {
          process.stdout.write('\n count: ' + count + '\n');
          performance.mark('end');
          performance.measure('Multi thread', 'start', 'end');
        }
      }
    });
  }
}
else {
  for (let i = 1; i < 10_000_000 / THREAD_COUNT; i++) {
    let randomNumber = random64();
    if (isHappyCoin(randomNumber)) {
      parentPort.postMessage(randomNumber);
    }
  }

  parentPort.postMessage('done');
}