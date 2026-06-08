export function formatSpanishNumber(value, maximumFractionDigits = 2) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '0';
  }

  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits
  }).format(numericValue);
}

export function formatCentimeters(value) {
  return `${formatSpanishNumber(value)} cm`;
}

export function formatMeters(value) {
  return `${formatSpanishNumber(value)} m`;
}