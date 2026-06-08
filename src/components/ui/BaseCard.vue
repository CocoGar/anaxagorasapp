<template>
  <article class="base-card">
    <slot />
  </article>
</template>

<style scoped>
.base-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}
</style>