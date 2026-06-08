<script setup>
import { computed, ref } from 'vue';

import BaseButton from '../components/ui/BaseButton.vue';
import BaseCard from '../components/ui/BaseCard.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseSelect from '../components/ui/BaseSelect.vue';

import {
  DEFAULT_HUMAN_HEIGHT_CM,
  getAnthropometricUnits,
  getAnthropometricUnitById
} from '../core/anthropometricSystem';

import { MUSICAL_RATIOS } from '../core/musicalRatios';
import { calculateAnaxagorasProportion } from '../core/proportionCalculator';

import {
  formatCentimeters,
  formatMeters,
  formatSpanishNumber
} from '../utils/numberFormat';

const heightCm = ref(DEFAULT_HUMAN_HEIGHT_CM);
const quantity = ref(10);
const anthropometricUnitId = ref('foot');
const musicalRatioId = ref('fifth');
const calculationResult = ref(null);
const errorMessage = ref('');

const anthropometricUnits = computed(() =>
  getAnthropometricUnits(Number(heightCm.value))
);

const anthropometricUnitOptions = computed(() =>
  anthropometricUnits.value.map((unit) => ({
    value: unit.id,
    label: `${unit.name} · ${formatCentimeters(unit.valueCm)}`
  }))
);

const selectedAnthropometricUnit = computed(() =>
  getAnthropometricUnitById(
    anthropometricUnitId.value,
    Number(heightCm.value)
  )
);

const selectedMusicalRatio = computed(() =>
  MUSICAL_RATIOS.find((ratio) => ratio.id === musicalRatioId.value)
);

const musicalRatioOptions = MUSICAL_RATIOS.map((ratio) => ({
  value: ratio.id,
  label: `${ratio.name} · ${ratio.ratioLabel}`
}));

function calculateResult() {
  errorMessage.value = '';

  try {
    calculationResult.value = calculateAnaxagorasProportion({
      quantity: quantity.value,
      anthropometricUnitId: anthropometricUnitId.value,
      musicalRatioId: musicalRatioId.value,
      heightCm: Number(heightCm.value)
    });
  } catch (error) {
    calculationResult.value = null;
    errorMessage.value = error.message;
  }
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
      </div>

      <BaseCard class="calculator-view__card">
        <form class="calculator-form" @submit.prevent="calculateResult">
          <div class="calculator-form__group">
            <BaseInput
              id="heightCm"
              v-model="heightCm"
              label="Altura humana base"
              type="number"
              placeholder="165,6"
            />

            <p class="calculator-form__helper">
              Por defecto usamos h = {{ formatCentimeters(DEFAULT_HUMAN_HEIGHT_CM) }}.
            </p>
          </div>

          <BaseInput
            id="quantity"
            v-model="quantity"
            label="Cantidad de unidades"
            type="number"
            placeholder="10"
          />

          <BaseSelect
            id="anthropometricUnitId"
            v-model="anthropometricUnitId"
            label="Unidad antropométrica"
            :options="anthropometricUnitOptions"
          />

          <BaseSelect
            id="musicalRatioId"
            v-model="musicalRatioId"
            label="Proporción musical"
            :options="musicalRatioOptions"
          />

          <div class="live-summary">
            <p class="live-summary__label">Lectura previa</p>

            <p>
              {{ formatSpanishNumber(quantity) }}
              {{ selectedAnthropometricUnit.name.toLowerCase() }} equivale a
              <strong>
                {{ formatCentimeters(quantity * selectedAnthropometricUnit.valueCm) }}
              </strong>.
            </p>

            <p v-if="selectedMusicalRatio">
              Se aplicará la relación
              <strong>
                {{ selectedMusicalRatio.name }} · {{ selectedMusicalRatio.ratioLabel }}
              </strong>.
            </p>
          </div>

          <BaseButton type="submit">
            Calcular proporción
          </BaseButton>

          <p v-if="errorMessage" class="calculator-form__error">
            {{ errorMessage }}
          </p>
        </form>

        <div v-if="calculationResult" class="result-panel">
          <p class="result-panel__label">Resultado proporcional</p>

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

.calculator-view__card {
  display: grid;
  gap: 28px;
  padding: 28px;
}

.calculator-form {
  display: grid;
  gap: 18px;
}

.calculator-form__group {
  display: grid;
  gap: 8px;
}

.calculator-form__helper {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.86rem;
  line-height: 1.5;
}

.calculator-form__error {
  margin: 0;
  padding: 14px 16px;
  border: 1px solid rgba(180, 55, 55, 0.24);
  border-radius: var(--radius-sm);
  background: rgba(180, 55, 55, 0.08);
  color: #8f1f1f;
  font-weight: 700;
}

.live-summary {
  display: grid;
  gap: 8px;
  padding: 18px;
  border: 1px solid rgba(22, 56, 50, 0.12);
  border-radius: var(--radius-md);
  background: rgba(217, 231, 223, 0.45);
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

@media (max-width: 900px) {
  .calculator-view {
    padding: 72px 0;
  }

  .calculator-view__grid {
    grid-template-columns: 1fr;
  }
}
</style>