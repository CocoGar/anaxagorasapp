import {
  convertHumanUnitToCm,
  getAnthropometricUnitById,
  roundToTwoDecimals
} from './anthropometricSystem';
import { getMusicalRatioById } from './musicalRatios';
import { getDesignTemplateById } from '../data/designTemplates';

const DEFAULT_DESIGN_TEMPLATE_ID = 'free-composition';

function createCalculationId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `calculation-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizePositiveNumber(value, errorMessage) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new Error(errorMessage);
  }

  return numericValue;
}

export function calculateAnaxagorasProportion({
  quantity,
  anthropometricUnitId,
  musicalRatioId,
  heightCm,
  designTemplateId = DEFAULT_DESIGN_TEMPLATE_ID
}) {
  const normalizedQuantity = normalizePositiveNumber(
    quantity,
    'La cantidad debe ser un número mayor que cero.'
  );

  const normalizedHeightCm = normalizePositiveNumber(
    heightCm,
    'La altura humana debe ser un número mayor que cero.'
  );

  const anthropometricUnit = getAnthropometricUnitById(
    anthropometricUnitId,
    normalizedHeightCm
  );

  const musicalRatio = getMusicalRatioById(musicalRatioId);
  const designTemplate = getDesignTemplateById(designTemplateId);

  const baseMeasureCm = convertHumanUnitToCm(
    normalizedQuantity,
    anthropometricUnitId,
    normalizedHeightCm
  );

  const resultCm = roundToTwoDecimals(baseMeasureCm * musicalRatio.value);
  const resultMeters = roundToTwoDecimals(resultCm / 100);

  return {
    id: createCalculationId(),
    createdAt: new Date().toISOString(),
    heightCm: normalizedHeightCm,
    quantity: normalizedQuantity,
    anthropometricUnitId,
    anthropometricUnit,
    musicalRatioId,
    musicalRatio,
    designTemplateId,
    designTemplate,
    baseMeasureCm,
    resultCm,
    resultMeters
  };
}