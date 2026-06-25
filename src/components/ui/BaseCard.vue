<template>
  <article class="base-card">
    <slot />
  </article>
</template>

<style scoped>
.base-card {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background:
    linear-gradient(145deg, rgba(255, 252, 246, 0.94), rgba(255, 255, 255, 0.76));
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.base-card::before {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 34px;
  height: 34px;
  border-top: 1px solid rgba(183, 138, 82, 0.34);
  border-left: 1px solid rgba(183, 138, 82, 0.34);
  pointer-events: none;
  content: '';
}

.base-card::after {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 34px;
  height: 34px;
  border-right: 1px solid rgba(183, 138, 82, 0.22);
  border-bottom: 1px solid rgba(183, 138, 82, 0.22);
  pointer-events: none;
  content: '';
}
</style>