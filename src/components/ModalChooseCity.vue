<template>
  <AppModal
      class="modal-choose-city"
      title="Choose a city"
      description="To find city start typing and pick one from the suggestions"
  >
    <AppInput
      class="modal-choose-city__input"
      v-model="city"
      placeholder="Search city"
    />
    <div class="modal-choose-city__actions">
      <AppButton
        class="modal-choose-city__action"
        @click="clear"
      >
        Clear
      </AppButton>
      <AppButton
        class="modal-choose-city__action"
        type="primary"
        @click="$emit('close')"
      >
        Cancel
      </AppButton>
      <AppButton class="modal-choose-city__action">
        Add
      </AppButton>
    </div>
  </AppModal>
</template>

<script>
import AppModal from '@/components/ui/AppModal.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  name: 'ModalChooseCity',
  emits: ['close'],
  components: {
    AppModal,
    AppInput,
    AppButton
  },
  data() {
    return {
      city: ''
    }
  },
  methods: {
    clear() {
      this.city = ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-global(.modal-choose-city) {
  width: 751px;
}

.modal-choose-city__input {
  margin-top: 51px;
  width: 100%;
  margin-bottom: 140px;
}

.modal-choose-city__actions {
  display: flex;
  align-items: center;
}

.modal-choose-city__action {
  &:nth-child(2) {
    margin-left: auto;
  }

  &:not(:last-child) {
    margin-right: 31px;
  }
}
</style>