const DEFAULT_FILE_NAME = 'anaxagoras-calculo.txt';

function formatSpanishDate(date) {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

function formatNumber(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '0';
  }

  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numericValue);
}

function getSafeText(value, fallbackText = 'No especificado') {
  return value || fallbackText;
}

function buildExportContent(calculation) {
  const exportDate = formatSpanishDate(new Date());
  const designTemplateName = getSafeText(calculation?.designTemplate?.name, calculation?.templateName);
  const anthropometricUnitName = getSafeText(calculation?.anthropometricUnit?.name, calculation?.anthropometricUnitId);
  const musicalRatioName = getSafeText(calculation?.musicalRatio?.name, calculation?.ratioName);
  const musicalRatioLabel = getSafeText(calculation?.musicalRatio?.ratioLabel, calculation?.ratioLabel);

  return `
ANAXÁGORAS
Resultado de cálculo proporcional

Fecha de exportación:
${exportDate}

----------------------------------------
DATOS DE PARTIDA
----------------------------------------

Plantilla de diseño:
${designTemplateName}

Altura humana base:
${formatNumber(calculation.heightCm)} cm

Cantidad de unidades:
${formatNumber(calculation.quantity)}

Unidad antropométrica:
${anthropometricUnitName}

Medida base:
${formatNumber(calculation.baseMeasureCm)} cm

----------------------------------------
RELACIÓN APLICADA
----------------------------------------

Proporción musical:
${musicalRatioName} · ${musicalRatioLabel}

Resultado proporcional:
${formatNumber(calculation.resultCm)} cm
${formatNumber(calculation.resultMeters)} m

----------------------------------------
LECTURA
----------------------------------------

${formatNumber(calculation.quantity)} unidades humanas transformadas mediante la proporción ${musicalRatioLabel}, dentro del contexto ${designTemplateName}.

----------------------------------------
NOTA
----------------------------------------

Este documento ha sido generado desde Anaxágoras como apoyo al diseño proporcional basado en escala humana, geometría, música y armonía visual.
`.trim();
}

function createTextFile(content) {
  return new Blob([content], {
    type: 'text/plain;charset=utf-8'
  });
}

function downloadFile(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const temporaryLink = document.createElement('a');

  temporaryLink.href = url;
  temporaryLink.download = fileName;
  temporaryLink.click();

  URL.revokeObjectURL(url);
}

export function exportCalculationAsText(calculation, fileName = DEFAULT_FILE_NAME) {
  if (!calculation) {
    throw new Error('No hay ningún cálculo disponible para exportar.');
  }

  const content = buildExportContent(calculation);
  const file = createTextFile(content);

  downloadFile(file, fileName);
}
