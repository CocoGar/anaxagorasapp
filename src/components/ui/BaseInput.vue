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
    >

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
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.base-input__control {
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid rgba(20, 36, 31, 0.16);
  border-radius: 4px;
  background: rgba(255, 252, 246, 0.78);
  color: var(--color-primary);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.base-input__control::placeholder {
  color: rgba(104, 113, 108, 0.66);
}

.base-input__control:hover {
  border-color: rgba(20, 36, 31, 0.26);
  background: rgba(255, 252, 246, 0.94);
}

.base-input__control:focus {
  border-color: rgba(183, 138, 82, 0.78);
  background: var(--color-surface);
  box-shadow: var(--shadow-focus);
}

.base-input__control--error {
  border-color: rgba(185, 74, 66, 0.72);
  background: var(--color-error-soft);
}

.base-input__control--error:focus {
  border-color: rgba(185, 74, 66, 0.9);
  box-shadow: 0 0 0 4px rgba(185, 74, 66, 0.14);
}

.base-input__message {
  color: var(--color-muted);
  font-size: 0.8rem;
  line-height: 1.45;
}

.base-input__message--error {
  color: var(--color-error);
  font-weight: 780;
}
</style>