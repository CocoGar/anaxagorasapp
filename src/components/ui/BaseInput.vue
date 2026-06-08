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
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
    box-shadow 0.2s ease;
}

.base-input__control:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(22, 56, 50, 0.12);
}
</style>