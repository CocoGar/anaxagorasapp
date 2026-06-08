<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  }
});
</script>

<template>
  <button
    class="base-button"
    :class="`base-button--${variant}`"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 800;
  line-height: 1;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.base-button:hover {
  transform: translateY(-1px);
}

.base-button:focus-visible {
  outline: 4px solid rgba(200, 155, 60, 0.26);
  outline-offset: 3px;
}

.base-button--primary {
  background: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(22, 56, 50, 0.22);
}

.base-button--primary:hover {
  box-shadow: 0 16px 36px rgba(22, 56, 50, 0.28);
}

.base-button--secondary {
  border-color: var(--color-border);
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-primary);
}

.base-button--secondary:hover {
  border-color: rgba(22, 56, 50, 0.24);
  background: #ffffff;
}

.base-button--ghost {
  background: transparent;
  color: var(--color-primary);
}

.base-button--ghost:hover {
  background: rgba(22, 56, 50, 0.06);
}
</style>