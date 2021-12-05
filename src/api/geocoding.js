import Base from '@/api/base'

class Geocoding extends Base {
  async getCountryByCode(code) {
    return await this._api.get(`https://restcountries.com/v3.1/alpha/${code}`)
  }

  async getCityByGeoCoords(lat, lon) {
    return await this._api.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
  }
}

export default new Geocoding()
