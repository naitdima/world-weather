import ky from 'ky'
import { NetworkError } from '@/api/network'

export default class Base {
  constructor() {
    this._api = new Proxy({}, {
      get: (_, method) => async (...params) => {
        try {
          return await ky[method](...params).json()
        } catch (e) {
          if (e.name === 'HTTPError') {
            throw new NetworkError(e.response.status)
          } else {
            throw e
          }
        }
      }
    })
  }
}
