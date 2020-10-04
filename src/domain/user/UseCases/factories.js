import {UserRepositoriesFactory} from '../Repositories/factories'
import {UserValueObjectsFactory} from '../ValueObjects/factories'

import {RegisterUserUseCase} from './RegisterUserUseCase'
import {LoginUserUseCase} from './LoginUserUseCase'

export class UserUseCasesFactory {
  static loginUserUseCase() {
    return new LoginUserUseCase({
      repository: UserRepositoriesFactory.localStorageUserRepository(),
      usernameValueObjectFactory: UserValueObjectsFactory.usernameValueObject,
      passwordValueObjectFactory: UserValueObjectsFactory.passwordValueObject
    })
  }

  static registerUserUseCase() {
    return new RegisterUserUseCase({
      repository: UserRepositoriesFactory.localStorageUserRepository(),
      usernameValueObjectFactory: UserValueObjectsFactory.usernameValueObject,
      passwordValueObjectFactory: UserValueObjectsFactory.passwordValueObject
    })
  }
}
