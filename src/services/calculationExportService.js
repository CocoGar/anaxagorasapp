import { createProportionGeometry } from '../core/proportionGeometry';

const DEFAULT_FILE_PREFIX = 'anaxagoras-calculo';

function formatSpanishDate(dateValue) {
  const date = dateValue ? new Date(dateValue) : new Date();

  if (Number.isNaN(date.getTime())) {
    return 'Sin fecha';
  }

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

function formatFileDate(date = new Date()) {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .format(date)
    .replaceAll('/', '-');
}

function formatNumber(value, fractionDigits = 2) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '0,00';
  }

  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(numericValue);
}

function formatCentimeters(value) {
  return `${formatNumber(value)} cm`;
}

function formatMeters(value) {
  return `${formatNumber(value)} m`;
}

function normalizeText(value, fallback = 'No disponible') {
  if (typeof value !== 'string') {
    return fallback;
  }

  return value.trim() || fallback;
}

function createSafeFileNamePart(value) {
  return normalizeText(value, 'calculo')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createExportFileName(calculation) {
  const templateName = calculation?.designTemplate?.shortName || calculation?.designTemplate?.name || 'calculo';
  const safeTemplateName = createSafeFileNamePart(templateName);
  const date = formatFileDate();

  return `${DEFAULT_FILE_PREFIX}-${safeTemplateName}-${date}.txt`;
}

function validateCalculation(calculation) {
  if (!calculation || typeof calculation !== 'object') {
    throw new Error('No hay ningún cálculo disponible para exportar.');
  }

  if (!Number.isFinite(Number(calculation.resultCm))) {
    throw new Error('El cálculo no contiene un resultado válido para exportar.');
  }

  if (!Number.isFinite(Number(calculation.baseMeasureCm))) {
    throw new Error('El cálculo no contiene una medida base válida para exportar.');
  }
}

function buildSection(title, lines) {
  return [
    '',
    '----------------------------------------',
    title,
    '----------------------------------------',
    ...lines
  ].join('\n');
}

function buildTraceSection(calculation) {
  if (!calculation.trace) {
    return buildSection('TRAZABILIDAD DEL CÁLCULO', [
      'No hay trazabilidad detallada disponible para este cálculo.'
    ]);
  }

  const traceLines = [
    `Resumen: ${calculation.trace.summary || 'No disponible'}`,
    `Fórmula: ${calculation.trace.formula || 'No disponible'}`
  ];

  if (Array.isArray(calculation.trace.steps) && calculation.trace.steps.length) {
    traceLines.push('', 'Pasos:');

    calculation.trace.steps.forEach((step, index) => {
      traceLines.push(
        `${index + 1}. ${step.title || 'Paso del cálculo'}`,
        `   ${step.description || 'Sin descripción disponible.'}`
      );
    });
  }

  return buildSection('TRAZABILIDAD DEL CÁLCULO', traceLines);
}

function buildGeometrySection(calculation) {
  const geometry = createProportionGeometry({
    templateId: calculation.designTemplate?.id || calculation.designTemplateId,
    baseMeasureCm: calculation.baseMeasureCm,
    resultMeasureCm: calculation.resultCm
  });

  return buildSection('INTERPRETACIÓN ESPACIAL 3D', [
    `Escena: ${geometry.sceneTitle}`,
    `Descripción: ${geometry.sceneDescription}`,
    '',
    'Objeto base:',
    `${geometry.dimensionLabels.width}: ${formatCentimeters(geometry.baseObject.widthCm)}`,
    `${geometry.dimensionLabels.height}: ${formatCentimeters(geometry.baseObject.heightCm)}`,
    `${geometry.dimensionLabels.depth}: ${formatCentimeters(geometry.baseObject.depthCm)}`,
    '',
    'Objeto proporcional:',
    `${geometry.dimensionLabels.width}: ${formatCentimeters(geometry.resultObject.widthCm)}`,
    `${geometry.dimensionLabels.height}: ${formatCentimeters(geometry.resultObject.heightCm)}`,
    `${geometry.dimensionLabels.depth}: ${formatCentimeters(geometry.resultObject.depthCm)}`
  ]);
}

export function buildCalculationExportContent(calculation) {
  validateCalculation(calculation);

  const exportDate = formatSpanishDate(new Date());
  const createdAt = formatSpanishDate(calculation.createdAt);

  const heightCm = calculation.heightCm;
  const quantity = calculation.quantity;
  const anthropometricUnit = calculation.anthropometricUnit || {};
  const musicalRatio = calculation.musicalRatio || {};
  const designTemplate = calculation.designTemplate || {};

  return [
    'ANAXÁGORAS',
    'Resultado de cálculo proporcional',
    '',
    `Fecha de exportación: ${exportDate}`,
    `Fecha del cálculo: ${createdAt}`,

    buildSection('DATOS DE ENTRADA', [
      `Altura humana base: ${formatCentimeters(heightCm)}`,
      `Cantidad de unidades: ${formatNumber(quantity)}`,
      `Unidad antropométrica: ${normalizeText(anthropometricUnit.name, 'Unidad no disponible')}`,
      `Fórmula de unidad: ${normalizeText(anthropometricUnit.formula, 'No disponible')}`,
      `Valor de unidad: ${formatCentimeters(anthropometricUnit.valueCm)}`
    ]),

    buildSection('PLANTILLA DE DISEÑO', [
      `Plantilla: ${normalizeText(designTemplate.name, 'Plantilla no disponible')}`,
      `Nombre corto: ${normalizeText(designTemplate.shortName, 'No disponible')}`,
      `Descripción: ${normalizeText(designTemplate.description, 'No disponible')}`
    ]),

    buildSection('PROPORCIÓN MUSICAL', [
      `Relación: ${normalizeText(musicalRatio.name, 'Relación no disponible')}`,
      `Etiqueta: ${normalizeText(musicalRatio.ratioLabel, 'No disponible')}`,
      `Factor multiplicador: ${formatNumber(musicalRatio.value, 4)}`,
      `Descripción: ${normalizeText(musicalRatio.description, 'No disponible')}`
    ]),

    buildSection('RESULTADO', [
      `Medida base: ${formatCentimeters(calculation.baseMeasureCm)}`,
      `Resultado proporcional: ${formatCentimeters(calculation.resultCm)}`,
      `Resultado en metros: ${formatMeters(calculation.resultMeters)}`,
      `Diferencia respecto a la base: ${formatCentimeters(calculation.resultCm - calculation.baseMeasureCm)}`
    ]),

    buildTraceSection(calculation),
    buildGeometrySection(calculation),

    buildSection('NOTA', [
      'Este documento ha sido generado desde Anaxágoras como apoyo al diseño proporcional basado en escala humana, relaciones musicales, geometría y armonía visual.'
    ])
  ].join('\n');
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

export function exportCalculationAsText(calculation) {
  const content = buildCalculationExportContent(calculation);
  const file = createTextFile(content);
  const fileName = createExportFileName(calculation);

  downloadFile(file, fileName);

  return fileName;
}