import { NetworkError } from '@/api/network'
import Base from '@/api/base'
const { VUE_APP_OPENWEATHERMAP_API_KEY } = process.env

const ERROR_MESSAGE = {
  401: 'Check that the API-key is correct',
  404: 'Weather for this city not found'
}

class Weather extends Base {
  async getByCity(city) {
    try {
      return await this._api.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VUE_APP_OPENWEATHERMAP_API_KEY}&units=metric`)
    } catch (e) {
      const errorMessage = ERROR_MESSAGE[e.code]
      if (errorMessage) {
        throw new NetworkError(e.code, errorMessage)
      } else {
        throw e
      }
    }
  }
}

export default new Weather()
