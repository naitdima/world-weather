<template>
  <div class="main-page">
    <h1 class="main-page__title">World Weather</h1>
    <p class="main-page__description">Watch weather in your current location</p>
    <card-weather
        v-if="currentWeather"
        class="main-page__weather-card main-page__weather-card_current"
        :weather="currentWeather"
        current
        @reload="reloadCurrentWeather"
    />
    <p
        v-else-if="currentWeather === null"
        class="main-page__error"
    >
      Failed to get the current location
    </p>
    <div
        v-if="weathers.length > 0"
        class="main-page__weather-cards"
    >
      <card-weather
          v-for="(weather, index) in weathers"
          :key="weather.city.id"
          class="main-page__weather-card"
          :weather="weather"
          removable
          @reload="reloadWeather(weather, index)"
          @remove="removeWeather(index)"
      />
    </div>
    <app-button
      class="main-page__add-btn"
      icon="plus"
      @click="chooseCityModalIsVisible = true"
    />
  </div>
  <modal-choose-city
      v-if="chooseCityModalIsVisible"
      @add="addWeatherByCityName"
      @close="chooseCityModalIsVisible = false"
  />
</template>

<script>
import AppButton from '@/components/ui/AppButton.vue'
import CardWeather from '@/components/CardWeather.vue'
import ModalChooseCity from '@/components/ModalChooseCity.vue'
import Weather from '@/api/weather'
import Geocoding from '@/api/geocoding'

export default {
  name: 'App',
  components: {
    AppButton,
    CardWeather,
    ModalChooseCity
  },
  data() {
    return {
      chooseCityModalIsVisible: false,
      currentWeather: undefined,
      weathers: []
    }
  },
  async mounted() {
    await this.getCurrentWeather()
    await this.getSavedWeathers()
  },
  watch: {
    weathers: {
      deep: true,
      handler(val) {
        localStorage.setItem('WEATHER_CITY_NAMES', JSON.stringify(val.map(weather => weather.city.name)))
      }
    }
  },
  methods: {
    async reloadCurrentWeather() {
      const { city: { name } } = this.currentWeather
      this.currentWeather = await this.getWeatherByCityName(name)
    },
    async reloadWeather({ city: { name } }, index) {
      const weather = await this.getWeatherByCityName(name)
      this.weathers.splice(index, 1, weather)
    },
    removeWeather(index) {
      this.weathers.splice(index, 1)
    },
    async getSavedWeathers() {
      const savedWeatherCityNames = localStorage.getItem('WEATHER_CITY_NAMES')
      if (savedWeatherCityNames) {
        const savedWeathers = await Promise.all(JSON.parse(savedWeatherCityNames).map(this.getWeatherByCityName))
        this.weathers.push(...savedWeathers)
      }
    },
    async addWeatherByCityName(cityName) {
      const weather = await this.getWeatherByCityName(cityName)
      this.weathers.push(weather)
    },
    async getWeatherByCityName(cityName) {
      const city = await Weather.getByCity(cityName)
      const [country] = await Geocoding.getCountryByCode(city.sys.country)
      return {
        city,
        country,
        updatedDate: (new Date()).toISOString()
      }
    },
    async getCurrentWeather() {
      const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
      }

      try {
        const { coords: { latitude, longitude } } = await getCurrentPosition()
        const { city } = await Geocoding.getCityByGeoCoords(latitude, longitude)
        this.currentWeather = await this.getWeatherByCityName(city)
      } catch {
        this.currentWeather = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  padding: 24px 24px 34px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-primary);
}

.main-page__title {
  margin-bottom: 32px;
  font-size: 70px;
  line-height: 80px;
  font-weight: 300;
}

.main-page__description {
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 24px;
  color: var(--color-text-regular);
}

.main-page__error {
  margin-top: 10px;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-error);
}

.main-page__weather-cards {
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.main-page__weather-card {
  &_current {
    width: 824px;
  }
}

.main-page__add-btn {
  position: fixed;
  right: 45px;
  bottom: 34px;
}
</style>
