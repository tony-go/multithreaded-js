const w = new RpcWorker('worker.js');

Promise.allSettled([
  w.execute('square_sum', 1_000_000),
  w.execute('bad'),
  w.execute("random", "zoo")
]).then(([square_sum_res, err, unknown]) => {
  console.log('square_sum', square_sum_res)
  console.log('bad', err)
  console.log('unknown', unknown)
});