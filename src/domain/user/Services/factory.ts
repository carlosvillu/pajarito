import { UserRepositoriesFactory } from '../Repositories/factories'
import { CurrentUserService } from './CurrentUserService'

const isNODE = typeof window === 'undefined'

export class UserServicesFactory {
  static currentUserService() {
    return new CurrentUserService(
      isNODE
        ? UserRepositoriesFactory.inMemoryUserRepository()
        : UserRepositoriesFactory.localStorageUserRepository()
    )
  }
}
