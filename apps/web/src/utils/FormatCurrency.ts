export function FormatCurrency(number: number) {
  return number.toLocaleString('in-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
