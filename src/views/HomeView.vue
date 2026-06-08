<script setup>
import BaseButton from '../components/ui/BaseButton.vue';
import BaseCard from '../components/ui/BaseCard.vue';

import {
  DEFAULT_HUMAN_HEIGHT_CM,
  getAnthropometricUnits
} from '../core/anthropometricSystem';

import { formatCentimeters } from '../utils/numberFormat';

const anthropometricUnits = getAnthropometricUnits();
</script>

<template>
  <section class="home-view">
    <div class="page-container home-view__grid">
      <div class="home-view__content">
        <p class="section-label">Método Anaxágoras</p>

        <h1 class="section-title">
          Diseño proporcional desde la escala humana.
        </h1>

        <p class="section-description">
          Una herramienta para transformar unidades humanas, proporciones musicales
          y relaciones geométricas en composiciones claras, armónicas y aplicables
          al diseño profesional.
        </p>

        <div class="home-view__actions">
          <a href="#calculator">
            <BaseButton>Empezar cálculo</BaseButton>
          </a>

          <a href="#method">
            <BaseButton variant="secondary">Ver método</BaseButton>
          </a>
        </div>
      </div>

      <BaseCard class="home-view__panel">
        <div class="measure-card">
          <p class="measure-card__eyebrow">Sistema antropométrico</p>

          <h2>
            h = {{ formatCentimeters(DEFAULT_HUMAN_HEIGHT_CM) }}
          </h2>

          <p class="measure-card__description">
            Las unidades base se calculan desde una altura humana de referencia.
            El sistema métrico se conserva como equivalencia técnica.
          </p>

          <div class="measure-card__list">
            <div
              v-for="unit in anthropometricUnits"
              :key="unit.id"
            >
              <span>{{ unit.name }}</span>
              <strong>{{ formatCentimeters(unit.valueCm) }}</strong>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style scoped>
.home-view {
  padding: 96px 0 80px;
}

.home-view__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.72fr);
  gap: 48px;
  align-items: center;
}

.home-view__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
}

.home-view__panel {
  padding: 32px;
}

.measure-card__eyebrow {
  margin: 0 0 12px;
  color: var(--color-accent);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.measure-card h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(2rem, 4vw, 3.8rem);
  line-height: 1;
  letter-spacing: -0.06em;
}

.measure-card__description {
  margin: 18px 0 28px;
  color: var(--color-muted);
  font-size: 0.98rem;
  line-height: 1.7;
}

.measure-card__list {
  display: grid;
  gap: 12px;
}

.measure-card__list div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
}

.measure-card__list span {
  color: var(--color-muted);
  font-weight: 700;
}

.measure-card__list strong {
  color: var(--color-primary);
  font-size: 1.08rem;
}

@media (max-width: 900px) {
  .home-view {
    padding-top: 56px;
  }

  .home-view__grid {
    grid-template-columns: 1fr;
  }
}
</style>