<template>
  <ModalChooseCity
    v-if="chooseCityModalIsVisible"
    @close="chooseCityModalIsVisible = false"
  />
  <AppButton
    class="add-btn"
    icon="plus"
    @click="chooseCityModalIsVisible = true"
  >
  </AppButton>
</template>

<script>
import AppButton from '@/components/ui/AppButton.vue'
import ModalChooseCity from '@/components/ModalChooseCity.vue'

export default {
  name: 'App',
  components: {
    AppButton,
    ModalChooseCity
  },
  data() {
    return {
      chooseCityModalIsVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  position: fixed;
  right: 45px;
  bottom: 34px;
}
</style>
