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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  inputMode: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label class="base-input" :for="id">
    <span class="base-input__label">{{ label }}</span>

    <input
      :id="id"
      class="base-input__control"
      :class="{ 'base-input__control--error': errorMessage }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :inputmode="inputMode || null"
      :aria-invalid="Boolean(errorMessage)"
      :aria-describedby="helperText || errorMessage ? `${id}-message` : null"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <span
      v-if="errorMessage || helperText"
      :id="`${id}-message`"
      class="base-input__message"
      :class="{ 'base-input__message--error': errorMessage }"
    >
      {{ errorMessage || helperText }}
    </span>
  </label>
</template>

<style scoped>
.base-input {
  display: grid;
  gap: 8px;
}

.base-input__label {
  color: var(--color-primary);
  font-size: 0.88rem;
  font-weight: 800;
}

.base-input__control {
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

.base-input__control:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(22, 56, 50, 0.12);
}

.base-input__control--error {
  border-color: rgba(180, 55, 55, 0.72);
  background: rgba(180, 55, 55, 0.04);
}

.base-input__control--error:focus {
  border-color: rgba(180, 55, 55, 0.9);
  box-shadow: 0 0 0 4px rgba(180, 55, 55, 0.12);
}

.base-input__message {
  color: var(--color-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

.base-input__message--error {
  color: #8f1f1f;
  font-weight: 700;
}
</style>