export const MUSICAL_RATIOS = [
  {
    id: 'unison',
    name: 'Unísono',
    ratioLabel: '1:1',
    value: 1,
    description: 'Mantiene la misma medida base.'
  },
  {
    id: 'major-second',
    name: 'Segunda mayor',
    ratioLabel: '9:8',
    value: 9 / 8,
    description: 'Genera una variación ligera sobre la medida base.'
  },
  {
    id: 'major-third',
    name: 'Tercera mayor',
    ratioLabel: '5:4',
    value: 5 / 4,
    description: 'Aporta una relación armónica moderada.'
  },
  {
    id: 'fourth',
    name: 'Cuarta justa',
    ratioLabel: '4:3',
    value: 4 / 3,
    description: 'Relación clásica de estabilidad proporcional.'
  },
  {
    id: 'fifth',
    name: 'Quinta justa / Do-Sol',
    ratioLabel: '3:2',
    value: 3 / 2,
    description: 'Relación principal para generar una expansión armónica clara.'
  },
  {
    id: 'octave',
    name: 'Octava',
    ratioLabel: '2:1',
    value: 2,
    description: 'Duplica la medida base manteniendo equivalencia armónica.'
  }
];

export function getMusicalRatioById(ratioId) {
  const ratio = MUSICAL_RATIOS.find((item) => item.id === ratioId);

  if (!ratio) {
    throw new Error('La proporción musical seleccionada no existe.');
  }

  return ratio;
}