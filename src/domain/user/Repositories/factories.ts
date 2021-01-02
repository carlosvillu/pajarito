import { UserEntitiesFactory } from '../Entities/factories'
import { UserValueObjectsFactory } from '../ValueObjects/factories'

import { LocalStorageUserRepository } from './LocalStorageUserRepository'
import { InMemoryUserRepository } from './InMemoryUserRepository'

export class UserRepositoriesFactory {
  static inMemoryUserRepository() {
    return new InMemoryUserRepository()
  }

  static localStorageUserRepository() {
    return new LocalStorageUserRepository(
      UserEntitiesFactory.userEntity,
      UserValueObjectsFactory.statusValueObject,
      window.localStorage
    )
  }
}
