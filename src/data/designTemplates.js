export const DESIGN_TEMPLATES = [
  {
    id: 'free-composition',
    name: 'Composición libre',
    shortName: 'Libre',
    description: 'Explora una proporción sin asociarla todavía a un objeto concreto.',
    recommendedUnitId: 'foot',
    recommendedRatioId: 'fifth'
  },
  {
    id: 'facade',
    name: 'Fachada arquitectónica',
    shortName: 'Fachada',
    description: 'Útil para estudiar anchuras, alturas, ejes, huecos y ritmos compositivos.',
    recommendedUnitId: 'foot',
    recommendedRatioId: 'fifth'
  },
  {
    id: 'room',
    name: 'Estancia interior',
    shortName: 'Estancia',
    description: 'Pensada para analizar dimensiones base de espacios interiores.',
    recommendedUnitId: 'cubit',
    recommendedRatioId: 'fourth'
  },
  {
    id: 'furniture',
    name: 'Mueble',
    shortName: 'Mueble',
    description: 'Adecuada para trabajar proporciones de objetos, piezas y módulos.',
    recommendedUnitId: 'palm',
    recommendedRatioId: 'major-third'
  },
  {
    id: 'graphic',
    name: 'Diseño gráfico',
    shortName: 'Gráfico',
    description: 'Orientada a retículas visuales, carteles, láminas o composiciones 2D.',
    recommendedUnitId: 'palm',
    recommendedRatioId: 'fourth'
  }
];

export function getDesignTemplateById(templateId) {
  const template = DESIGN_TEMPLATES.find((item) => item.id === templateId);

  if (!template) {
    throw new Error('La plantilla de diseño seleccionada no existe.');
  }

  return template;
}