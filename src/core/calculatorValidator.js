import { isPositiveNumber, parseFlexibleNumber } from '../utils/numberParser';

export function validateCalculatorForm({
  heightCm,
  quantity,
  anthropometricUnitId,
  musicalRatioId
}) {
  const errors = {};

  if (!isPositiveNumber(heightCm)) {
    errors.heightCm = 'Introduce una altura humana válida y mayor que cero.';
  }

  if (!isPositiveNumber(quantity)) {
    errors.quantity = 'Introduce una cantidad válida y mayor que cero.';
  }

  if (!anthropometricUnitId) {
    errors.anthropometricUnitId = 'Selecciona una unidad antropométrica.';
  }

  if (!musicalRatioId) {
    errors.musicalRatioId = 'Selecciona una proporción musical.';
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}

export function normalizeCalculatorForm({
  heightCm,
  quantity,
  anthropometricUnitId,
  musicalRatioId
}) {
  return {
    heightCm: parseFlexibleNumber(heightCm),
    quantity: parseFlexibleNumber(quantity),
    anthropometricUnitId,
    musicalRatioId
  };
}