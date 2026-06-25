<script setup>
import BaseButton from '../components/ui/BaseButton.vue';

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

        <h1 class="section-title">
          Diseño <em>proporcional</em> desde la escala humana.
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

      <aside class="home-view__visual" aria-label="Sistema visual Anaxágoras">
        <div class="home-view__render">
          <div class="home-view__render-grid" aria-hidden="true"></div>

          <div class="home-view__building" aria-hidden="true">
            <span class="home-view__slab home-view__slab--top"></span>
            <span class="home-view__slab home-view__slab--middle"></span>
            <span class="home-view__slab home-view__slab--base"></span>

            <span class="home-view__glass home-view__glass--one"></span>
            <span class="home-view__glass home-view__glass--two"></span>
            <span class="home-view__glass home-view__glass--three"></span>

            <span class="home-view__structure home-view__structure--one"></span>
            <span class="home-view__structure home-view__structure--two"></span>
            <span class="home-view__structure home-view__structure--three"></span>
          </div>

          <div class="home-view__measure-card">
            <p>Sistema antropométrico</p>
            <strong>h = {{ formatCentimeters(DEFAULT_HUMAN_HEIGHT_CM) }}</strong>
            <span>Base humana de referencia</span>
          </div>
        </div>
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
  padding: clamp(76px, 8vw, 118px) 0 96px;
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
    linear-gradient(rgba(20, 36, 31, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 36, 31, 0.045) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.68), transparent 84%);
  content: '';
}

.home-view__hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.88fr);
  gap: clamp(52px, 6vw, 92px);
  align-items: center;
}

.home-view__content {
  display: grid;
  align-content: center;
}

.home-view__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

.home-view__render {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  border: 1px solid rgba(20, 36, 31, 0.14);
  border-radius: 4px;
  background:
    linear-gradient(135deg, rgba(20, 36, 31, 0.94), rgba(31, 38, 34, 0.9)),
    var(--color-surface-dark);
  box-shadow: var(--shadow-card-strong);
}

.home-view__render::before,
.home-view__render::after {
  position: absolute;
  width: 54px;
  height: 54px;
  border-color: rgba(214, 184, 134, 0.5);
  content: '';
}

.home-view__render::before {
  top: 22px;
  left: 22px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.home-view__render::after {
  right: 22px;
  bottom: 22px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.home-view__render-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(244, 238, 226, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 238, 226, 0.045) 1px, transparent 1px);
  background-size: 72px 72px;
}

.home-view__building {
  position: absolute;
  right: 8%;
  bottom: 14%;
  width: 74%;
  height: 60%;
  transform: perspective(900px) rotateY(-18deg) rotateX(4deg);
  transform-origin: center;
}

.home-view__slab,
.home-view__glass,
.home-view__structure {
  position: absolute;
  display: block;
}

.home-view__slab {
  right: 0;
  height: 15px;
  background: linear-gradient(90deg, #dbc49e, #8e7150);
  box-shadow: 0 20px 36px rgba(0, 0, 0, 0.34);
}

.home-view__slab--top {
  top: 8%;
  width: 75%;
}

.home-view__slab--middle {
  top: 38%;
  width: 92%;
}

.home-view__slab--base {
  bottom: 8%;
  width: 100%;
}

.home-view__glass {
  border: 1px solid rgba(244, 238, 226, 0.28);
  background:
    linear-gradient(135deg, rgba(244, 238, 226, 0.2), rgba(244, 238, 226, 0.05)),
    rgba(15, 17, 16, 0.4);
}

.home-view__glass--one {
  top: 14%;
  right: 8%;
  width: 48%;
  height: 24%;
}

.home-view__glass--two {
  top: 44%;
  right: 0;
  width: 62%;
  height: 27%;
}

.home-view__glass--three {
  bottom: 13%;
  right: 18%;
  width: 44%;
  height: 18%;
}

.home-view__structure {
  width: 1px;
  height: 100%;
  background: rgba(214, 184, 134, 0.46);
}

.home-view__structure--one {
  right: 18%;
}

.home-view__structure--two {
  right: 42%;
}

.home-view__structure--three {
  right: 68%;
}

.home-view__measure-card {
  position: absolute;
  bottom: 34px;
  left: 34px;
  display: grid;
  gap: 8px;
  width: min(330px, calc(100% - 68px));
  padding: 22px;
  border: 1px solid rgba(214, 184, 134, 0.38);
  background: rgba(15, 17, 16, 0.78);
  backdrop-filter: blur(18px);
}

.home-view__measure-card p {
  color: var(--color-accent-strong);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.home-view__measure-card strong {
  color: var(--color-surface);
  font-family: var(--font-display);
  font-size: 2.35rem;
  font-weight: 500;
  letter-spacing: -0.035em;
}

.home-view__measure-card span {
  color: rgba(244, 238, 226, 0.72);
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
  border-top: 1px solid rgba(20, 36, 31, 0.14);
  border-bottom: 1px solid rgba(20, 36, 31, 0.14);
}

.home-view__method-heading h2 {
  max-width: 520px;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 3.4vw, 3.6rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.045em;
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
  border-left: 1px solid rgba(20, 36, 31, 0.12);
}

.home-view__method-grid span {
  color: var(--color-accent-strong);
  font-family: var(--font-display);
  font-size: 1.45rem;
}

.home-view__method-grid h3 {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 850;
  letter-spacing: -0.02em;
}

.home-view__method-grid p {
  color: var(--color-muted-strong);
  font-size: 0.92rem;
  line-height: 1.75;
}

.home-view__board {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(240px, 0.4fr) minmax(0, 1fr);
  margin-top: 34px;
  border: 1px solid rgba(20, 36, 31, 0.14);
  background: rgba(255, 252, 246, 0.56);
}

.home-view__board-title {
  display: grid;
  align-content: center;
  gap: 8px;
  padding: 26px 30px;
  border-right: 1px solid rgba(20, 36, 31, 0.12);
}

.home-view__board-title span {
  color: var(--color-accent-strong);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.home-view__board-title strong {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.home-view__units {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.home-view__unit {
  display: grid;
  gap: 4px;
  padding: 26px 22px;
  border-right: 1px solid rgba(20, 36, 31, 0.1);
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
  font-weight: 850;
}

@media (max-width: 1080px) {
  .home-view__hero,
  .home-view__method,
  .home-view__board {
    grid-template-columns: 1fr;
  }

  .home-view__method-grid {
    grid-template-columns: 1fr;
  }

  .home-view__method-grid article {
    padding: 22px 0;
    border-top: 1px solid rgba(20, 36, 31, 0.12);
    border-left: 0;
  }

  .home-view__board-title {
    border-right: 0;
    border-bottom: 1px solid rgba(20, 36, 31, 0.12);
  }

  .home-view__units {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-view__unit:nth-child(2) {
    border-right: 0;
  }

  .home-view__unit:nth-child(-n + 2) {
    border-bottom: 1px solid rgba(20, 36, 31, 0.1);
  }
}

@media (max-width: 680px) {
  .home-view {
    padding: 56px 0 64px;
  }

  .home-view__render {
    min-height: 380px;
  }

  .home-view__measure-card {
    right: 20px;
    bottom: 20px;
    left: 20px;
    width: auto;
  }

  .home-view__measure-card strong {
    font-size: 1.95rem;
  }

  .home-view__units {
    grid-template-columns: 1fr;
  }

  .home-view__unit {
    border-right: 0;
    border-bottom: 1px solid rgba(20, 36, 31, 0.1);
  }

  .home-view__unit:last-child {
    border-bottom: 0;
  }
}
</style>