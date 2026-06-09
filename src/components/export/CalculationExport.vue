<script setup>
import { ref } from 'vue';
import { exportCalculationAsText } from '../../services/calculationExportService.js';

const props = defineProps({
  calculation: {
    type: Object,
    default: null
  }
});

const exportStatus = ref('');
const exportError = ref('');

function handleExport() {
  exportStatus.value = '';
  exportError.value = '';

  try {
    exportCalculationAsText(props.calculation);
    exportStatus.value = 'Resultado exportado correctamente.';
  } catch (error) {
    exportError.value = error.message;
  }
}
</script>

<template>
  <section class="calculation-export">
    <div class="calculation-export__content">
      <div>
        <p class="calculation-export__label">Exportación</p>

        <h3 class="calculation-export__title">
          Descargar resultado
        </h3>

        <p class="calculation-export__description">
          Genera un archivo TXT con la plantilla, la unidad humana, la relación musical
          y el resultado proporcional calculado.
        </p>
      </div>

      <button
        class="calculation-export__button"
        type="button"
        :disabled="!calculation"
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
  </section>
</template>

<style scoped>
.calculation-export {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid rgba(22, 56, 50, 0.12);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.72);
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
  font-size: 1.3rem;
  letter-spacing: -0.04em;
}

.calculation-export__description {
  max-width: 560px;
  margin: 8px 0 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.calculation-export__button {
  flex: 0 0 auto;
  padding: 0.9rem 1.15rem;
  border: 0;
  border-radius: 999px;
  background: var(--color-primary);
  color: #ffffff;
  font-weight: 900;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.calculation-export__button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(22, 56, 50, 0.18);
}

.calculation-export__button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.calculation-export__status,
.calculation-export__error {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.5;
}

.calculation-export__status {
  color: #167a3f;
}

.calculation-export__error {
  color: #8f1f1f;
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
