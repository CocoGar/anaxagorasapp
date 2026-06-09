<script setup>
import { ref } from 'vue'
import { exportCalculationAsText } from '../../services/calculationExportService.js'

const props = defineProps({
  calculation: {
    type: Object,
    default: null
  }
})

const exportStatus = ref('')
const exportError = ref('')

const handleExport = () => {
  exportStatus.value = ''
  exportError.value = ''

  try {
    exportCalculationAsText(props.calculation)
    exportStatus.value = 'Resultado exportado correctamente.'
  } catch (error) {
    exportError.value = error.message
  }
}
</script>

<template>
  <section class="calculation-export">
    <div class="calculation-export__content">
      <div>
        <h2 class="calculation-export__title">Exportar resultado</h2>

        <p class="calculation-export__description">
          Descarga el cálculo actual en un archivo de texto para conservarlo o compartirlo.
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
  padding: 1.5rem;
  border: 1px solid var(--color-border, #d8e2ec);
  border-radius: 1.25rem;
  background-color: var(--color-surface, #ffffff);
  box-shadow: 0 12px 32px rgb(0 16 33 / 8%);
}

.calculation-export__content {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.calculation-export__title {
  margin: 0 0 0.4rem;
  color: var(--color-text-main, #001021);
  font-size: 1.2rem;
}

.calculation-export__description {
  max-width: 42rem;
  margin: 0;
  color: var(--color-text-secondary, #506070);
  line-height: 1.5;
}

.calculation-export__button {
  min-width: 9.5rem;
  padding: 0.85rem 1.2rem;
  border: 0;
  border-radius: 999px;
  background-color: var(--color-primary, #026fc1);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.calculation-export__button:hover:not(:disabled) {
  transform: translateY(-1px);
  background-color: var(--color-primary-light, #028cf5);
  box-shadow: 0 10px 24px rgb(2 111 193 / 25%);
}

.calculation-export__button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.calculation-export__status {
  margin: 1rem 0 0;
  color: #167a3f;
  font-weight: 600;
}

.calculation-export__error {
  margin: 1rem 0 0;
  color: #b42318;
  font-weight: 600;
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