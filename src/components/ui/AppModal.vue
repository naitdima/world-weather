<template>
  <teleport to="body">
    <div class="app-modal">
      <div class="app-modal__overlay"></div>
      <div class="app-modal__container" v-bind="$attrs">
        <h5 class="app-modal__title">{{ title }}</h5>
        <p class="app-modal__description">{{ description }}</p>
        <slot/>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    title: String,
    description: String
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-modal__container {
  position: relative;
  padding: 24px;
  background: var(--color-white);
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.14), 0 6px 30px rgba(0, 0, 0, 0.12), 0 8px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  @media (max-width: $viewport-tablet) {
    padding: 14px;
  }
}

.app-modal__title {
  font-size: 32px;
  line-height: 38px;
  font-weight: 700;
  color: var(--color-text-primary);

  @media (max-width: $viewport-tablet) {
    font-size: 24px;
    line-height: 28px;
  }
}

.app-modal__description {
  margin-top: 16px;
  font-size: 24px;
  line-height: 24px;
  color: var(--color-text-regular);

  @media (max-width: $viewport-tablet) {
    margin-top: 8px;
    font-size: 18px;
    line-height: 24px;
  }
}

.app-modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(11, 11, 11, 0.5);
}
</style>
