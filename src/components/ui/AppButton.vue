<template>
  <button :class="className">
    <svg-icon
      v-if="icon"
      class="app-button__icon"
      name="plus"
    />
    <slot v-else />
  </button>
</template>

<script>
import SvgIcon from '@/components/ui/SvgIcon.vue'

export default {
  name: 'AppButton',
  components: {
    SvgIcon
  },
  props: {
    type: {
      type: String,
      validate(value) {
        return ['primary'].includes(value)
      }
    },
    icon: String
  },
  computed: {
    className() {
      const classes = ['app-button']
      if (this.type) {
        classes.push(`app-button_${this.type}`)
      }
      if (this.icon) {
        classes.push('app-button_icon')
      }
      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.app-button {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-placeholder);
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: transparent;

  @media (max-width: $viewport-tablet) {
    font-size: 14px;
    line-height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &_primary {
    color: var(--color-primary);
  }

  &_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background-color: var(--color-primary);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 50px;

    @media (max-width: $viewport-tablet) {
      width: 50px;
      height: 50px;
    }
  }
}

.app-button__icon {
  width: 14px;
  height: 14px;
  fill: var(--color-white);

  @media (max-width: $viewport-tablet) {
    width: 12px;
    height: 12px;
  }
}
</style>
