<script setup>
import designBoardImage from '../assets/images/design-board.jpg';
import methodMaterialsImage from '../assets/images/method-materials.jpg';
import templateFacadeImage from '../assets/images/template-facade.jpg';
import templateFurnitureImage from '../assets/images/template-furniture.jpg';
import templateRoomImage from '../assets/images/template-room.jpg';

import { DESIGN_TEMPLATES } from '../data/designTemplates';

const designUses = [
  {
    id: 'arquitectura',
    title: 'Arquitectura',
    text: 'Estudia fachadas, ritmos, ejes, alturas y relaciones espaciales desde una medida proporcional.'
  },
  {
    id: 'interiorismo',
    title: 'Interiorismo',
    text: 'Trabaja estancias, piezas y recorridos con una base medible, clara y conectada a la escala humana.'
  },
  {
    id: 'presentación',
    title: 'Presentación',
    text: 'Convierte el cálculo en material explicable: resultado, trazabilidad, retícula y lectura espacial.'
  }
];

const templateImageMap = {
  'free-composition': methodMaterialsImage,
  facade: templateFacadeImage,
  room: templateRoomImage,
  furniture: templateFurnitureImage,
  graphic: designBoardImage
};

const templateMetaMap = {
  'free-composition': {
    unit: 'Pie',
    ratio: '3:2'
  },
  facade: {
    unit: 'Pie',
    ratio: '3:2'
  },
  room: {
    unit: 'Codo',
    ratio: '4:3'
  },
  furniture: {
    unit: 'Palmo',
    ratio: '5:4'
  },
  graphic: {
    unit: 'Palmo',
    ratio: '4:3'
  }
};

function getTemplateImage(templateId) {
  return templateImageMap[templateId] || methodMaterialsImage;
}

function getTemplateMeta(templateId) {
  return templateMetaMap[templateId] || {
    unit: 'Unidad base',
    ratio: 'Proporción'
  };
}
</script>

<template>
  <section class="design-view">
    <div class="page-container design-view__hero">
      <div>
        <p class="section-label">Diseño</p>

        <h1 class="design-view__title atelier-title">
          <span>Plantillas para aplicar </span>
          <span><em>proporción, escala</em></span>
          <span> y armonía visual.</span>
        </h1>

        <p class="section-description">
          Esta sección funciona como una mesa de trabajo visual: reúne contextos,
          plantillas y criterios para aplicar el cálculo proporcional en proyectos
          de arquitectura, interiorismo, mobiliario o composición gráfica.
        </p>
      </div>

      <aside class="design-view__cover" aria-label="Lámina editorial de diseño">
        <figure class="design-view__cover-board">
          <img
            :src="designBoardImage"
            alt="Lámina de presentación de diseño interior y arquitectura"
          >

          <figcaption>
            <span>Anaxágoras board</span>
            <strong>Escala · proporción · composición</strong>
          </figcaption>
        </figure>
      </aside>
    </div>

    <section class="page-container design-view__templates" aria-label="Plantillas disponibles">
      <div class="design-view__section-heading">
        <p class="section-label">Plantillas</p>
        <h2>Contextos de aplicación</h2>
      </div>

      <div class="design-view__template-grid">
        <article
          v-for="template in DESIGN_TEMPLATES"
          :key="template.id"
          class="design-template"
        >
          <figure class="design-template__image">
            <img
              :src="getTemplateImage(template.id)"
              :alt="`Referencia visual para la plantilla ${template.name}`"
            >
          </figure>

          <div class="design-template__content">
            <span>{{ template.shortName }}</span>
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>

            <dl>
              <div>
                <dt>Unidad sugerida</dt>
                <dd>{{ getTemplateMeta(template.id).unit }}</dd>
              </div>

              <div>
                <dt>Relación sugerida</dt>
                <dd>{{ getTemplateMeta(template.id).ratio }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>

    <section class="page-container design-view__uses" aria-label="Usos del sistema">
      <article
        v-for="useCase in designUses"
        :key="useCase.id"
      >
        <span>{{ useCase.id }}</span>
        <h3>{{ useCase.title }}</h3>
        <p>{{ useCase.text }}</p>
      </article>
    </section>
  </section>
</template>

<style scoped>
.design-view {
  position: relative;
  overflow: hidden;
  padding: clamp(72px, 8vw, 112px) 0 96px;
}

.design-view::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(47, 42, 35, 0.034) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 42, 35, 0.034) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 86%);
  content: '';
}

.design-view__hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(380px, 0.72fr);
  gap: clamp(48px, 6vw, 86px);
  align-items: center;
}

.design-view__title {
  max-width: 700px;
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 4.4vw, 4.85rem);
  font-weight: 400;
  line-height: 1.03;
  letter-spacing: -0.018em;
}

.design-view__title span {
  display: block;
}

.design-view__title em {
  color: var(--color-accent-strong);
  font-style: italic;
  font-weight: 400;
}

.design-view__cover-board {
  position: relative;
  min-height: 520px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(47, 42, 35, 0.14);
  background: var(--color-surface);
  box-shadow: var(--shadow-card-strong);
}

.design-view__cover-board::before,
.design-view__cover-board::after {
  position: absolute;
  z-index: 2;
  width: 56px;
  height: 56px;
  border-color: rgba(170, 123, 79, 0.46);
  content: '';
}

.design-view__cover-board::before {
  top: 22px;
  left: 22px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.design-view__cover-board::after {
  right: 22px;
  bottom: 22px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.design-view__cover-board img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
  filter: saturate(0.88) contrast(0.96);
}

.design-view__cover-board figcaption {
  position: absolute;
  right: 28px;
  bottom: 28px;
  left: 28px;
  z-index: 3;
  display: grid;
  gap: 6px;
  padding: 18px;
  border: 1px solid rgba(248, 243, 234, 0.2);
  background: rgba(47, 42, 35, 0.72);
  color: var(--color-surface);
  backdrop-filter: blur(14px);
}

.design-view__cover-board figcaption span {
  color: var(--color-accent-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.design-view__cover-board figcaption strong {
  color: #fff8ed;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 500;
  line-height: 1.05;
}

.design-view__section-heading {
  display: flex;
  gap: 24px;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(47, 42, 35, 0.14);
}

.design-view__section-heading h2 {
  max-width: 620px;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 3.5vw, 3.8rem);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.025em;
}

.design-view__templates {
  position: relative;
  z-index: 1;
  margin-top: clamp(76px, 8vw, 112px);
}

.design-view__template-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: 1px solid rgba(47, 42, 35, 0.14);
  background: rgba(248, 243, 234, 0.5);
}

.design-template {
  display: grid;
  min-height: 430px;
  border-right: 1px solid rgba(47, 42, 35, 0.12);
  background: rgba(248, 243, 234, 0.48);
}

.design-template:last-child {
  border-right: 0;
}

.design-template__image {
  height: 170px;
  margin: 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(47, 42, 35, 0.12);
}

.design-template__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88) contrast(0.96);
  transition: transform 0.3s ease;
}

.design-template:hover .design-template__image img {
  transform: scale(1.035);
}

.design-template__content {
  display: grid;
  gap: 14px;
  padding: 24px;
}

.design-template__content > span {
  color: var(--color-accent-strong);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.design-template h3 {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.025em;
}

.design-template p {
  color: var(--color-muted-strong);
  font-size: 0.9rem;
  line-height: 1.7;
}

.design-template dl {
  display: grid;
  gap: 10px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(47, 42, 35, 0.1);
}

.design-template div:not(.design-template__content) {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.design-template dt {
  color: var(--color-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.design-template dd {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.design-view__uses {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 34px;
  border-top: 1px solid rgba(47, 42, 35, 0.14);
  border-bottom: 1px solid rgba(47, 42, 35, 0.14);
}

.design-view__uses article {
  display: grid;
  gap: 12px;
  min-height: 190px;
  padding: 30px;
  border-right: 1px solid rgba(47, 42, 35, 0.12);
}

.design-view__uses article:last-child {
  border-right: 0;
}

.design-view__uses span {
  color: var(--color-accent-strong);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.design-view__uses h3 {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 700;
}

.design-view__uses p {
  color: var(--color-muted-strong);
  font-size: 0.9rem;
  line-height: 1.7;
}

@media (max-width: 1180px) {
  .design-view__template-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .design-template {
    border-bottom: 1px solid rgba(47, 42, 35, 0.12);
  }

  .design-template:nth-child(2n) {
    border-right: 0;
  }
}

@media (max-width: 980px) {
  .design-view__hero,
  .design-view__uses {
    grid-template-columns: 1fr;
  }

  .design-view__uses article {
    border-right: 0;
    border-bottom: 1px solid rgba(47, 42, 35, 0.12);
  }

  .design-view__uses article:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 680px) {
  .design-view {
    padding: 56px 0 70px;
  }

  .design-view__title {
    font-size: clamp(2.15rem, 9vw, 3.25rem);
    line-height: 1.06;
  }

  .design-view__cover-board,
  .design-view__cover-board img {
    min-height: 360px;
  }

  .design-view__template-grid {
    grid-template-columns: 1fr;
  }

  .design-template {
    border-right: 0;
  }

  .design-view__section-heading {
    align-items: start;
    flex-direction: column;
  }
}
</style>