const crypto = require('crypto');

const big64Arr = new BigUint64Array(1);
function random64() {
  crypto.randomFillSync(big64Arr);
  return big64Arr[0];
}

function sumDigitsSquared(num) {
  let total = 0n;
  while (num > 0) {
    const numModuloBase = num % 10n;
    total += numModuloBase ** 2n;
    num = num / 10n;
  }
  return total;
}

function isHappy(num) {
  while (num != 1n && num != 4n) {
    num = sumDigitsSquared(num);
  }
  return num === 1n;
}

function isHappyCoin(num) {
  return isHappy(num) && num % 10000n === 0n;
}

module.exports = {
  random64,
  isHappyCoin
}