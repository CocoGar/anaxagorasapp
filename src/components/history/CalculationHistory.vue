<script setup>
import BaseButton from '../ui/BaseButton.vue';
import BaseBadge from '../ui/BaseBadge.vue';

import {
  formatCentimeters,
  formatMeters,
  formatSpanishNumber
} from '../../utils/numberFormat';

defineProps({
  historyItems: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['clear-history']);

function formatHistoryDate(dateValue) {
  if (!dateValue) {
    return 'Sin fecha';
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Sin fecha';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function getTemplateShortName(item) {
  return item?.designTemplate?.shortName || item?.templateName || 'Diseño';
}

function getTemplateName(item) {
  return item?.designTemplate?.name || item?.templateName || 'Plantilla proporcional';
}

function getRatioLabel(item) {
  return item?.musicalRatio?.ratioLabel || item?.ratioLabel || 'Proporción';
}

function getRatioName(item) {
  return item?.musicalRatio?.name || item?.ratioName || 'Relación proporcional';
}

function getUnitName(item) {
  return item?.anthropometricUnit?.name || item?.anthropometricUnitName || 'Unidad humana';
}

function getResultCm(item) {
  return Number(item?.resultCm || item?.baseHeight || item?.baseMeasureCm || 0);
}

function getResultMeters(item) {
  return Number(item?.resultMeters || getResultCm(item) / 100);
}

function getBaseMeasureCm(item) {
  return Number(item?.baseMeasureCm || item?.baseHeight || 0);
}

function getQuantity(item) {
  return Number(item?.quantity || 1);
}

function handleClearHistory() {
  emit('clear-history');
}
</script>

<template>
  <section class="calculation-history">
    <div class="calculation-history__header">
      <div>
        <p class="calculation-history__label">Historial local</p>
        <h3>Últimos cálculos</h3>
      </div>

      <BaseButton
        v-if="historyItems.length"
        variant="ghost"
        type="button"
        @click="handleClearHistory"
      >
        Limpiar
      </BaseButton>
    </div>

    <div
      v-if="historyItems.length"
      class="calculation-history__list"
    >
      <article
        v-for="item in historyItems"
        :key="item.id"
        class="history-item"
      >
        <div class="history-item__top">
          <BaseBadge tone="primary">
            {{ getTemplateShortName(item) }}
          </BaseBadge>

          <span>{{ formatHistoryDate(item.createdAt) }}</span>
        </div>

        <div class="history-item__main">
          <strong>{{ formatCentimeters(getResultCm(item)) }}</strong>
          <span>{{ formatMeters(getResultMeters(item)) }}</span>
        </div>

        <dl class="history-item__details">
          <div>
            <dt>Base</dt>
            <dd>{{ formatCentimeters(getBaseMeasureCm(item)) }}</dd>
          </div>

          <div>
            <dt>Unidades</dt>
            <dd>
              {{ formatSpanishNumber(getQuantity(item)) }}
              {{ getUnitName(item).toLowerCase() }}
            </dd>
          </div>

          <div>
            <dt>Relación</dt>
            <dd>{{ getRatioLabel(item) }}</dd>
          </div>
        </dl>

        <p class="history-item__description">
          {{ getTemplateName(item) }} · {{ getRatioName(item) }}
        </p>
      </article>
    </div>

    <div
      v-else
      class="calculation-history__empty"
    >
      <p>
        Todavía no hay cálculos guardados. Cuando calcules una proporción,
        aparecerá aquí para comparar resultados.
      </p>
    </div>
  </section>
</template>

<style scoped>
.calculation-history {
  display: grid;
  gap: 22px;
  padding: clamp(24px, 3vw, 32px);
  border: 1px solid rgba(20, 36, 31, 0.13);
  border-radius: 4px;
  background:
    linear-gradient(145deg, rgba(255, 252, 246, 0.9), rgba(255, 255, 255, 0.66));
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.calculation-history__header {
  display: flex;
  gap: 16px;
  align-items: start;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(20, 36, 31, 0.12);
}

.calculation-history__label {
  margin: 0 0 8px;
  color: var(--color-accent-strong);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.calculation-history h3 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.045em;
}

.calculation-history__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.history-item {
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid rgba(20, 36, 31, 0.12);
  border-radius: 4px;
  background: rgba(255, 252, 246, 0.62);
}

.history-item__top {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.history-item__top span {
  color: var(--color-muted);
  font-size: 0.76rem;
  font-weight: 760;
}

.history-item__main {
  display: grid;
  gap: 4px;
}

.history-item__main strong {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.045em;
}

.history-item__main span {
  color: var(--color-muted-strong);
  font-weight: 760;
}

.history-item__details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin: 0;
  border-top: 1px solid rgba(20, 36, 31, 0.1);
  border-bottom: 1px solid rgba(20, 36, 31, 0.1);
}

.history-item__details div {
  display: grid;
  gap: 4px;
  padding: 10px 8px;
  border-right: 1px solid rgba(20, 36, 31, 0.08);
}

.history-item__details div:last-child {
  border-right: 0;
}

.history-item__details dt {
  color: var(--color-muted);
  font-size: 0.66rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.history-item__details dd {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 820;
}

.history-item__description {
  margin: 0;
  color: var(--color-muted-strong);
  font-size: 0.86rem;
  line-height: 1.55;
}

.calculation-history__empty {
  padding: 20px;
  border: 1px dashed rgba(20, 36, 31, 0.22);
  border-radius: 4px;
  background: rgba(255, 252, 246, 0.48);
}

.calculation-history__empty p {
  margin: 0;
  color: var(--color-muted-strong);
  line-height: 1.6;
}

@media (max-width: 1040px) {
  .calculation-history__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .calculation-history {
    padding: 22px;
  }

  .calculation-history__header {
    flex-direction: column;
  }

  .calculation-history__list {
    grid-template-columns: 1fr;
  }

  .history-item__details {
    grid-template-columns: 1fr;
  }

  .history-item__details div {
    border-right: 0;
    border-bottom: 1px solid rgba(20, 36, 31, 0.08);
  }

  .history-item__details div:last-child {
    border-bottom: 0;
  }
}
</style>