<script setup>
import { computed, ref, watch } from 'vue';

import ProportionGrid from '../components/canvas/ProportionGrid.vue';
import ProportionScene3D from '../components/canvas/ProportionScene3D.vue';
import CalculationExport from '../components/export/CalculationExport.vue';
import CalculationHistory from '../components/history/CalculationHistory.vue';

import BaseBadge from '../components/ui/BaseBadge.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import BaseCard from '../components/ui/BaseCard.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseSelect from '../components/ui/BaseSelect.vue';

import {
  DEFAULT_HUMAN_HEIGHT_CM,
  getAnthropometricUnits,
  getAnthropometricUnitById
} from '../core/anthropometricSystem';

import {
  hasValidationErrors,
  normalizeCalculatorForm,
  validateCalculatorForm
} from '../core/calculatorValidator';

import { MUSICAL_RATIOS } from '../core/musicalRatios';
import { calculateAnaxagorasProportion } from '../core/proportionCalculator';

import {
  DESIGN_TEMPLATES,
  getDesignTemplateById
} from '../data/designTemplates';

import {
  clearCalculationHistory,
  getCalculationHistory,
  saveCalculationToHistory
} from '../services/calculationHistoryService';

import {
  formatCentimeters,
  formatMeters,
  formatSpanishNumber
} from '../utils/numberFormat';

const heightCm = ref(String(DEFAULT_HUMAN_HEIGHT_CM).replace('.', ','));
const quantity = ref('10');
const designTemplateId = ref('free-composition');
const anthropometricUnitId = ref('foot');
const musicalRatioId = ref('fifth');
const calculationResult = ref(null);
const formTouched = ref(false);
const calculationHistory = ref(getCalculationHistory());
const visualMode = ref('3d');

const validationErrors = computed(() =>
  validateCalculatorForm({
    heightCm: heightCm.value,
    quantity: quantity.value,
    anthropometricUnitId: anthropometricUnitId.value,
    musicalRatioId: musicalRatioId.value
  })
);

const isFormValid = computed(() => !hasValidationErrors(validationErrors.value));

const normalizedForm = computed(() =>
  normalizeCalculatorForm({
    heightCm: heightCm.value,
    quantity: quantity.value,
    anthropometricUnitId: anthropometricUnitId.value,
    musicalRatioId: musicalRatioId.value
  })
);

const selectedDesignTemplate = computed(() =>
  getDesignTemplateById(designTemplateId.value)
);

const designTemplateOptions = DESIGN_TEMPLATES.map((template) => ({
  value: template.id,
  label: template.name
}));

const anthropometricUnits = computed(() => {
  if (!Number.isFinite(normalizedForm.value.heightCm) || normalizedForm.value.heightCm <= 0) {
    return getAnthropometricUnits(DEFAULT_HUMAN_HEIGHT_CM);
  }

  return getAnthropometricUnits(normalizedForm.value.heightCm);
});

const anthropometricUnitOptions = computed(() =>
  anthropometricUnits.value.map((unit) => ({
    value: unit.id,
    label: `${unit.name} · ${formatCentimeters(unit.valueCm)}`
  }))
);

const selectedAnthropometricUnit = computed(() => {
  const heightValue = Number.isFinite(normalizedForm.value.heightCm)
    ? normalizedForm.value.heightCm
    : DEFAULT_HUMAN_HEIGHT_CM;

  return getAnthropometricUnitById(
    anthropometricUnitId.value,
    heightValue
  );
});

const selectedMusicalRatio = computed(() =>
  MUSICAL_RATIOS.find((ratio) => ratio.id === musicalRatioId.value)
);

const musicalRatioOptions = MUSICAL_RATIOS.map((ratio) => ({
  value: ratio.id,
  label: `${ratio.name} · ${ratio.ratioLabel}`
}));

const liveBaseMeasureCm = computed(() => {
  if (!isFormValid.value) {
    return null;
  }

  return normalizedForm.value.quantity * selectedAnthropometricUnit.value.valueCm;
});

watch(
  [heightCm, quantity, anthropometricUnitId, musicalRatioId, designTemplateId],
  () => {
    calculationResult.value = null;
  }
);

function getFieldError(fieldName) {
  if (!formTouched.value) {
    return '';
  }

  return validationErrors.value[fieldName] || '';
}

function applyTemplateRecommendations() {
  const template = selectedDesignTemplate.value;

  anthropometricUnitId.value = template.recommendedUnitId;
  musicalRatioId.value = template.recommendedRatioId;
  calculationResult.value = null;
}

function calculateResult() {
  formTouched.value = true;

  if (!isFormValid.value) {
    calculationResult.value = null;
    return;
  }

  const result = {
    ...calculateAnaxagorasProportion({
      ...normalizedForm.value,
      designTemplateId: designTemplateId.value
    }),
    heightCm: normalizedForm.value.heightCm,
    anthropometricUnit: selectedAnthropometricUnit.value,
    designTemplate: selectedDesignTemplate.value
  };

  calculationResult.value = result;
  calculationHistory.value = saveCalculationToHistory(result);
  visualMode.value = '3d';
}

function clearHistory() {
  calculationHistory.value = clearCalculationHistory();
}
</script>

<template>
  <section id="calculator" class="calculator-view">
    <div class="page-container calculator-view__grid">
      <div class="calculator-view__content">
        <p class="section-label">Calculadora</p>

        <h2 class="calculator-view__title atelier-title">
          <span>Calcula proporciones</span>
          <span><em>desde una unidad humana.</em></span>
        </h2>

        <p class="section-description calculator-view__description">
          Introduce una altura de referencia, selecciona una unidad corporal y aplica
          una relación musical para obtener una medida útil, trazable y visualmente
          interpretable.
        </p>

        <div class="calculator-view__hint">
          <span class="calculator-view__hint-index">Ejemplo</span>

          <p>
            10 pies Anaxágoras con relación Do-Sol 3:2 generan
            <strong>414 cm</strong>, es decir, <strong>4,14 m</strong>.
          </p>
        </div>

        <div class="template-info">
          <div class="template-info__top">
            <BaseBadge tone="accent">
              {{ selectedDesignTemplate.shortName }}
            </BaseBadge>

            <span>Plantilla activa</span>
          </div>

          <h3>{{ selectedDesignTemplate.name }}</h3>

          <p>
            {{ selectedDesignTemplate.description }}
          </p>
        </div>
      </div>

      <BaseCard class="calculator-view__card">
        <form class="calculator-form" novalidate @submit.prevent="calculateResult">
          <div class="calculator-form__header">
            <span>01</span>

            <div>
              <h3>Parámetros de cálculo</h3>
              <p>Define la base humana, la unidad y la proporción musical.</p>
            </div>
          </div>

          <BaseSelect
            id="designTemplateId"
            v-model="designTemplateId"
            label="Plantilla de diseño"
            :options="designTemplateOptions"
            helper-text="Contexto desde el que se interpreta el resultado."
          />

          <BaseButton
            type="button"
            variant="secondary"
            @click="applyTemplateRecommendations"
          >
            Aplicar recomendación
          </BaseButton>

          <div class="calculator-form__split">
            <BaseInput
              id="heightCm"
              v-model="heightCm"
              label="Altura humana base"
              type="text"
              input-mode="decimal"
              placeholder="165,6"
              helper-text="Puedes usar coma o punto decimal."
              :error-message="getFieldError('heightCm')"
            />

            <BaseInput
              id="quantity"
              v-model="quantity"
              label="Cantidad de unidades"
              type="text"
              input-mode="decimal"
              placeholder="10"
              helper-text="Ejemplo: 10 pies, 4 codos o 24 palmos."
              :error-message="getFieldError('quantity')"
            />
          </div>

          <BaseSelect
            id="anthropometricUnitId"
            v-model="anthropometricUnitId"
            label="Unidad antropométrica"
            :options="anthropometricUnitOptions"
            helper-text="La equivalencia se recalcula según la altura humana base."
            :error-message="getFieldError('anthropometricUnitId')"
          />

          <BaseSelect
            id="musicalRatioId"
            v-model="musicalRatioId"
            label="Proporción musical"
            :options="musicalRatioOptions"
            helper-text="La relación Do-Sol 3:2 es una de las principales del método."
            :error-message="getFieldError('musicalRatioId')"
          />

          <div class="live-summary" :class="{ 'live-summary--disabled': !isFormValid }">
            <p class="live-summary__label">Lectura previa</p>

            <template v-if="isFormValid">
              <p>
                En la plantilla
                <strong>{{ selectedDesignTemplate.name.toLowerCase() }}</strong>,
                {{ formatSpanishNumber(normalizedForm.quantity) }}
                {{ selectedAnthropometricUnit.name.toLowerCase() }} equivale a
                <strong>
                  {{ formatCentimeters(liveBaseMeasureCm) }}
                </strong>.
              </p>

              <p v-if="selectedMusicalRatio">
                Se aplicará la relación
                <strong>
                  {{ selectedMusicalRatio.name }} · {{ selectedMusicalRatio.ratioLabel }}
                </strong>.
              </p>
            </template>

            <p v-else>
              Completa los datos correctamente para ver la lectura previa del cálculo.
            </p>
          </div>

          <BaseButton type="submit" :disabled="!isFormValid">
            Calcular proporción
          </BaseButton>

          <p v-if="formTouched && !isFormValid" class="calculator-form__error">
            Revisa los campos marcados antes de calcular. Así evitamos resultados incorrectos.
          </p>
        </form>

        <div v-if="calculationResult" class="result-panel">
          <div class="result-panel__top">
            <p class="result-panel__label">Resultado proporcional</p>

            <BaseBadge tone="accent">
              {{ calculationResult.designTemplate.shortName }}
            </BaseBadge>
          </div>

          <div class="result-panel__main">
            {{ formatCentimeters(calculationResult.resultCm) }}
          </div>

          <div class="result-panel__secondary">
            {{ formatMeters(calculationResult.resultMeters) }}
          </div>

          <dl class="result-panel__details">
            <div>
              <dt>Medida base</dt>
              <dd>{{ formatCentimeters(calculationResult.baseMeasureCm) }}</dd>
            </div>

            <div>
              <dt>Relación aplicada</dt>
              <dd>
                {{ calculationResult.musicalRatio.name }}
                · {{ calculationResult.musicalRatio.ratioLabel }}
              </dd>
            </div>

            <div>
              <dt>Contexto de diseño</dt>
              <dd>{{ calculationResult.designTemplate.name }}</dd>
            </div>

            <div>
              <dt>Lectura del cálculo</dt>
              <dd>
                {{ formatSpanishNumber(calculationResult.quantity) }}
                unidades humanas transformadas mediante una proporción musical.
              </dd>
            </div>
          </dl>
        </div>

        <CalculationExport :calculation="calculationResult" />
      </BaseCard>
    </div>

    <div
      v-if="calculationResult"
      class="page-container calculator-view__visual-section"
    >
      <div class="calculator-view__visual-header">
        <div>
          <p class="calculator-view__visual-label">Representación del resultado</p>

          <h3 class="calculator-view__visual-title">
            Visualización proporcional
          </h3>

          <p class="calculator-view__visual-description">
            Alterna entre escena 3D técnica y retícula 2D manteniendo el cálculo actual.
          </p>
        </div>

        <div class="calculator-view__visual-switch">
          <button
            type="button"
            class="calculator-view__visual-switch-button"
            :class="{ 'calculator-view__visual-switch-button--active': visualMode === '3d' }"
            @click="visualMode = '3d'"
          >
            Vista 3D
          </button>

          <button
            type="button"
            class="calculator-view__visual-switch-button"
            :class="{ 'calculator-view__visual-switch-button--active': visualMode === '2d' }"
            @click="visualMode = '2d'"
          >
            Retícula 2D
          </button>
        </div>
      </div>

      <ProportionScene3D
        v-if="visualMode === '3d'"
        :base-measure-cm="calculationResult.baseMeasureCm"
        :result-measure-cm="calculationResult.resultCm"
        :ratio-label="calculationResult.musicalRatio.ratioLabel"
        :ratio-name="calculationResult.musicalRatio.name"
        :template-id="calculationResult.designTemplate.id"
        :template-name="calculationResult.designTemplate.name"
      />

      <ProportionGrid
        v-else
        :base-measure-cm="calculationResult.baseMeasureCm"
        :result-measure-cm="calculationResult.resultCm"
        :ratio-label="calculationResult.musicalRatio.ratioLabel"
        :ratio-name="calculationResult.musicalRatio.name"
        :template-id="calculationResult.designTemplate.id"
        :template-name="calculationResult.designTemplate.name"
      />
    </div>

    <div class="page-container calculator-view__history-section">
      <CalculationHistory
        :history-items="calculationHistory"
        @clear-history="clearHistory"
      />
    </div>
  </section>
</template>

<style scoped>
.calculator-view {
  position: relative;
  padding: clamp(76px, 8vw, 118px) 0 96px;
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.46), rgba(243, 238, 230, 0.86));
}

.calculator-view::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(20, 36, 31, 0.036) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 36, 31, 0.036) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.45), transparent 80%);
  content: '';
}

.calculator-view__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(380px, 0.86fr);
  gap: clamp(42px, 6vw, 82px);
  align-items: start;
}

.calculator-view__content {
  position: sticky;
  top: 112px;
  display: grid;
  align-content: start;
}

.calculator-view__title {
  max-width: 700px;
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 4.4vw, 4.85rem);
  font-weight: 400;
  line-height: 1.03;
  letter-spacing: -0.018em;
}

.calculator-view__title span {
  display: block;
}

.calculator-view__title em {
  color: var(--color-accent-strong);
  font-style: italic;
  font-weight: 400;
}

.calculator-view__description {
  max-width: 640px;
}

.calculator-view__hint {
  display: grid;
  gap: 10px;
  max-width: 620px;
  margin-top: 34px;
  padding: 22px 0;
  border-top: 1px solid rgba(20, 36, 31, 0.14);
  border-bottom: 1px solid rgba(20, 36, 31, 0.14);
}

.calculator-view__hint-index {
  color: var(--color-accent-strong);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.calculator-view__hint p {
  color: var(--color-muted-strong);
  font-size: 0.98rem;
  line-height: 1.75;
}

.calculator-view__hint strong {
  color: var(--color-primary);
  font-weight: 700;
}

.template-info {
  display: grid;
  gap: 14px;
  max-width: 620px;
  margin-top: 30px;
  padding: 24px;
  border: 1px solid rgba(20, 36, 31, 0.13);
  border-radius: 4px;
  background: rgba(255, 252, 246, 0.64);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.template-info__top {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
}

.template-info__top span {
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 780;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.template-info h3 {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2vw, 2rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.template-info p {
  color: var(--color-muted-strong);
  line-height: 1.75;
}

.calculator-view__card {
  display: grid;
  gap: 28px;
  padding: clamp(24px, 3vw, 34px);
  border-radius: 4px;
  background:
    linear-gradient(145deg, rgba(255, 252, 246, 0.92), rgba(255, 255, 255, 0.78));
}

.calculator-form {
  display: grid;
  gap: 18px;
}

.calculator-form__header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(20, 36, 31, 0.12);
}

.calculator-form__header span {
  color: var(--color-accent-strong);
  font-family: var(--font-display);
  font-size: 1.45rem;
  line-height: 1;
}

.calculator-form__header h3 {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.calculator-form__header p {
  margin-top: 4px;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.calculator-form__split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.calculator-form__error {
  margin: 0;
  padding: 14px 16px;
  border: 1px solid rgba(185, 74, 66, 0.28);
  border-radius: var(--radius-sm);
  background: var(--color-error-soft);
  color: var(--color-error);
  font-weight: 760;
  line-height: 1.5;
}

.live-summary {
  display: grid;
  gap: 10px;
  padding: 18px;
  border: 1px solid rgba(20, 36, 31, 0.12);
  border-radius: 4px;
  background:
    linear-gradient(135deg, rgba(20, 36, 31, 0.05), rgba(183, 138, 82, 0.07)),
    rgba(255, 252, 246, 0.66);
  transition:
    opacity 0.2s ease,
    background 0.2s ease;
}

.live-summary--disabled {
  opacity: 0.72;
  background: rgba(255, 252, 246, 0.58);
}

.live-summary__label {
  color: var(--color-accent-strong);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.live-summary p {
  color: var(--color-muted-strong);
  line-height: 1.65;
}

.live-summary strong {
  color: var(--color-primary);
  font-weight: 700;
}

.result-panel {
  display: grid;
  gap: 18px;
  padding: clamp(22px, 3vw, 30px);
  border: 1px solid rgba(214, 184, 134, 0.28);
  border-radius: 4px;
  background:
    radial-gradient(circle at top right, rgba(183, 138, 82, 0.16), transparent 18rem),
    linear-gradient(135deg, #14241f, #1b201d);
  color: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.result-panel__top {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.result-panel__label {
  color: rgba(255, 252, 246, 0.68);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.result-panel__main {
  color: var(--color-surface);
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5.2rem);
  font-weight: 500;
  line-height: 0.94;
  letter-spacing: -0.06em;
}

.result-panel__secondary {
  color: rgba(255, 252, 246, 0.72);
  font-size: 1.15rem;
  font-weight: 760;
}

.result-panel__details {
  display: grid;
  gap: 0;
  margin: 8px 0 0;
  border-top: 1px solid rgba(255, 252, 246, 0.14);
}

.result-panel__details div {
  display: grid;
  grid-template-columns: minmax(130px, 0.38fr) minmax(0, 1fr);
  gap: 18px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(255, 252, 246, 0.12);
}

.result-panel__details dt {
  color: rgba(255, 252, 246, 0.54);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.result-panel__details dd {
  color: rgba(255, 252, 246, 0.92);
  font-weight: 720;
  line-height: 1.45;
}

.calculator-view__visual-section,
.calculator-view__history-section {
  position: relative;
  z-index: 1;
  margin-top: 64px;
}

.calculator-view__visual-header {
  display: flex;
  gap: 24px;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(20, 36, 31, 0.14);
}

.calculator-view__visual-label {
  margin: 0 0 10px;
  color: var(--color-accent-strong);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.calculator-view__visual-title {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.045em;
}

.calculator-view__visual-description {
  max-width: 620px;
  margin-top: 12px;
  color: var(--color-muted-strong);
  line-height: 1.7;
}

.calculator-view__visual-switch {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 5px;
  border: 1px solid rgba(20, 36, 31, 0.14);
  border-radius: 6px;
  background: rgba(255, 252, 246, 0.7);
  box-shadow: var(--shadow-card);
}

.calculator-view__visual-switch-button {
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--color-muted-strong);
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.calculator-view__visual-switch-button:hover {
  transform: translateY(-1px);
  color: var(--color-primary);
}

.calculator-view__visual-switch-button--active {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-surface);
}

@media (max-width: 980px) {
  .calculator-view {
    padding: 72px 0;
  }

  .calculator-view__grid {
    grid-template-columns: 1fr;
  }

  .calculator-view__content {
    position: static;
  }

  .calculator-view__visual-header {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 680px) {
  .calculator-form__split {
    grid-template-columns: 1fr;
  }

  .calculator-view__title {
    font-size: clamp(2.15rem, 9vw, 3.25rem);
    line-height: 1.06;
  }

  .template-info__top,
  .result-panel__top {
    align-items: flex-start;
    flex-direction: column;
  }

  .result-panel__details div {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .calculator-view__visual-switch {
    width: 100%;
  }

  .calculator-view__visual-switch-button {
    flex: 1;
  }
}
</style>