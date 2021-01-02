import { ValueObject } from '../../common/ValueObject'

const MIN_LENGTH = 8

export class PasswordValueObject extends ValueObject {
  static validate({ password }: { password: string }) {
    if (!password || !password.length || password.length < MIN_LENGTH) {
      throw new Error(
        `[PasswordValueObject.validate] forbidden password lower than ${MIN_LENGTH} characters`
      )
    }
  }

  constructor(private password: string) {
    super()
  }

  value() {
    return this.password
  }

  toJSON() {
    return {
      password: this.password,
    }
  }
}
