<script setup>
import { computed, ref, watch } from 'vue';

import ProportionGrid from '../components/canvas/ProportionGrid.vue';
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
    ...calculateAnaxagorasProportion(normalizedForm.value),
    designTemplate: selectedDesignTemplate.value
  };

  calculationResult.value = result;
  calculationHistory.value = saveCalculationToHistory(result);
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

        <h2 class="calculator-view__title">
          Calcula una proporción desde una unidad humana.
        </h2>

        <p class="section-description">
          Introduce una altura humana de referencia, elige una unidad antropométrica
          y aplica una relación musical para obtener una medida proporcional útil
          para diseño.
        </p>

        <div class="calculator-view__hint">
          <span class="calculator-view__hint-mark">↳</span>
          <p>
            Ejemplo recomendado: 10 pies Anaxágoras con relación Do-Sol 3:2.
            El resultado debe ser 414 cm, es decir, 4,14 m.
          </p>
        </div>

        <div class="template-info">
          <BaseBadge tone="accent">
            {{ selectedDesignTemplate.shortName }}
          </BaseBadge>

          <h3>{{ selectedDesignTemplate.name }}</h3>

          <p>
            {{ selectedDesignTemplate.description }}
          </p>
        </div>
      </div>

      <BaseCard class="calculator-view__card">
        <form class="calculator-form" novalidate @submit.prevent="calculateResult">
          <BaseSelect
            id="designTemplateId"
            v-model="designTemplateId"
            label="Plantilla de diseño"
            :options="designTemplateOptions"
            helper-text="Elige el contexto de aplicación del cálculo."
          />

          <BaseButton
            type="button"
            variant="secondary"
            @click="applyTemplateRecommendations"
          >
            Aplicar recomendación de plantilla
          </BaseButton>

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
      </BaseCard>
    </div>

    <div
      v-if="calculationResult"
      class="page-container calculator-view__visual-section"
    >
      <ProportionGrid
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
  padding: 96px 0;
}

.calculator-view__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(340px, 0.9fr);
  gap: 48px;
  align-items: start;
}

.calculator-view__title {
  max-width: 720px;
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(2rem, 4vw, 4.4rem);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.calculator-view__hint {
  display: flex;
  gap: 12px;
  max-width: 620px;
  margin-top: 28px;
  padding: 18px 20px;
  border: 1px solid rgba(200, 155, 60, 0.28);
  border-radius: var(--radius-md);
  background: rgba(200, 155, 60, 0.08);
}

.calculator-view__hint-mark {
  color: var(--color-accent);
  font-size: 1.4rem;
  font-weight: 900;
}

.calculator-view__hint p {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.6;
}

.template-info {
  display: grid;
  gap: 12px;
  max-width: 620px;
  margin-top: 28px;
  padding: 22px;
  border: 1px solid rgba(22, 56, 50, 0.1);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.58);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.template-info h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.45rem;
  letter-spacing: -0.04em;
}

.template-info p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.calculator-view__card {
  display: grid;
  gap: 28px;
  padding: 28px;
}

.calculator-form {
  display: grid;
  gap: 18px;
}

.calculator-form__error {
  margin: 0;
  padding: 14px 16px;
  border: 1px solid rgba(180, 55, 55, 0.24);
  border-radius: var(--radius-sm);
  background: rgba(180, 55, 55, 0.08);
  color: #8f1f1f;
  font-weight: 700;
  line-height: 1.5;
}

.live-summary {
  display: grid;
  gap: 8px;
  padding: 18px;
  border: 1px solid rgba(22, 56, 50, 0.12);
  border-radius: var(--radius-md);
  background: rgba(217, 231, 223, 0.45);
  transition:
    opacity 0.2s ease,
    background 0.2s ease;
}

.live-summary--disabled {
  opacity: 0.74;
  background: rgba(255, 255, 255, 0.58);
}

.live-summary__label {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.live-summary p {
  margin: 0;
  color: var(--color-primary);
  line-height: 1.6;
}

.live-summary strong {
  font-weight: 900;
}

.result-panel {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at top right, rgba(200, 155, 60, 0.22), transparent 18rem),
    var(--color-primary);
  color: #ffffff;
}

.result-panel__top {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.result-panel__label {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.result-panel__main {
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.07em;
}

.result-panel__secondary {
  color: rgba(255, 255, 255, 0.74);
  font-size: 1.4rem;
  font-weight: 800;
}

.result-panel__details {
  display: grid;
  gap: 12px;
  margin: 8px 0 0;
}

.result-panel__details div {
  display: grid;
  gap: 4px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.result-panel__details dt {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.result-panel__details dd {
  margin: 0;
  color: #ffffff;
  font-weight: 700;
}

.calculator-view__visual-section,
.calculator-view__history-section {
  margin-top: 48px;
}

@media (max-width: 900px) {
  .calculator-view {
    padding: 72px 0;
  }

  .calculator-view__grid {
    grid-template-columns: 1fr;
  }
}
</style>