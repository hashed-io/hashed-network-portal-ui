import { decodeJwt } from 'jose'

export default class Jwt {
  static decodeToken (token) {
    return decodeJwt(token)
  }
}
