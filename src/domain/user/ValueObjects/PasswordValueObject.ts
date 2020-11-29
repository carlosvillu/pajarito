import { ValueObject } from '../../common/ValueObject'

const MIN_LENGTH = 8

export class PasswordValueObject extends ValueObject {
  #password

  static validate({ password }) {
    if (!password || !password.length || password.length < MIN_LENGTH) {
      throw new Error(
        `[PasswordValueObject.validate] forbidden password lower than ${MIN_LENGTH} characters`
      )
    }
  }

  constructor({ password }) {
    super()
    this.#password = password
  }

  value() {
    return this.#password
  }

  toJSON() {
    return {
      password: this.#password,
    }
  }
}
