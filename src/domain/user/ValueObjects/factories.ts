import { PasswordValueObject } from './PasswordValueObject'
import { UserNameValueObject } from './UserNameValueObject'
import { StatusValueObject } from './StatusValueObject'

export class UserValueObjectsFactory {
  static statusValueObject({ status }) {
    StatusValueObject.validate({ status })

    return new StatusValueObject({ status })
  }

  static passwordValueObject({ password }) {
    PasswordValueObject.validate({ password })

    return new PasswordValueObject({ password })
  }

  static usernameValueObject({ username }) {
    UserNameValueObject.validate({ username })

    return new UserNameValueObject({ username })
  }
}
