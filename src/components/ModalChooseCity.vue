<template>
  <app-modal
    class="modal-choose-city"
    title="Choose a city"
    description="To find city start typing and pick one from the suggestions"
  >
    <app-input
      ref="input"
      class="modal-choose-city__input"
      v-model="v$.name.$model"
      :error="inputError"
      placeholder="Search city"
    />
    <div class="modal-choose-city__actions">
      <app-button
        class="modal-choose-city__action"
        @click="clear"
      >
        Clear
      </app-button>
      <app-button
        class="modal-choose-city__action"
        type="primary"
        @click="close"
      >
        Cancel
      </app-button>
      <app-button
        class="modal-choose-city__action"
        @click="add"
      >
        Add
      </app-button>
    </div>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  name: 'ModalChooseCity',
  emits: ['close', 'add'],
  components: {
    AppModal,
    AppInput,
    AppButton
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: ''
    }
  },
  validations () {
    return {
      name: {
        required: helpers.withMessage('City name cannot be empty', required),
        regex: helpers.regex(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      }
    }
  },
  computed: {
    inputError() {
      const { $errors } = this.v$.name
      if ($errors.length === 0) {
        return null
      }
      const [{ $validator }] = $errors
      switch ($validator) {
        case 'required':
          return 'City name cannot be empty'
        case 'regex':
          return 'City name is not valid. Use only latin letters, spaces and dashes.'
        default:
          return 'City name is not valid'
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyPress)
    this.focusInput()
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeyPress)
  },
  methods: {
    focusInput() {
      this.$refs.input?.focus()
    },
    onKeyPress({ key }) {
      switch (key) {
        case 'Enter':
          return this.add()
        case 'Escape':
          return this.close()
      }
    },
    clear() {
      this.name = ''
      this.v$.$reset()
      this.focusInput()
    },
    close() {
      this.$emit('close')
    },
    add() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }
      this.$emit('add', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

::v-global(.modal-choose-city) {
  width: 751px;

  @media (max-width: $viewport-desktop) {
    width: 80%;
    max-width: 600px;
  }

  @media (max-width: $viewport-tablet) {
    width: 95%;
  }
}

.modal-choose-city__input {
  margin-top: 51px;
  width: 100%;
  margin-bottom: 104px;

  @media (max-width: $viewport-desktop) {
    margin-top: 30px;
    margin-bottom: 60px;
  }
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

  @media (max-width: $viewport-tablet) {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
