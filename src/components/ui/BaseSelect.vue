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
      :value="modelValue"
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
    box-shadow 0.2s ease;
}

.base-select__control:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(22, 56, 50, 0.12);
}
</style>