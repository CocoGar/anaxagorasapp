function roundToInteger(value) {
  return Math.round(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function scaleMeasureToWidth(measureCm, maxMeasureCm, minWidth, maxWidth) {
  if (!Number.isFinite(measureCm) || measureCm <= 0 || !Number.isFinite(maxMeasureCm) || maxMeasureCm <= 0) {
    return minWidth;
  }

  const proportionalWidth = (measureCm / maxMeasureCm) * maxWidth;

  return roundToInteger(clamp(proportionalWidth, minWidth, maxWidth));
}

function getTemplateConfig(templateId) {
  switch (templateId) {
    case 'facade':
      return {
        sceneTitle: 'Fachada espacial',
        sceneDescription: 'Compara el volumen base y el volumen proporcional como una fachada simplificada.',
        minWidth: 108,
        maxWidth: 220,
        heightRatio: 0.48,
        depthRatio: 0.16,
        minHeight: 118,
        minDepth: 26
      };

    case 'room':
      return {
        sceneTitle: 'Espacio interior',
        sceneDescription: 'Representa la proporción como una caja espacial para entender anchura, profundidad y altura.',
        minWidth: 120,
        maxWidth: 220,
        heightRatio: 0.34,
        depthRatio: 0.62,
        minHeight: 110,
        minDepth: 110
      };

    case 'furniture':
      return {
        sceneTitle: 'Volumen de mueble',
        sceneDescription: 'La pieza se interpreta como un objeto modular con presencia volumétrica.',
        minWidth: 110,
        maxWidth: 220,
        heightRatio: 0.42,
        depthRatio: 0.40,
        minHeight: 92,
        minDepth: 86
      };

    case 'graphic':
      return {
        sceneTitle: 'Plano gráfico en perspectiva',
        sceneDescription: 'La retícula se transforma en un plano gráfico con ligera profundidad para facilitar la lectura.',
        minWidth: 110,
        maxWidth: 180,
        heightRatio: 1.28,
        depthRatio: 0.10,
        minHeight: 190,
        minDepth: 24
      };

    case 'free-composition':
    default:
      return {
        sceneTitle: 'Composición espacial',
        sceneDescription: 'Comparación directa entre medida base y medida proporcional en un volumen neutro.',
        minWidth: 110,
        maxWidth: 220,
        heightRatio: 0.36,
        depthRatio: 0.36,
        minHeight: 96,
        minDepth: 72
      };
  }
}

function createBoxDimensions(width, templateConfig) {
  return {
    width,
    height: roundToInteger(Math.max(templateConfig.minHeight, width * templateConfig.heightRatio)),
    depth: roundToInteger(Math.max(templateConfig.minDepth, width * templateConfig.depthRatio))
  };
}

export function createProportionGeometry({
  templateId = 'free-composition',
  baseMeasureCm,
  resultMeasureCm
}) {
  const templateConfig = getTemplateConfig(templateId);
  const maxMeasureCm = Math.max(baseMeasureCm, resultMeasureCm, 1);

  const baseWidth = scaleMeasureToWidth(
    baseMeasureCm,
    maxMeasureCm,
    templateConfig.minWidth,
    templateConfig.maxWidth
  );

  const resultWidth = scaleMeasureToWidth(
    resultMeasureCm,
    maxMeasureCm,
    templateConfig.minWidth,
    templateConfig.maxWidth
  );

  return {
    templateId,
    sceneTitle: templateConfig.sceneTitle,
    sceneDescription: templateConfig.sceneDescription,
    baseBox: createBoxDimensions(baseWidth, templateConfig),
    resultBox: createBoxDimensions(resultWidth, templateConfig)
  };
}