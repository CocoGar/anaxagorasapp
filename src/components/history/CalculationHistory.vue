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
        aparecerá aquí para que puedas comparar resultados.
      </p>
    </div>
  </section>
</template>

<style scoped>
.calculation-history {
  display: grid;
  gap: 20px;
  padding: 28px;
  border: 1px solid rgba(22, 56, 50, 0.1);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.calculation-history__header {
  display: flex;
  gap: 16px;
  align-items: start;
  justify-content: space-between;
}

.calculation-history__label {
  margin: 0 0 8px;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.calculation-history h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  line-height: 1;
  letter-spacing: -0.05em;
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
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
}

.history-item__top {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.history-item__top span {
  color: var(--color-muted);
  font-size: 0.78rem;
  font-weight: 800;
}

.history-item__main {
  display: grid;
  gap: 4px;
}

.history-item__main strong {
  color: var(--color-primary);
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.06em;
}

.history-item__main span {
  color: var(--color-muted);
  font-weight: 800;
}

.history-item__details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0;
}

.history-item__details div {
  display: grid;
  gap: 4px;
}

.history-item__details dt {
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
}

.history-item__details dd {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.88rem;
  font-weight: 900;
}

.history-item__description {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.88rem;
  line-height: 1.5;
}

.calculation-history__empty {
  padding: 20px;
  border: 1px dashed rgba(22, 56, 50, 0.22);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.54);
}

.calculation-history__empty p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

@media (max-width: 960px) {
  .calculation-history__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .calculation-history {
    padding: 22px;
  }

  .calculation-history__header {
    flex-direction: column;
  }

  .calculation-history__list {
    grid-template-columns: 1fr;
  }
}
</style>