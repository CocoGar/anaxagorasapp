import { ANTHROPOMETRIC_UNITS } from './anthropometricSystem';
import { MUSICAL_RATIOS } from './musicalRatios';
import { parseFlexibleNumber } from '../utils/numberParser';

const MIN_HUMAN_HEIGHT_CM = 50;
const MAX_HUMAN_HEIGHT_CM = 250;
const MIN_QUANTITY = 0.01;
const MAX_QUANTITY = 10000;

function isEmptyValue(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

function isFiniteNumber(value) {
  return Number.isFinite(value);
}

function hasValidAnthropometricUnit(unitId) {
  return Object.prototype.hasOwnProperty.call(ANTHROPOMETRIC_UNITS, unitId);
}

function hasValidMusicalRatio(ratioId) {
  return MUSICAL_RATIOS.some((ratio) => ratio.id === ratioId);
}

function validateHeight(heightCm) {
  if (isEmptyValue(heightCm)) {
    return 'Introduce una altura humana base.';
  }

  const numericHeight = parseFlexibleNumber(heightCm);

  if (!isFiniteNumber(numericHeight)) {
    return 'La altura humana debe ser un número válido. Puedes usar coma o punto decimal.';
  }

  if (numericHeight <= 0) {
    return 'La altura humana debe ser mayor que cero.';
  }

  if (numericHeight < MIN_HUMAN_HEIGHT_CM) {
    return `La altura humana debe ser igual o superior a ${MIN_HUMAN_HEIGHT_CM} cm.`;
  }

  if (numericHeight > MAX_HUMAN_HEIGHT_CM) {
    return `La altura humana debe ser igual o inferior a ${MAX_HUMAN_HEIGHT_CM} cm.`;
  }

  return '';
}

function validateQuantity(quantity) {
  if (isEmptyValue(quantity)) {
    return 'Introduce una cantidad de unidades.';
  }

  const numericQuantity = parseFlexibleNumber(quantity);

  if (!isFiniteNumber(numericQuantity)) {
    return 'La cantidad debe ser un número válido. Puedes usar coma o punto decimal.';
  }

  if (numericQuantity < MIN_QUANTITY) {
    return 'La cantidad debe ser mayor que cero.';
  }

  if (numericQuantity > MAX_QUANTITY) {
    return `La cantidad no puede superar ${MAX_QUANTITY} unidades.`;
  }

  return '';
}

function validateAnthropometricUnit(anthropometricUnitId) {
  if (isEmptyValue(anthropometricUnitId)) {
    return 'Selecciona una unidad antropométrica.';
  }

  if (!hasValidAnthropometricUnit(anthropometricUnitId)) {
    return 'La unidad antropométrica seleccionada no existe.';
  }

  return '';
}

function validateMusicalRatio(musicalRatioId) {
  if (isEmptyValue(musicalRatioId)) {
    return 'Selecciona una proporción musical.';
  }

  if (!hasValidMusicalRatio(musicalRatioId)) {
    return 'La proporción musical seleccionada no existe.';
  }

  return '';
}

export function validateCalculatorForm({
  heightCm,
  quantity,
  anthropometricUnitId,
  musicalRatioId
}) {
  const errors = {};

  const heightError = validateHeight(heightCm);
  const quantityError = validateQuantity(quantity);
  const anthropometricUnitError = validateAnthropometricUnit(anthropometricUnitId);
  const musicalRatioError = validateMusicalRatio(musicalRatioId);

  if (heightError) {
    errors.heightCm = heightError;
  }

  if (quantityError) {
    errors.quantity = quantityError;
  }

  if (anthropometricUnitError) {
    errors.anthropometricUnitId = anthropometricUnitError;
  }

  if (musicalRatioError) {
    errors.musicalRatioId = musicalRatioError;
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