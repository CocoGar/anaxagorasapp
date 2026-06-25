<script setup>
defineProps({
  tone: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'accent', 'primary'].includes(value)
  }
});
</script>

<template>
  <span class="base-badge" :class="`base-badge--${tone}`">
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  width: fit-content;
  min-height: 28px;
  align-items: center;
  padding: 0 11px;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.16em;
  line-height: 1;
  text-transform: uppercase;
}

.base-badge--default {
  border-color: rgba(20, 36, 31, 0.12);
  background: rgba(255, 252, 246, 0.54);
  color: var(--color-muted-strong);
}

.base-badge--accent {
  border-color: rgba(183, 138, 82, 0.34);
  background: rgba(183, 138, 82, 0.11);
  color: var(--color-accent-strong);
}

.base-badge--primary {
  border-color: rgba(20, 36, 31, 0.16);
  background: rgba(20, 36, 31, 0.06);
  color: var(--color-primary);
}
</style>