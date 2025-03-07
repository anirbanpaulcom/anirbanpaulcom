export function numberFormatter(
  num?: number | string,
  opts: { digits?: number; full?: boolean; threshold?: number } = {
    digits: 1,
    full: false,
    threshold: 1000,
  },
) {
  const number = Number(num);

  if (!number) return '0';

  if (opts.full) {
    return Intl.NumberFormat('en-US').format(number);
  }

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  if (number < (opts?.threshold || 10000)) {
    return number.toFixed(opts.digits).replace(rx, '$1');
  }

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return number >= item.value;
    });
  return item
    ? (number / item.value).toFixed(opts.digits).replace(rx, '$1') + item.symbol
    : '0';
}
