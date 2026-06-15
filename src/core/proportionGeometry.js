const DEFAULT_TEMPLATE_ID = 'free-composition';

const SCENE_LIMITS = {
  minProjectedWidth: 110,
  maxProjectedWidth: 230,
  minProjectedHeight: 70,
  maxProjectedHeight: 210,
  minProjectedDepth: 24,
  maxProjectedDepth: 130
};

const TEMPLATE_GEOMETRY_RULES = {
  'free-composition': {
    sceneTitle: 'Composición espacial',
    sceneDescription:
      'Comparación volumétrica neutra entre la medida base y la medida proporcional.',
    dimensionLabels: {
      width: 'Anchura',
      height: 'Altura',
      depth: 'Profundidad'
    },
    factors: {
      width: 1,
      height: 0.5,
      depth: 0.4
    }
  },
  facade: {
    sceneTitle: 'Fachada espacial',
    sceneDescription:
      'Interpreta la medida proporcional como anchura principal de una fachada simplificada.',
    dimensionLabels: {
      width: 'Anchura',
      height: 'Altura fachada',
      depth: 'Profundidad técnica'
    },
    factors: {
      width: 1,
      height: 0.62,
      depth: 0.1
    }
  },
  room: {
    sceneTitle: 'Espacio interior',
    sceneDescription:
      'Interpreta la medida proporcional como longitud principal de una estancia.',
    dimensionLabels: {
      width: 'Longitud',
      height: 'Altura útil',
      depth: 'Anchura'
    },
    factors: {
      width: 1,
      height: 0.38,
      depth: 0.75
    }
  },
  furniture: {
    sceneTitle: 'Volumen de mueble',
    sceneDescription:
      'Interpreta la proporción como una pieza modular con ancho, alto y fondo.',
    dimensionLabels: {
      width: 'Anchura',
      height: 'Altura',
      depth: 'Fondo'
    },
    factors: {
      width: 1,
      height: 0.45,
      depth: 0.38
    }
  },
  graphic: {
    sceneTitle: 'Plano gráfico en perspectiva',
    sceneDescription:
      'Interpreta la proporción como un plano gráfico vertical con grosor técnico mínimo.',
    dimensionLabels: {
      width: 'Anchura',
      height: 'Altura',
      depth: 'Grosor'
    },
    factors: {
      width: 1,
      height: 1.414,
      depth: 0.08
    }
  }
};

function getTemplateRule(templateId) {
  return TEMPLATE_GEOMETRY_RULES[templateId] || TEMPLATE_GEOMETRY_RULES[DEFAULT_TEMPLATE_ID];
}

function roundToTwoDecimals(value) {
  return Number(value.toFixed(2));
}

function roundToInteger(value) {
  return Math.round(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizePositiveMeasure(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return 1;
  }

  return numericValue;
}

function createRealDimensions(mainMeasureCm, rule) {
  const normalizedMainMeasure = normalizePositiveMeasure(mainMeasureCm);

  return {
    widthCm: roundToTwoDecimals(normalizedMainMeasure * rule.factors.width),
    heightCm: roundToTwoDecimals(normalizedMainMeasure * rule.factors.height),
    depthCm: roundToTwoDecimals(normalizedMainMeasure * rule.factors.depth)
  };
}

function scaleDimension(valueCm, maxValueCm, minProjectedValue, maxProjectedValue) {
  const normalizedValue = normalizePositiveMeasure(valueCm);
  const normalizedMaxValue = normalizePositiveMeasure(maxValueCm);
  const projectedValue = (normalizedValue / normalizedMaxValue) * maxProjectedValue;

  return roundToInteger(
    clamp(projectedValue, minProjectedValue, maxProjectedValue)
  );
}

function createProjectedDimensions(realDimensions, scaleReference) {
  return {
    projectedWidth: scaleDimension(
      realDimensions.widthCm,
      scaleReference.widthCm,
      SCENE_LIMITS.minProjectedWidth,
      SCENE_LIMITS.maxProjectedWidth
    ),
    projectedHeight: scaleDimension(
      realDimensions.heightCm,
      scaleReference.heightCm,
      SCENE_LIMITS.minProjectedHeight,
      SCENE_LIMITS.maxProjectedHeight
    ),
    projectedDepth: scaleDimension(
      realDimensions.depthCm,
      scaleReference.depthCm,
      SCENE_LIMITS.minProjectedDepth,
      SCENE_LIMITS.maxProjectedDepth
    )
  };
}

function createGeometryObject(mainMeasureCm, rule, scaleReference) {
  const realDimensions = createRealDimensions(mainMeasureCm, rule);
  const projectedDimensions = createProjectedDimensions(realDimensions, scaleReference);

  return {
    mainMeasureCm: roundToTwoDecimals(normalizePositiveMeasure(mainMeasureCm)),
    ...realDimensions,
    ...projectedDimensions
  };
}

export function createProportionGeometry({
  templateId = DEFAULT_TEMPLATE_ID,
  baseMeasureCm,
  resultMeasureCm
}) {
  const rule = getTemplateRule(templateId);

  const baseRealDimensions = createRealDimensions(baseMeasureCm, rule);
  const resultRealDimensions = createRealDimensions(resultMeasureCm, rule);

  const scaleReference = {
    widthCm: Math.max(baseRealDimensions.widthCm, resultRealDimensions.widthCm),
    heightCm: Math.max(baseRealDimensions.heightCm, resultRealDimensions.heightCm),
    depthCm: Math.max(baseRealDimensions.depthCm, resultRealDimensions.depthCm)
  };

  return {
    templateId,
    sceneTitle: rule.sceneTitle,
    sceneDescription: rule.sceneDescription,
    dimensionLabels: rule.dimensionLabels,
    baseObject: createGeometryObject(baseMeasureCm, rule, scaleReference),
    resultObject: createGeometryObject(resultMeasureCm, rule, scaleReference)
  };
}