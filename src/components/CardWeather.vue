<template>
  <div class="card-weather">
    <h3 class="card-weather__name">
      {{ weather.city.name }}
    </h3>
    <p class="card-weather__location">
      {{ current ? 'Your current location' : weather.country.name.common }}
    </p>
    <div class="card-weather__params">
      <div
          v-for="(value, title) in params"
          :key="title"
          class="card-weather__params-row"
      >
        <div class="card-weather__params-cell">{{ title }}</div>
        <div class="card-weather__params-cell">{{ value }}</div>
      </div>
    </div>
    <p
        class="card-weather__timer"
        :key="timerKey"
    >
      {{ getTimeAgo(weather.updatedDate) }}
    </p>
    <div class="card-weather__actions">
      <app-button
          class="card-weather__action"
          type="primary"
          @click="$emit('reload')"
      >
        Reload
      </app-button>
      <app-button
          v-if="removable"
          class="card-weather__action"
          type="primary"
          @click="$emit('remove')"
      >
        Remove
      </app-button>
    </div>
  </div>
</template>

<script>
import { getTimeAgo } from '@/utils/formatDate'
import AppButton from '@/components/ui/AppButton.vue'

const getCurrentISODate = () => (new Date).toISOString()
const MINUTE_IN_MILLISECONDS = 60000

export default {
  name: 'CardWeather',
  emits: ['reload', 'remove'],
  components: {
    AppButton
  },
  props: {
    weather: {
      type: Object,
      required: true
    },
    current: {
      type: Boolean,
      default: false
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null,
      timerKey: getCurrentISODate()
    }
  },
  computed: {
    params() {
      const { weather, main } = this.weather.city
      return {
        Weather: weather[0].main,
        Temperature: `${main.temp} ℃`,
        Humidity: `${main.humidity} %`
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => this.timerKey = getCurrentISODate(), MINUTE_IN_MILLISECONDS);
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    getTimeAgo
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.card-weather {
  padding: 24px;
  box-shadow: 0 2px 10px rgba(10, 10, 10, 0.25);
  border-radius: 6px;

  @media (max-width: $viewport-tablet) {
    padding: 14px;
  }
}

.card-weather__name {
  margin-bottom: 15px;
  font-size: 32px;
  line-height: 38px;
  font-weight: 700;

  @media (max-width: $viewport-tablet) {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 8px;
  }
}

.card-weather__location {
  margin-bottom: 40px;
  font-size: 18px;
  line-height: 24px;

  @media (max-width: $viewport-tablet) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }
}

.card-weather__actions {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.card-weather__params {
  margin-bottom: 8px;
}

.card-weather__params-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  @media (max-width: $viewport-tablet) {
    padding-bottom: 8px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.card-weather__params-cell {
  font-size: 18px;
  line-height: 24px;

  @media (max-width: $viewport-tablet) {
    font-size: 16px;
    line-height: 20px;
  }
}

.card-weather__timer {
  margin-bottom: 32px;
  text-align: right;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-secondary);

  @media (max-width: $viewport-tablet) {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>