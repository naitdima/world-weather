<template>
  <div
    :class="['app-input', { 'app-input_error': error }]"
  >
    <input
      ref="input"
      class="app-input__input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <p
      v-if="error"
      class="app-input__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    modelValue: String,
    placeholder: String,
    error: String,
  },
  emits: ['update:modelValue'],
  methods: {
    focus() {
      this.$refs.input?.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-input {
  &_error {
    .app-input__input {
      border-color: var(--color-error);
    }
  }
}

.app-input__input {
  width: 100%;
  display: block;
  height: 57px;
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
  padding: 16px 0;
  color: var(--color-text-primary);
  border: none;
  border-bottom: 1px solid var(--color-text-primary);
  outline: none;

  &::placeholder {
    color: var(--color-text-placeholder);
  }
}

.app-input__error {
  width: 100%;
  margin-top: 12px;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-error);
}
</style>
