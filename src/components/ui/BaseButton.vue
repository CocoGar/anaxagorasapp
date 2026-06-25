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
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    class="base-button"
    :class="`base-button--${variant}`"
    :type="type"
    :disabled="disabled"
  >
    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border: 1px solid transparent;
  border-radius: 6px;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  appearance: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;
}

.base-button__content {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.base-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.base-button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.base-button--primary {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-surface);
  box-shadow: 0 14px 30px rgba(20, 36, 31, 0.16);
}

.base-button--primary:hover:not(:disabled) {
  box-shadow: 0 18px 42px rgba(20, 36, 31, 0.22);
}

.base-button--secondary {
  border-color: rgba(20, 36, 31, 0.2);
  background: rgba(255, 252, 246, 0.64);
  color: var(--color-primary);
}

.base-button--secondary:hover:not(:disabled) {
  border-color: rgba(183, 138, 82, 0.58);
  background: var(--color-surface);
}

.base-button--ghost {
  border-color: transparent;
  background: transparent;
  color: var(--color-primary);
}

.base-button--ghost:hover:not(:disabled) {
  border-color: rgba(20, 36, 31, 0.12);
  background: rgba(20, 36, 31, 0.04);
}
</style>