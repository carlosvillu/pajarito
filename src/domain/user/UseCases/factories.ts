import { UserServicesFactory } from '../Services/factory'
import { UserRepositoriesFactory } from '../Repositories/factories'
import { UserValueObjectsFactory } from '../ValueObjects/factories'

import { CurrentUserUseCase } from './CurrentUserUseCase'
import { RegisterUserUseCase } from './RegisterUserUseCase'
import { LoginUserUseCase } from './LoginUserUseCase'
import { LogoutUserUseCase } from './LogoutUserUseCase'

const isNODE = typeof window === 'undefined'

export class UserUseCasesFactory {
  static currentUserUseCase() {
    return new CurrentUserUseCase(UserServicesFactory.currentUserService())
  }

  static logoutUserUseCase() {
    return new LogoutUserUseCase(
      isNODE
        ? UserRepositoriesFactory.inMemoryUserRepository()
        : UserRepositoriesFactory.localStorageUserRepository()
    )
  }

  static loginUserUseCase() {
    return new LoginUserUseCase(
      isNODE
        ? UserRepositoriesFactory.inMemoryUserRepository()
        : UserRepositoriesFactory.localStorageUserRepository(),
      UserValueObjectsFactory.usernameValueObject,
      UserValueObjectsFactory.passwordValueObject
    )
  }

  static registerUserUseCase() {
    return new RegisterUserUseCase(
      isNODE
        ? UserRepositoriesFactory.inMemoryUserRepository()
        : UserRepositoriesFactory.localStorageUserRepository(),
      UserValueObjectsFactory.usernameValueObject,
      UserValueObjectsFactory.passwordValueObject
    )
  }
}
