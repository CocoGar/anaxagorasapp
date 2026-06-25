<script setup>
import BaseButton from '../components/ui/BaseButton.vue';

import homeHeroInteriorImage from '../assets/images/home-hero-interior.jpg';
import methodPlanImage from '../assets/images/method-plan.jpg';
import methodMaterialsImage from '../assets/images/method-materials.jpg';

import {
  DEFAULT_HUMAN_HEIGHT_CM,
  getAnthropometricUnits
} from '../core/anthropometricSystem';

import { formatCentimeters } from '../utils/numberFormat';

const emit = defineEmits(['navigate']);

const anthropometricUnits = getAnthropometricUnits();

function navigateToCalculator() {
  emit('navigate', 'calculator');
}

function navigateToDesign() {
  emit('navigate', 'design');
}
</script>

<template>
  <section class="home-view">
    <div class="home-view__background" aria-hidden="true"></div>

    <div class="page-container home-view__hero">
      <div class="home-view__content">
        <p class="section-label">Método Anaxágoras</p>

        <h1 class="home-view__title atelier-title">
          <span>Diseño proporcional</span>
          <span><em> desde la escala humana.</em></span>
        </h1>

        <p class="section-description">
          Una herramienta de diseño para convertir escala humana, relaciones
          musicales y geometría en medidas claras, trazables y aplicables al
          proyecto arquitectónico.
        </p>

        <div class="home-view__actions">
          <BaseButton type="button" @click="navigateToCalculator">
            Iniciar cálculo
          </BaseButton>

          <BaseButton
            type="button"
            variant="secondary"
            @click="navigateToDesign"
          >
            Explorar diseño
          </BaseButton>
        </div>
      </div>

      <aside class="home-view__visual" aria-label="Interior arquitectónico de referencia">
        <figure class="home-view__hero-image">
          <img
            :src="homeHeroInteriorImage"
            alt="Interior cálido y arquitectónico como referencia visual del sistema Anaxágoras"
          >

          <figcaption class="home-view__measure-card">
            <span>Sistema antropométrico</span>
            <strong>h = {{ formatCentimeters(DEFAULT_HUMAN_HEIGHT_CM) }}</strong>
            <small>Base humana de referencia</small>
          </figcaption>
        </figure>
      </aside>
    </div>

    <section class="page-container home-view__method" aria-label="Explicación del método">
      <div class="home-view__method-heading">
        <p class="section-label">Cómo funciona</p>

        <h2>
          Un sistema claro para pasar de una medida humana a una decisión de diseño.
        </h2>
      </div>

      <div class="home-view__method-grid">
        <article>
          <span>01</span>
          <h3>Escala humana</h3>
          <p>
            El sistema parte de una altura de referencia y deriva unidades
            antropométricas como pulgada, palmo, pie y codo.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Relación musical</h3>
          <p>
            La medida base se transforma mediante proporciones armónicas como
            5:4, 4:3, 3:2 o 2:1.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Interpretación visual</h3>
          <p>
            El resultado se puede leer como retícula 2D o como escena espacial
            3D vinculada a una plantilla de diseño.
          </p>
        </article>
      </div>
    </section>

    <section class="page-container home-view__studio-board" aria-label="Mesa visual del método">
      <figure class="home-view__studio-image home-view__studio-image--plan">
        <img
          :src="methodPlanImage"
          alt="Plano arquitectónico de referencia para explicar la parte técnica del método"
        >
      </figure>

      <div class="home-view__studio-copy">
        <p class="section-label">Mesa de trabajo</p>

        <h2>
          Del cálculo a la lámina visual.
        </h2>

        <p>
          Anaxágoras no se limita a devolver una cifra: transforma una medida en
          una lectura que puede explicarse, compararse y aplicarse sobre un proyecto.
        </p>
      </div>

      <figure class="home-view__studio-image home-view__studio-image--materials">
        <img
          :src="methodMaterialsImage"
          alt="Moodboard de materiales cálidos para conectar proporción y diseño"
        >
      </figure>
    </section>

    <section class="page-container home-view__board" aria-label="Unidades base del sistema">
      <div class="home-view__board-title">
        <span>Base antropométrica</span>
        <strong>h = {{ formatCentimeters(DEFAULT_HUMAN_HEIGHT_CM) }}</strong>
      </div>

      <div class="home-view__units">
        <div
          v-for="unit in anthropometricUnits"
          :key="unit.id"
          class="home-view__unit"
        >
          <span>{{ unit.name }}</span>
          <strong>{{ formatCentimeters(unit.valueCm) }}</strong>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.home-view {
  position: relative;
  overflow: hidden;
  padding: clamp(72px, 8vw, 112px) 0 96px;
  background: transparent;
}

.home-view__background {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.home-view__background::before {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(47, 42, 35, 0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 42, 35, 0.032) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.58), transparent 84%);
  content: '';
}

.home-view__hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(420px, 0.88fr);
  gap: clamp(52px, 6vw, 92px);
  align-items: center;
}

.home-view__content {
  display: grid;
  align-content: center;
}

.home-view__title {
  max-width: 700px;
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 4.6vw, 5rem);
  font-weight: 400;
  line-height: 1.03;
  letter-spacing: -0.018em;
}

.home-view__title span {
  display: block;
}

.home-view__title em {
  color: var(--color-accent-strong);
  font-style: italic;
  font-weight: 400;
}

.home-view__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

.home-view__visual {
  position: relative;
}

.home-view__hero-image {
  position: relative;
  min-height: 540px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(47, 42, 35, 0.14);
  background: var(--color-surface);
  box-shadow: var(--shadow-card-strong);
}

.home-view__hero-image::before,
.home-view__hero-image::after {
  position: absolute;
  z-index: 2;
  width: 58px;
  height: 58px;
  border-color: rgba(170, 123, 79, 0.48);
  content: '';
}

.home-view__hero-image::before {
  top: 24px;
  left: 24px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.home-view__hero-image::after {
  right: 24px;
  bottom: 24px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.home-view__hero-image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 540px;
  object-fit: cover;
  filter: saturate(0.9) contrast(0.96);
}

.home-view__hero-image::selection {
  background: transparent;
}

.home-view__measure-card {
  position: absolute;
  right: 34px;
  bottom: 34px;
  left: 34px;
  z-index: 3;
  display: grid;
  gap: 8px;
  max-width: 360px;
  padding: 22px;
  border: 1px solid rgba(248, 243, 234, 0.22);
  background: rgba(47, 42, 35, 0.74);
  color: var(--color-surface);
  backdrop-filter: blur(16px);
}

.home-view__measure-card span {
  color: var(--color-accent-muted);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.home-view__measure-card strong {
  color: #fff8ed;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
}

.home-view__measure-card small {
  color: rgba(248, 243, 234, 0.78);
  font-size: 0.88rem;
}

.home-view__method {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1fr);
  gap: clamp(36px, 5vw, 76px);
  margin-top: clamp(76px, 8vw, 112px);
  padding: clamp(42px, 5vw, 64px) 0;
  border-top: 1px solid rgba(47, 42, 35, 0.14);
  border-bottom: 1px solid rgba(47, 42, 35, 0.14);
}

.home-view__method-heading h2,
.home-view__studio-copy h2 {
  max-width: 520px;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 3.5vw, 3.8rem);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.025em;
}

.home-view__method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.home-view__method-grid article {
  display: grid;
  gap: 12px;
  padding: 0 24px;
  border-left: 1px solid rgba(47, 42, 35, 0.12);
}

.home-view__method-grid span {
  color: var(--color-accent-strong);
  font-family: var(--font-display);
  font-size: 1.45rem;
}

.home-view__method-grid h3 {
  color: var(--color-primary);
  font-size: 0.94rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.home-view__method-grid p {
  color: var(--color-muted-strong);
  font-size: 0.92rem;
  line-height: 1.75;
}

.home-view__studio-board {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr minmax(260px, 0.8fr) 1fr;
  gap: 24px;
  align-items: stretch;
  margin-top: 34px;
}

.home-view__studio-image {
  min-height: 320px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(47, 42, 35, 0.14);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.home-view__studio-image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  filter: saturate(0.88) contrast(0.96);
}

.home-view__studio-copy {
  display: grid;
  align-content: center;
  padding: 32px;
  border: 1px solid rgba(47, 42, 35, 0.14);
  background: rgba(248, 243, 234, 0.72);
}

.home-view__studio-copy p:last-child {
  margin-top: 18px;
  color: var(--color-muted-strong);
  line-height: 1.75;
}

.home-view__board {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(240px, 0.4fr) minmax(0, 1fr);
  margin-top: 34px;
  border: 1px solid rgba(47, 42, 35, 0.14);
  background: rgba(248, 243, 234, 0.62);
}

.home-view__board-title {
  display: grid;
  align-content: center;
  gap: 8px;
  padding: 26px 30px;
  border-right: 1px solid rgba(47, 42, 35, 0.12);
}

.home-view__board-title span {
  color: var(--color-accent-strong);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.home-view__board-title strong {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: -0.03em;
}

.home-view__units {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.home-view__unit {
  display: grid;
  gap: 4px;
  padding: 26px 22px;
  border-right: 1px solid rgba(47, 42, 35, 0.1);
}

.home-view__unit:last-child {
  border-right: 0;
}

.home-view__unit span {
  color: var(--color-muted);
  font-size: 0.84rem;
}

.home-view__unit strong {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 700;
}

@media (max-width: 1080px) {
  .home-view__hero,
  .home-view__method,
  .home-view__board,
  .home-view__studio-board {
    grid-template-columns: 1fr;
  }

  .home-view__method-grid {
    grid-template-columns: 1fr;
  }

  .home-view__method-grid article {
    padding: 22px 0;
    border-top: 1px solid rgba(47, 42, 35, 0.12);
    border-left: 0;
  }

  .home-view__board-title {
    border-right: 0;
    border-bottom: 1px solid rgba(47, 42, 35, 0.12);
  }

  .home-view__units {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-view__unit:nth-child(2) {
    border-right: 0;
  }

  .home-view__unit:nth-child(-n + 2) {
    border-bottom: 1px solid rgba(47, 42, 35, 0.1);
  }
}

@media (max-width: 680px) {
  .home-view {
    padding: 56px 0 64px;
  }

  .home-view__title {
    font-size: clamp(2.2rem, 10vw, 3.35rem);
    line-height: 1.06;
  }

  .home-view__hero-image,
  .home-view__hero-image img {
    min-height: 390px;
  }

  .home-view__measure-card {
    right: 20px;
    bottom: 20px;
    left: 20px;
    width: auto;
  }

  .home-view__studio-copy {
    padding: 24px;
  }

  .home-view__units {
    grid-template-columns: 1fr;
  }

  .home-view__unit {
    border-right: 0;
    border-bottom: 1px solid rgba(47, 42, 35, 0.1);
  }

  .home-view__unit:last-child {
    border-bottom: 0;
  }
}
</style>