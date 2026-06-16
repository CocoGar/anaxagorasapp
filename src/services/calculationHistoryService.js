const STORAGE_KEY = 'anaxagoras_calculation_history';
const MAX_HISTORY_ITEMS = 6;

function createHistoryId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `history-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isValidDateValue(value) {
  if (!value) {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
}

function normalizeNumber(value, fallback = 0) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  return numericValue;
}

function normalizeText(value, fallback = '') {
  if (typeof value !== 'string') {
    return fallback;
  }

  return value.trim() || fallback;
}

function normalizeNestedObject(value, fallback = {}) {
  if (!isObject(value)) {
    return fallback;
  }

  return value;
}

function normalizeHistoryItem(item) {
  if (!isObject(item)) {
    return null;
  }

  const createdAt = isValidDateValue(item.createdAt)
    ? item.createdAt
    : new Date().toISOString();

  const designTemplate = normalizeNestedObject(item.designTemplate, {
    id: normalizeText(item.designTemplateId, 'free-composition'),
    name: normalizeText(item.templateName, 'Composición libre'),
    shortName: normalizeText(item.templateShortName, 'Libre')
  });

  const musicalRatio = normalizeNestedObject(item.musicalRatio, {
    id: normalizeText(item.musicalRatioId, 'unknown-ratio'),
    name: normalizeText(item.ratioName, 'Relación proporcional'),
    ratioLabel: normalizeText(item.ratioLabel, 'Proporción')
  });

  const anthropometricUnit = normalizeNestedObject(item.anthropometricUnit, {
    id: normalizeText(item.anthropometricUnitId, 'unknown-unit'),
    name: normalizeText(item.anthropometricUnitName, 'Unidad humana')
  });

  const resultCm = normalizeNumber(
    item.resultCm,
    normalizeNumber(item.baseHeight, normalizeNumber(item.baseMeasureCm, 0))
  );

  const baseMeasureCm = normalizeNumber(
    item.baseMeasureCm,
    normalizeNumber(item.baseHeight, resultCm)
  );

  const resultMeters = normalizeNumber(
    item.resultMeters,
    resultCm / 100
  );

  return {
    ...item,
    id: normalizeText(item.id, createHistoryId()),
    createdAt,
    heightCm: normalizeNumber(item.heightCm, normalizeNumber(item.baseHeight, 0)),
    quantity: normalizeNumber(item.quantity, 1),
    anthropometricUnitId: normalizeText(
      item.anthropometricUnitId,
      normalizeText(anthropometricUnit.id, 'unknown-unit')
    ),
    anthropometricUnit,
    musicalRatioId: normalizeText(
      item.musicalRatioId,
      normalizeText(musicalRatio.id, 'unknown-ratio')
    ),
    musicalRatio,
    designTemplateId: normalizeText(
      item.designTemplateId,
      normalizeText(designTemplate.id, 'free-composition')
    ),
    designTemplate,
    baseMeasureCm,
    resultCm,
    resultMeters
  };
}

function removeDuplicatedHistoryItems(historyItems) {
  const usedKeys = new Set();

  return historyItems.filter((item) => {
    const duplicateKey = [
      item.heightCm,
      item.quantity,
      item.anthropometricUnitId,
      item.musicalRatioId,
      item.designTemplateId,
      item.baseMeasureCm,
      item.resultCm
    ].join('|');

    if (usedKeys.has(duplicateKey)) {
      return false;
    }

    usedKeys.add(duplicateKey);
    return true;
  });
}

function saveHistory(historyItems) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(historyItems)
  );
}

export function getCalculationHistory() {
  const storedHistory = localStorage.getItem(STORAGE_KEY);

  if (!storedHistory) {
    return [];
  }

  try {
    const parsedHistory = JSON.parse(storedHistory);

    if (!Array.isArray(parsedHistory)) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    const normalizedHistory = parsedHistory
      .map(normalizeHistoryItem)
      .filter(Boolean)
      .slice(0, MAX_HISTORY_ITEMS);

    saveHistory(normalizedHistory);

    return normalizedHistory;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveCalculationToHistory(calculation) {
  const normalizedCalculation = normalizeHistoryItem({
    ...calculation,
    id: calculation?.id || createHistoryId(),
    createdAt: calculation?.createdAt || new Date().toISOString()
  });

  if (!normalizedCalculation) {
    return getCalculationHistory();
  }

  const currentHistory = getCalculationHistory();

  const updatedHistory = removeDuplicatedHistoryItems([
    normalizedCalculation,
    ...currentHistory
  ]).slice(0, MAX_HISTORY_ITEMS);

  saveHistory(updatedHistory);

  return updatedHistory;
}

export function clearCalculationHistory() {
  localStorage.removeItem(STORAGE_KEY);

  return [];
}