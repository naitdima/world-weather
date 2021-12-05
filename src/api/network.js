export class NetworkError extends Error {
  constructor(code, message = 'An error occurred. Please try again later.') {
    super()
    this.code = code
    this.message = message
  }
}
