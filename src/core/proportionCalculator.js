import { convertHumanUnitToCm, roundToTwoDecimals } from './anthropometricSystem';
import { getMusicalRatioById } from './musicalRatios';

export function calculateAnaxagorasProportion({
  quantity,
  anthropometricUnitId,
  musicalRatioId,
  heightCm
}) {
  const baseMeasureCm = convertHumanUnitToCm(quantity, anthropometricUnitId, heightCm);
  const musicalRatio = getMusicalRatioById(musicalRatioId);

  const resultCm = roundToTwoDecimals(baseMeasureCm * musicalRatio.value);
  const resultMeters = roundToTwoDecimals(resultCm / 100);

  return {
    quantity: Number(quantity),
    anthropometricUnitId,
    musicalRatio,
    baseMeasureCm,
    resultCm,
    resultMeters
  };
}