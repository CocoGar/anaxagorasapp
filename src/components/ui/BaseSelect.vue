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
  font-size: 0.88rem;
  font-weight: 800;
}

.base-select__control {
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #ffffff;
  color: var(--color-text);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.base-select__control:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(22, 56, 50, 0.12);
}

.base-select__control--error {
  border-color: rgba(180, 55, 55, 0.72);
  background: rgba(180, 55, 55, 0.04);
}

.base-select__control--error:focus {
  border-color: rgba(180, 55, 55, 0.9);
  box-shadow: 0 0 0 4px rgba(180, 55, 55, 0.12);
}

.base-select__message {
  color: var(--color-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

.base-select__message--error {
  color: #8f1f1f;
  font-weight: 700;
}
</style>