import * as jose from 'jose'

export default class Jwt {
  static decodeJwt (token) {
    return jose.decodeJwt(token)
  }
}
