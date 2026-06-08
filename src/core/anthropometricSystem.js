export const DEFAULT_HUMAN_HEIGHT_CM = 165.6;

export const ANTHROPOMETRIC_UNITS = {
  inch: {
    id: 'inch',
    name: 'Pulgada',
    formula: 'h / 72',
    ratio: 1 / 72
  },
  palm: {
    id: 'palm',
    name: 'Palmo',
    formula: 'h / 24',
    ratio: 1 / 24
  },
  foot: {
    id: 'foot',
    name: 'Pie',
    formula: 'h / 6',
    ratio: 1 / 6
  },
  cubit: {
    id: 'cubit',
    name: 'Codo',
    formula: 'h / 4',
    ratio: 1 / 4
  }
};

export function roundToTwoDecimals(value) {
  return Number(value.toFixed(2));
}

export function calculateAnthropometricUnit(heightCm, ratio) {
  const numericHeight = Number(heightCm);
  const numericRatio = Number(ratio);

  if (!Number.isFinite(numericHeight) || numericHeight <= 0) {
    throw new Error('La altura humana debe ser un número mayor que cero.');
  }

  if (!Number.isFinite(numericRatio) || numericRatio <= 0) {
    throw new Error('El ratio antropométrico debe ser un número mayor que cero.');
  }

  return roundToTwoDecimals(numericHeight * numericRatio);
}

export function getAnthropometricUnits(heightCm = DEFAULT_HUMAN_HEIGHT_CM) {
  return Object.values(ANTHROPOMETRIC_UNITS).map((unit) => ({
    ...unit,
    valueCm: calculateAnthropometricUnit(heightCm, unit.ratio)
  }));
}

export function getAnthropometricUnitById(unitId, heightCm = DEFAULT_HUMAN_HEIGHT_CM) {
  const unit = ANTHROPOMETRIC_UNITS[unitId];

  if (!unit) {
    throw new Error('La unidad antropométrica seleccionada no existe.');
  }

  return {
    ...unit,
    valueCm: calculateAnthropometricUnit(heightCm, unit.ratio)
  };
}

export function convertHumanUnitToCm(quantity, unitId, heightCm = DEFAULT_HUMAN_HEIGHT_CM) {
  const numericQuantity = Number(quantity);

  if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
    throw new Error('La cantidad debe ser un número mayor que cero.');
  }

  const unit = getAnthropometricUnitById(unitId, heightCm);

  return roundToTwoDecimals(numericQuantity * unit.valueCm);
}