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
  <notifications position="bottom center" />
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
      const alreadyHasWeather = this.weathers.some(weather => weather.city.name === cityName)
      if (alreadyHasWeather) {
        return this.$notify({
          type: 'error',
          text: 'Weather for this city is already displayed'
        })
      }
      const weather = await this.getWeatherByCityName(cityName)
      this.weathers.push(weather)
      this.chooseCityModalIsVisible = false
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
@import "@/assets/styles/variables.scss";

.main-page {
  padding: 24px 24px 34px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-primary);

  @media (max-width: $viewport-desktop) {
    padding: 20px 20px 80px 20px;
  }

  @media (max-width: $viewport-tablet) {
    padding: 16px 16px 80px 16px;
  }
}

.main-page__title {
  margin-bottom: 32px;
  font-size: 70px;
  line-height: 80px;
  font-weight: 300;

  @media (max-width: $viewport-desktop) {
    font-size: 55px;
    line-height: 65px;
    margin-bottom: 12px;
  }

  @media (max-width: $viewport-tablet) {
    font-size: 40px;
    line-height: 50px;
    margin-bottom: 8px;
  }
}

.main-page__description {
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 24px;
  color: var(--color-text-regular);

  @media (max-width: $viewport-desktop) {
    font-size: 20px;
    margin-bottom: 18px;
  }

  @media (max-width: $viewport-tablet) {
    font-size: 18px;
    margin-bottom: 18px;
  }
}

.main-page__error {
  font-size: 16px;
  line-height: 24px;
  color: var(--color-error);

  @media (max-width: $viewport-desktop) {
    font-size: 14px;
    line-height: 18px;
  }
}

.main-page__weather-cards {
  width: 100%;
  margin-top: 80px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 350px);
  gap: 40px;

  @media (max-width: $viewport-desktop) {
    margin-top: 40px;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  @media (max-width: $viewport-tablet) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.main-page__weather-card {
  &_current {
    width: 824px;

    @media (max-width: $viewport-desktop) {
      width: 100%;
      max-width: 660px;
    }
  }

  @media (max-width: $viewport-tablet) {
    width: 100%;
    max-width: 460px;
  }
}

.main-page__add-btn {
  position: fixed;
  right: 45px;
  bottom: 34px;

  @media (max-width: $viewport-desktop) {
    right: 15px;
    bottom: 15px;
  }
}
</style>
