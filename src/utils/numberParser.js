export function parseFlexibleNumber(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return Number.NaN;
  }

  const normalizedValue = value.trim().replace(',', '.');

  return Number(normalizedValue);
}

export function isPositiveNumber(value) {
  const numericValue = parseFlexibleNumber(value);

  return Number.isFinite(numericValue) && numericValue > 0;
}