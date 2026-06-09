const DEFAULT_FILE_NAME = 'anaxagoras-calculo.txt'

const formatSpanishDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const buildExportContent = (calculation) => {
  const exportDate = formatSpanishDate(new Date())

  return `
ANAXÁGORAS
Resultado de cálculo proporcional

Fecha de exportación:
${exportDate}

----------------------------------------
DATOS DE PARTIDA
----------------------------------------

Altura base:
${formatNumber(calculation.baseHeight)} cm

Plantilla seleccionada:
${calculation.templateName}

----------------------------------------
SISTEMA ANTROPOMÉTRICO
----------------------------------------

Pulgada:
${formatNumber(calculation.anthropometricSystem.inch)} cm

Palmo:
${formatNumber(calculation.anthropometricSystem.span)} cm

Pie:
${formatNumber(calculation.anthropometricSystem.foot)} cm

Codo:
${formatNumber(calculation.anthropometricSystem.cubit)} cm

----------------------------------------
RELACIONES PROPORCIONALES
----------------------------------------

Relación 3:2:
${formatNumber(calculation.musicalRatios.ratioThreeTwo)} cm

Relación 4:3:
${formatNumber(calculation.musicalRatios.ratioFourThree)} cm

Relación 5:4:
${formatNumber(calculation.musicalRatios.ratioFiveFour)} cm

Relación 2:1:
${formatNumber(calculation.musicalRatios.ratioTwoOne)} cm

----------------------------------------
NOTA
----------------------------------------

Este documento ha sido generado desde Anaxágoras como apoyo al diseño proporcional basado en escala humana, geometría, música y armonía visual.
`.trim()
}

const createTextFile = (content) => {
  return new Blob([content], {
    type: 'text/plain;charset=utf-8'
  })
}

const downloadFile = (blob, fileName) => {
  const url = URL.createObjectURL(blob)
  const temporaryLink = document.createElement('a')

  temporaryLink.href = url
  temporaryLink.download = fileName
  temporaryLink.click()

  URL.revokeObjectURL(url)
}

export const exportCalculationAsText = (calculation, fileName = DEFAULT_FILE_NAME) => {
  if (!calculation) {
    throw new Error('No hay ningún cálculo disponible para exportar.')
  }

  const content = buildExportContent(calculation)
  const file = createTextFile(content)

  downloadFile(file, fileName)
}