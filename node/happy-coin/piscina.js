const Piscina = require('piscina');

const { random64, isHappyCoin } = require('./helpers');

const THREAD_COUNT = 4;

if (!Piscina.isWorkerThread) {
  const pool = new Piscina({
    filename: __filename,
    minThreads: THREAD_COUNT,
    maxThreads: THREAD_COUNT
  });

  let done = 0;
  let count = 0;

  for (let i = 0; i < THREAD_COUNT; i++) {
    (async () => {
      const { total, coins } = await pool.run();

      process.stdout.write(coins);

      count += total;

      if (++done === THREAD_COUNT) {
        console.log('\n count: ', count);
      }
    })();
  }
}

// What we export here is use in the .run of piscina
module.exports = () => {
  let coinsBuffer = ' ';
  let total = 0;

  for (let i = 0; i < 10_000_000/THREAD_COUNT; i++) {
    const randomNumber = random64();
    if (isHappyCoin(randomNumber)) {
      coinsBuffer += randomNumber.toString() + ' ';
      total++;
    }
  }

  return { coins: coinsBuffer, total };
};