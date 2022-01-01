const { performance, PerformanceObserver } = require('perf_hooks')

const { random64, isHappyCoin } = require('./helpers');

const observer = new PerformanceObserver(list => list.getEntries().forEach(entry => console.info(entry)));
observer.observe({buffered: true, entryTypes: ['measure']});

/**
 * CODE
 */
performance.mark('start');

let count = 0;
for (let i = 1; i < 10_000_000; i++) {
  const randomNum = random64();
  if (isHappyCoin(randomNum)) {
    process.stdout.write(randomNum.toString() + ' ');
    count++;
  }
}

process.stdout.write('\n count ' + count + '\n');
performance.mark('end');
performance.measure('Single thread', 'start', 'end');