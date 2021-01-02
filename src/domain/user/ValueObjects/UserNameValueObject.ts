import { ValueObject } from '../../common/ValueObject'

const MIN_LENGTH = 4

export class UserNameValueObject extends ValueObject {
  static validate({ username }) {
    if (!username || !username.length || username.length < MIN_LENGTH) {
      throw new Error(
        `[UserNameValueObject.validate] forbidden username lower than ${MIN_LENGTH} characters`
      )
    }
  }

  constructor(private username: string) {
    super()
  }

  value() {
    return this.username
  }

  toJSON() {
    return {
      username: this.username,
    }
  }
}
