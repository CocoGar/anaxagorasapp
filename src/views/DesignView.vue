<script setup>
import { DESIGN_TEMPLATES } from '../data/designTemplates';

const designUses = [
  {
    id: 'architecture',
    title: 'Arquitectura',
    text: 'Estudia fachadas, ritmos, ejes, alturas y relaciones espaciales desde una medida proporcional.'
  },
  {
    id: 'interior',
    title: 'Interiorismo',
    text: 'Trabaja estancias, piezas y recorridos con una base medible, clara y conectada a la escala humana.'
  },
  {
    id: 'presentation',
    title: 'Presentación',
    text: 'Convierte el cálculo en material explicable: resultado, trazabilidad, retícula y lectura espacial.'
  }
];
</script>

<template>
  <section class="design-view">
    <div class="page-container design-view__hero">
      <div>
        <p class="section-label">Diseño</p>

        <h1 class="section-title">
          Plantillas para interpretar la proporción como lenguaje visual.
        </h1>

        <p class="section-description">
          Esta sección funciona como una mesa de trabajo visual: reúne contextos,
          plantillas y criterios para aplicar el cálculo proporcional en proyectos
          de arquitectura, interiorismo, mobiliario o composición gráfica.
        </p>
      </div>

      <aside class="design-view__cover" aria-label="Panel visual de diseño">
        <div class="design-view__cover-board">
          <span class="design-view__cover-title">Anaxágoras board</span>
          <span class="design-view__cover-line design-view__cover-line--one"></span>
          <span class="design-view__cover-line design-view__cover-line--two"></span>
          <span class="design-view__cover-line design-view__cover-line--three"></span>

          <div class="design-view__cover-plan">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
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
          <span>{{ template.shortName }}</span>
          <h3>{{ template.name }}</h3>
          <p>{{ template.description }}</p>

          <dl>
            <div>
              <dt>Unidad sugerida</dt>
              <dd>{{ template.recommendedUnitId }}</dd>
            </div>

            <div>
              <dt>Relación sugerida</dt>
              <dd>{{ template.recommendedRatioId }}</dd>
            </div>
          </dl>
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
  padding: clamp(76px, 8vw, 118px) 0 96px;
}

.design-view::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(20, 36, 31, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 36, 31, 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.58), transparent 86%);
  content: '';
}

.design-view__hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.72fr);
  gap: clamp(48px, 6vw, 86px);
  align-items: center;
}

.design-view__cover {
  position: relative;
}

.design-view__cover-board {
  position: relative;
  min-height: 480px;
  border: 1px solid rgba(20, 36, 31, 0.14);
  background:
    linear-gradient(135deg, rgba(255, 252, 246, 0.88), rgba(255, 255, 255, 0.64)),
    var(--color-surface);
  box-shadow: var(--shadow-card-strong);
  overflow: hidden;
}

.design-view__cover-board::before,
.design-view__cover-board::after {
  position: absolute;
  width: 56px;
  height: 56px;
  border-color: rgba(183, 138, 82, 0.42);
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

.design-view__cover-title {
  position: absolute;
  top: 34px;
  left: 34px;
  color: var(--color-accent-strong);
  font-size: 0.7rem;
  font-weight: 850;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.design-view__cover-line {
  position: absolute;
  height: 1px;
  background: rgba(20, 36, 31, 0.16);
}

.design-view__cover-line--one {
  top: 120px;
  right: 32px;
  left: 32px;
}

.design-view__cover-line--two {
  top: 240px;
  right: 32px;
  left: 32px;
}

.design-view__cover-line--three {
  top: 360px;
  right: 32px;
  left: 32px;
}

.design-view__cover-plan {
  position: absolute;
  right: 46px;
  bottom: 48px;
  width: 68%;
  height: 52%;
  border: 2px solid rgba(20, 36, 31, 0.58);
}

.design-view__cover-plan span {
  position: absolute;
  display: block;
  border: 1px solid rgba(20, 36, 31, 0.32);
}

.design-view__cover-plan span:nth-child(1) {
  top: 0;
  left: 0;
  width: 44%;
  height: 48%;
}

.design-view__cover-plan span:nth-child(2) {
  top: 0;
  right: 0;
  width: 56%;
  height: 36%;
}

.design-view__cover-plan span:nth-child(3) {
  bottom: 0;
  left: 0;
  width: 54%;
  height: 52%;
}

.design-view__cover-plan span:nth-child(4) {
  right: 0;
  bottom: 0;
  width: 46%;
  height: 64%;
}

.design-view__section-heading {
  display: flex;
  gap: 24px;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(20, 36, 31, 0.14);
}

.design-view__section-heading h2 {
  max-width: 620px;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.4vw, 3.4rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.design-view__templates {
  position: relative;
  z-index: 1;
  margin-top: clamp(76px, 8vw, 112px);
}

.design-view__template-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: 1px solid rgba(20, 36, 31, 0.14);
  background: rgba(255, 252, 246, 0.48);
}

.design-template {
  display: grid;
  gap: 14px;
  min-height: 300px;
  padding: 26px;
  border-right: 1px solid rgba(20, 36, 31, 0.12);
}

.design-template:last-child {
  border-right: 0;
}

.design-template > span {
  color: var(--color-accent-strong);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.design-template h3 {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.04em;
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
  border-top: 1px solid rgba(20, 36, 31, 0.1);
}

.design-template div {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.design-template dt {
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.design-template dd {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.design-view__uses {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 34px;
  border-top: 1px solid rgba(20, 36, 31, 0.14);
  border-bottom: 1px solid rgba(20, 36, 31, 0.14);
}

.design-view__uses article {
  display: grid;
  gap: 12px;
  min-height: 190px;
  padding: 30px;
  border-right: 1px solid rgba(20, 36, 31, 0.12);
}

.design-view__uses article:last-child {
  border-right: 0;
}

.design-view__uses span {
  color: var(--color-accent-strong);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.design-view__uses h3 {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 850;
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
    border-bottom: 1px solid rgba(20, 36, 31, 0.12);
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
    border-bottom: 1px solid rgba(20, 36, 31, 0.12);
  }

  .design-view__uses article:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 680px) {
  .design-view {
    padding: 56px 0 70px;
  }

  .design-view__cover-board {
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