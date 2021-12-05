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
@import "@/assets/styles/variables.scss";

$input-height: 57px;
$error-height: 24px;
$error-margin-top: 12px;

$input-height-mobile: 40px;
$error-height-mobile: 14px;
$error-margin-top-mobile: 8px;

.app-input {
  position: relative;
  padding-bottom: calc(#{$error-height} + #{$error-margin-top});

  &_error {
    .app-input__input {
      border-color: var(--color-error);
    }
  }

  @media (max-width: $viewport-desktop) {
    padding-bottom: calc(#{$error-height-mobile} + #{$error-margin-top-mobile});
  }
}

.app-input__input {
  width: 100%;
  display: block;
  height: $input-height;
  font-size: 24px;
  font-weight: 500;
  padding: 16px 0;
  color: var(--color-text-primary);
  border: none;
  border-bottom: 1px solid var(--color-text-primary);
  outline: none;

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  @media (max-width: $viewport-desktop) {
    font-size: 18px;
    line-height: 24px;
    padding: 8px 0;
    height: $input-height-mobile;
  }
}

.app-input__error {
  position: absolute;
  top: calc(#{$input-height} + #{$error-margin-top});
  left: 0;
  width: 100%;
  font-size: 16px;
  line-height: $error-height;
  color: var(--color-error);

  @media (max-width: $viewport-desktop) {
    font-size: 12px;
    line-height: $error-height-mobile;
    top: calc(#{$input-height-mobile} + #{$error-margin-top-mobile});
  }
}
</style>
