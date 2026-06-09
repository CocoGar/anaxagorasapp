const STORAGE_KEY = 'anaxagoras_calculation_history';
const MAX_HISTORY_ITEMS = 6;

export function getCalculationHistory() {
  const storedHistory = localStorage.getItem(STORAGE_KEY);

  if (!storedHistory) {
    return [];
  }

  try {
    return JSON.parse(storedHistory);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveCalculationToHistory(calculation) {
  const currentHistory = getCalculationHistory();

  const newHistoryItem = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...calculation
  };

  const updatedHistory = [
    newHistoryItem,
    ...currentHistory
  ].slice(0, MAX_HISTORY_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

  return updatedHistory;
}

export function clearCalculationHistory() {
  localStorage.removeItem(STORAGE_KEY);

  return [];
}