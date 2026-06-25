<script setup>
import { computed, ref } from 'vue';

import { exportCalculationAsText } from '../../services/calculationExportService';

const props = defineProps({
  calculation: {
    type: Object,
    default: null
  }
});

const exportStatus = ref('');
const exportError = ref('');

const canExport = computed(() => Boolean(props.calculation));

function clearExportMessages() {
  exportStatus.value = '';
  exportError.value = '';
}

function handleExport() {
  clearExportMessages();

  try {
    const fileName = exportCalculationAsText(props.calculation);

    exportStatus.value = `Exportación completada: ${fileName}`;
  } catch (error) {
    exportError.value = error.message || 'No se ha podido exportar el cálculo.';
  }
}
</script>

<template>
  <section class="calculation-export">
    <div class="calculation-export__content">
      <div>
        <p class="calculation-export__label">
          Exportación
        </p>

        <h3 class="calculation-export__title">
          Descargar resultado técnico
        </h3>

        <p class="calculation-export__description">
          Genera un archivo TXT con datos de entrada, resultado, trazabilidad e
          interpretación espacial del cálculo.
        </p>
      </div>

      <button
        class="calculation-export__button"
        type="button"
        :disabled="!canExport"
        @click="handleExport"
      >
        Exportar TXT
      </button>
    </div>

    <p
      v-if="exportStatus"
      class="calculation-export__status"
    >
      {{ exportStatus }}
    </p>

    <p
      v-if="exportError"
      class="calculation-export__error"
    >
      {{ exportError }}
    </p>

    <p
      v-if="!canExport"
      class="calculation-export__helper"
    >
      Realiza un cálculo para activar la exportación.
    </p>
  </section>
</template>

<style scoped>
.calculation-export {
  display: grid;
  gap: 14px;
  padding: 22px;
  border: 1px solid rgba(20, 36, 31, 0.13);
  border-radius: 4px;
  background:
    linear-gradient(135deg, rgba(255, 252, 246, 0.84), rgba(255, 255, 255, 0.62));
}

.calculation-export__content {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
}

.calculation-export__label {
  margin: 0 0 8px;
  color: var(--color-accent-strong);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.calculation-export__title {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.calculation-export__description {
  max-width: 560px;
  margin: 10px 0 0;
  color: var(--color-muted-strong);
  line-height: 1.65;
}

.calculation-export__button {
  flex: 0 0 auto;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  background: var(--color-primary);
  color: var(--color-surface);
  font: inherit;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.calculation-export__button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(20, 36, 31, 0.16);
}

.calculation-export__button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.calculation-export__button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.calculation-export__status,
.calculation-export__error,
.calculation-export__helper {
  margin: 0;
  padding: 12px 14px;
  border-radius: 4px;
  font-size: 0.88rem;
  font-weight: 760;
  line-height: 1.5;
}

.calculation-export__status {
  border: 1px solid rgba(53, 125, 84, 0.18);
  background: var(--color-success-soft);
  color: var(--color-success);
}

.calculation-export__error {
  border: 1px solid rgba(185, 74, 66, 0.18);
  background: var(--color-error-soft);
  color: var(--color-error);
}

.calculation-export__helper {
  border: 1px solid rgba(20, 36, 31, 0.1);
  background: rgba(20, 36, 31, 0.04);
  color: var(--color-muted-strong);
}

@media (max-width: 720px) {
  .calculation-export__content {
    align-items: stretch;
    flex-direction: column;
  }

  .calculation-export__button {
    width: 100%;
  }
}
</style>