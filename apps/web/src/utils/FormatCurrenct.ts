const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'IDR',
  style: 'currency',
});

export function FormatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
