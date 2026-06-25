<script setup>
import BaseButton from '../components/ui/BaseButton.vue';

import {
  DEFAULT_HUMAN_HEIGHT_CM,
  getAnthropometricUnits
} from '../core/anthropometricSystem';

import { formatCentimeters } from '../utils/numberFormat';

const anthropometricUnits = getAnthropometricUnits();
</script>

<template>
  <section id="method" class="home-view">
    <div class="home-view__background" aria-hidden="true"></div>

    <div class="page-container home-view__grid">
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
          <a href="#calculator">
            <BaseButton>Iniciar cálculo</BaseButton>
          </a>

          <a href="#design">
            <BaseButton variant="secondary">Explorar sistema</BaseButton>
          </a>
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

    <div class="page-container home-view__lower">
      <section class="home-view__principles" aria-label="Principios del sistema">
        <article>
          <span>01</span>
          <strong>Escala humana</strong>
          <p>
            Unidades derivadas desde una altura base para mantener una referencia
            física y comprensible.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Relaciones musicales</strong>
          <p>
            Proporciones como 3:2, 4:3, 5:4 o 2:1 aplicadas como multiplicadores
            de diseño.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Lectura espacial</strong>
          <p>
            Resultado interpretable mediante retícula 2D y visualización técnica
            3D.
          </p>
        </article>
      </section>

      <section class="home-view__units" aria-label="Unidades antropométricas">
        <div
          v-for="unit in anthropometricUnits"
          :key="unit.id"
          class="home-view__unit"
        >
          <span>{{ unit.name }}</span>
          <strong>{{ formatCentimeters(unit.valueCm) }}</strong>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.home-view {
  position: relative;
  overflow: hidden;
  padding: clamp(76px, 8vw, 118px) 0 86px;
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

.home-view__background::after {
  position: absolute;
  top: 16%;
  right: 8%;
  width: 34rem;
  height: 34rem;
  border: 1px solid rgba(183, 138, 82, 0.16);
  border-radius: 50%;
  box-shadow:
    0 0 0 92px rgba(20, 36, 31, 0.025),
    0 0 0 164px rgba(183, 138, 82, 0.025);
  content: '';
}

.home-view__grid {
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

.home-view__visual {
  position: relative;
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

.home-view__lower {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.36fr);
  gap: 28px;
  margin-top: 76px;
}

.home-view__principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(20, 36, 31, 0.14);
  border-bottom: 1px solid rgba(20, 36, 31, 0.14);
}

.home-view__principles article {
  display: grid;
  gap: 12px;
  min-height: 176px;
  padding: 28px;
  border-right: 1px solid rgba(20, 36, 31, 0.12);
}

.home-view__principles article:last-child {
  border-right: 0;
}

.home-view__principles span {
  color: var(--color-accent-strong);
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.home-view__principles strong {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 850;
  letter-spacing: -0.02em;
}

.home-view__principles p {
  color: var(--color-muted-strong);
  font-size: 0.9rem;
  line-height: 1.7;
}

.home-view__units {
  display: grid;
  padding: 18px 24px;
  border: 1px solid rgba(20, 36, 31, 0.14);
  background: rgba(255, 252, 246, 0.54);
}

.home-view__unit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  border-bottom: 1px solid rgba(20, 36, 31, 0.1);
}

.home-view__unit:last-child {
  border-bottom: 0;
}

.home-view__unit span {
  color: var(--color-muted);
  font-size: 0.86rem;
}

.home-view__unit strong {
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 850;
}

@media (max-width: 1080px) {
  .home-view__grid,
  .home-view__lower {
    grid-template-columns: 1fr;
  }

  .home-view__principles {
    grid-template-columns: 1fr;
  }

  .home-view__principles article {
    border-right: 0;
    border-bottom: 1px solid rgba(20, 36, 31, 0.12);
  }

  .home-view__principles article:last-child {
    border-bottom: 0;
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

  .home-view__principles article {
    padding: 24px 0;
  }

  .home-view__principles {
    padding-inline: 0;
  }
}
</style>