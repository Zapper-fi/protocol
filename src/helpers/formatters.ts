export const formatUSD = (value: number) => {
  const decimalPlaces = value < 0.01 ? 4 : value < 1 ? 3 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
