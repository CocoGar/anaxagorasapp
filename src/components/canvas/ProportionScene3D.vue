<script setup>
import { computed } from 'vue';

import {
  formatCentimeters,
  formatMeters
} from '../../utils/numberFormat';

import { createProportionGeometry } from '../../core/proportionGeometry';

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

const sceneGeometry = computed(() =>
  createProportionGeometry({
    templateId: props.templateId,
    baseMeasureCm: props.baseMeasureCm,
    resultMeasureCm: props.resultMeasureCm
  })
);

const baseScene = computed(() =>
  createProjectedBox(110, 392, sceneGeometry.value.baseObject)
);

const resultScene = computed(() =>
  createProjectedBox(500, 392, sceneGeometry.value.resultObject)
);

const baseDecorations = computed(() =>
  createTemplateDecorations(baseScene.value, props.templateId)
);

const resultDecorations = computed(() =>
  createTemplateDecorations(resultScene.value, props.templateId)
);

const proportionalDifference = computed(() =>
  Number((props.resultMeasureCm - props.baseMeasureCm).toFixed(2))
);

const visualFactor = computed(() =>
  Number((props.resultMeasureCm / props.baseMeasureCm).toFixed(2))
);

function round(value) {
  return Math.round(value);
}

function pointsToString(points) {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

function createProjectedBox(originX, originY, box) {
  const depthOffsetX = round(box.projectedDepth * 0.62);
  const depthOffsetY = round(box.projectedDepth * 0.38);

  const frontBottomLeft = { x: originX, y: originY };
  const frontBottomRight = { x: originX + box.projectedWidth, y: originY };
  const frontTopLeft = { x: originX, y: originY - box.projectedHeight };
  const frontTopRight = {
    x: originX + box.projectedWidth,
    y: originY - box.projectedHeight
  };

  const backBottomLeft = {
    x: originX + depthOffsetX,
    y: originY - depthOffsetY
  };
  const backBottomRight = {
    x: originX + box.projectedWidth + depthOffsetX,
    y: originY - depthOffsetY
  };
  const backTopLeft = {
    x: originX + depthOffsetX,
    y: originY - box.projectedHeight - depthOffsetY
  };
  const backTopRight = {
    x: originX + box.projectedWidth + depthOffsetX,
    y: originY - box.projectedHeight - depthOffsetY
  };

  return {
    ...box,
    depthOffsetX,
    depthOffsetY,
    frontFace: {
      x: frontTopLeft.x,
      y: frontTopLeft.y,
      width: box.projectedWidth,
      height: box.projectedHeight
    },
    frontBottomLeft,
    frontBottomRight,
    frontTopLeft,
    frontTopRight,
    backBottomLeft,
    backBottomRight,
    backTopLeft,
    backTopRight,
    frontFacePoints: pointsToString([
      frontTopLeft,
      frontTopRight,
      frontBottomRight,
      frontBottomLeft
    ]),
    sideFacePoints: pointsToString([
      frontTopRight,
      backTopRight,
      backBottomRight,
      frontBottomRight
    ]),
    topFacePoints: pointsToString([
      frontTopLeft,
      frontTopRight,
      backTopRight,
      backTopLeft
    ]),
    widthLabelX: originX + box.projectedWidth / 2,
    widthLabelY: originY + 34,
    heightLabelX: originX - 24,
    heightLabelY: originY - box.projectedHeight / 2,
    depthLabelX: originX + box.projectedWidth + depthOffsetX + 34,
    depthLabelY: originY - depthOffsetY / 2
  };
}

function createTemplateDecorations(layout, templateId) {
  const x = layout.frontFace.x;
  const y = layout.frontFace.y;
  const width = layout.frontFace.width;
  const height = layout.frontFace.height;

  const decorations = {
    lines: [],
    rects: [],
    circles: []
  };

  if (templateId === 'facade') {
    decorations.lines.push({
      x1: x + width * 0.5,
      y1: y - 20,
      x2: x + width * 0.5,
      y2: y + height + 20,
      stroke: 'rgba(200, 155, 60, 0.82)',
      strokeWidth: 2,
      dasharray: '8 8'
    });

    decorations.rects.push(
      {
        x: x + width * 0.14,
        y: y + height * 0.24,
        width: width * 0.16,
        height: height * 0.28
      },
      {
        x: x + width * 0.42,
        y: y + height * 0.16,
        width: width * 0.16,
        height: height * 0.56
      },
      {
        x: x + width * 0.70,
        y: y + height * 0.24,
        width: width * 0.16,
        height: height * 0.28
      }
    );
  }

  if (templateId === 'room') {
    decorations.lines.push(
      {
        x1: x + width * 0.5,
        y1: y,
        x2: x + width * 0.5,
        y2: y + height,
        stroke: 'rgba(200, 155, 60, 0.74)',
        strokeWidth: 2,
        dasharray: '8 8'
      },
      {
        x1: x,
        y1: y + height * 0.5,
        x2: x + width,
        y2: y + height * 0.5,
        stroke: 'rgba(200, 155, 60, 0.74)',
        strokeWidth: 2,
        dasharray: '8 8'
      }
    );

    decorations.rects.push(
      {
        x: x + width * 0.10,
        y: y + height * 0.12,
        width: width * 0.26,
        height: height * 0.24
      },
      {
        x: x + width * 0.58,
        y: y + height * 0.58,
        width: width * 0.24,
        height: height * 0.20
      }
    );
  }

  if (templateId === 'furniture') {
    decorations.lines.push(
      {
        x1: x + width * 0.25,
        y1: y,
        x2: x + width * 0.25,
        y2: y + height,
        stroke: 'rgba(200, 155, 60, 0.78)',
        strokeWidth: 2,
        dasharray: ''
      },
      {
        x1: x + width * 0.75,
        y1: y,
        x2: x + width * 0.75,
        y2: y + height,
        stroke: 'rgba(200, 155, 60, 0.78)',
        strokeWidth: 2,
        dasharray: ''
      }
    );

    decorations.circles.push({
      cx: x + width * 0.5,
      cy: y + height * 0.5,
      r: Math.max(10, width * 0.06)
    });
  }

  if (templateId === 'graphic') {
    decorations.lines.push(
      {
        x1: x + width * 0.33,
        y1: y,
        x2: x + width * 0.33,
        y2: y + height,
        stroke: 'rgba(200, 155, 60, 0.72)',
        strokeWidth: 2,
        dasharray: ''
      },
      {
        x1: x + width * 0.66,
        y1: y,
        x2: x + width * 0.66,
        y2: y + height,
        stroke: 'rgba(200, 155, 60, 0.72)',
        strokeWidth: 2,
        dasharray: ''
      },
      {
        x1: x,
        y1: y + height * 0.38,
        x2: x + width,
        y2: y + height * 0.38,
        stroke: 'rgba(22, 56, 50, 0.26)',
        strokeWidth: 2,
        dasharray: ''
      },
      {
        x1: x,
        y1: y + height * 0.72,
        x2: x + width,
        y2: y + height * 0.72,
        stroke: 'rgba(22, 56, 50, 0.26)',
        strokeWidth: 2,
        dasharray: ''
      }
    );

    decorations.rects.push(
      {
        x: x + width * 0.10,
        y: y + height * 0.10,
        width: width * 0.48,
        height: height * 0.10
      },
      {
        x: x + width * 0.10,
        y: y + height * 0.47,
        width: width * 0.78,
        height: height * 0.08
      }
    );
  }

  if (templateId === 'free-composition') {
    decorations.lines.push({
      x1: x + width * 0.18,
      y1: y + height * 0.78,
      x2: x + width * 0.82,
      y2: y + height * 0.22,
      stroke: 'rgba(200, 155, 60, 0.82)',
      strokeWidth: 2,
      dasharray: ''
    });

    decorations.rects.push({
      x: x + width * 0.18,
      y: y + height * 0.18,
      width: width * 0.28,
      height: height * 0.24
    });
  }

  return decorations;
}
</script>

<template>
  <section class="proportion-scene" aria-label="Vista espacial tridimensional del cálculo">
    <div class="proportion-scene__header">
      <div>
        <p class="proportion-scene__label">Vista espacial 3D</p>
        <h3>{{ sceneGeometry.sceneTitle }}</h3>
        <p class="proportion-scene__description">
          {{ sceneGeometry.sceneDescription }}
        </p>
      </div>

      <div class="proportion-scene__ratio">
        {{ ratioLabel }}
      </div>
    </div>

    <div class="proportion-scene__canvas">
      <svg
        class="proportion-scene__svg"
        viewBox="0 0 940 560"
        role="img"
        aria-label="Comparación espacial 3D entre medida base y medida proporcional"
      >
        <defs>
          <linearGradient id="baseFrontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(22, 56, 50, 0.96)" />
            <stop offset="100%" stop-color="rgba(22, 56, 50, 0.76)" />
          </linearGradient>

          <linearGradient id="baseSideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(22, 56, 50, 0.72)" />
            <stop offset="100%" stop-color="rgba(22, 56, 50, 0.54)" />
          </linearGradient>

          <linearGradient id="baseTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(22, 56, 50, 0.34)" />
            <stop offset="100%" stop-color="rgba(22, 56, 50, 0.18)" />
          </linearGradient>

          <linearGradient id="resultFrontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(200, 155, 60, 0.98)" />
            <stop offset="100%" stop-color="rgba(200, 155, 60, 0.84)" />
          </linearGradient>

          <linearGradient id="resultSideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(200, 155, 60, 0.80)" />
            <stop offset="100%" stop-color="rgba(200, 155, 60, 0.62)" />
          </linearGradient>

          <linearGradient id="resultTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(200, 155, 60, 0.36)" />
            <stop offset="100%" stop-color="rgba(200, 155, 60, 0.18)" />
          </linearGradient>

          <pattern id="sceneGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(22, 56, 50, 0.08)"
              stroke-width="1"
            />
          </pattern>

          <marker
            id="arrowHead"
            markerWidth="8"
            markerHeight="8"
            refX="5"
            refY="4"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="rgba(200, 155, 60, 0.92)" />
          </marker>
        </defs>

        <rect
          x="0"
          y="0"
          width="940"
          height="560"
          rx="24"
          fill="url(#sceneGrid)"
        />

        <line
          x1="60"
          y1="422"
          x2="880"
          y2="422"
          stroke="rgba(22, 56, 50, 0.22)"
          stroke-width="2"
          stroke-dasharray="10 10"
        />

        <text x="110" y="70" class="proportion-scene__svg-title">
          Medida base
        </text>

        <text x="500" y="70" class="proportion-scene__svg-title">
          Medida proporcional
        </text>

        <line
          x1="380"
          y1="170"
          x2="460"
          y2="170"
          stroke="rgba(200, 155, 60, 0.92)"
          stroke-width="4"
          marker-end="url(#arrowHead)"
        />

        <text x="420" y="150" text-anchor="middle" class="proportion-scene__svg-ratio-note">
          {{ ratioName }} · {{ ratioLabel }}
        </text>

        <g>
          <polygon
            :points="baseScene.topFacePoints"
            fill="url(#baseTopGradient)"
            stroke="rgba(22, 56, 50, 0.82)"
            stroke-width="2"
          />

          <polygon
            :points="baseScene.sideFacePoints"
            fill="url(#baseSideGradient)"
            stroke="rgba(22, 56, 50, 0.82)"
            stroke-width="2"
          />

          <polygon
            :points="baseScene.frontFacePoints"
            fill="url(#baseFrontGradient)"
            stroke="rgba(22, 56, 50, 0.92)"
            stroke-width="2.5"
          />

          <line
            v-for="(line, index) in baseDecorations.lines"
            :key="`base-line-${index}`"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            :stroke="line.stroke"
            :stroke-width="line.strokeWidth"
            :stroke-dasharray="line.dasharray"
          />

          <rect
            v-for="(rect, index) in baseDecorations.rects"
            :key="`base-rect-${index}`"
            :x="rect.x"
            :y="rect.y"
            :width="rect.width"
            :height="rect.height"
            rx="6"
            fill="rgba(255, 255, 255, 0.14)"
            stroke="rgba(255, 255, 255, 0.46)"
            stroke-width="1.5"
          />

          <circle
            v-for="(circle, index) in baseDecorations.circles"
            :key="`base-circle-${index}`"
            :cx="circle.cx"
            :cy="circle.cy"
            :r="circle.r"
            fill="rgba(255, 255, 255, 0.12)"
            stroke="rgba(255, 255, 255, 0.44)"
            stroke-width="1.5"
          />

          <line
            :x1="baseScene.frontBottomLeft.x"
            :y1="baseScene.widthLabelY - 10"
            :x2="baseScene.frontBottomRight.x"
            :y2="baseScene.widthLabelY - 10"
            stroke="rgba(22, 56, 50, 0.72)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <line
            :x1="baseScene.frontBottomLeft.x"
            :y1="baseScene.frontBottomLeft.y"
            :x2="baseScene.frontTopLeft.x"
            :y2="baseScene.frontTopLeft.y"
            stroke="rgba(200, 155, 60, 0.62)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <line
            :x1="baseScene.frontBottomRight.x"
            :y1="baseScene.frontBottomRight.y"
            :x2="baseScene.backBottomRight.x"
            :y2="baseScene.backBottomRight.y"
            stroke="rgba(200, 155, 60, 0.62)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <text
            :x="baseScene.widthLabelX"
            :y="baseScene.widthLabelY + 14"
            text-anchor="middle"
            class="proportion-scene__svg-measure"
          >
            {{ formatCentimeters(sceneGeometry.baseObject.widthCm) }}
          </text>

          <text
            :x="baseScene.heightLabelX"
            :y="baseScene.heightLabelY"
            text-anchor="middle"
            class="proportion-scene__svg-measure proportion-scene__svg-measure--vertical"
          >
            {{ formatCentimeters(sceneGeometry.baseObject.heightCm) }}
          </text>

          <text
            :x="baseScene.depthLabelX"
            :y="baseScene.depthLabelY"
            text-anchor="middle"
            class="proportion-scene__svg-measure"
          >
            {{ formatCentimeters(sceneGeometry.baseObject.depthCm) }}
          </text>
        </g>

        <g>
          <polygon
            :points="resultScene.topFacePoints"
            fill="url(#resultTopGradient)"
            stroke="rgba(200, 155, 60, 0.84)"
            stroke-width="2"
          />

          <polygon
            :points="resultScene.sideFacePoints"
            fill="url(#resultSideGradient)"
            stroke="rgba(200, 155, 60, 0.84)"
            stroke-width="2"
          />

          <polygon
            :points="resultScene.frontFacePoints"
            fill="url(#resultFrontGradient)"
            stroke="rgba(200, 155, 60, 0.96)"
            stroke-width="2.5"
          />

          <line
            v-for="(line, index) in resultDecorations.lines"
            :key="`result-line-${index}`"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            :stroke="line.stroke"
            :stroke-width="line.strokeWidth"
            :stroke-dasharray="line.dasharray"
          />

          <rect
            v-for="(rect, index) in resultDecorations.rects"
            :key="`result-rect-${index}`"
            :x="rect.x"
            :y="rect.y"
            :width="rect.width"
            :height="rect.height"
            rx="6"
            fill="rgba(255, 255, 255, 0.18)"
            stroke="rgba(255, 255, 255, 0.52)"
            stroke-width="1.5"
          />

          <circle
            v-for="(circle, index) in resultDecorations.circles"
            :key="`result-circle-${index}`"
            :cx="circle.cx"
            :cy="circle.cy"
            :r="circle.r"
            fill="rgba(255, 255, 255, 0.14)"
            stroke="rgba(255, 255, 255, 0.48)"
            stroke-width="1.5"
          />

          <line
            :x1="resultScene.frontBottomLeft.x"
            :y1="resultScene.widthLabelY - 10"
            :x2="resultScene.frontBottomRight.x"
            :y2="resultScene.widthLabelY - 10"
            stroke="rgba(22, 56, 50, 0.72)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <line
            :x1="resultScene.frontBottomLeft.x"
            :y1="resultScene.frontBottomLeft.y"
            :x2="resultScene.frontTopLeft.x"
            :y2="resultScene.frontTopLeft.y"
            stroke="rgba(22, 56, 50, 0.62)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <line
            :x1="resultScene.frontBottomRight.x"
            :y1="resultScene.frontBottomRight.y"
            :x2="resultScene.backBottomRight.x"
            :y2="resultScene.backBottomRight.y"
            stroke="rgba(22, 56, 50, 0.62)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <text
            :x="resultScene.widthLabelX"
            :y="resultScene.widthLabelY + 14"
            text-anchor="middle"
            class="proportion-scene__svg-measure"
          >
            {{ formatCentimeters(sceneGeometry.resultObject.widthCm) }}
          </text>

          <text
            :x="resultScene.heightLabelX"
            :y="resultScene.heightLabelY"
            text-anchor="middle"
            class="proportion-scene__svg-measure proportion-scene__svg-measure--vertical"
          >
            {{ formatCentimeters(sceneGeometry.resultObject.heightCm) }}
          </text>

          <text
            :x="resultScene.depthLabelX"
            :y="resultScene.depthLabelY"
            text-anchor="middle"
            class="proportion-scene__svg-measure"
          >
            {{ formatCentimeters(sceneGeometry.resultObject.depthCm) }}
          </text>
        </g>
      </svg>
    </div>

    <div class="proportion-scene__dimensions">
      <article>
        <span>Objeto base</span>
        <strong>{{ formatCentimeters(baseMeasureCm) }}</strong>
        <p>
          {{ sceneGeometry.dimensionLabels.width }}:
          {{ formatCentimeters(sceneGeometry.baseObject.widthCm) }}
        </p>
        <p>
          {{ sceneGeometry.dimensionLabels.height }}:
          {{ formatCentimeters(sceneGeometry.baseObject.heightCm) }}
        </p>
        <p>
          {{ sceneGeometry.dimensionLabels.depth }}:
          {{ formatCentimeters(sceneGeometry.baseObject.depthCm) }}
        </p>
      </article>

      <article>
        <span>Objeto proporcional</span>
        <strong>{{ formatCentimeters(resultMeasureCm) }}</strong>
        <p>
          {{ sceneGeometry.dimensionLabels.width }}:
          {{ formatCentimeters(sceneGeometry.resultObject.widthCm) }}
        </p>
        <p>
          {{ sceneGeometry.dimensionLabels.height }}:
          {{ formatCentimeters(sceneGeometry.resultObject.heightCm) }}
        </p>
        <p>
          {{ sceneGeometry.dimensionLabels.depth }}:
          {{ formatCentimeters(sceneGeometry.resultObject.depthCm) }}
        </p>
      </article>
    </div>

    <div class="proportion-scene__data">
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
        <strong>{{ visualFactor }}</strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proportion-scene {
  display: grid;
  gap: 20px;
  padding: 28px;
  border: 1px solid rgba(22, 56, 50, 0.1);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.proportion-scene__header {
  display: flex;
  gap: 20px;
  align-items: start;
  justify-content: space-between;
}

.proportion-scene__label {
  margin: 0 0 8px;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.proportion-scene h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.proportion-scene__description {
  max-width: 620px;
  margin: 12px 0 0;
  color: var(--color-muted);
  line-height: 1.65;
}

.proportion-scene__ratio {
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

.proportion-scene__canvas {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-soft);
}

.proportion-scene__svg {
  display: block;
  width: 100%;
  height: auto;
}

.proportion-scene__svg-title {
  fill: var(--color-primary);
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.proportion-scene__svg-ratio-note {
  fill: var(--color-accent);
  font-size: 16px;
  font-weight: 900;
}

.proportion-scene__svg-measure {
  fill: var(--color-primary);
  font-size: 15px;
  font-weight: 900;
}

.proportion-scene__svg-measure--vertical {
  writing-mode: vertical-rl;
}

.proportion-scene__dimensions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.proportion-scene__dimensions article {
  display: grid;
  gap: 6px;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
}

.proportion-scene__dimensions span,
.proportion-scene__data span {
  color: var(--color-muted);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.proportion-scene__dimensions strong {
  color: var(--color-primary);
  font-size: 1.3rem;
  font-weight: 900;
}

.proportion-scene__dimensions p {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.94rem;
  font-weight: 700;
  line-height: 1.4;
}

.proportion-scene__data {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.proportion-scene__data div {
  display: grid;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
}

.proportion-scene__data strong {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 900;
}

@media (max-width: 860px) {
  .proportion-scene {
    padding: 22px;
  }

  .proportion-scene__header {
    flex-direction: column;
  }

  .proportion-scene__dimensions,
  .proportion-scene__data {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .proportion-scene__dimensions,
  .proportion-scene__data {
    grid-template-columns: 1fr;
  }
}
</style>