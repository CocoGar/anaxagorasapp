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
  },
  templateId: {
    type: String,
    default: 'free-composition'
  },
  templateName: {
    type: String,
    default: 'Composición libre'
  }
});

const svgWidth = 720;
const svgHeight = 360;
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

const facadeWidth = computed(() => resultLineWidth.value);
const facadeHeight = computed(() => Math.max(120, baseLineWidth.value * 0.36));
const facadeX = computed(() => leftPadding);
const facadeY = computed(() => 112);

const roomWidth = computed(() => resultLineWidth.value);
const roomHeight = computed(() => Math.max(120, baseLineWidth.value * 0.46));
const roomX = computed(() => leftPadding);
const roomY = computed(() => 96);

const furnitureWidth = computed(() => resultLineWidth.value);
const furnitureHeight = computed(() => Math.max(76, baseLineWidth.value * 0.25));
const furnitureX = computed(() => leftPadding);
const furnitureY = computed(() => 140);

const graphicWidth = computed(() => Math.min(resultLineWidth.value, 420));
const graphicHeight = computed(() => Math.max(180, graphicWidth.value * 1.25));
const graphicX = computed(() => leftPadding + 80);
const graphicY = computed(() => 56);

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
        <h3>{{ templateName }}</h3>
      </div>

      <div class="proportion-grid__ratio">
        {{ ratioLabel }}
      </div>
    </div>

    <div class="proportion-grid__canvas">
      <svg
        class="proportion-grid__svg"
        viewBox="0 0 720 360"
        role="img"
        aria-label="Representación visual proporcional según plantilla de diseño"
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
          height="360"
          rx="24"
          fill="url(#largeGrid)"
        />

        <template v-if="templateId === 'facade'">
          <text
            :x="facadeX"
            y="52"
            class="proportion-grid__svg-summary"
          >
            Fachada · ejes y ritmo compositivo
          </text>

          <line
            :x1="facadeX"
            :y1="facadeY + facadeHeight"
            :x2="facadeX + facadeWidth"
            :y2="facadeY + facadeHeight"
            stroke="rgba(22, 56, 50, 0.42)"
            stroke-width="3"
          />

          <rect
            :x="facadeX"
            :y="facadeY"
            :width="facadeWidth"
            :height="facadeHeight"
            rx="8"
            fill="rgba(255, 255, 255, 0.62)"
            stroke="rgba(22, 56, 50, 0.88)"
            stroke-width="3"
          />

          <line
            :x1="facadeX + facadeWidth / 2"
            :y1="facadeY - 28"
            :x2="facadeX + facadeWidth / 2"
            :y2="facadeY + facadeHeight + 24"
            stroke="rgba(200, 155, 60, 0.84)"
            stroke-width="2"
            stroke-dasharray="8 8"
          />

          <rect
            :x="facadeX + facadeWidth * 0.16"
            :y="facadeY + facadeHeight * 0.26"
            :width="facadeWidth * 0.16"
            :height="facadeHeight * 0.34"
            rx="4"
            fill="rgba(200, 155, 60, 0.2)"
            stroke="rgba(200, 155, 60, 0.82)"
            stroke-width="2"
          />

          <rect
            :x="facadeX + facadeWidth * 0.42"
            :y="facadeY + facadeHeight * 0.2"
            :width="facadeWidth * 0.16"
            :height="facadeHeight * 0.58"
            rx="4"
            fill="rgba(22, 56, 50, 0.12)"
            stroke="rgba(22, 56, 50, 0.58)"
            stroke-width="2"
          />

          <rect
            :x="facadeX + facadeWidth * 0.68"
            :y="facadeY + facadeHeight * 0.26"
            :width="facadeWidth * 0.16"
            :height="facadeHeight * 0.34"
            rx="4"
            fill="rgba(200, 155, 60, 0.2)"
            stroke="rgba(200, 155, 60, 0.82)"
            stroke-width="2"
          />

          <text
            :x="facadeX + facadeWidth"
            :y="facadeY + facadeHeight + 34"
            text-anchor="end"
            class="proportion-grid__svg-value"
          >
            ancho proporcional · {{ formatCentimeters(resultMeasureCm) }}
          </text>
        </template>

        <template v-else-if="templateId === 'room'">
          <text
            :x="roomX"
            y="52"
            class="proportion-grid__svg-summary"
          >
            Estancia · planta proporcional
          </text>

          <rect
            :x="roomX"
            :y="roomY"
            :width="roomWidth"
            :height="roomHeight"
            rx="10"
            fill="rgba(255, 255, 255, 0.62)"
            stroke="rgba(22, 56, 50, 0.88)"
            stroke-width="3"
          />

          <line
            :x1="roomX + roomWidth * 0.5"
            :y1="roomY"
            :x2="roomX + roomWidth * 0.5"
            :y2="roomY + roomHeight"
            stroke="rgba(200, 155, 60, 0.64)"
            stroke-width="2"
            stroke-dasharray="8 8"
          />

          <line
            :x1="roomX"
            :y1="roomY + roomHeight * 0.5"
            :x2="roomX + roomWidth"
            :y2="roomY + roomHeight * 0.5"
            stroke="rgba(200, 155, 60, 0.64)"
            stroke-width="2"
            stroke-dasharray="8 8"
          />

          <rect
            :x="roomX + roomWidth * 0.08"
            :y="roomY + roomHeight * 0.12"
            :width="roomWidth * 0.28"
            :height="roomHeight * 0.28"
            rx="6"
            fill="rgba(22, 56, 50, 0.1)"
            stroke="rgba(22, 56, 50, 0.42)"
            stroke-width="2"
          />

          <rect
            :x="roomX + roomWidth * 0.58"
            :y="roomY + roomHeight * 0.58"
            :width="roomWidth * 0.28"
            :height="roomHeight * 0.28"
            rx="6"
            fill="rgba(200, 155, 60, 0.18)"
            stroke="rgba(200, 155, 60, 0.72)"
            stroke-width="2"
          />

          <text
            :x="roomX + roomWidth"
            :y="roomY + roomHeight + 34"
            text-anchor="end"
            class="proportion-grid__svg-value"
          >
            dimensión proporcional · {{ formatCentimeters(resultMeasureCm) }}
          </text>
        </template>

        <template v-else-if="templateId === 'furniture'">
          <text
            :x="furnitureX"
            y="64"
            class="proportion-grid__svg-summary"
          >
            Mueble · módulo y pieza
          </text>

          <rect
            :x="furnitureX"
            :y="furnitureY"
            :width="furnitureWidth"
            :height="furnitureHeight"
            rx="16"
            fill="rgba(255, 255, 255, 0.68)"
            stroke="rgba(22, 56, 50, 0.88)"
            stroke-width="3"
          />

          <line
            :x1="furnitureX + furnitureWidth * 0.25"
            :y1="furnitureY"
            :x2="furnitureX + furnitureWidth * 0.25"
            :y2="furnitureY + furnitureHeight"
            stroke="rgba(200, 155, 60, 0.72)"
            stroke-width="2"
          />

          <line
            :x1="furnitureX + furnitureWidth * 0.75"
            :y1="furnitureY"
            :x2="furnitureX + furnitureWidth * 0.75"
            :y2="furnitureY + furnitureHeight"
            stroke="rgba(200, 155, 60, 0.72)"
            stroke-width="2"
          />

          <circle
            :cx="furnitureX + furnitureWidth * 0.5"
            :cy="furnitureY + furnitureHeight * 0.5"
            r="18"
            fill="rgba(200, 155, 60, 0.24)"
            stroke="rgba(200, 155, 60, 0.88)"
            stroke-width="2"
          />

          <line
            :x1="furnitureX + 24"
            :y1="furnitureY + furnitureHeight + 32"
            :x2="furnitureX + furnitureWidth - 24"
            :y2="furnitureY + furnitureHeight + 32"
            stroke="rgba(22, 56, 50, 0.72)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <text
            :x="furnitureX + furnitureWidth"
            :y="furnitureY + furnitureHeight + 66"
            text-anchor="end"
            class="proportion-grid__svg-value"
          >
            módulo proporcional · {{ formatCentimeters(resultMeasureCm) }}
          </text>
        </template>

        <template v-else-if="templateId === 'graphic'">
          <text
            :x="leftPadding"
            y="42"
            class="proportion-grid__svg-summary"
          >
            Diseño gráfico · retícula visual
          </text>

          <rect
            :x="graphicX"
            :y="graphicY"
            :width="graphicWidth"
            :height="graphicHeight"
            rx="10"
            fill="rgba(255, 255, 255, 0.74)"
            stroke="rgba(22, 56, 50, 0.88)"
            stroke-width="3"
          />

          <line
            :x1="graphicX + graphicWidth * 0.33"
            :y1="graphicY"
            :x2="graphicX + graphicWidth * 0.33"
            :y2="graphicY + graphicHeight"
            stroke="rgba(200, 155, 60, 0.62)"
            stroke-width="2"
          />

          <line
            :x1="graphicX + graphicWidth * 0.66"
            :y1="graphicY"
            :x2="graphicX + graphicWidth * 0.66"
            :y2="graphicY + graphicHeight"
            stroke="rgba(200, 155, 60, 0.62)"
            stroke-width="2"
          />

          <line
            :x1="graphicX"
            :y1="graphicY + graphicHeight * 0.38"
            :x2="graphicX + graphicWidth"
            :y2="graphicY + graphicHeight * 0.38"
            stroke="rgba(22, 56, 50, 0.26)"
            stroke-width="2"
          />

          <line
            :x1="graphicX"
            :y1="graphicY + graphicHeight * 0.72"
            :x2="graphicX + graphicWidth"
            :y2="graphicY + graphicHeight * 0.72"
            stroke="rgba(22, 56, 50, 0.26)"
            stroke-width="2"
          />

          <rect
            :x="graphicX + graphicWidth * 0.1"
            :y="graphicY + graphicHeight * 0.1"
            :width="graphicWidth * 0.48"
            :height="graphicHeight * 0.16"
            rx="6"
            fill="rgba(22, 56, 50, 0.14)"
          />

          <rect
            :x="graphicX + graphicWidth * 0.1"
            :y="graphicY + graphicHeight * 0.46"
            :width="graphicWidth * 0.78"
            :height="graphicHeight * 0.1"
            rx="6"
            fill="rgba(200, 155, 60, 0.24)"
          />

          <text
            :x="graphicX + graphicWidth"
            :y="graphicY + graphicHeight + 28"
            text-anchor="end"
            class="proportion-grid__svg-value"
          >
            ancho proporcional · {{ formatCentimeters(resultMeasureCm) }}
          </text>
        </template>

        <template v-else>
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

          <text
            :x="leftPadding"
            y="270"
            class="proportion-grid__svg-summary"
          >
            {{ ratioName }} · {{ ratioLabel }}
          </text>
        </template>
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