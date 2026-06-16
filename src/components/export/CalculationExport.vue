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
          Descargar resultado
        </h3>

        <p class="calculation-export__description">
          Genera un archivo TXT con los datos de entrada, resultado, trazabilidad
          e interpretación espacial del cálculo.
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
      Primero realiza un cálculo para activar la exportación.
    </p>
  </section>
</template>

<style scoped>
.calculation-export {
  display: grid;
  gap: 14px;
  padding: 22px;
  border: 1px solid rgba(22, 56, 50, 0.1);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.62);
}

.calculation-export__content {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
}

.calculation-export__label {
  margin: 0 0 8px;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.calculation-export__title {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.35rem;
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.calculation-export__description {
  max-width: 560px;
  margin: 10px 0 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.calculation-export__button {
  flex: 0 0 auto;
  padding: 12px 18px;
  border: 0;
  border-radius: 999px;
  background: var(--color-primary);
  color: #ffffff;
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.calculation-export__button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.calculation-export__button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.calculation-export__status,
.calculation-export__error,
.calculation-export__helper {
  margin: 0;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.5;
}

.calculation-export__status {
  background: rgba(44, 134, 84, 0.12);
  color: #1f6f45;
}

.calculation-export__error {
  background: rgba(180, 55, 55, 0.1);
  color: #8f1f1f;
}

.calculation-export__helper {
  background: rgba(22, 56, 50, 0.06);
  color: var(--color-muted);
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