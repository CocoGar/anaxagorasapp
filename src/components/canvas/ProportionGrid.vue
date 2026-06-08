<script setup>
import { computed } from 'vue';

import {
  formatCentimeters,
  formatMeters
} from '../../utils/numberFormat';

const props = defineProps({
  baseMeasureCm: {
    type: Number,
    required: true
  },
  resultMeasureCm: {
    type: Number,
    required: true
  },
  ratioLabel: {
    type: String,
    required: true
  },
  ratioName: {
    type: String,
    required: true
  }
});

const svgWidth = 720;
const svgHeight = 320;
const leftPadding = 64;
const rightPadding = 48;
const topPadding = 64;
const rowHeight = 74;
const maxDrawableWidth = svgWidth - leftPadding - rightPadding;

const maxMeasure = computed(() =>
  Math.max(props.baseMeasureCm, props.resultMeasureCm)
);

const baseLineWidth = computed(() =>
  calculateLineWidth(props.baseMeasureCm)
);

const resultLineWidth = computed(() =>
  calculateLineWidth(props.resultMeasureCm)
);

const baseEndX = computed(() => leftPadding + baseLineWidth.value);
const resultEndX = computed(() => leftPadding + resultLineWidth.value);

const proportionalDifference = computed(() =>
  Number((props.resultMeasureCm - props.baseMeasureCm).toFixed(2))
);

const visualRatio = computed(() =>
  Number((props.resultMeasureCm / props.baseMeasureCm).toFixed(2))
);

function calculateLineWidth(measureCm) {
  if (!maxMeasure.value || maxMeasure.value <= 0) {
    return 0;
  }

  return (measureCm / maxMeasure.value) * maxDrawableWidth;
}
</script>

<template>
  <section class="proportion-grid" aria-label="Retícula proporcional del cálculo">
    <div class="proportion-grid__header">
      <div>
        <p class="proportion-grid__label">Retícula proporcional</p>
        <h3>Lectura visual del cálculo</h3>
      </div>

      <div class="proportion-grid__ratio">
        {{ ratioLabel }}
      </div>
    </div>

    <div class="proportion-grid__canvas">
      <svg
        class="proportion-grid__svg"
        viewBox="0 0 720 320"
        role="img"
        aria-label="Comparación visual entre medida base y medida proporcional"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="rgba(22, 56, 50, 0.08)"
              stroke-width="1"
            />
          </pattern>

          <pattern
            id="largeGrid"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            <rect width="96" height="96" fill="url(#smallGrid)" />
            <path
              d="M 96 0 L 0 0 0 96"
              fill="none"
              stroke="rgba(22, 56, 50, 0.14)"
              stroke-width="1"
            />
          </pattern>
        </defs>

        <rect
          width="720"
          height="320"
          rx="24"
          fill="url(#largeGrid)"
        />

        <line
          :x1="leftPadding"
          :y1="topPadding"
          :x2="leftPadding"
          :y2="topPadding + rowHeight + 80"
          stroke="rgba(22, 56, 50, 0.32)"
          stroke-width="2"
          stroke-dasharray="6 8"
        />

        <text
          :x="leftPadding"
          :y="topPadding - 24"
          class="proportion-grid__svg-note"
        >
          origen común
        </text>

        <g>
          <text
            :x="leftPadding"
            :y="topPadding + 6"
            class="proportion-grid__svg-title"
          >
            Medida base
          </text>

          <line
            :x1="leftPadding"
            :y1="topPadding + 34"
            :x2="baseEndX"
            :y2="topPadding + 34"
            stroke="rgba(22, 56, 50, 0.92)"
            stroke-width="10"
            stroke-linecap="round"
          />

          <circle
            :cx="baseEndX"
            :cy="topPadding + 34"
            r="8"
            fill="#163832"
          />

          <text
            :x="baseEndX"
            :y="topPadding + 64"
            text-anchor="end"
            class="proportion-grid__svg-value"
          >
            {{ formatCentimeters(baseMeasureCm) }}
          </text>
        </g>

        <g>
          <text
            :x="leftPadding"
            :y="topPadding + rowHeight + 6"
            class="proportion-grid__svg-title"
          >
            Medida proporcional
          </text>

          <line
            :x1="leftPadding"
            :y1="topPadding + rowHeight + 34"
            :x2="resultEndX"
            :y2="topPadding + rowHeight + 34"
            stroke="rgba(200, 155, 60, 0.96)"
            stroke-width="10"
            stroke-linecap="round"
          />

          <circle
            :cx="resultEndX"
            :cy="topPadding + rowHeight + 34"
            r="8"
            fill="#c89b3c"
          />

          <text
            :x="resultEndX"
            :y="topPadding + rowHeight + 64"
            text-anchor="end"
            class="proportion-grid__svg-value"
          >
            {{ formatCentimeters(resultMeasureCm) }}
          </text>
        </g>

        <line
          :x1="baseEndX"
          :y1="topPadding + 34"
          :x2="baseEndX"
          :y2="topPadding + rowHeight + 34"
          stroke="rgba(22, 56, 50, 0.18)"
          stroke-width="2"
          stroke-dasharray="4 8"
        />

        <line
          :x1="resultEndX"
          :y1="topPadding + rowHeight + 34"
          :x2="resultEndX"
          :y2="topPadding + rowHeight + 92"
          stroke="rgba(200, 155, 60, 0.42)"
          stroke-width="2"
          stroke-dasharray="4 8"
        />

        <text
          :x="leftPadding"
          y="252"
          class="proportion-grid__svg-summary"
        >
          {{ ratioName }} · {{ ratioLabel }}
        </text>

        <text
          :x="leftPadding"
          y="282"
          class="proportion-grid__svg-note"
        >
          La medida proporcional se genera aplicando la relación musical sobre la unidad humana seleccionada.
        </text>
      </svg>
    </div>

    <div class="proportion-grid__data">
      <div>
        <span>Base</span>
        <strong>{{ formatCentimeters(baseMeasureCm) }}</strong>
      </div>

      <div>
        <span>Resultado</span>
        <strong>{{ formatCentimeters(resultMeasureCm) }}</strong>
      </div>

      <div>
        <span>Diferencia</span>
        <strong>{{ formatCentimeters(proportionalDifference) }}</strong>
      </div>

      <div>
        <span>Equivalencia</span>
        <strong>{{ formatMeters(resultMeasureCm / 100) }}</strong>
      </div>

      <div>
        <span>Factor visual</span>
        <strong>{{ visualRatio }}</strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proportion-grid {
  display: grid;
  gap: 20px;
  padding: 28px;
  border: 1px solid rgba(22, 56, 50, 0.1);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.proportion-grid__header {
  display: flex;
  gap: 20px;
  align-items: start;
  justify-content: space-between;
}

.proportion-grid__label {
  margin: 0 0 8px;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.proportion-grid h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.proportion-grid__ratio {
  display: inline-flex;
  min-width: 64px;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #ffffff;
  font-weight: 900;
}

.proportion-grid__canvas {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-soft);
}

.proportion-grid__svg {
  display: block;
  width: 100%;
  height: auto;
}

.proportion-grid__svg-title {
  fill: var(--color-primary);
  font-size: 15px;
  font-weight: 900;
}

.proportion-grid__svg-value {
  fill: var(--color-primary);
  font-size: 15px;
  font-weight: 900;
}

.proportion-grid__svg-summary {
  fill: var(--color-primary);
  font-size: 20px;
  font-weight: 900;
}

.proportion-grid__svg-note {
  fill: var(--color-muted);
  font-size: 13px;
  font-weight: 700;
}

.proportion-grid__data {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.proportion-grid__data div {
  display: grid;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
}

.proportion-grid__data span {
  color: var(--color-muted);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.proportion-grid__data strong {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 900;
}

@media (max-width: 860px) {
  .proportion-grid {
    padding: 22px;
  }

  .proportion-grid__header {
    flex-direction: column;
  }

  .proportion-grid__data {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .proportion-grid__data {
    grid-template-columns: 1fr;
  }
}
</style>