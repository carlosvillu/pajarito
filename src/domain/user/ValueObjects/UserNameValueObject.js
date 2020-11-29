import {ValueObject} from '../../common/ValueObject'

const MIN_LENGTH = 4

export class UserNameValueObject extends ValueObject {
  #username

  static validate({username}) {
    if (!username || !username.length || username.length < MIN_LENGTH) {
      throw new Error(
        `[UserNameValueObject.validate] forbidden username lower than ${MIN_LENGTH} characters`
      )
    }
  }

  constructor({username}) {
    super()

    this.#username = username
  }

  value() {
    return this.#username
  }

  toJSON() {
    return {
      username: this.#username
    }
  }
}
