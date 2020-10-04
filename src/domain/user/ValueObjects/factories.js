import {PasswordValueObject} from './PasswordValueObject'
import {UserNameValueObject} from './UserNameValueObject'

export class UserValueObjectsFactory {
  static passwordValueObject({password}) {
    PasswordValueObject.validate({password})

    return new PasswordValueObject({password})
  }

  static usernameValueObject({username}) {
    UserNameValueObject.validate({username})

    return new UserNameValueObject({username})
  }
}
