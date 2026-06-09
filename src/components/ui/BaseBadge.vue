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
  min-height: 30px;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1;
}

.base-badge--default {
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-muted);
}

.base-badge--accent {
  background: rgba(200, 155, 60, 0.12);
  color: #8a651d;
}

.base-badge--primary {
  background: rgba(22, 56, 50, 0.1);
  color: var(--color-primary);
}
</style>