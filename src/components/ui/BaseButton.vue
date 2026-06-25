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
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 2px;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.13em;
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
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: #fff8ed;
  box-shadow: 0 12px 26px rgba(85, 58, 34, 0.16);
}

.base-button--primary:hover:not(:disabled) {
  border-color: var(--color-accent-strong);
  background: var(--color-accent-strong);
  box-shadow: 0 16px 34px rgba(85, 58, 34, 0.22);
}

.base-button--secondary {
  border-color: rgba(43, 41, 35, 0.22);
  background: rgba(248, 242, 232, 0.58);
  color: var(--color-primary);
}

.base-button--secondary:hover:not(:disabled) {
  border-color: var(--color-accent);
  background: rgba(248, 242, 232, 0.94);
}

.base-button--ghost {
  border-color: transparent;
  background: transparent;
  color: var(--color-primary);
}

.base-button--ghost:hover:not(:disabled) {
  border-color: rgba(43, 41, 35, 0.14);
  background: rgba(248, 242, 232, 0.42);
}
</style>