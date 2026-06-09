<script setup>
import { computed, ref } from 'vue'
import CalculationExport from '../components/export/CalculationExport.vue'
import CalculationHistory from '../components/history/CalculationHistory.vue'
import {
  getCalculationHistory,
  saveCalculationToHistory
} from '../services/calculationHistoryService.js'

const DEFAULT_HEIGHT = 165.6

const designTemplates = [
  {
    id: 'interior',
    name: 'Interior arquitectónico',
    description: 'Pensada para estancias, mobiliario y composición espacial.',
    gridColumns: 6,
    gridRows: 4
  },
  {
    id: 'furniture',
    name: 'Mobiliario',
    description: 'Orientada al diseño de piezas, módulos y objetos funcionales.',
    gridColumns: 4,
    gridRows: 3
  },
  {
    id: 'graphic',
    name: 'Composición gráfica',
    description: 'Útil para carteles, láminas, interfaces y proporción visual.',
    gridColumns: 8,
    gridRows: 5
  }
]

const baseHeight = ref(DEFAULT_HEIGHT)
const selectedTemplateId = ref(designTemplates[0].id)
const errorMessage = ref('')
const history = ref(getCalculationHistory())

const selectedTemplate = computed(() => {
  return designTemplates.find((template) => template.id === selectedTemplateId.value)
})

const isValidHeight = computed(() => {
  return Number(baseHeight.value) > 0
})

const anthropometricSystem = computed(() => {
  const height = Number(baseHeight.value)

  return {
    inch: height / 72,
    span: height / 8,
    foot: height / 4,
    cubit: height / 4
  }
})

const musicalRatios = computed(() => {
  const height = Number(baseHeight.value)

  return {
    ratioThreeTwo: height * (3 / 2),
    ratioFourThree: height * (4 / 3),
    ratioFiveFour: height * (5 / 4),
    ratioTwoOne: height * 2
  }
})

const currentCalculation = computed(() => {
  if (!isValidHeight.value) {
    return null
  }

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    baseHeight: Number(baseHeight.value),
    templateId: selectedTemplate.value.id,
    templateName: selectedTemplate.value.name,
    anthropometricSystem: anthropometricSystem.value,
    musicalRatios: musicalRatios.value
  }
})

const formattedAnthropometricSystem = computed(() => {
  return [
    {
      label: 'Pulgada',
      value: anthropometricSystem.value.inch,
      description: 'Unidad menor derivada de la altura humana.'
    },
    {
      label: 'Palmo',
      value: anthropometricSystem.value.span,
      description: 'Medida corporal útil para módulos pequeños.'
    },
    {
      label: 'Pie',
      value: anthropometricSystem.value.foot,
      description: 'Base práctica para ritmos espaciales.'
    },
    {
      label: 'Codo',
      value: anthropometricSystem.value.cubit,
      description: 'Referencia clásica para diseño proporcional.'
    }
  ]
})

const formattedMusicalRatios = computed(() => {
  return [
    {
      label: '3:2',
      value: musicalRatios.value.ratioThreeTwo,
      description: 'Quinta justa. Relación estable y expansiva.'
    },
    {
      label: '4:3',
      value: musicalRatios.value.ratioFourThree,
      description: 'Cuarta justa. Proporción equilibrada.'
    },
    {
      label: '5:4',
      value: musicalRatios.value.ratioFiveFour,
      description: 'Tercera mayor. Relación armónica y amable.'
    },
    {
      label: '2:1',
      value: musicalRatios.value.ratioTwoOne,
      description: 'Octava. Duplicación proporcional directa.'
    }
  ]
})

const gridCells = computed(() => {
  const totalCells = selectedTemplate.value.gridColumns * selectedTemplate.value.gridRows

  return Array.from({ length: totalCells }, (_, index) => index + 1)
})

const gridStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${selectedTemplate.value.gridColumns}, 1fr)`
  }
})

const formatNumber = (value) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const validateHeight = () => {
  if (!baseHeight.value) {
    errorMessage.value = 'Introduce una altura base para calcular las proporciones.'
    return false
  }

  if (Number(baseHeight.value) <= 0) {
    errorMessage.value = 'La altura base debe ser mayor que 0.'
    return false
  }

  errorMessage.value = ''
  return true
}

const handleSaveCalculation = () => {
  const isValid = validateHeight()

  if (!isValid || !currentCalculation.value) {
    return
  }

  saveCalculationToHistory(currentCalculation.value)
  history.value = getCalculationHistory()
}

const handleHistoryUpdate = () => {
  history.value = getCalculationHistory()
}
</script>

<template>
  <main class="calculator-view">
    <section class="calculator-view__hero">
      <p class="calculator-view__eyebrow">Anaxágoras</p>

      <h1 class="calculator-view__title">
        Calculadora proporcional basada en escala humana
      </h1>

      <p class="calculator-view__description">
        Introduce una altura base y obtén un sistema proporcional derivado de medidas
        antropométricas, relaciones musicales y retícula visual.
      </p>
    </section>

    <section class="calculator-view__panel">
      <div class="calculator-view__form">
        <label
          class="calculator-view__label"
          for="baseHeight"
        >
          Altura base en centímetros
        </label>

        <input
          id="baseHeight"
          v-model="baseHeight"
          class="calculator-view__input"
          type="number"
          min="1"
          step="0.1"
          @input="validateHeight"
        >

        <p class="calculator-view__helper">
          Sistema recomendado por el arquitecto: h = 165,6 cm.
        </p>

        <p
          v-if="errorMessage"
          class="calculator-view__error"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="calculator-view__templates">
        <h2 class="calculator-view__section-title">
          Plantilla de diseño
        </h2>

        <div class="calculator-view__template-list">
          <button
            v-for="template in designTemplates"
            :key="template.id"
            class="calculator-view__template-button"
            :class="{
              'calculator-view__template-button--active': selectedTemplateId === template.id
            }"
            type="button"
            @click="selectedTemplateId = template.id"
          >
            <span class="calculator-view__template-name">
              {{ template.name }}
            </span>

            <span class="calculator-view__template-description">
              {{ template.description }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <section
      v-if="isValidHeight"
      class="calculator-view__results"
    >
      <article class="calculator-view__result-block">
        <h2 class="calculator-view__section-title">
          Sistema antropométrico
        </h2>

        <div class="calculator-view__cards">
          <article
            v-for="item in formattedAnthropometricSystem"
            :key="item.label"
            class="calculator-view__card"
          >
            <h3 class="calculator-view__card-title">
              {{ item.label }}
            </h3>

            <p class="calculator-view__card-value">
              {{ formatNumber(item.value) }} cm
            </p>

            <p class="calculator-view__card-description">
              {{ item.description }}
            </p>
          </article>
        </div>
      </article>

      <article class="calculator-view__result-block">
        <h2 class="calculator-view__section-title">
          Relaciones musicales
        </h2>

        <div class="calculator-view__cards">
          <article
            v-for="item in formattedMusicalRatios"
            :key="item.label"
            class="calculator-view__card"
          >
            <h3 class="calculator-view__card-title">
              {{ item.label }}
            </h3>

            <p class="calculator-view__card-value">
              {{ formatNumber(item.value) }} cm
            </p>

            <p class="calculator-view__card-description">
              {{ item.description }}
            </p>
          </article>
        </div>
      </article>

      <article class="calculator-view__grid-section">
        <div class="calculator-view__grid-header">
          <div>
            <h2 class="calculator-view__section-title">
              Retícula proporcional
            </h2>

            <p class="calculator-view__grid-description">
              Retícula adaptada a la plantilla:
              <strong>{{ selectedTemplate.name }}</strong>
            </p>
          </div>

          <button
            class="calculator-view__save-button"
            type="button"
            @click="handleSaveCalculation"
          >
            Guardar cálculo
          </button>
        </div>

        <div
          class="calculator-view__grid"
          :style="gridStyle"
        >
          <div
            v-for="cell in gridCells"
            :key="cell"
            class="calculator-view__grid-cell"
          >
            {{ cell }}
          </div>
        </div>
      </article>

      <CalculationExport :calculation="currentCalculation" />
    </section>
<CalculationHistory
  :history-items="history"
  @history-updated="handleHistoryUpdate"
    />
  </main>
</template>

<style scoped>
.calculator-view {
  display: grid;
  gap: 2rem;
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3rem 0;
}

.calculator-view__hero {
  padding: 2.5rem;
  border-radius: 1.75rem;
  background:
    linear-gradient(135deg, rgb(2 111 193 / 12%), rgb(212 241 255 / 80%)),
    #ffffff;
}

.calculator-view__eyebrow {
  margin: 0 0 0.75rem;
  color: var(--color-primary, #026fc1);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.calculator-view__title {
  max-width: 780px;
  margin: 0;
  color: var(--color-text-main, #001021);
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
}

.calculator-view__description {
  max-width: 720px;
  margin: 1.25rem 0 0;
  color: var(--color-text-secondary, #506070);
  font-size: 1.05rem;
  line-height: 1.7;
}

.calculator-view__panel,
.calculator-view__result-block,
.calculator-view__grid-section {
  padding: 1.5rem;
  border: 1px solid var(--color-border, #d8e2ec);
  border-radius: 1.25rem;
  background-color: var(--color-surface, #ffffff);
  box-shadow: 0 12px 32px rgb(0 16 33 / 8%);
}

.calculator-view__panel {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(240px, 0.8fr) minmax(280px, 1.2fr);
}

.calculator-view__form {
  display: flex;
  flex-direction: column;
}

.calculator-view__label {
  margin-bottom: 0.5rem;
  color: var(--color-text-main, #001021);
  font-weight: 700;
}

.calculator-view__input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border, #d8e2ec);
  border-radius: 0.9rem;
  color: var(--color-text-main, #001021);
  font: inherit;
}

.calculator-view__input:focus {
  border-color: var(--color-primary, #026fc1);
  outline: 3px solid rgb(2 111 193 / 15%);
}

.calculator-view__helper {
  margin: 0.75rem 0 0;
  color: var(--color-text-secondary, #506070);
  font-size: 0.95rem;
}

.calculator-view__error {
  margin: 0.75rem 0 0;
  color: #b42318;
  font-weight: 700;
}

.calculator-view__templates {
  display: grid;
  gap: 1rem;
}

.calculator-view__section-title {
  margin: 0;
  color: var(--color-text-main, #001021);
  font-size: 1.35rem;
}

.calculator-view__template-list {
  display: grid;
  gap: 0.75rem;
}

.calculator-view__template-button {
  display: grid;
  gap: 0.3rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-border, #d8e2ec);
  border-radius: 1rem;
  background-color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.calculator-view__template-button:hover {
  transform: translateY(-1px);
  border-color: var(--color-primary-light, #028cf5);
}

.calculator-view__template-button--active {
  border-color: var(--color-primary, #026fc1);
  background-color: var(--color-primary-soft, #d4f1ff);
}

.calculator-view__template-name {
  color: var(--color-text-main, #001021);
  font-weight: 800;
}

.calculator-view__template-description {
  color: var(--color-text-secondary, #506070);
  line-height: 1.4;
}

.calculator-view__results {
  display: grid;
  gap: 1.5rem;
}

.calculator-view__cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 1rem;
}

.calculator-view__card {
  padding: 1.25rem;
  border-radius: 1rem;
  background-color: var(--color-background-soft, #f3f7fb);
}

.calculator-view__card-title {
  margin: 0;
  color: var(--color-primary, #026fc1);
  font-size: 1rem;
}

.calculator-view__card-value {
  margin: 0.75rem 0 0.4rem;
  color: var(--color-text-main, #001021);
  font-size: 1.5rem;
  font-weight: 800;
}

.calculator-view__card-description {
  margin: 0;
  color: var(--color-text-secondary, #506070);
  font-size: 0.95rem;
  line-height: 1.5;
}

.calculator-view__grid-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.calculator-view__grid-description {
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary, #506070);
}

.calculator-view__save-button {
  padding: 0.85rem 1.2rem;
  border: 0;
  border-radius: 999px;
  background-color: var(--color-secondary, #001021);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.calculator-view__save-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgb(0 16 33 / 20%);
}

.calculator-view__grid {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--color-border, #d8e2ec);
  border-radius: 1rem;
}

.calculator-view__grid-cell {
  display: grid;
  min-height: 4.5rem;
  place-items: center;
  border: 1px solid var(--color-border, #d8e2ec);
  background-color: rgb(212 241 255 / 35%);
  color: var(--color-primary, #026fc1);
  font-weight: 800;
}

@media (max-width: 920px) {
  .calculator-view__panel {
    grid-template-columns: 1fr;
  }

  .calculator-view__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .calculator-view__grid-header {
    align-items: stretch;
    flex-direction: column;
  }

  .calculator-view__save-button {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .calculator-view {
    padding: 1.5rem 0;
  }

  .calculator-view__hero {
    padding: 1.5rem;
  }

  .calculator-view__cards {
    grid-template-columns: 1fr;
  }
}
</style>