<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  helperText: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label class="base-select" :for="id">
    <span class="base-select__label">{{ label }}</span>

    <select
      :id="id"
      class="base-select__control"
      :class="{ 'base-select__control--error': errorMessage }"
      :value="modelValue"
      :aria-invalid="Boolean(errorMessage)"
      :aria-describedby="helperText || errorMessage ? `${id}-message` : null"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <span
      v-if="errorMessage || helperText"
      :id="`${id}-message`"
      class="base-select__message"
      :class="{ 'base-select__message--error': errorMessage }"
    >
      {{ errorMessage || helperText }}
    </span>
  </label>
</template>

<style scoped>
.base-select {
  display: grid;
  gap: 8px;
}

.base-select__label {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.base-select__control {
  width: 100%;
  min-height: 48px;
  padding: 0 42px 0 14px;
  border: 1px solid rgba(20, 36, 31, 0.16);
  border-radius: 4px;
  appearance: none;
  background:
    linear-gradient(45deg, transparent 50%, var(--color-primary) 50%) right 18px center / 7px 7px no-repeat,
    linear-gradient(135deg, var(--color-primary) 50%, transparent 50%) right 12px center / 7px 7px no-repeat,
    rgba(255, 252, 246, 0.78);
  color: var(--color-primary);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.base-select__control:hover {
  border-color: rgba(20, 36, 31, 0.26);
  background-color: rgba(255, 252, 246, 0.94);
}

.base-select__control:focus {
  border-color: rgba(183, 138, 82, 0.78);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-focus);
}

.base-select__control--error {
  border-color: rgba(185, 74, 66, 0.72);
  background-color: var(--color-error-soft);
}

.base-select__control--error:focus {
  border-color: rgba(185, 74, 66, 0.9);
  box-shadow: 0 0 0 4px rgba(185, 74, 66, 0.14);
}

.base-select__message {
  color: var(--color-muted);
  font-size: 0.8rem;
  line-height: 1.45;
}

.base-select__message--error {
  color: var(--color-error);
  font-weight: 780;
}
</style>