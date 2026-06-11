function formatSpanishNumber(value) {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatRatioValue(value) {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(value);
}

export function buildCalculationTrace({
  heightCm,
  quantity,
  anthropometricUnit,
  musicalRatio,
  designTemplate,
  baseMeasureCm,
  resultCm,
  resultMeters
}) {
  const formattedHeight = formatSpanishNumber(heightCm);
  const formattedQuantity = formatSpanishNumber(quantity);
  const formattedUnitValue = formatSpanishNumber(anthropometricUnit.valueCm);
  const formattedBaseMeasure = formatSpanishNumber(baseMeasureCm);
  const formattedResultCm = formatSpanishNumber(resultCm);
  const formattedResultMeters = formatSpanishNumber(resultMeters);
  const formattedRatioValue = formatRatioValue(musicalRatio.value);

  const summary = `${formattedQuantity} ${anthropometricUnit.name.toLowerCase()} aplicados a la relación ${musicalRatio.ratioLabel} generan una medida proporcional de ${formattedResultCm} cm (${formattedResultMeters} m).`;

  return {
    summary,
    formula: `${formattedQuantity} × ${formattedUnitValue} cm × ${musicalRatio.ratioLabel} = ${formattedResultCm} cm`,
    steps: [
      {
        id: 'human-height',
        title: 'Altura humana de referencia',
        description: `Se parte de una altura humana base de ${formattedHeight} cm.`
      },
      {
        id: 'anthropometric-unit',
        title: 'Unidad antropométrica',
        description: `La unidad seleccionada es ${anthropometricUnit.name.toLowerCase()}, calculada mediante la fórmula ${anthropometricUnit.formula}. Su valor es ${formattedUnitValue} cm.`
      },
      {
        id: 'base-measure',
        title: 'Medida base',
        description: `${formattedQuantity} × ${formattedUnitValue} cm = ${formattedBaseMeasure} cm.`
      },
      {
        id: 'musical-ratio',
        title: 'Relación musical',
        description: `Se aplica ${musicalRatio.name} (${musicalRatio.ratioLabel}), con valor multiplicador ${formattedRatioValue}.`
      },
      {
        id: 'design-context',
        title: 'Contexto de diseño',
        description: `El cálculo queda asociado a la plantilla ${designTemplate.name.toLowerCase()}.`
      },
      {
        id: 'final-result',
        title: 'Resultado final',
        description: `${formattedBaseMeasure} cm × ${musicalRatio.ratioLabel} = ${formattedResultCm} cm, equivalente a ${formattedResultMeters} m.`
      }
    ]
  };
}